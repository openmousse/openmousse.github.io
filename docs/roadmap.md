The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/roadmap.md`.

# Roadmap
View features currently in development and upcoming releases.

This page lists OpenMousse modules that are being merged into the main branch, running on internal instances, or have finalized designs in active development. Modules are grouped by current stage and land in the public repository once testing completes.

> **Note: Release Cadence**
> This page reflects current engineering progress and finalized product designs without fixed release dates. For features that are already live, see the pages under **Features** and **Guides** in the sidebar.

## Merging and Running Internally

The following modules are implemented on development branches or running steadily on internal instances and are being prepared for merge into the public `main` branch:

- **In-house Python engine (agent harness)** [Coming soon]: Manages model calls, context, and security rule enforcement. Includes three speaker permission turns (you, a Cyber, and a friend's agent or stranger), three tool execution tiers (read-only runs immediately; reversible runs and returns a change ID that can be rolled back by replying **Undo**; irreversible pauses and creates a parameter-locked approval card), and automatic fallback to a backup model with a note when the primary model is unavailable.
- **Programmatic API** [Coming soon]: Exposes an OpenAI-compatible API and ACP protocol in the engine so code editors and other external programs can call OpenMousse directly as a model.
- **Weekly memory tree pruning** [Coming soon]: Checks the memory tree every Sunday for duplicate or near-duplicate leaves, proposes merges or deletions, and applies them item by item after you confirm.
- **Isolated agent-authored pages** [Coming soon]: Run inside an isolated environment that cannot read login credentials or other system data and cannot send data externally; opening a page for the first time lists the data items it wants to read and grants read-only access only after you approve, requiring re-approval whenever its code changes.

## Design Finalized, in Development

The following modules have finalized interaction and architecture designs and are under active client or server development:

- **Desktop clients and Android Health Connect**: Launching desktop clients (a web workspace and a Mac app), and adding Health Connect support on Android to read sleep, heart rate, and workout data.
- **Hosted dedicated cloud servers**: Offering an official hosted cloud server option; you can join the waitlist on the home page now.
- **Memory tab and tree-ring view**: Updating the fourth tab in the bottom bar to **Memory** and moving the memory tree inside it. Adds a tree-ring view where the outer ring is today and inner rings are past dates; each dot is a new memory, and amber dots resting outside the ring are entries waiting for your confirmation.
- **Cybers (long-term thinking companions)**: Agents with their own personality, memory, and model that assist your thinking in a specific direction over the long term. Each Cyber's profile page is a badge with three sections (Identity, Memory, and Mounts); a Cyber never accesses your data directly, delegates all lookups and actions to the functional agents mounted on it, and requires approval via an approval card before modifying data or writing to the memory tree.
- **The Butler (upgraded from Card agent)**: Represents you externally and answers questions from friends and friends' Butlers across three relationship tiers (close, friend, acquaintance); reads only the information opened to that tier, cannot see the memory tree or health data, hands anything involving time, money, or commitments to you in person, and has every outbound reply reviewed by Doorman.
- **Interactive agent creation flow**: Supports creating a functional agent through a "one-line description → system follow-up questions → pre-filled draft → test chat before finalizing" flow.

## See Also

- **Welcome to OpenMousse**: Learn about the core components and operating boundaries that are live today.
- **Engine (Agent Harness)**: Learn about speaker permission turns and three-tier tool execution in the engine.
