The full documentation index is at [llms.txt](https://openmousse.ai/llms.txt). Append `.md` to a docs URL to get its Markdown; this page's Markdown is at `https://openmousse.ai/docs/privacy.md`.

# Privacy Policy
Terms regarding local server data storage, model providers, transcription services, and account data.

Last updated: October 19, 2026

OpenMousse is open-source software that runs on your own server. The OpenMousse iPhone app is a client for that server, published by Leo Zhou; your server also serves a web app version of the same client. This page explains how your data is handled.

## Overview

- Your conversations, memories, and health data summaries are stored on your own server under your control; OpenMousse has no access to them.
- The TestFlight build of the app asks you to sign in with your email address. Your account records only your email address, an optional display name, and the list of services (claws) you have connected. The web app and self-built versions have no account system.
- There are no ads, and the app contains no analytics or tracking SDKs.

## Data Sent from the Client to Your Server

- **Conversation content**: Messages, photos, files, and voice recordings you send in conversations.
- **Apple Health data**: Daily summary metrics (activity, sleep, heart-rate metrics, and similar), synced only after you grant permission. The app only reads health data, never writes to Apple Health, and never requests reproductive health data. OpenMousse never uses health data for advertising and never shares it with any third party.
- **Push token**: Used to send notifications to your device after a reply is generated.
- **Interface language**: Used by the server to reply in the corresponding language.

## Data That Leaves Your Server by Design

- **Model providers**: Each turn of conversation is sent to your chosen model provider (such as Anthropic, OpenAI, or Google, including fallback models), containing that turn's message and the memories needed to answer, using your own account or API key and governed by that provider's terms.
- **Push notifications**: Sent via the Expo Push Service and Apple Push Notification service (APNs). Each notification contains a short title and preview (for conversation replies, the notification contains the conversation name and the first 140 characters of the reply).
- **Voice transcription**: Processed by the transcription service configured on your server—OpenAI by default, or replaceable with your own Whisper-compatible service.
- **Memory tree (optional)**: If you connect Claude.ai, ChatGPT, Gemini, or Notion to the memory tree, those services read and write the memory tree through the dedicated URL you configured.
- **Connectors (optional)**: If you connect external apps such as Notion in **Settings → Connector**, their login tokens are stored on your server, and the system reads and writes those apps through your server.
- **Nutrition lookup**: When logging meals, if a food item is not in your local food database, your server queries Open Food Facts and USDA FoodData Central using the food name or barcode. Requests contain only the food name or barcode and no personal information; query results are cached on your server.
- **Sharing and friends (optional)**: A share link shows a snapshot of your selected content to anyone holding the link, with private details such as home addresses and family members' names masked as gray bars. After you add a friend, your server and your friend's server exchange signed, end-to-end encrypted messages directly. If neither server has a public address, messages are forwarded through the OpenMousse relay (`relay.openmousse.ai`, running on Cloudflare); the relay sees only the recipient server address, payload size, and timestamp, cannot read message content, and stores no messages. Cloudflare may retain standard access logs (such as IP addresses).

## Accounts and Cloud Services

- **TestFlight account**: The app installed from TestFlight sends a 6-digit verification code to your email address to sign in. Your account stores your email address, an optional display name, and your list of connected services (assistant name, server URL, type and name, and last online time); it never stores tokens, conversations, memories, health data, or connector credentials. Account data is stored in Supabase's EU region (Ireland), and verification emails are sent via Resend; Supabase retains standard logs such as sign-in time and IP address. Account data is retained until you delete it.
- **Hosted dedicated cloud server**: If you use a dedicated cloud server hosted by OpenMousse, operations staff log in only when you explicitly authorize access for troubleshooting, and leave an audit log you can inspect.
- **Hosted service waitlist**: When you join the waitlist on `openmousse.ai`, we store your email address, page language, and signup time solely to notify you when the hosted service opens. This data is stored by Supabase in the EU region (Ireland).
- **Other client services**: The app queries the Expo Updates service for new code bundles (sending only app and OS version information, with no personal content). If you use the TestFlight build, Apple may share crash reports and feedback you actively submit with the developer under Apple's terms.
- **Demo server**: The demo server provided for Apple App Review stores no personal data, answers conversations using a demo assistant with no tools attached, and deletes all related content after review is complete.

## Your Controls and Contact Information

- You can turn off Apple Health permissions at any time in iOS Settings.
- You can switch voice transcription to your own transcription service, or choose not to use voice input.
- You can delete conversations, journals, and memories inside the app, or delete the data directory on your server directly.
- You can delete your account and connection list in the app via **Settings → Account → Delete account** (data on your server is unaffected), or email `hello@openmousse.ai` to request or delete the information stored in the waitlist or your account.
- OpenMousse is not directed to children under 13. The revision history of this page is maintained in the website code repository.
