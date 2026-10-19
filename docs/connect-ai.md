The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/connect-ai.md`.

# Connect Your AIs to the Memory Tree
Connect Claude, ChatGPT, Gemini, Notion, and Claude Code to share the same long-term memory tree.

After completing this guide, your external AI apps will connect to your memory tree through dedicated MCP URLs: at the start of every conversation they read your background and preferences, and whenever you mention a new fact, preference, decision, or update about yourself they write it back to the memory tree. This guide assumes you have already deployed OpenMousse (or installed the standalone `mousse-tree` service).

## Prerequisites

- A running OpenMousse server paired with the app, or a standalone `mousse-tree` service installed on a server with Python 3.11 or later (see the appendix at the end of this page).
- To connect cloud AI apps (Claude on the web, ChatGPT, Gemini, Notion), your memory tree service must be reachable at a public HTTPS URL (local command-line tools such as Claude Code can use a LAN or Tailscale address).
- Plan or region requirements on some platforms: ChatGPT requires a Plus subscription or higher; Notion requires a Business plan or higher; Gemini's connector feature is subject to Google's regional availability and must be used in a supported region.

## Privacy Notes

- **What is read and written**: The memory tree receives facts, preferences, decisions, and opinions about you that come up in those AI apps; the full conversation transcripts in each platform stay where they are.
- **Data isolation boundary**: Authorized external AI apps can only read and write the memory tree; they cannot read OpenMousse conversation history, health data, or the independent memories of your functional agents.
- **Source tracking and instant revocation**: Each platform uses its own URL with a dedicated token, which the server uses to record the source of every leaf. You can delete any platform's URL in the OpenMousse app at any time; once deleted, restarting the memory tree service disconnects that platform immediately (if the memory tree runs as a system service, the app restarts it automatically; otherwise restart the service manually).

## Steps

### 1. Get Dedicated Connection URLs in the App

1. In the OpenMousse app, open **Settings → Memory tree → Connect your AI**.
2. Select the target platform you want to connect, then generate and copy that platform's dedicated tokenized URL.

> **Important: Public HTTPS and Admin Page Isolation**
> Claude (web), ChatGPT, Gemini, and Notion connect from their own cloud servers, so your memory tree service must be served over public HTTPS. If you expose a standalone `mousse-tree` instance through a reverse proxy, expose only the `/t` and `/m` path prefixes; never expose the admin page to the public internet.

### 2. Configure the MCP Connection on Each Platform

Follow the steps for the platform you are connecting:

| Platform | Configuration Path and Steps |
| --- | --- |
| **Claude** | 1. On `claude.ai`, open **Settings → Connectors → Add custom connector**.<br>2. Set the name to `Memory tree`, paste the dedicated URL from the app, and leave authentication blank. |
| **ChatGPT** | 1. In ChatGPT (Plus or higher required), open **Settings → Apps & Connectors → Advanced** and enable **Developer mode**.<br>2. Click **Create**, paste the dedicated URL from the app, and set authentication to `None`. |
| **Gemini** | On `gemini.google.com`, open **Settings → Connected Apps → Add custom app** and paste the dedicated URL from the app (must be used in a region where the provider supports this feature). |
| **Notion** | 1. In Notion (Business or higher required), open **Custom Agent → Tools & Access → Custom MCP server**.<br>2. Enter the server URL, select `Bearer token` authentication, and paste the token provided by the app into the token field. |
| **Claude Code** | Run the following command in your terminal, replacing `<URL>` with the dedicated URL from the app:<br>`claude mcp add --transport http tree <URL>` |
| **Other MCP-compatible AIs** | In the target app's MCP, Connector, or Tools settings, add a remote MCP server (Streamable HTTP), paste the dedicated URL from the app, and leave authentication unconfigured. If its web app does not yet support remote MCP, use its CLI or any MCP-compatible client. |

### 3. Paste Custom Instructions and Turn Off Built-In Memory

Copy the following instruction into the custom instructions of each connected app (for Notion, put it in the Custom Agent's **Instructions**; for Claude Code, put it in your project `CLAUDE.md` or global `CLAUDE.md`):

```text
At the start of a conversation, call profile and recall to learn about me; whenever I state a new fact, preference, decision, or update about myself, call remember.
```

Then **turn off the app's built-in memory feature** in its settings so the two systems do not drift out of sync.

### Appendix: Install Only the Standalone Memory Tree

If you do not need a full OpenMousse deployment, you can run the memory tree service on its own on any server with Python 3.11 or later:

```bash
pipx install "git+https://github.com/openmousse/openmousse#subdirectory=tree"
mousse-tree init --name YourName --tz UTC
mousse-tree install-service
```

- You can replace the first line with `pip install --user "git+https://github.com/openmousse/openmousse#subdirectory=tree"`.
- Replace the `--tz` value with your actual time zone.
- By default, the service listens only on `127.0.0.1:8787`. Run `mousse-tree urls` to view the tokenized URLs for each platform in your terminal (view these only inside your own terminal).

## How to Verify

The connection is working when all of the following hold:

- [ ] Starting a new conversation in the external AI app triggers calls to the `profile` and `recall` tools to read from the memory tree.
- [ ] Telling the app a new preference or update about yourself triggers a call to the `remember` tool.
- [ ] Opening the memory tree in the OpenMousse app shows the new leaf with its provenance set to that external app and today's date.
- [ ] The external app's built-in memory feature is turned off.

## Next Steps

- **Memory Tree**: Learn about the leaf format and how to switch between SQLite and a Markdown vault (`mousse-tree migrate`).
- **Data and Security**: Review how external apps are isolated and where data lives on your server.
