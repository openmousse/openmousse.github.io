完整的文档索引见 [llms.txt](https://openmousse.ai/llms.txt)。在网址后加 `.md` 可以拿到 Markdown 版本；本页的 Markdown 版本在 `https://openmousse.ai/docs/api.zh-CN.md`。

# 程序调用接口
通过兼容 OpenAI 的 API 或 ACP 协议将 OpenMousse 作为模型或 agent 直接调用 [即将推出]。

本页介绍如何通过兼容 OpenAI 的 API 或 ACP 协议 [即将推出]，在代码编辑器或外部程序中直接调用 OpenMousse。

除手机 app 与网页端外，OpenMousse 内核 [即将推出] 对外提供标准化的程序调用接口。支持自定义模型接口或 ACP 协议的外部工具（如代码编辑器、命令行脚本或本地工作流）可以直接向你的 OpenMousse 服务器发起请求，在调用模型的同时复用世界树与功能 Agent 的能力。在 `server.json` 中启用 `engine.api`（设为 `true` 或限制可用 `agents` 的对象）后，在服务器上运行 `python3 tokens.py add api`（可调用全部 Agent）或创建名为 `api-<agent id>` 的令牌（仅限单个 Agent），通过请求头 `Authorization: Bearer <token>`（或 `X-API-Key`）认证即可调用 `GET /v1/models`、`GET /v1/models/{id}`、`POST /v1/chat/completions`（兼容 OpenAI 格式，`stream: true` 返回 SSE；`model` 填 `openmousse/<agent id>`，填 `openmousse` 或留空则对应主对话，可通过 `X-Session-Id` 请求头延续会话）、`GET /v1/openmousse/sessions` 与 `POST /v1/openmousse/approvals/{id}`（例如：`curl https://<your-server>/v1/chat/completions -H "Authorization: Bearer $OPENMOUSSE_TOKEN" -H "Content-Type: application/json" -d '{"model": "openmousse/main", "messages": [{"role": "user", "content": "..."}]}'`）。

## 支持的协议

- **兼容 OpenAI 的 API**：提供标准的对话补全接口。你可以将外部工具的 API 基础地址（Base URL）指向你的 OpenMousse 服务器，填入服务器签发的访问令牌，将其作为标准 OpenAI 模型调用。
- **ACP 协议**：支持通过 ACP（Agent Client Protocol，采用一行一条 JSON-RPC 消息的通信格式）供代码编辑器等客户端直接调用 OpenMousse agent，并按内核的发言方权限分档处理请求。

> **注意：调用权限与工具边界**
> 经由程序调用接口发起的请求同样受内核的工具分档与权限规则约束。涉及付款、对外发送、提交或登录等撤不回的操作，仍会生成确认卡放入收件箱，等你批准后才会执行。

## 与世界树 MCP 接口的区别

你可以根据外部工具的类型选择接入方式：

| 接入方式 | 适用场景 | 读写范围与能力 |
| --- | --- | --- |
| **世界树 MCP 接口** | Claude、ChatGPT、Gemini、Notion、Claude Code 等自带模型的外部 AI 应用。 | 外部应用使用其自身的模型回答；仅通过 `profile`、`recall`、`remember`、`recent`、`forget` 五个工具读写世界树，不访问各功能 Agent 与对话记录。 |
| **程序调用接口（OpenAI 兼容 / ACP）** [即将推出] | 代码编辑器、自动化脚本或需要由 OpenMousse 内核驱动的客户端。 | 由 OpenMousse 内核调用你配置的模型并组装上下文，以对应 Agent 的身份运行回合并遵循其工具与确认门控：撤不回的操作仍会在该 Agent 的对话中生成确认卡等待你在 app 内确认；调用方仅可批准或拒绝自身会话中产生的确认卡（若 `engine.api.approve` 设为 `false` 则不可审批）；API 令牌不能配对设备，也不能调用服务端其余 `/api` 接口。 |

## 另见

- **内核（agent harness）**：了解内核的权限回合与工具三档机制。
- **把你常用的 AI 接进世界树**：使用 MCP 地址将外部 AI 应用接入世界树。
