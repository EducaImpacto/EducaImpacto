import { createClient } from "npm:@supabase/supabase-js@2";
import { hasUnsafePlanText, safetyMessage } from "../_shared/planSafety.ts";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Content-Type": "application/json",
};
const reply = (body: object, status = 200) => new Response(JSON.stringify(body), {headers, status});

Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response(null, {headers});
  if (req.method !== "POST") return reply({}, 405);
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const mpToken = Deno.env.get("MERCADOPAGO_ACCESS_TOKEN");
    const site = Deno.env.get("PUBLIC_SITE_URL");
    if (!mpToken || !site) return reply({error:"Checkout indisponível"}, 503);
    const caller = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global:{headers:{Authorization:req.headers.get("Authorization") ?? ""}},
    });
    const {data:{user}} = await caller.auth.getUser();
    if (!user) return reply({}, 401);
    const {planId} = await req.json();
    const {data:plan} = await caller.from("business_plans").select("id,status,content,generated_from").eq("id", planId).single();
    if (!plan || plan.status !== "generated") return reply({}, 404);
    if (hasUnsafePlanText(plan.content) || hasUnsafePlanText(plan.generated_from)) return reply({error:safetyMessage}, 422);
    const db = createClient(url,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const orders = db.from("plan_download_orders");
    const created = await orders.upsert({plan_id:planId}, {onConflict:"plan_id", ignoreDuplicates:true});
    if (created.error) throw created.error;
    const {data:order,error} = await orders.select("reference,checkout_url").eq("plan_id",planId).single();
    if (error) throw error;
    const api = "https://api.mercadopago.com";
    const auth = {Authorization:"Bearer "+mpToken,"Content-Type":"application/json"};
    const search = new URL(api+"/v1/payments/search");
    search.searchParams.set("external_reference",order.reference);
    search.searchParams.set("status","approved");
    const result = await fetch(search,{headers:auth});
    if (!result.ok) throw new Error();
    const {results} = await result.json();
    if (results.some((p: {external_reference:string; status:string; currency_id:string; transaction_amount:number; transaction_amount_refunded:number}) =>
      p.external_reference === order.reference && p.status === "approved" && p.currency_id === "BRL" &&
      p.transaction_amount === 29.9 && !p.transaction_amount_refunded)) return reply({paid:true});
    if (order.checkout_url) return reply({url:order.checkout_url});
    const destination = new URL("/pagamento",site);
    destination.searchParams.set("id",planId);
    const response = await fetch(api+"/checkout/preferences",{method:"POST",headers:auth,
      body:JSON.stringify({external_reference:order.reference,auto_return:"approved",
        back_urls:{success:destination.href,pending:destination.href,failure:destination.href},
        items:[{id:planId,title:"PDF do plano de negócios",quantity:1,currency_id:"BRL",unit_price:29.90}]})});
    if (!response.ok) throw new Error();
    const {init_point} = await response.json();
    const saved = await orders.update({checkout_url:init_point}).eq("plan_id",planId);
    if (saved.error) throw saved.error;
    return reply({url:init_point});
  } catch { return reply({error:"Falha ao consultar pagamento"},502); }
});
