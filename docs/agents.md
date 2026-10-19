The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/agents.md`.

# Agents
Understand the roles and boundaries of main chat, functional agents, meeting minutes, group chats, Cybers, and the Butler.

You can view and open all agents from the chat list in the OpenMousse app; the first row is always main chat, followed by your functional agents, Cybers, and group chats.

OpenMousse divides everyday tasks, long-term thinking, and external communication across agents with distinct roles. You can state a request in main chat and let main chat hand it off to the appropriate functional agent or call a meeting, or you can open any functional agent's chat, board, and dedicated memory directly.

## Roles and responsibilities

- **Main chat**: The primary entry point to the system. It receives your everyday requests, reads and writes the memory tree, dispatches tasks to functional agents, and calls and moderates multi-agent meetings. After the nightly settlement, main chat may also propose turning a recurring task into a new functional agent by placing a proposal card in your inbox for confirmation.
- **Functional agents**: Each functional agent handles a single domain. The Errands agent and the Study & Work agent are enabled by default; fitness, diet, sleep, and other domain agents (such as a research agent) can be created as needed. Each functional agent has its own chat, memory, tools, and board; board collections support five views: Table, Kanban, Calendar, Timeline, and Chart.
- **Cybers** [Coming soon]: Long-term thinking partners with their own persona, memory, and model for a specific direction (such as a relentless questioner or a study coach). A Cyber's profile page is an ID card containing only three sections: identity, memory, and mounted agents. A Cyber does not access your data directly; any data lookup or modification is handled by its mounted functional agents: read-only results are returned directly, data modifications generate an approval card, and writing to the memory tree also requires generating an approval card (or sending the entry to **Needs your approval**) for your confirmation.
- **The Butler** [Coming soon]: Represents you externally, answering inquiries from friends and your friends' agents according to three relationship tiers: close, friend, and classmate (for example, checking whether you are free Thursday evening). The Butler reads only the schedule, recent status, shared items, study notes, or address that you open to that tier, and has no access to the memory tree or health data. For anything involving time, money, or commitments, the Butler always replies, "That's up to (your name) personally—let me ask." and generates an approval card for you; every outbound reply is reviewed by Doorman before it is sent.

## Meetings, minutes, and group chats

- **Meetings and minutes**: When a matter requires coordination across domains, main chat can call and moderate a short meeting, or you can start one yourself in the app. Participating agents speak in turns, at most once per round, and can `@` other members; during the meeting they only discuss and do not modify any data. At the end of a round, main chat produces a meeting minutes card (containing decisions and action items, with each action item specifying the responsible agent and time) directly in main chat. Action items are written to your schedule and the respective agents' boards only after you confirm; you can also add a note to start the next round.
- **Group chats**: Several agents (including Cybers) discuss in a single group where whichever agent you `@` replies, without generating meeting minutes. A meeting can also be kept as a group chat after it ends.

## What stays out

- **No Schedule agent or Friends agent**: Your schedule is shared across main chat and functional agents and displayed in Today; friend interactions and external replies are handled by **Friends** and the **Butler**.
- **No cross-user agent template store**: Functional agents are created on demand on your own server via a proposal card in main chat or an in-app form.
- **The Butler ignores strangers and makes no commitments on its own**: Only mutual friends can ask the Butler questions; Butler replies use a tool-free model call and cannot accept appointments or requests on your behalf.

## See also

- **Create and Manage Functional Agents**: Learn the steps for creating a functional agent via a proposal card in main chat or the in-app form.
- **Memory Tree**: Learn the permission boundaries for reading and writing long-term memory across roles.
- **Approvals (Inbox)**: Learn how approval cards are generated and reviewed.
