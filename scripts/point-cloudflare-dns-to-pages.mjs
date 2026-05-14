const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "0e91b20b197279d4edb515fab5c76819";
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT || "educaimpacto";
const configuredZoneId = process.env.CLOUDFLARE_ZONE_ID;
const pagesTarget = process.env.CLOUDFLARE_PAGES_TARGET || `${projectName}.pages.dev`;
const token = process.env.CLOUDFLARE_API_TOKEN;
const domains = process.argv.slice(2);

if (!token) {
  console.error("Missing CLOUDFLARE_API_TOKEN.");
  console.error("Run: export CLOUDFLARE_API_TOKEN=\"your_new_token\"");
  process.exit(1);
}

if (domains.length === 0) {
  domains.push(process.env.CLOUDFLARE_ZONE || "educaimpacto.com.br");
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

async function getZoneId(zoneName) {
  if (configuredZoneId) {
    return configuredZoneId;
  }

  const zones = await cloudflare(`/zones?name=${encodeURIComponent(zoneName)}`);
  const zone = zones[0];
  if (!zone) {
    throw new Error(
      [
        `Cloudflare zone not found: ${zoneName}`,
        "Your token can publish Pages, but it may not have access to DNS zones.",
        `Create/update the token with: Zone -> Zone -> Read and Zone -> DNS -> Edit for ${zoneName}.`,
        `If ${zoneName} is still only in GoDaddy, add it to Cloudflare first and update its nameservers at GoDaddy.`,
        "Alternatively, export CLOUDFLARE_ZONE_ID if you already know the zone ID.",
      ].join("\n")
    );
  }
  return zone.id;
}

async function listDnsRecords(zoneId, name) {
  return cloudflare(`/zones/${zoneId}/dns_records?name=${encodeURIComponent(name)}`);
}

async function removeConflictingRecords(zoneId, name) {
  const records = await listDnsRecords(zoneId, name);
  for (const record of records) {
    if (record.type === "CNAME" && record.content === pagesTarget) {
      continue;
    }

    await cloudflare(`/zones/${zoneId}/dns_records/${record.id}`, {
      method: "DELETE",
    });
    console.log(`Deleted ${record.type} ${record.name} -> ${record.content}`);
  }
}

async function ensureCname(zoneId, name) {
  const records = await listDnsRecords(zoneId, name);
  const existing = records.find((record) => record.type === "CNAME" && record.content === pagesTarget);

  if (existing) {
    console.log(`${name} already points to ${pagesTarget}.`);
    return;
  }

  await cloudflare(`/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: JSON.stringify({
      type: "CNAME",
      name,
      content: pagesTarget,
      proxied: true,
      ttl: 1,
    }),
  });
  console.log(`Created CNAME ${name} -> ${pagesTarget}`);
}

for (const domain of domains) {
  await cloudflare(`/accounts/${accountId}/pages/projects/${projectName}/domains`, {
    method: "POST",
    body: JSON.stringify({ name: domain }),
  }).catch((error) => {
    if (!String(error.message).includes("already added this custom domain")) {
      throw error;
    }
    console.log(`${domain} is already connected to Pages.`);
  });

  const zoneId = await getZoneId(domain);
  await removeConflictingRecords(zoneId, domain);
  await ensureCname(zoneId, domain);
}
