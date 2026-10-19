The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/quickstart.md`.

# Getting Started
Deploy OpenMousse, pair your phone or web client, import memory, and run your first request.

This page walks you through installing the server from scratch (or connecting through an existing agent), pairing a client, importing existing memories, and sending your first request.

> **Note: Jump to a Task-Specific Guide**
> If you only want to connect Claude, ChatGPT, Gemini, or other external AIs to the memory tree, or only want to run the standalone memory tree service, go directly to **Connect Your AIs to the Memory Tree** or **Install the Standalone Memory Tree**. To join the waitlist for a hosted server, leave your email on the home page.

## System Requirements

- **Server**: An always-on Linux, macOS, or Windows WSL 2 machine.
- **Base dependencies**: Python 3.11 or later, `git`, and `curl`.
- **Network**: The server and your phone on the same Tailscale tailnet, or a public HTTPS URL on the server.
- **Client**: iPhone (installed via TestFlight invitation), Android (APK installer), the web app, and desktop clients [Coming soon].

## 1. Install OpenMousse

You can run the install command directly on your own server, or send a one-line prompt to a running external agent and let it complete the installation.

### Option A: Install on Your Own Server

Run the following command in your server terminal:

```bash
curl -fsSL https://openmousse.ai/install | bash
```

Follow the terminal prompts to set your language, time zone, assistant name, and runtime (selecting your model directly [Coming soon]). When installation finishes, the terminal displays a client pairing code. Next, join the server to Tailscale or configure public HTTPS so your phone can reach it.

### Option B: Have an Existing Agent Install It

If you already run OpenClaw or Hermes, copy and send the following prompt to it:

```text
Connect me to OpenMousse following https://raw.githubusercontent.com/openmousse/openmousse/main/docs/connect.md
```

The agent checks the machine environment, enables the local chat endpoint, configures Tailscale, runs a non-interactive OpenMousse install, wires tools such as `board`, `inbox`, `goals`, and `journal` into itself, and runs `bash ~/openmousse/check.sh` to self-check; it pauses for your confirmation before using `sudo`, installing Tailscale, or exposing anything to the public internet. When finished, it sends you a one-time pairing link valid for 10 minutes.

## 2. Pair Your Client

- **With a pairing code (Option A)**: Open the OpenMousse app on your phone or open the web app, and enter the pairing code shown in the terminal to connect.
- **With a one-time pairing link (Option B)**: Make sure your phone has Tailscale installed (signed in to the same account as the server) along with the OpenMousse app. Tap the pairing link on your phone; the app opens the connection screen with the server address and pairing code filled in. Verify the address and tap **Connect with code**. You can also paste the link or the 8-character pairing code into the connection screen manually.

## 3. Set Up Memory and Connect Health Data

1. **Import existing memories**: Paste what external AIs such as ChatGPT, Claude, or Gemini remember about you into **Main chat** so main chat can write it into the memory tree; or open **Settings → Memory tree → Connect your AI** in the app to generate dedicated URLs that connect those AIs directly to the memory tree.
2. **Connect health data**: On iPhone, connect Apple Health (Android Health Connect [Coming soon]) so the Sleep agent and Fitness agent can read sleep, heart rate, and workout data.

> **Note: Default Boundaries**
> Data travels between your phone and your server; on each turn of a conversation, what goes to your chosen model provider is that turn's message and the content needed to answer. External AI apps that you manually authorize to access the memory tree can only read and write the memory tree; they cannot read your conversation history, health data, or the independent memories of your functional agents.

## 4. Send Your First Request

Open **Main chat** and try any of the following requests:

- **Write and recall memory**: "Remember that I'm allergic to peanuts and only drink black coffee in the morning."
- **Create a functional agent**: "Create a Research agent for me that organizes industry reports and meeting notes." (Main chat generates a proposal card and creates the agent once you confirm.)
- **Call multiple agents into a short meeting** (try this after creating the Sleep, Fitness, and Diet agents): "I'm traveling for work for two days this weekend—how should my sleep, workouts, and meals adjust?" (Main chat calls the relevant agents into a discussion and produces a meeting minutes card; action items are written to **Schedule** and each agent's board only after you confirm.)
- **Hand off an errand**: "Compare high-speed rail and flight options to my destination for next Wednesday and list the candidates." (Search and price comparison run inside the sandbox; if anything involves submitting a form or paying, it stops and places an approval card in the inbox.)

## 5. Next Steps

- **Connect Your AIs to the Memory Tree**: Configure memory tree MCP URLs for Claude, ChatGPT, Gemini, Notion, and Claude Code.
- **Memory Tree**: Learn about leaves, provenance tracking, and SQLite versus Markdown vault storage.
- **Agents**: Understand how main chat, functional agents, meeting minutes, Cybers, and the Butler divide work.
- **Approvals (Inbox)**: Learn how tool tiers, parameter locking, and approval cards work.

> **Note: Updates and Self-Checks**
> To update your server, re-run `curl -fsSL https://openmousse.ai/install | bash` to pull the latest code, install any missing components, and restart services while keeping all existing data intact. If something is not working, run `bash ~/openmousse/check.sh` on the server; the terminal shows `✓` or `✗` for each check along with the fix command, and the output never contains tokens or keys.
