完整的文档索引见 [llms.txt](https://openmousse.ai/llms.txt)。在网址后加 `.md` 可以拿到 Markdown 版本；本页的 Markdown 版本在 `https://openmousse.ai/docs/agent-install.zh-CN.md`。

# 让正在运行的 agent 安装 OpenMousse
将安装指令发给正在使用的 OpenClaw 或 Hermes，由它完成环境检查、安装、工具接入与配对。

完成本指南后，你正在运行的外部 agent（OpenClaw、Hermes Agent、nanobot、Letta Code，或 KimiClaw 等云端托管实例）将在其所在机器上安装 OpenMousse 服务器，把 `board`、`inbox`、`goals`、`journal` 等工具接入自身，并向你发送一条一次性手机配对链接。本指南假设你已有一台正在运行上述任一 agent 的机器。

## 前提条件

- 你正在使用 OpenClaw、Hermes Agent、nanobot 或 Letta Code，且它所在的机器为 Linux、macOS 或 Windows WSL 2。
- 手机可安装 Tailscale app 与 OpenMousse app，并能与该机器登录同一个 Tailscale 账号（若为无终端的纯云端连接器环境，见文末说明）。

## 隐私说明

- **不替代原有 agent**：OpenMousse 作为装在原有 agent 旁边的本地服务与手机前台运行，经由本机 OpenAI 兼容接口将你的话转交给它，并通过 MCP 为它提供看板、收件箱与世界树工具。
- **密钥不进聊天**：安装过程中产生的服务器令牌与 API 密钥仅保存在机器本地文件中（如 `~/.openmousse/server.json`、`openclaw.json`、`.env`）。agent 发给你的只有第 4 步的一次性配对链接（10 分钟内有效）。
- **关键操作先问你**：在需要使用 `sudo` 安装系统依赖、安装 Tailscale 或将任何路径开放至公网之前，agent 会先停下来征得你的同意。

## 步骤

### 1. 发送安装指令

将以下句子复制并发送给你正在使用的 agent：

```text
按 https://raw.githubusercontent.com/openmousse/openmousse/main/docs/connect.zh-CN.md 把我接上 OpenMousse
```

### 2. 配合 agent 完成环境与网络确认

agent 读取说明后会按顺序执行操作，并用你的语言告知当前进度。遇到以下环节时，请按提示配合：

1. **安装基础依赖**：机器需具备 Python 3.11 以上版本、`git` 与 `curl`。若缺失且在 Linux 上需要 `sudo apt install`，agent 会先询问你。
2. **开启本机对话接口**：

   - **OpenClaw**：安装器会自动备份并修改 `openclaw.json`，无需你操作。
   - **Hermes Agent**：修改 `~/.hermes/.env` 与执行安装命令时，Hermes 会弹出批准请求（5 分钟内有效），看到后请点击「允许」。
   - **nanobot / Letta Code**：agent 会自行启用对应的本地服务端口。

3. **登录 Tailscale**：若机器尚未安装或登录 Tailscale，agent 会在征得你同意后安装并运行 `tailscale up`，随即将生成的登录链接发给你。请在浏览器中打开该链接，登录你自己的 Tailscale 账号。

> **注意：云端容器环境的限制**
> 若你的 agent 运行在无 `sudo`、无虚拟网卡且无 systemd 的容器（如部分云端托管容器）中，agent 会改用 Tailscale 用户态网络模式与后台进程启动服务；容器重启后需重新拉起进程。若容器完全不提供终端（仅提供添加 MCP 连接器的设置页），则需在你的另一台机器上部署 OpenMousse。

### 3. 等待非交互安装与工具接入

agent 会自动传入你的语言、IANA 时区与助手名称，执行非交互安装（`MOUSSE_NONINTERACTIVE=1`），将 OpenMousse 的 MCP 工具（共 12 个，未装世界树时为 11 个）注册到自己的配置中，并运行 `bash ~/openmousse/check.sh` 自检。

- **如果你在聊天窗口中使用 Hermes**：agent 自身无法在聊天网关内重启网关。当它完成安装并发出配对链接后，请你在聊天窗口中发送 `/restart`（或 `/reload-mcp`），让它完成最后一次 `check.sh` 核对。

### 4. 在手机上完成配对

安装通过后，agent 会运行配对脚本并将一条一次性配对链接（`link`）发给你：

1. 在手机上安装 Tailscale app，登录与第 2 步相同的账号。
2. 在手机上安装并打开 OpenMousse app，点击 agent 发来的配对链接。
3. app 会打开连接页并自动填入服务器地址与配对码；核对地址无误后，点击「使用配对码连接」（配对码 10 分钟后过期，过期可让 agent 重新生成）。

## 成功的标志

当以下各项均成立时，说明接入已完成：

- [ ] 服务器上运行 `bash ~/openmousse/check.sh` 时，所有检查项均显示 `✓`。
- [ ] 你的 agent 能够列出 `openmousse` 下的 12 个 MCP 工具（`board`、`inbox`、`goals`、`journal` 等）。
- [ ] 手机 OpenMousse app 已通过配对链接连上服务器，在 app 内发送消息可收到该 agent 的回复。

## 下一步

- **把你常用的 AI 接进世界树**：将 Claude、ChatGPT、Gemini 等外部应用也接入同一棵世界树。
- **给 agent 的安装说明**：查看供外部 agent 直接读取的完整命令与环境变量参考。
