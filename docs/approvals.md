The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/approvals.md`.

# Approvals (Inbox)
Hold irreversible actions like payments, external messages, submissions, and logins in parameter-locked approval cards until you approve.

You can view and act on approval cards in **Today → To do** in the OpenMousse app, directly beneath the corresponding chat message, or from system notifications on your phone.

To prevent agents from sending external messages, making payments, or modifying critical data without your consent, OpenMousse enforces tiered control over all tool calls. Whenever an action is irreversible, the agent stops and generates an approval card with locked parameters, executing it only after you approve.

## Three-tier tool execution

The system engine divides agent tool calls into three tiers [Coming soon]:

1. **Read-only actions**: Operations that do not modify data—such as querying the memory tree, reading your schedule, or viewing a board—are executed directly by the agent.
2. **Reversible actions**: Reversible internal operations—such as adding or updating a record—are executed directly by the agent, with a change ID attached beneath the reply; reply **Undo** to restore the state prior to that change.
3. **Irreversible actions**: Operations such as payments, outbound messages, form submissions, and account logins always pause and generate an approval card that locks the call parameters; once you tap approve, the system executes the call exactly once with those locked parameters.

## Where approval cards come from and how they are handled

In addition to third-tier tool calls, the following scenarios also generate approval cards or alerts in your inbox and **Today → To do**:

- **External actions by the Errands agent**: After the Errands agent compares prices or fills out forms inside its isolated sandbox, any step involving submitting, sending, logging in, or paying generates an approval card.
- **External commitments by the Butler and Doorman review**: When a friend or a friend's Butler asks to schedule time or request something from you, the Butler does not agree on its own, but instead generates an approval card for you to decide; if any outbound reply from the Butler is flagged by Doorman, it is also held back for you to send as-is, edit, or discard.
- **Data modifications and memory tree writes by Cybers** [Coming soon]: When a Cyber requests to modify data through one of its mounted functional agents or requests to write to the memory tree, it generates an approval card for your confirmation.
- **Creating or proposing a functional agent**: When main chat proposes spinning off a recurring task into a new agent after the nightly settlement, the proposal is placed in your inbox for approval.
- **Security alerts for external instructions**: When an incoming message from a friend's side contains instructions attempting to manipulate the system, the system generates an alert tagged **Security** in **Today → To do**.

Once you approve or reject an approval card in any location (**To do** in Today, beneath the chat message, or in a notification), the card is resolved and collapses into a single-line receipt in place.

## What stays out

- **Meeting minutes are not approved in the inbox**: Meeting minutes cards from short multi-agent meetings appear directly in main chat and are written to your schedule and agents' boards when you tap confirm inside main chat.
- **Memory tree leaves in Needs your approval are not in the inbox**: When the **Needs your approval** toggle is enabled for the memory tree, uncertain memories wait in the **Needs your approval** list under **Settings → Memory tree** (or outside the tree ring on the Memory screen) and are not mixed into inbox approval cards.

## See also

- **Errands and Doorman**: Learn how the Errands sandbox and Doorman work with approval cards to govern outbound requests.
- **Today View and 04:00 Settlement**: Learn how the **To do** section and security alerts are displayed day to day.
- **Engine (Agent Harness)** [Coming soon]: Learn the underlying implementation of speaker permission tiers and three-tier tool execution.
