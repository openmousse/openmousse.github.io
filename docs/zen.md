The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/zen.md`.

# Zen
Capture thoughts without triggering AI replies, refine them when ready, and save distilled opinions to the memory tree.

Open **Zen** from the second tab of the bottom bar in the OpenMousse app (**Chats / Zen / Today / Goals**) to jot down thoughts and refine them.

Zen is a place to set thoughts down first. An article you just finished, a video that stood out, or a passing idea can all go into Zen first. Saving a note does not trigger a reply and the AI does not step in; when you are ready, pick out related notes to refine with the AI and save distilled opinions to the memory tree so they can inform future decisions.

## How to use Zen

Using Zen follows four steps, and at every step you decide whether the AI is involved:

1. **Capture thoughts (saved without sending)**: Thoughts you jot down are saved as Markdown notes on your server or in your note vault. At this stage, content is saved without being sent—it is not sent to any model, does not enter any agent's memory, and is not automatically written to the memory tree during the 03:45 settlement.
2. **Discuss and private note**: When you are ready to think something through, select a few notes and tap **Discuss** to organize and discuss them with the AI. During the discussion, if a thought occurs to you that you do not want the AI to respond to, tap **private note**: the line is saved only in the note and is not shown to the AI.
3. **Done**: When the discussion wraps up, tap **Done** and the AI compiles the thinking process and conclusions into a draft note for you to review and edit.
4. **Save to the vault**: Once you finish editing the draft, tap **Save to the vault**. Distilled opinions worth keeping long term are written as leaves in the memory tree, and action items that need to be carried out are added to your schedule.

> **Note: Zen privacy and model call boundaries**
> As long as you do not tap **Discuss**, anything you write in Zen stays strictly on your local server (or in your synced note vault) and generates no requests to any model provider.

## What stays out

- **Nothing enters the memory tree unless you tap Save to the vault**: Personal preferences and decisions mentioned in main chat or functional agent chats are written to the memory tree directly (or during the 03:45 settlement); in Zen, only content that completes the full **Discuss → Done → Save to the vault** flow is written to the memory tree and your schedule.
- **Not a task board or source document library**: Long-running project tables and calendars live in each functional agent's board; the full text of courses, documents, and reading materials lives in the **Study & Work** agent's library.

## See also

- **Memory Tree**: Learn how distilled opinions saved via **Save to the vault** become leaves in the memory tree that other agents can recall.
- **Today View and 04:00 Settlement**: Learn how action items saved to the vault appear in your schedule, and what is excluded from the 03:45 settlement.
