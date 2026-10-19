The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/create-agent.md`.

# Create and Manage Functional Agents
Create functional agents via proposal cards in main chat or directly in the app, and configure their roles and models.

After completing this guide, you will have created a new functional agent (for example, a research agent dedicated to organizing industry reports), configured its role and model, and learned how to work with it through direct chat, main chat handoffs, or multi-agent meetings. This guide assumes you have deployed OpenMousse and paired a client.

## Prerequisites

- A running OpenMousse server paired with a phone or web client.
- At least one model provider configured on the server (or a connected OpenClaw / Hermes instance).

## Privacy

- **Isolated memory and data**: Each functional agent has its own chat history, dedicated memory, and dedicated board, stored separately from other functional agents.
- **Shared memory tree**: Every functional agent can query the memory tree before replying and write new facts, preferences, decisions, or conclusions about you to the memory tree as it learns them (and in summary during the daily 03:45 settlement).
- **Invisible to external apps**: External AI apps that you authorize to access the memory tree (such as Claude or ChatGPT) cannot read any functional agent's dedicated memory, chat history, or board data.

## Steps

### 1. Choose a way to create a functional agent

The Errands and **Study & Work** agents are enabled by default. For other everyday areas such as fitness, diet, or sleep, you can create a functional agent on demand using any of the following methods (a guided creation flow from a one-line description to a test chat before creating [Coming soon]):

| Method | Steps |
| --- | --- |
| **Method A: Via a proposal card in main chat** | 1. Open **Main chat** in the first row of the chat list.<br>2. Describe what you want the new agent to handle, for example: "Create a research agent to organize industry reports and meeting notes."<br>3. Main chat generates a **proposal card** with the agent's name and role definition; review it and tap confirm to create the agent. |
| **Method B: Manually in the app** | 1. Tap the gold **+** button (**New**) at the top of **Chats** → **New Agent** (or choose **Not sure yet? Talk it through** on that screen).<br>2. Enter the agent's **name** and **role description**, select its **model**, and save to finish creating it. |
| **Method C: Approve a post-settlement inbox proposal** | After the nightly 03:45 settlement, if main chat notices a recurring type of task you handle repeatedly, it automatically proposes spinning it off into a new functional agent and places an approval card in your inbox and **To do** in Today; tap approve to create the agent. |

### 2. Collaborate with a functional agent day to day

Once created, you can work with a functional agent in three ways:

1. **Chat with it directly**: Open the functional agent from the chat list to assign tasks directly or inspect its dedicated memory.
2. **Hand off from main chat**: State your request in main chat; main chat identifies the task type and hands it off to the corresponding functional agent.
3. **Call a short multi-agent meeting**: When a decision spans multiple areas (for example, adjusting research progress, sleep, and diet during a business trip), raise it in main chat (or start a meeting directly in the app). Main chat calls the relevant functional agents to speak in turns (each agent speaks at most once per round and can `@` other participants), then generates a **meeting minutes card** in main chat listing the decisions and the responsible agent and time for each action item.

> **Important: Meeting minutes only write data after you confirm**
> During a meeting, agents only discuss and do not modify any schedule or board data. The meeting minutes card appears in main chat (not under **To do** in Today); action items from the minutes are written to your schedule and the respective functional agents' boards only after you tap confirm. You can also add a comment to start another round of discussion.

### 3. Switch board views to manage structured data

Every functional agent comes with a dedicated board for maintaining structured records in its domain (such as a literature log, training plan, or task list). Inside an agent's board, you can switch among five views as needed: **Table**, **Kanban**, **Calendar**, **Timeline**, and **Chart**.

## Verification

Your new functional agent is ready for use when all of the following are true:

- [ ] The newly created functional agent appears in your chat list with its own chat screen and board.
- [ ] When you make a request in main chat that falls under the agent's role, main chat hands the request off to it or calls it into a short meeting.
- [ ] After you confirm a meeting minutes card in main chat, action items assigned to the agent are written to its board and can be viewed across the Table, Kanban, Calendar, Timeline, and Chart views.

## Next steps

- **Agents**: Understand the permission boundaries across main chat, functional agents, group chats, Cybers, and the Butler.
- **Approvals (Inbox)**: Learn about the three-tier permission model for tool calls and how approval cards work.
- **Today View and 04:00 Settlement**: Learn how functional agents deliver reports to Today and complete the nightly settlement.
