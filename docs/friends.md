The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/friends.md`.

# Friends and Podcasts
Use end-to-end encrypted chat, privacy-redacted share cards, relationship-tiered Butler replies, and speaker-diarized in-person podcasts.

Flip the switch at the top of **Chats** in the OpenMousse app to **Friends** to manage contacts, start direct chats, send share cards, or record podcasts; tap the **+** button to add a friend, and tap **My card agent** to open your card agent settings.

OpenMousse lets you communicate directly with mutually invited contacts, share excerpts of your discussions with AI, coordinate schedules through each other's Butlers, and record in-person podcasts together with generated minutes. All friend interactions are built on mutual invitations, end-to-end encryption, and strict permission isolation.

## Core Features

- **End-to-end encrypted chat**: A friend connection is established only after both sides invite each other. Chat supports read receipts, emoji reactions, quoted replies, editing, and unsending messages. Every message is signed, end-to-end encrypted, and sent directly to your friend's server; if either side does not have a public address, messages are forwarded through the OpenMousse relay. The relay can see only the recipient address, payload size, and timestamp; it cannot read message content and stores no messages.
- **Privacy-redacted share cards**: You can turn an excerpt of your discussion with AI into a share card and send it to a friend. Before sending, the system identifies and masks private details one by one, asking for each item whether to generalize it into a generic phrase such as "a place" or "a friend," or keep it as is.
- **The Butler (representing you externally)** [Coming soon]: An upgrade of today's **card agent**. Friends or their Butlers can ask your Butler about your availability and recent updates (for example, "Are you free Thursday evening?"). You can assign each friend to one of three relationship tiers—close, friend, or classmate—and configure the scope of content each tier is allowed to read: schedule (full details, free/busy only, or none), recent updates, previously shared content, study notes, and home address. The Butler replies using a model call with no tools attached, and its replies never include unshared home addresses, phone numbers, email addresses, body metrics, or family members' names. When a request involves scheduling, asking for items, or anything involving time, money, or commitments, the Butler cannot agree on your behalf; it always replies, "That's up to (your name) to decide—I'll go ask," and generates an approval card for you. Every reply is also reviewed by Doorman before being sent; anything inappropriate is held back for your decision.
- **In-person podcast recording**: When discussing with friends in person, place a single phone in the middle to start a podcast recording. The system automatically separates each speaker's voice (you verify and assign speakers after recording), groups the transcript by speaker, and compiles meeting minutes; distilled opinions and decisions about you can be written to the memory tree.

## Security and Isolation Boundaries

- **Messages from a friend's agent are treated strictly as reference material**: Messages sent by a friend's agent are processed by a model call that cannot use any tools, so they cannot cause your agents to invoke any tools; if a message contains embedded instructions, a security alert is generated in **Today → To do**.
- **The Butler cannot see core private data**: The Butler has no access to the memory tree and no access to any health or body data; inquiries from strangers are ignored by default.

## What Is Not Here

- **No friends feed**: The system does not have a social feed or timeline.
- **Podcast minutes are not broadcast to participants**: The transcript and minutes compiled after a podcast recording stay only in the initiator's own app and are not automatically sent to the friends who participated in the recording.

## See Also

- **Approvals (Inbox)**: Learn how Butler approval cards, Doorman holds, and security alerts are handled.
- **Data and Security**: Review details on the relay server, transcription service, and isolation of incoming external information.
