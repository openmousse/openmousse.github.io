The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/standalone-tree.md`.

# Install the Standalone Memory Tree
Run `mousse-tree` on its own to sync memory across external AI apps without deploying the full system.

After completing this guide, your server will run the lightweight standalone memory tree service (`mousse-tree`), providing a shared long-term memory for Claude, ChatGPT, Gemini, Notion, Claude Code, and OpenClaw. This guide is for users who want unified cross-platform memory without deploying the full OpenMousse client and multi-agent system.

## Prerequisites

- A Linux, macOS, or Windows WSL 2 machine with Python 3.11 or later and `git`.
- Public HTTPS access to the machine if you want to connect Claude on the web, ChatGPT, Gemini, or Notion (free Tailscale Funnel is recommended).

## Privacy

- **No model calls or extra model costs**: `mousse-tree` only handles memory storage, full-text search (FTS5 trigram), and MCP endpoint responses. It makes no LLM calls of its own; conversations on each platform continue to use your existing subscriptions.
- **Data stays local**: All memories are stored on your server in `~/.mousse-tree/tree.db` (SQLite) or in a local Markdown folder you specify. Symlinks and hidden files are ignored, and MCP tools cannot access paths outside the notes folder.
- **Auditable forgetting**: Calling `forget` to delete a memory clears the body, moves the empty shell to the archive, and deletes the search index entry, retaining only the bodyless ID and timestamp record. If third-party cloud sync (such as iCloud, Obsidian Sync, or git) is enabled on your notes folder, older versions may still retain the previous content and must be purged in that sync tool.

## Steps

### 1. Install and initialize the background service

Run the following commands in order on your server terminal (replace the name and time zone with your own):

```bash
pipx install "git+https://github.com/openmousse/openmousse#subdirectory=tree"
mousse-tree init --name YourName --tz UTC --lang zh
mousse-tree install-service
```

- For the first line, you can also use `pip install --user "git+https://github.com/openmousse/openmousse#subdirectory=tree"`.
- `install-service` configures a background service that starts on boot (systemd on Linux, launchd on macOS) and listens only on `127.0.0.1:8787` by default.
- If OpenClaw is running on the same machine, run `mousse-tree install-openclaw && systemctl --user restart openclaw-gateway` to add the memory tree export directory to OpenClaw's search path.

### 2. Choose a storage backend (optionally switch to a Markdown vault)

By default, the service stores data in SQLite (`~/.mousse-tree/tree.db`). If you want each memory stored as a separate Markdown note (for example, inside an Obsidian vault so you can view and edit notes on your phone), run the migration command:

```bash
mousse-tree migrate markdown --notes ~/vault/世界树 --profile-note 档案.md
systemctl --user restart mousse-tree
```

- After migration, the note files become the source of truth and SQLite (`index.db`) serves only as the search index. When you create or edit notes directly in your note-taking app, the service syncs the index automatically within 5 seconds.
- Notes replaced by a newer memory (`supersedes`) or moved manually into the `归档/` (`Archive/` in English) subdirectory are excluded from search.
- To switch back to SQLite storage, run `mousse-tree migrate sqlite` and restart the service.

### 3. Expose public paths with Tailscale Funnel

Cloud AI platforms need public HTTPS access to reach the memory tree. Use Tailscale Funnel to expose only the `/t` and `/m` MCP path prefixes:

```bash
tailscale funnel --bg --set-path=/t http://127.0.0.1:8787/t
tailscale funnel --bg --set-path=/m http://127.0.0.1:8787/m
mousse-tree init --host <your-machine>.<tailnet>.ts.net
systemctl --user restart mousse-tree
```

> **Important: Do not expose the admin UI publicly**
> Never expose the `/ui` admin path via Funnel. The admin page (which includes memory browsing, editing, approval of **Needs your approval** items, and profile editing) should only be accessed from localhost, via `tailscale serve` (restricted to devices on your tailnet), or over an SSH tunnel. To hold writes from external platforms in **Needs your approval** first, set `"require_confirm": true` in `~/.mousse-tree/config.json`.

### 4. View endpoint URLs and connect your platforms

Run the following command in your server terminal to print the dedicated endpoint URLs for each platform and the local admin page link:

```bash
mousse-tree urls
```

Copy the URL for each platform and follow the tables in steps 2 and 3 of "Connect Your AIs to the Memory Tree" to enter the URL and custom instructions into Claude, ChatGPT, Gemini, Notion, or Claude Code.

## Verification

The standalone memory tree service is running properly when all of the following are true:

- [ ] Running `mousse-tree stats` outputs current memory statistics without error.
- [ ] Opening the `/ui#key=…` link from `mousse-tree urls` over an SSH tunnel or local network opens the admin page and allows you to edit your profile.
- [ ] After you save a new preference in a connected external AI app, running `mousse-tree recent --days 7` (or checking your Markdown notes directory) shows the new entry.

## Next steps

- **Connect Your AIs to the Memory Tree**: View the exact connector configuration paths and custom instructions for each platform.
- **Memory Tree**: Learn about the design of the memory tree and its five memory sources.
