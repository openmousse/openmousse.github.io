完整的文档索引见 [llms.txt](https://openmousse.ai/llms.txt)。在网址后加 `.md` 可以拿到 Markdown 版本；本页的 Markdown 版本在 `https://openmousse.ai/docs/maintenance.zh-CN.md`。

# 版本更新与故障自检
拉取最新代码更新服务器，或运行 `check.sh` 排查运行故障。

本页说明如何将 OpenMousse 服务器（及单独安装的世界树服务）更新至最新版本，以及在连接中断或工具异常时如何使用自检脚本排查故障。

## 1. 更新 OpenMousse 服务器

在运行 OpenMousse 的服务器终端中，重新执行安装命令：

```bash
curl -fsSL https://openmousse.ai/install | bash
```

安装程序会自动拉取最新代码、补齐缺失的组件与依赖，并重启系统服务。

- **数据保留**：你的对话记录、世界树记忆、各功能 Agent 的独立记忆与看板数据、已配对设备的令牌均保持不变，无需重新配对客户端。
- **单独安装的世界树服务**：如果你仅安装了 `mousse-tree` 而未部署完整的 OpenMousse，请使用 `pipx upgrade openmousse-tree`（或重新运行 `pip install --user --upgrade "git+https://github.com/openmousse/openmousse#subdirectory=tree"`）更新代码，随后重启 `mousse-tree` 服务。

## 2. 运行故障自检（`check.sh`）

当手机 app 无法连接服务器、模型未响应或 MCP 工具调用失败时，在服务器终端运行自检脚本：

```bash
bash ~/openmousse/check.sh
```

脚本会逐项检查以下十个部分，并在每一项前显示 `✓`（正常）或 `✗`（异常）以及对应的修复命令：

- 系统、版本和仓库；
- OpenMousse 服务；
- 手机怎么连（Tailscale）；
- 你的 claw；
- 模型能不能回话；
- MCP 入口；
- 世界树；
- 分享和好友（中继）；
- 每晚日结和推送设备；
- 磁盘剩余。

> **提示：自检输出不含密钥**
> `check.sh` 的输出不会包含任何令牌、API 密钥或配置文件中的敏感字段（如 `~/.openmousse/server.json`、`openclaw.json` 或 `.env` 的内容）。你可以直接复制终端输出，交由协助排查的人员或你正在使用的外部 agent 查看。

## 3. 单独检查世界树笔记（`mousse-tree check`）

如果你将世界树配置为 Markdown 笔记文件夹存储（例如与 Obsidian 同步的目录），并在外部编辑器中手动修改过笔记，可以运行以下命令检查笔记格式：

```bash
mousse-tree check
```

- **检查损坏的属性**：命令会列出属性（front matter）格式有误的笔记。格式损坏的笔记会被检索跳过，其余笔记照常工作；修复后服务会自动重新收录。
- **手动重建索引**：在 Markdown 存储模式下，服务每 5 秒自动检测文件变更并更新 `index.db` 检索索引。如需立即全量重建索引，可运行：

```bash
mousse-tree rebuild
```

## 4. 常见情况说明

- **更换模型是否影响记忆**：不会。世界树与各功能 Agent 的记忆均保存在你的服务器上，与所选模型服务无关。
- **Hermes 接入过程中的 `✗` 提示**：如果你正由聊天窗口内的 Hermes Agent 自动安装 OpenMousse，在你在聊天中发送 `/restart` 重启网关之前，`check.sh` 中「你的 claw」一项显示 `✗` 属于正常现象；重启网关后再次运行 `check.sh` 即会变为 `✓`。

## 另见

- **快速开始**：查看初次安装与配对流程。
- **让正在运行的 agent 安装 OpenMousse**：查看外部 agent 自动安装与排查的步骤。
- **仅安装世界树服务**：查看 `mousse-tree` 的独立维护命令。
