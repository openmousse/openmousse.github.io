The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/errands.md`.

# Errands and Doorman
Compare prices, fill forms, and book in an isolated sandbox while Doorman isolates credentials and governs outbound requests.

Open the default **Errand** agent in the OpenMousse app's conversation list, or hand off booking, price comparison, and form-filling tasks directly in **Main chat**.

The Errands agent handles external web tasks such as comparing prices, filling out forms, booking, and making purchases on your behalf. To prevent malicious content on external web pages from stealing your passwords or performing unauthorized actions, the Errands agent runs in an isolated sandbox, and all outbound requests and account credentials are independently governed by the gatekeeper component Doorman.

## How It Works and Three Lines of Defense

When you hand an external task to the Errands agent, the system protects your security through three lines of defense:

1. **Isolated sandbox and outbound governance**: The Errands agent opens web pages, reads external content, compares prices, and fills out forms inside an isolated sandbox environment. The sandbox cannot access the internet directly; all network requests must pass through Doorman to be sent out. Content from external web pages is read only by the Errands agent inside the sandbox and never touches the rest of the system.
2. **Credential placeholder substitution**: Your website usernames and passwords are kept independently by Doorman. The Errands agent never receives the real password and holds only a placeholder. Only at the exact moment a network request passes through Doorman to leave the server does Doorman replace the placeholder with the real value, and it strictly restricts the credential to be sent only to the target website to which it is bound.
3. **Irreversible actions ask you first**: Lookups and price comparisons can complete automatically inside the sandbox. As soon as a task involves submitting a form, sending something externally, logging in to an account, or making a payment, the Errands agent stops immediately, generates a parameter-locked approval card, and places it in the inbox and **Today → To do**. It executes with the original parameters only after you approve.

## Doorman's Other Responsibilities

In addition to governing outbound requests and password substitution for the Errands agent, Doorman also reviews outbound replies from the **Butler**: when a friend or a friend's Butler asks your Butler a question, every reply your Butler generates must be inspected by Doorman before it is sent. If Doorman finds inappropriate content in a reply (such as personal information you have not shared), it holds the reply back and lets you decide whether to send it as is, edit it, or discard it.

## What Is Not Here

- **The Errands agent cannot see your real passwords**: Neither plaintext nor encrypted passwords ever enter the Errands agent's context, nor are they sent to your chosen model provider.
- **External web pages cannot trigger internal tools**: System data outside the sandbox, the memory tree, and the memories of functional agents are isolated from external web pages.

## See Also

- **Approvals (Inbox)**: Learn how parameter locking and the approval flow work for approval cards.
- **Data and Security**: Review the full list of external connections across the system and how incoming external information is isolated.
- **Friends and Podcasts**: Learn how Doorman reviews the Butler's outbound replies.
