# Zari CRM — MCP Integrations

This folder contains MCP (Model Context Protocol) servers that give Claude Code
direct access to Zoho CRM, Books, and Desk for Zari's customer data.

## zoho-crm-server

Full Zoho suite: CRM contacts/leads/deals, Books invoices, Desk tickets,
Campaigns automations — 32+ tools available to Claude.

### Setup (one-time)

**Step 1 — Create a Zoho OAuth app**

1. Go to [https://api-console.zoho.com](https://api-console.zoho.com)
2. Click **Add Client** → choose **Server-based Applications**
3. Set Redirect URI to `http://localhost:8080/callback`
4. Copy your **Client ID** and **Client Secret**

**Step 2 — Get a refresh token**

Run the helper script (opens browser for the consent screen):

```bash
cd mcp/zoho-crm-server
node -e "
const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'http://localhost:8080/callback';
const scopes = 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.ALL,ZohoDesk.tickets.ALL,ZohoDesk.contacts.ALL,ZohoCampaigns.contact.ALL,ZohoCampaigns.campaign.ALL,ZohoBooks.fullaccess.all';
const url = \`https://accounts.zoho.com/oauth/v2/auth?scope=\${scopes}&client_id=\${clientId}&response_type=code&access_type=offline&redirect_uri=\${encodeURIComponent(redirectUri)}\`;
console.log('Open this URL:', url);
"
```

After authorizing, Zoho redirects to `http://localhost:8080/callback?code=XXXX`.
Copy the `code` value and exchange it:

```bash
curl -X POST https://accounts.zoho.com/oauth/v2/token \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=http://localhost:8080/callback" \
  -d "code=YOUR_CODE"
```

The response includes `refresh_token` — this is the long-lived token you need.

**Step 3 — Fill in credentials**

Edit `mcp/zoho-crm-server/.env`:

```
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
ZOHO_REFRESH_TOKEN=your_refresh_token
```

**Step 4 — Add credentials to Claude Code global settings**

Edit `~/.claude/settings.json` and fill in the same values under `mcpServers.zoho-crm.env`.

**Step 5 — Rebuild and restart Claude Code**

```bash
cd mcp/zoho-crm-server
npm run build
```

Then restart Claude Code — the `zoho-crm` MCP server will be available in every session.

### Usage in Claude Code

Once connected, you can ask Claude things like:
- "Pull all leads created this week from Zoho CRM"
- "Create a contact in CRM for this new signup"
- "Check open support tickets for user X"
- "Generate an invoice in Zoho Books for account Y"
- "Show the deal pipeline stage breakdown"

### Building

```bash
cd mcp/zoho-crm-server
npm install
npm run build
```
