The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/engine.md`.

# Engine (Agent Harness)
Learn how the Python runtime enforces speaker permission tiers, three-tier tool execution, and model fallback [Coming soon].

This page explains how OpenMousse's custom Python engine (agent harness) [Coming soon] manages model calls, context assembly, speaker permissions, and tiered tool execution.

The engine is the underlying scheduler running on your server. On every turn of interaction, it assembles the required memories, calls your chosen model, executes tools, and enforces security boundaries. If you are already using OpenClaw or Hermes, you can also connect it to the system to continue running as your conversation backend.

## Speaker Permission Tiers

The engine divides every interaction into one of three turn types based on who initiated the message, restricting the scope of callable tools at the runtime level:

- **Messages from you**: Have full permissions to invoke all tools according to the tool tier rules, and to read and write the memory tree and each functional agent's data.
- **Your Cybers** [Coming soon]: Engage in conversation only and do not access your data directly; when looking up reference material or modifying data is required, the request is handed off to the functional agents mounted on the Cyber.
- **Messages from a friend's agent or a stranger**: Treated strictly as reference material and processed by a model call with no tools attached, making it impossible to trigger any tools on your server. When the Butler replies externally to a friend's inquiry, it likewise uses a model call with no tools attached.

## Three-Tier Tool Execution

The engine classifies all tool calls into three tiers based on their impact [Coming soon]:

1. **Read-only operations**: Operations that do not modify data, such as querying the memory tree or reading your schedule or board, are executed directly by the engine, which returns the result immediately.
2. **Reversible operations**: Reversible operations, such as creating or modifying internal records, are executed directly by the engine with a change ID attached below the reply; reply **Undo** in the conversation to restore the previous state.
3. **Irreversible operations**: For irreversible operations such as making payments, sending external messages, submitting forms, or logging in to external websites, the engine pauses execution and generates a parameter-locked approval card in the inbox and **To do** in Today. Only after you approve does the engine execute the operation once using the original locked parameters.

## Model Support and Fallback

- **Supported models**: Supports Claude, OpenAI-compatible models from various providers, open-source models, and locally hosted models.
- **Model fallback**: When the primary model is unavailable or a request times out, the engine automatically switches to your configured fallback model to complete the reply for that turn, and notes the name of the model used below the reply.

> **Note: Scope of data sent to the model on each turn**
> What is sent to your chosen model provider (including fallback models) on each turn of conversation is limited to that turn's message and the memories needed to answer; all other memories, raw health data, and files remain on your server.

## See Also

- **Approvals (Inbox)**: Learn how the approval card workflow and parameter locking work.
- **Data and Security**: Review the system's data isolation boundaries and the Errands sandbox defenses.
- **Programmatic API**: Learn how to call the engine via the OpenAI-compatible API or ACP protocol.
