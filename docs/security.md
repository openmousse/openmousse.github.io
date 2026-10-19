The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/security.md`.

# Data and Security
Review data storage locations, requests that leave your server or originate from the client by design, and isolation boundaries for external apps.

Data isolation, tiered tool permissions, and Doorman outbound governance are enabled by default on your OpenMousse server with no extra configuration required; you can also run `bash ~/openmousse/check.sh` on your server at any time to check the status of each service.

OpenMousse is designed to keep data on a server that belongs solely to you, and to strictly limit the permissions of every outbound request and piece of incoming external information. OpenMousse serves no ads, sells no data, and never trains models on your data; all core code is open source under the AGPL-3.0 license.

## Where Data Is Stored

Your conversation history and attachments, memory tree (SQLite database or Markdown vault), Zen notes, Apple Health daily summaries, and the independent memories and board data of each functional agent are all stored on a server that belongs solely to you (either your own machine or a dedicated cloud server hosted by OpenMousse).

- **Access permissions**: The data above can be read only by your paired client devices and by the agents on your server according to their respective permissions.
- **Isolation of external AI apps**: External AI apps (Claude, ChatGPT, Gemini, Notion, Claude Code) that you manually authorize to connect to the memory tree via MCP can only read and write the memory tree; they cannot read your conversation history, health data, or the independent memories of your functional agents.
- **Hosted server access policy**: If you use a dedicated cloud server hosted by OpenMousse, operations staff log in to your server only when you explicitly authorize access for troubleshooting, and every action leaves an audit log you can inspect at any time.

## What Data Leaves Your Server

Data that leaves your server (or is sent from the client) by design includes:

| Destination Service | Scope of Data Sent | Boundaries and Notes |
| --- | --- | --- |
| **Model providers** | Each turn's message and the memories needed to answer | Sent to the model providers you configured in OpenClaw (such as Anthropic, OpenAI, or Google, including fallback models) using your own accounts; all other memory tree leaves, past conversations, and local files remain on your server, and thoughts in Zen where you have not tapped **Discuss** are never sent to a model. |
| **Push notifications (Expo, Apple)** | Short notification title and preview | Sent via the Expo Push Service and Apple Push Notification service; notifications for conversation replies contain the conversation name and the first 140 characters of the reply. |
| **Voice transcription** | Audio from voice messages and in-person podcast recordings | Processed by the transcription service configured on your server: OpenAI by default, or replaceable with your own Whisper-compatible service; podcast recordings also go through your chosen transcription service, and the resulting transcript and minutes are saved on the initiator's own server and app. |
| **AI apps connected to the memory tree (optional)** | Memory tree reads and writes | If you connect apps such as Claude.ai, ChatGPT, Gemini, or Notion to the memory tree, those services read and write the memory tree through the URL you configured. |
| **Connectors (optional)** | Read and write requests to the connected app | After you connect an app such as Notion in **Settings → Connector**, its login token is stored on your server, and your claw reads and writes that app through your server. |
| **Nutrition lookup (Open Food Facts, USDA FoodData Central)** | Food name or barcode | When logging meals, if a food item is not in your own food database, the server queries the services above; the request contains only the food name or barcode and none of your personal information, and query results are cached on your server. |
| **Share links and friend messages (optional)** | Snapshot of shared content, direct messages, share cards, or Butler replies approved by Doorman | A share link shows anyone holding the link a snapshot of the selected content (private details such as home addresses and family members' names are masked as gray bars). Friends' servers exchange signed, end-to-end encrypted messages directly; when neither side has a public address, messages are forwarded through the OpenMousse relay (`relay.openmousse.ai`, running on Cloudflare), which sees only the recipient server address, payload size, and timestamp, cannot read the content, and stores nothing (Cloudflare may retain standard access logs such as IP addresses). |
| **Websites visited by Errands (via Doorman)** | Web browsing, price comparison, and form requests | The Errands agent runs in an isolated sandbox; Doorman replaces password placeholders with real passwords only at the moment a request leaves the server, and sends them only to the bound target website; submissions, logins, and payments all require your prior approval. |
| **TestFlight account (Supabase EU region, Resend)** | Email address, optional display name, and list of connected claws | Only the TestFlight build requires email verification code login (verification emails are sent by Resend, and accounts are stored in Supabase's Ireland region, which retains standard logs such as login time and IP address). Recorded claw info contains only the assistant name, server URL, claw type and name, and last online time; tokens, conversations, memories, health data, and connector credentials are never stored. The web app and self-built versions have no account system. |
| **App update checks (Expo)** | App and OS version info | The app queries the Expo Updates service for new code bundles; requests contain only version information and none of your content. |

## Speaker Permissions and Isolation of External Information

The system engine strictly divides interactions into three turn types based on the speaker and enforces three-tier governance over tools [Coming soon]:

- **Messages from you**: Can invoke all tools (read-only operations run immediately; reversible operations run immediately and attach a change ID so you can reply **Undo** to revert; irreversible operations generate a parameter-locked approval card and execute once with the original parameters after you approve).
- **Your Cybers** [Coming soon]: Engage in conversation only and do not access data directly; querying or modifying data must be handed off to the functional agents mounted on the Cyber.
- **Messages from a friend's agent or a stranger**: Cannot invoke any tools. Strangers are ignored by default; messages from a friend's agent are treated strictly as reference material and processed by a model call that cannot use any tools; external web content is read only by the Errands agent inside its sandbox.
- **Agent-authored pages** [Coming soon]: Run in an isolated environment, cannot read login credentials or other system data, and cannot send data anywhere. Opening a page for the first time lists the data items it needs to read and grants read-only access only after you agree; if the page content is updated, you must confirm again.

## What Is Not Here

- **No silent background uploads**: The app contains no analytics or tracking SDKs; your conversations, memories, and health summaries all live on your own server.
- **No secrets in diagnostic output**: When you run `bash ~/openmousse/check.sh` to troubleshoot, the terminal output contains no tokens, passwords, or API keys, so you can copy and share it directly when asking for help.

## See Also

- **Approvals (Inbox)**: Learn how the three tool tiers and approval card workflow operate.
- **Errands and Doorman**: Learn how the Errands sandbox and password placeholders work.
- **Engine (Agent Harness)** [Coming soon]: Learn the architectural details of the three speaker turn types.
- **Privacy Policy**: Review the full terms regarding third-party model providers, transcription services, and hosted servers.
