The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/agent-install.md`.

# Install OpenMousse via an Existing Agent
Send an install prompt to a running OpenClaw or Hermes instance to verify the environment, install, wire tools, and pair.

After completing this guide, your running external agent (OpenClaw, Hermes Agent, nanobot, Letta Code, or a cloud-hosted instance such as KimiClaw) will install the OpenMousse server on its host machine, wire tools such as `board`, `inbox`, `goals`, and `journal` into itself, and send you a one-time phone pairing link. This guide assumes you already have a machine running one of those agents.

## Prerequisites

- You are using OpenClaw, Hermes Agent, nanobot, or Letta Code on a Linux, macOS, or Windows WSL 2 machine.
- Your phone can install the Tailscale app and the OpenMousse app, and can sign in to the same Tailscale account as that machine (for cloud-only connector environments without a terminal, see the note under Step 2).

## Privacy Notes

- **Does not replace your existing agent**: OpenMousse runs alongside your existing agent as a local service and mobile frontend, forwarding your messages to it through the local OpenAI-compatible endpoint and giving it board, inbox, and memory tree tools over MCP.
- **Secrets stay out of chat**: Server tokens and API keys generated during installation are written only to local files on the machine (such as `~/.openmousse/server.json`, `openclaw.json`, and `.env`). The only thing the agent sends into chat is the one-time pairing link in Step 4 (valid for 10 minutes).
- **Asks before sensitive actions**: Before using `sudo` to install system packages, installing Tailscale, or exposing any path to the public internet, the agent stops and asks for your approval.

## Steps

### 1. Send the Install Prompt

Copy and send the following line to your running agent:

```text
Connect me to OpenMousse following https://raw.githubusercontent.com/openmousse/openmousse/main/docs/connect.md
```

### 2. Confirm Environment and Network Prompts with the Agent

After reading the instructions, the agent runs each step in order and reports progress in your language. Respond to the following prompts when they appear:

1. **Install base dependencies**: The machine needs Python 3.11 or later, `git`, and `curl`. If any are missing and require `sudo apt install` on Linux, the agent asks you first.
2. **Enable the local chat endpoint**:

   - **OpenClaw**: The installer automatically backs up and updates `openclaw.json` with no action needed from you.
   - **Hermes Agent**: When modifying `~/.hermes/.env` and running the install command, Hermes displays an approval prompt (valid for 5 minutes); tap **Allow** when you see it.
   - **nanobot / Letta Code**: The agent enables its corresponding local service port automatically.

3. **Sign in to Tailscale**: If Tailscale is not yet installed or signed in on the machine, the agent asks your permission, installs it, runs `tailscale up`, and sends you the generated sign-in URL. Open that URL in your browser and sign in with your own Tailscale account.

> **Important: Cloud Container Limitations**
> If your agent runs inside a container without `sudo`, a TUN device, or systemd (such as some cloud-hosted containers), the agent falls back to Tailscale userspace networking and starts services as background processes; those processes must be started again if the container restarts. If the container provides no terminal at all (only a settings page for adding MCP connectors), deploy OpenMousse on another machine you control.

### 3. Wait for Non-Interactive Install and Tool Wiring

The agent passes your language, IANA time zone, and assistant name into a non-interactive install (`MOUSSE_NONINTERACTIVE=1`), registers OpenMousse's MCP tools (12 tools total, or 11 if the memory tree is not installed) in its own configuration, and runs `bash ~/openmousse/check.sh` to verify.

- **If you are chatting with Hermes inside a chat window**: Hermes cannot restart its own chat gateway from inside the gateway. Once it finishes installing and sends the pairing link, send `/restart` (or `/reload-mcp`) in the chat window so it can complete the final `check.sh` verification.

### 4. Pair on Your Phone

Once the checks pass, the agent runs the pairing script and sends you a one-time pairing link (`link`):

1. Install the Tailscale app on your phone and sign in to the same account used in Step 2.
2. Install and open the OpenMousse app on your phone, then tap the pairing link from the agent.
3. The app opens the connection screen with the server address and pairing code filled in; verify the address and tap **Connect with code** (the code expires after 10 minutes; if it expires, ask the agent to generate a new one).

## How to Verify

Setup is complete when all of the following hold:

- [ ] Running `bash ~/openmousse/check.sh` on the server shows `✓` for every check.
- [ ] Your agent lists all 12 MCP tools under `openmousse` (`board`, `inbox`, `goals`, `journal`, and others).
- [ ] The OpenMousse phone app is connected via the pairing link, and sending a message in the app returns a reply from your agent.

## Next Steps

- **Connect Your AIs to the Memory Tree**: Connect Claude, ChatGPT, Gemini, and other external apps to the same memory tree.
- **Install Guide for Agents**: View the full command and environment variable reference read directly by external agents.
