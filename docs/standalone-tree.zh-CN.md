完整的文档索引见 [llms.txt](https://openmousse.ai/llms.txt)。在网址后加 `.md` 可以拿到 Markdown 版本；本页的 Markdown 版本在 `https://openmousse.ai/docs/standalone-tree.zh-CN.md`。

# 仅安装世界树服务
不部署完整的 OpenMousse，单独运行 `mousse-tree` 为外部 AI 应用同步记忆。

完成本指南后，你的服务器上将单独运行轻量级的世界树服务（`mousse-tree`），为 Claude、ChatGPT、Gemini、Notion、Claude Code 及 OpenClaw 提供共用的长期记忆。本指南适用于不需要部署完整 OpenMousse 客户端与多 Agent 系统、仅需跨平台统一记忆的用户。

## 前提条件

- 一台具备 Python 3.11 以上版本与 `git` 的 Linux、macOS 或 Windows WSL 2 机器。
- 若需接入 Claude 网页版、ChatGPT、Gemini 或 Notion，机器需具备公网 HTTPS 访问能力（推荐使用免费的 Tailscale Funnel）。

## 隐私说明

- **不调用模型、不产生额外模型费用**：`mousse-tree` 仅负责记忆的存储、全文检索（FTS5 trigram）与 MCP 接口响应，本身不发起任何 LLM 调用；各平台的对话仍使用你原有的订阅。
- **数据留在本地**：所有记忆保存在你服务器的 `~/.mousse-tree/tree.db`（SQLite）或你指定的本地 Markdown 文件夹中。软链接与隐藏文件不会被收录，MCP 工具无法访问笔记文件夹以外的路径。
- **可审计的遗忘机制**：调用 `forget` 删除记忆时，系统会清空正文、将空壳移入归档并删除检索索引，仅保留不含正文的 ID 与操作时间记录；若笔记文件夹开启了第三方云同步（如 iCloud、Obsidian Sync 或 git），其历史版本中可能仍留存旧内容，需在对应同步工具中清理。

## 步骤

### 1. 安装并初始化常驻服务

在服务器终端依次运行以下命令（将称呼与时区替换为你的实际信息）：

```bash
pipx install "git+https://github.com/openmousse/openmousse#subdirectory=tree"
mousse-tree init --name 你的称呼 --tz UTC --lang zh
mousse-tree install-service
```

- 第一行也可使用 `pip install --user "git+https://github.com/openmousse/openmousse#subdirectory=tree"`。
- `install-service` 会配置开机常驻服务（Linux 使用 systemd，macOS 使用 launchd），默认仅监听本机 `127.0.0.1:8787`。
- 若本机同时运行 OpenClaw，可运行 `mousse-tree install-openclaw && systemctl --user restart openclaw-gateway`，将世界树导出目录加入 OpenClaw 的检索路径。

### 2. 选择存储方式（可选切换为 Markdown 笔记库）

服务默认使用 SQLite 存储（`~/.mousse-tree/tree.db`）。如果你希望将每条记忆存为一篇独立的 Markdown 笔记（例如放入 Obsidian 笔记库以便在手机上查看和编辑），可运行迁移命令：

```bash
mousse-tree migrate markdown --notes ~/vault/世界树 --profile-note 档案.md
systemctl --user restart mousse-tree
```

- 迁移后，笔记文件成为数据源，SQLite（`index.db`）仅作为检索索引；你在笔记软件中直接新建或修改笔记后，服务会在 5 秒内自动同步索引。
- 被新记忆取代（`supersedes`）或你手动移入 `归档/`（英文为 `Archive/`）子目录的笔记不再参与检索。
- 如需切回 SQLite 存储，运行 `mousse-tree migrate sqlite` 并重启服务即可。

### 3. 使用 Tailscale Funnel 开放公网路径

云端 AI 平台需要通过公网 HTTPS 访问世界树。使用 Tailscale Funnel 仅对外暴露 `/t` 与 `/m` 两个 MCP 路径前缀：

```bash
tailscale funnel --bg --set-path=/t http://127.0.0.1:8787/t
tailscale funnel --bg --set-path=/m http://127.0.0.1:8787/m
mousse-tree init --host <你的机器名>.<tailnet>.ts.net
systemctl --user restart mousse-tree
```

> **注意：请勿公开管理页**
> 切勿使用 Funnel 暴露 `/ui` 管理页路径。管理页（含记忆浏览、修改、待确认审批与档案编辑）应仅通过本机、`tailscale serve`（仅限局域网内设备）或 SSH 隧道访问。如需让外部平台写入的内容先进入「待确认」，可在 `~/.mousse-tree/config.json` 中设置 `"require_confirm": true`。

### 4. 查看接入地址并连接各平台

在服务器终端运行以下命令，打印各平台的专属接入地址与本地管理页链接：

```bash
mousse-tree urls
```

复制对应平台的地址，按照指南「把你常用的 AI 接进世界树」第 2、3 步的表格说明，将地址与自定义指令填入 Claude、ChatGPT、Gemini、Notion 或 Claude Code 中。

## 成功的标志

当以下各项均成立时，说明独立世界树服务已正常运行：

- [ ] 运行 `mousse-tree stats` 可正常输出当前记忆统计信息。
- [ ] 通过 SSH 隧道或局域网打开 `mousse-tree urls` 给出的 `/ui#key=…` 链接，可正常打开管理页并编辑个人档案。
- [ ] 在已接入的外部 AI 应用中写入一条新偏好后，运行 `mousse-tree recent --days 7`（或在 Markdown 笔记目录中）可以看到该条记录。

## 下一步

- **把你常用的 AI 接进世界树**：查看各平台连接器的具体配置路径与自定义指令原文。
- **世界树**：了解世界树的设计细节与五类记忆来源。
