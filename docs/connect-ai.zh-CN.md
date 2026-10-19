完整的文档索引见 [llms.txt](https://openmousse.ai/llms.txt)。在网址后加 `.md` 可以拿到 Markdown 版本；本页的 Markdown 版本在 `https://openmousse.ai/docs/connect-ai.zh-CN.md`。

# 把你常用的 AI 接进世界树
将 Claude、ChatGPT、Gemini、Notion 与 Claude Code 接入世界树共用同一份长期记忆。

完成本指南后，你常用的外部 AI 应用将通过专属的 MCP 地址连接你的世界树：在每次对话开始前先读取你的背景与偏好，并在你说出关于自己的新事实、偏好、决定或近况时写回世界树。本指南假设你已部署 OpenMousse（或已单独安装 `mousse-tree` 服务）。

## 前提条件

- 已运行 OpenMousse 服务器并完成 app 配对；或者已在拥有 Python 3.11 以上版本的服务器上单独安装了 `mousse-tree` 服务（见文末补充说明）。
- 若要接入云端 AI 应用（Claude 网页版、ChatGPT、Gemini、Notion），你的世界树服务必须具备可访问的公网 HTTPS 地址（仅本机使用的命令行工具如 Claude Code 可使用局域网或 Tailscale 地址）。
- 部分平台有订阅或版本要求：ChatGPT 需 Plus 及以上订阅；Notion 需 Business 及以上版本；Gemini 的连接器功能受服务商的可用地区限制，需在支持该功能的地区使用。

## 隐私说明

- **写入与读取的内容**：世界树接收的是你在这些 AI 应用中谈及的关于你的事实、偏好、决定与观点；各平台原有的对话记录仍留在原处。
- **数据隔离边界**：授权接入的外部 AI 应用仅能读写世界树，无法读取 OpenMousse 内的对话记录、健康数据及各功能 Agent 的独立记忆。
- **来源识别与随时撤销**：每个平台使用一条带专属令牌的独立地址，服务端凭令牌识别每片叶子的写入来源。你可以在 OpenMousse app 内随时删除任意平台的地址；删除后，世界树服务重启即断开该平台的连接（若世界树以系统服务运行，app 会自动重启它；否则需手动重启服务）。

## 步骤

### 1. 在 app 中获取专属接入地址

1. 在 OpenMousse app 中打开「设置 → 世界树 → 连接你的 AI」。
2. 选择你要接入的目标平台，生成并复制该平台带专属令牌的独立地址。

> **注意：公网 HTTPS 与管理页隔离**
> Claude（网页版）、ChatGPT、Gemini 与 Notion 均从各自的云端发起连接，因此你的世界树服务必须配置公网 HTTPS。若你使用反向代理对外开放单独安装的 `mousse-tree`，建议仅对外开放 `/t` 与 `/m` 两个路径前缀；请勿将管理页开放至公网。

### 2. 在目标平台配置 MCP 连接

按你所使用的平台，完成对应的连接配置：

| 平台 | 配置路径与操作步骤 |
| --- | --- |
| **Claude** | 1. 在 `claude.ai` 打开「设置 → 连接器（Connectors）→ 添加自定义连接器」。<br>2. 名称填写「世界树」，粘贴 app 中对应的专属地址，认证方式留空。 |
| **ChatGPT** | 1. 在 ChatGPT（需 Plus 及以上订阅）打开「设置 → Apps & Connectors → 高级」，开启 Developer mode。<br>2. 点击「创建」，粘贴 app 中对应的专属地址，认证方式选择 `None`。 |
| **Gemini** | 在 `gemini.google.com` 打开「设置 → Connected Apps → 添加自定义 app」，粘贴 app 中对应的专属地址（需在服务商支持该功能的地区使用）。 |
| **Notion** | 1. 在 Notion（需 Business 及以上版本）打开「Custom Agent → Tools & Access → Custom MCP server」。<br>2. 填入服务地址，认证方式选择 `Bearer token`，并将 app 给出的令牌填入对应栏位。 |
| **Claude Code** | 在终端运行以下命令，将 `<地址>` 替换为 app 中给出的专属地址：<br>`claude mcp add --transport http tree <地址>` |
| **其他支持 MCP 的 AI** | 在目标应用的 MCP、连接器或工具设置中，添加远程 MCP 服务（Streamable HTTP），粘贴 app 中对应的专属地址，无需配置认证。若其网页版暂不支持远程 MCP，可使用其命令行工具或任意支持 MCP 的客户端。 |

### 3. 粘贴自定义指令并关闭自带记忆

将以下指令复制到已接入应用的自定义指令中（Notion 写入该 Custom Agent 的 Instructions 中；Claude Code 写入项目的 `CLAUDE.md` 或全局 `CLAUDE.md` 中）：

```text
对话开始先调 profile 和 recall 了解我；我说出关于自己的新事实、偏好、决定、近况时调 remember。
```

随后，在该应用的设置中**关闭其自带的记忆功能**，避免两边记录不一致。

### 附：如果你只想单独安装世界树

如果你不需要部署完整的 OpenMousse，可以在拥有 Python 3.11 以上版本的服务器上单独运行世界树服务：

```bash
pipx install "git+https://github.com/openmousse/openmousse#subdirectory=tree"
mousse-tree init --name 你的称呼 --tz UTC
mousse-tree install-service
```

- 第一行也可替换为 `pip install --user "git+https://github.com/openmousse/openmousse#subdirectory=tree"`。
- 将 `--tz` 参数替换为你的实际时区。
- 服务默认仅监听本机 `127.0.0.1:8787`。运行 `mousse-tree urls` 可在终端查看各平台的含令牌地址（请仅在自己的终端内查看）。

## 成功的标志

当以下各项均成立时，说明接入已生效：

- [ ] 在外部 AI 应用中开启新对话时，它会调用 `profile` 与 `recall` 工具读取世界树。
- [ ] 在该应用中告诉它一条关于你的新偏好或近况，它会调用 `remember` 工具写入。
- [ ] 打开 OpenMousse app 的世界树，可以看到刚才写入的那片新叶子，且出处标明了该外部应用与当天日期。
- [ ] 该外部应用自带的记忆功能已关闭。

## 下一步

- **世界树**：了解叶子的存储格式、SQLite 与 Markdown 笔记库的切换方式（`mousse-tree migrate`）。
- **数据与安全**：查看外部应用的隔离机制与服务器数据存储位置。
