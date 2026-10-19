The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/maintenance.md`.

# Updates and Troubleshooting
Update your server with the latest code or run `check.sh` to diagnose issues.

This page explains how to update an OpenMousse server (and a standalone memory tree installation) to the latest release, and how to run the self-check script when connections drop or tools fail.

## 1. Update the OpenMousse Server

In the terminal on the server running OpenMousse, re-run the install command:

```bash
curl -fsSL https://openmousse.ai/install | bash
```

The installer pulls the latest code, installs any missing components or dependencies, and restarts the system services.

- **Data preservation**: Your conversation history, memory tree leaves, functional agents' independent memories and boards, and paired device tokens all remain intact; you do not need to re-pair your clients.
- **Standalone memory tree service**: If you only installed `mousse-tree` without deploying the full OpenMousse system, run `pipx upgrade openmousse-tree` (or re-run `pip install --user --upgrade "git+https://github.com/openmousse/openmousse#subdirectory=tree"`) to update the code, then restart the `mousse-tree` service.

## 2. Run the Troubleshooting Self-Check (`check.sh`)

When the mobile app cannot reach the server, the model does not respond, or MCP tool calls fail, run the self-check script in the server terminal:

```bash
bash ~/openmousse/check.sh
```

The script checks ten areas in order and prints `✓` (healthy) or `✗` (failing) before each item along with the command to fix it:

- System, version, and repository;
- OpenMousse service;
- Phone connectivity (Tailscale);
- Your claw;
- Model response check;
- MCP endpoint;
- Memory tree;
- Sharing and friends (relay);
- Nightly settlement and push devices;
- Free disk space.

> **Note: Self-Check Output Contains No Secrets**
> The output of `check.sh` never includes tokens, API keys, or sensitive fields from configuration files (such as `~/.openmousse/server.json`, `openclaw.json`, or `.env`). You can safely copy and paste the terminal output to share with someone helping you troubleshoot or with your external agent.

## 3. Check Memory Tree Notes Directly (`mousse-tree check`)

If you configured the memory tree to store leaves as a folder of Markdown notes (for example, a folder synced with Obsidian) and edited notes in an external editor, run the following command to validate note formatting:

```bash
mousse-tree check
```

- **Inspect malformed front matter**: The command lists any notes whose front matter is malformed. Malformed notes are skipped during search while all other notes continue to work normally; once fixed, they are automatically indexed again.
- **Rebuild the index manually**: In Markdown storage mode, the service detects file changes every 5 seconds and updates the `index.db` search index automatically. To force an immediate full rebuild of the index, run:

```bash
mousse-tree rebuild
```

## 4. Common Situations

- **Does switching models affect memory?** No. Both the memory tree and each functional agent's memory are stored on your server and are independent of the model provider you select.
- **`✗` during Hermes setup**: If a Hermes Agent inside a chat window is installing OpenMousse for you, seeing `✗` next to "Your claw" in `check.sh` before you send `/restart` in the chat to restart the gateway is expected; re-running `check.sh` after the gateway restarts will show `✓`.

## See Also

- **Getting Started**: Review the initial installation and pairing flow.
- **Install OpenMousse via an Existing Agent**: Review the steps for automated installation and troubleshooting through an external agent.
- **Install the Standalone Memory Tree**: Review standalone maintenance commands for `mousse-tree`.
