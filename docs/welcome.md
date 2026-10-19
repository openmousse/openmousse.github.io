The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/welcome.md`.

# Welcome to OpenMousse
Learn about OpenMousse's core components, data ownership model, and operating boundaries.

![Meeting minutes in main chat and Today on a phone](https://openmousse.ai/docs/assets/welcome.png)

OpenMousse is an open-source personal AI agent system (AGPL-3.0). Your conversations, daily data, study and work materials, and discussions with friends stay on a server that belongs to you. Facts, preferences, decisions, and distilled opinions from those interactions settle into long-term memory (the memory tree). Built on that foundation, functional agents handle scheduling, reminders, and errands around the way you already work.

The system runs on your own server or on a dedicated cloud server hosted by OpenMousse (opening soon; join the waitlist on the home page). Clients are available for iPhone (via TestFlight invitation), Android (APK installer), and the web app; desktop clients (a web workspace and a Mac app) are coming soon.

## What You Get

- **An inspectable, editable memory tree.** Every fact, preference, decision, and opinion about you is stored as a provenance-tracked leaf recording which conversation and which day it came from. You can view, edit, or delete any leaf at any time, or store leaves as Markdown notes in your own vault.
- **Long-term memory shared across AI apps.** Claude, ChatGPT, Gemini, Notion, and Claude Code connect to the memory tree through dedicated URLs, retrieving your background before answering and writing new information back to the memory tree instead of keeping separate copies.
- **Functional agents with clear boundaries and short meetings.** Main chat is the single entry point that routes tasks to functional agents such as Fitness, Diet, Sleep, Errands, and Study & Work, or calls them into a short meeting and produces minutes; each functional agent has its own memory, tools, and board (supporting table, kanban, calendar, timeline, and chart views).
- **Zen for setting thoughts down first.** Articles you just read or fleeting thoughts go into Zen as notes without sending—no AI steps in; when you are ready, pick related items to **Discuss** together, tap **Done** to organize them, and **Save to the vault** while distilled opinions are written to the memory tree.
- **Approval before irreversible actions.** Payments, outbound messages, submissions, and logins always pause and generate a parameter-locked approval card in the inbox and under **To do** in **Today**, executing only after you approve.
- **An isolated Errands sandbox and Doorman.** The Errands agent opens web pages, compares prices, fills forms, and books inside an isolated sandbox; Doorman holds your passwords and gives Errands only placeholders, swapping in the real values only at the moment a request leaves the server for its bound domain.
- **Bounded friend interactions and the Butler.** Friend messages are signed and end-to-end encrypted; shared discussions have private details redacted item by item first; the Butler answers availability and status questions across three relationship tiers (close, friend, acquaintance), cannot see the memory tree or health data, and turns anything involving time, money, or commitments into an approval card for you to decide.
- **Cybers for long-term thinking** [Coming soon]**.** Each Cyber has its own personality, memory, and model to assist your thinking in a specific direction over the long term; a Cyber never accesses your data directly and delegates any data lookup or change to the functional agents mounted on it.

> **Note: OpenMousse's Boundaries and Commitments**
> OpenMousse never sends external messages, makes payments, or commits your time without your confirmation. OpenMousse serves no ads, sells no data, and never trains models on your data. On each turn of a conversation, only that turn's message and the memories needed to answer are sent to your chosen model provider (including any fallback model); all other memories and files remain on your server.

## Developers and Architecture

OpenMousse uses an in-house Python engine (agent harness) [Coming soon] to manage model calls, context, and tiered tool permissions. To learn about speaker permission turns, calling the system via the OpenAI-compatible API or ACP protocol, or the source layout, see **Engine (Agent Harness)** and the GitHub repository (`github.com/openmousse/openmousse`).
