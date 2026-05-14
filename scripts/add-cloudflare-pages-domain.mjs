const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "0e91b20b197279d4edb515fab5c76819";
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT || "educaimpacto";
const token = process.env.CLOUDFLARE_API_TOKEN;
const domains = process.argv.slice(2);

if (!token) {
  console.error("Missing CLOUDFLARE_API_TOKEN.");
  console.error("Run: export CLOUDFLARE_API_TOKEN=\"your_new_token\"");
  process.exit(1);
}

if (domains.length === 0) {
  domains.push("educaimpacto.com.br");
}

async function cloudflare(path, init = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const body = await response.json();
  if (!response.ok || !body.success) {
    const message = body.errors?.map((error) => `${error.code}: ${error.message}`).join("; ");
    throw new Error(message || `Cloudflare API request failed with ${response.status}`);
  }

  return body.result;
}

for (const domain of domains) {
  const path = `/accounts/${accountId}/pages/projects/${projectName}/domains`;
  try {
    const result = await cloudflare(path, {
      method: "POST",
      body: JSON.stringify({ name: domain }),
    });
    console.log(`Added ${domain}: ${result.status || "pending"}`);
  } catch (error) {
    if (
      String(error.message).includes("already exists") ||
      String(error.message).includes("already added this custom domain")
    ) {
      console.log(`${domain} is already connected.`);
      continue;
    }
    throw error;
  }
}
