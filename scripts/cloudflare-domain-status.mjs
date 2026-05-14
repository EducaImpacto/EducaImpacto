const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "0e91b20b197279d4edb515fab5c76819";
const projectName = process.env.CLOUDFLARE_PAGES_PROJECT || "educaimpacto";
const token = process.env.CLOUDFLARE_API_TOKEN;
const names = process.argv.slice(2);

if (!token) {
  console.error("Missing CLOUDFLARE_API_TOKEN.");
  console.error("Run: export CLOUDFLARE_API_TOKEN=\"your_new_token\"");
  process.exit(1);
}

if (names.length === 0) {
  names.push(process.env.CLOUDFLARE_ZONE || "educaimpacto.com.br");
}

async function cloudflare(path) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const body = await response.json();
  if (!response.ok || !body.success) {
    const message = body.errors?.map((error) => `${error.code}: ${error.message}`).join("; ");
    throw new Error(message || `Cloudflare API request failed with ${response.status}`);
  }

  return body.result;
}

const domains = await cloudflare(`/accounts/${accountId}/pages/projects/${projectName}/domains`);
console.log("Pages custom domains:");
for (const domain of domains) {
  console.log(`- ${domain.name}: ${domain.status || "unknown"}`);
}

for (const zoneName of names) {
  const zones = await cloudflare(`/zones?name=${encodeURIComponent(zoneName)}`);
  if (!zones[0]) {
    console.log(`\nDNS zone not visible to this token: ${zoneName}`);
    continue;
  }

  const records = await cloudflare(`/zones/${zones[0].id}/dns_records?name=${encodeURIComponent(zoneName)}`);
  console.log(`\nDNS records for ${zoneName}:`);
  for (const record of records) {
    console.log(`- ${record.type} ${record.name} -> ${record.content} proxied=${record.proxied}`);
  }
}
