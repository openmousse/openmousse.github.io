The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/api.md`.

# Programmatic API
Call OpenMousse directly as a model or agent via the OpenAI-compatible API or ACP protocol [Coming soon].

This page explains how to call OpenMousse directly from code editors or external programs via the OpenAI-compatible API or the ACP protocol [Coming soon].

In addition to the mobile app and web app, the OpenMousse engine [Coming soon] exposes standardized programmatic APIs. External tools that support custom model endpoints or the ACP protocol (such as code editors, command-line scripts, or local workflows) can send requests directly to your OpenMousse server, reusing the memory tree and functional agent capabilities alongside model calls. Enable `engine.api` in `server.json` (`true`, or an object limiting `agents`), create a token on the server with `python3 tokens.py add api` (all agents) or a token named `api-<agent id>` (one agent only), and send it as `Authorization: Bearer <token>` (or `X-API-Key`) to call `GET /v1/models`, `GET /v1/models/{id}`, `POST /v1/chat/completions` (OpenAI format, with `stream: true` returning SSE; set `model` to `openmousse/<agent id>`, or `openmousse` / empty for main chat, and pass `X-Session-Id` to continue a session), `GET /v1/openmousse/sessions`, and `POST /v1/openmousse/approvals/{id}` (for example: `curl https://<your-server>/v1/chat/completions -H "Authorization: Bearer $OPENMOUSSE_TOKEN" -H "Content-Type: application/json" -d '{"model": "openmousse/main", "messages": [{"role": "user", "content": "..."}]}'`).

## Supported Protocols

- **OpenAI-compatible API**: Provides a standard chat completions endpoint. Point your external tool's API Base URL to your OpenMousse server and supply an access token issued by the server to call it as a standard OpenAI model.
- **ACP protocol**: Supports ACP (Agent Client Protocol, a communication format using newline-delimited JSON-RPC messages) so clients such as code editors can call an OpenMousse agent directly, with requests governed by the engine's speaker permission tiers.

> **Important: Call permissions and tool boundaries**
> Requests made through the programmatic API are subject to the same engine tool tiers and permission rules. Irreversible operations involving payments, external messages, submissions, or logins still generate an approval card in the inbox and execute only after you approve.

## Comparison with the Memory Tree MCP Endpoint

Choose an integration method based on the type of external tool:

| Integration Method | Use Case | Read/Write Scope and Capabilities |
| --- | --- | --- |
| **Memory tree MCP endpoint** | External AI apps that bring their own models, such as Claude, ChatGPT, Gemini, Notion, and Claude Code. | The external app answers using its own model; it reads and writes the memory tree exclusively through the five tools `profile`, `recall`, `remember`, `recent`, and `forget`, without accessing functional agents or conversation history. |
| **Programmatic API (OpenAI-compatible / ACP)** [Coming soon] | Code editors, automation scripts, or clients that need to be driven by the OpenMousse engine. | The OpenMousse engine calls your configured model, assembles context, and runs turns as the target agent with that agent's own tools and approval gates: irreversible actions still wait for approval in the app attached to that agent's chat; the caller may approve or reject only cards raised in its own sessions (and not at all if `engine.api.approve` is `false`); API tokens cannot pair devices or act on the rest of the server's `/api`. |

## See Also

- **Engine (Agent Harness)**: Learn about the engine's permission turns and three-tier tool mechanism.
- **Connect Your AIs to the Memory Tree**: Connect external AI apps to the memory tree using an MCP URL.
