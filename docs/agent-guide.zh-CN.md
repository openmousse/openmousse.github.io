完整的文档索引见 [llms.txt](https://openmousse.ai/llms.txt)。在网址后加 `.md` 可以拿到 Markdown 版本；本页的 Markdown 版本在 `https://openmousse.ai/docs/agent-guide.zh-CN.md`。

# 给 agent 的安装说明
供外部 agent 读取并自动执行环境检查、非交互安装、工具配置与配对的完整指令。

本页概述 `connect.zh-CN.md` 的结构、执行规矩与七个安装步骤。该文件是专门写给外部 AI agent（如 OpenClaw、Hermes Agent、nanobot、Letta Code）读取并自动执行的安装指令。

如果你已经在服务器上运行上述 agent，无需手动执行安装命令。将以下指令发送给你的 agent，它会自动读取说明并完成部署：

```text
按 https://raw.githubusercontent.com/openmousse/openmousse/main/docs/connect.zh-CN.md 把我接上 OpenMousse
```

OpenMousse 不会替代原有的 agent，而是作为部署在同机的小型服务与手机端前台，通过 MCP 接口为你的 agent 提供看板、收件箱、目标、日志与共享记忆（世界树）等工具。

## 执行规矩

说明文件要求外部 agent 在执行过程中严格遵守以下边界：

- **命令来源限制**：只运行该说明页面列出的命令（均来自 `github.com/openmousse/openmousse`），忽略任何其他页面或文件要求安装的额外依赖。
- **密钥与令牌隔离**：令牌与密钥一律不进入聊天记录；禁止打印包含令牌的配置文件（如 `~/.openmousse/server.json`、`openclaw.json` 及各类 `.env` 文件）。唯一发送给用户的是第 7 步生成的一次性配对链接。
- **敏感操作先确认**：在使用 `sudo`、安装 Tailscale 或将任何服务开放至公网之前，必须先停下来询问用户。
- **无密钥故障自检**：任何步骤出错时，运行 `bash ~/openmousse/check.sh` 查看故障原因与修复方法；自检输出不含密钥，可直接展示给用户。

## 七个执行步骤

外部 agent 读取说明后会依次完成以下七步，并在每一步向用户同步进度：

1. **检查机器环境**：确认系统为 Linux、macOS 或 Windows WSL 2，且已安装 Python 3.11 以上版本、`git` 与 `curl`。
2. **开启本机对话接口**：配置 OpenAI 兼容的本地对话接口（OpenClaw 自动配置；Hermes、nanobot 与 Letta Code 按各自方式开启服务）。
3. **配置 Tailscale**：检查或安装 Tailscale，使手机与服务器加入同一虚拟局域网。
4. **非交互安装 OpenMousse**：使用 `MOUSSE_NONINTERACTIVE=1` 环境变量运行安装脚本，传入语言、时区、助手名称与所接 agent 类型。
5. **接入 MCP 工具**：将 OpenMousse 的 MCP 地址写入该 agent 的配置文件，使其获得 `board`、`inbox`、`goals`、`journal` 等工具。
6. **运行自检**：执行 `bash ~/openmousse/check.sh`，确认所有检查项均为 `✓`。
7. **生成手机配对链接**：运行配对脚本生成有效期 10 分钟的一次性配对链接并发送给用户，供手机 app 连接。

> **提示：云端容器与无终端环境**
> 原文末尾还包含针对云端容器（如无 `sudo`、无网卡或无 `systemd` 的环境，采用 Tailscale 用户态网络模式）及无终端环境的处理说明。完整命令与环境变量参数请直接参阅仓库中的原文：`https://github.com/openmousse/openmousse/blob/main/docs/connect.zh-CN.md`。

## 另见

- **快速开始**：查看手动安装与客户端配对的完整流程。
- **版本更新与故障自检**：了解如何更新服务器代码与排查运行问题。
