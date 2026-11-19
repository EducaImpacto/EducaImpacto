-- Existing records are preserved. These checks apply to new writes.
create function public.unsafe_business_text(input text) returns boolean
language sql immutable strict parallel safe as $$
  select regexp_replace(
    regexp_replace(lower(regexp_replace(normalize(input, NFKD), U&'[\0300-\036f]', '', 'g')), '\s+', ' ', 'g'),
    '\ybombas?\s+(?:(?:de|d[''’])\s*)?(?:agua|chocolate|combustivel|calor|ar|hidraulicas?)\y', ' ', 'g'
  ) ~ '\y(armas?|armamentos?|municao|municoes|explosivos?|pistolas?|fuzil|fuzis|revolver(es)?|granadas?|bombas?)\y|\y(ferir|matar|envenenar|assassinar|atacar|machucar|atingir|explodir) (?:[a-z]+ ){0,3}(pessoas|multidoes|aglomeracoes|comunidades|vitimas|inocentes|alguem|escolas|civis)\y|\y(atentados?|assassinatos? (por encomenda|de aluguel)|trafico de (armas|drogas|pessoas))\y';
$$;

alter table public.business_projects add constraint safe_business_name
  check (not public.unsafe_business_text(name)) not valid;
alter table public.mission_answers add constraint safe_mission_answer
  check (not public.unsafe_business_text(answer)) not valid;

create function public.unsafe_business_json(input jsonb) returns boolean
language sql immutable strict parallel safe as $$
  select exists (
    select 1 from jsonb_path_query(input, 'strict $.** ? (@.type() == "string")') as fields(value)
    where public.unsafe_business_text(value #>> '{}')
  );
$$;

alter table public.business_plans add constraint safe_business_plan
  check (status = 'failed' or not (
    public.unsafe_business_json(content) or public.unsafe_business_json(generated_from)
  )) not valid;
