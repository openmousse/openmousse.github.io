The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/memory.md`.

# Memory Tree
Store facts, preferences, decisions, and distilled opinions as provenance-tracked leaves in SQLite or a Markdown vault.

Open **Settings → Memory tree** in the OpenMousse app to view and manage your memories; the **Memory tree** row displays the current leaf count ("N leaves"), or "N Needs your approval" when items are waiting for review.

The memory tree is your long-term memory stored on your server. Each memory is a leaf with provenance recording which conversation and which day it came from. The open-source memory tree does not use branches; leaves are grouped by source (the external platform or agent that wrote the leaf). You can view, edit, or delete any leaf at any time.

By default, the open-source edition stores the memory tree in a SQLite database on your server. You can also configure it to store one Markdown note per leaf inside your note vault (for example, a folder synced with Obsidian). If you specify a vault path during installation, it uses Markdown storage right away; you can also switch storage backends later using `mousse-tree migrate`.

On the Memory screen [Coming soon], the outer tree ring represents today and inner rings represent previous days; each dot represents a new memory, and amber dots resting outside the ring represent **Needs your approval**. When the **Needs your approval** toggle is enabled (off by default), uncertain memories go to **Needs your approval** first and are written to the memory tree only after you confirm them. In addition, the system can propose merging or deleting duplicate leaves every Sunday for you to confirm one by one [Coming soon].

## How agents use the memory tree

- **Main chat and functional agents**: During everyday conversations, when they learn new facts, preferences, decisions, or recent updates about you, they write them to the memory tree, and they query the memory tree before answering your questions.
- **03:45 settlement and 04:00 session reset**: During the daily 03:45 settlement, each agent writes the day's conclusions and newly learned facts about you to its own memory and to the memory tree; at 04:00, sessions reset and the day's conversations are archived by day.
- **Cybers** [Coming soon]: A Cyber reads the memory tree through its mounted functional agents; to write to the memory tree, it must first generate an approval card (or send the entry to **Needs your approval**) and wait for your confirmation.
- **Connected external AI apps**: Claude, ChatGPT, Gemini, Notion, and Claude Code connected over MCP call `profile` and `recall` to read the memory tree before replying, and call `remember` to write back to the memory tree when they learn new information about you.

## What goes in

The memory tree stores only **things about you**: your facts, preferences, decisions, recent status, and distilled opinions. They come from five channels:

1. **Other AIs**: Personal facts, preferences, and decisions you mention in conversations with external apps such as ChatGPT, Claude, or Gemini (or memories about you exported from those apps and pasted into main chat during initial setup).
2. **Daily conclusions**: Conclusions about you drawn from your health, schedule, and email data (for example, "has been sleeping less recently").
3. **Work and study recaps**: Key points restated in your own words and your own takeaways while studying.
4. **Distilled opinions from Zen**: Opinions worth remembering long term after you refine them in Zen through **Discuss → Done → Save to the vault**.
5. **Discussions with friends**: Your own opinions and decisions distilled from discussions or podcasts recorded with friends.

## What stays out

The following data is also stored on your server (or remains in its original location), but is **not** written to the memory tree and cannot be read through the memory tree by connected external AI apps:

- **Raw health, schedule, email, and file data**: Detailed Apple Health sleep, heart rate, and workout records, as well as raw calendars, emails, and files, are read directly by the corresponding functional agents and are not leaves in the memory tree.
- **Source texts read during study**: The full text of courses, documents, and reading materials goes into the **Study & Work** agent's library, not the memory tree.
- **Unsaved thoughts in Zen**: Quick thoughts jotted down in Zen, or notes saved by tapping **private note** during a discussion, are stored only as local Markdown notes; they are not sent to models and are not automatically written to the memory tree during the nightly settlement.
- **Full chat logs from external AI platforms**: External AIs connected to the memory tree write only facts about you to the memory tree; full conversation transcripts remain on each platform.
- **Dedicated memories and chat histories of functional agents**: Each functional agent has its own chat, board, and dedicated memory stored separately from the memory tree.
- **What the Butler can see**: When answering inquiries from friends on your behalf, the Butler cannot see the memory tree at all; it sees only the schedule, recent status, shared items, study notes, or address that you explicitly expose for that relationship tier.

## See also

- **Connect Your AIs to the Memory Tree**: Get your dedicated MCP URLs and configure external AI apps.
- **Agents**: Learn how permissions are divided among main chat, functional agents, Cybers, and the Butler.
- **Zen**: Learn how thoughts are refined and saved to the memory tree.
- **Data and Security**: Learn where server data is stored and how privacy boundaries are enforced.
