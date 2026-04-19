# Happier Robot — Autonomous AI Sales Agent with a Brain

**Built at TUM.AI Hackathon 2025** | Powered by [HappyRobot](https://happyrobot.ai) + [Cognee](https://cognee.ai) + [ElevenLabs](https://elevenlabs.io)

## Demo Video

https://github.com/user-attachments/assets/ce06a854-5bab-439e-be6a-9ef388916c46

## What is it?

Happier Robot is an **end-to-end autonomous AI sales agent system** that handles the entire sales cycle — from first contact to deal closure — with zero manual intervention. It learns from every interaction and gets smarter over time.

**6 production workflows** orchestrate calls, emails, scheduling, and human escalation. A **self-learning brain** powered by Cognee stores lead context, negotiation patterns, and product knowledge. **50 quality northstars** and **15 adversarial tests** ensure the agent stays accurate and compliant.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                React Dashboard                       │
│  (Glassmorphism dark theme · Real-time pipeline)     │
├─────────────────────────────────────────────────────┤
│              HappyRobot Platform                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ Inbound  │ │ Outbound │ │ Inbound  │            │
│  │  Call    │ │  Call    │ │  Email   │            │
│  └──────────┘ └──────────┘ └──────────┘            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ Outbound │ │Scheduler │ │  HITL    │            │
│  │  Email   │ │ (Cron)   │ │(Slack)   │            │
│  └──────────┘ └──────────┘ └──────────┘            │
├──────────────┬──────────────────────────┤            │
│   Twin DB    │     Cognee Brain         │            │
│  (leads +    │  (4 memory datasets)     │            │
│  open_points)│                          │            │
├──────────────┴──────────────────────────┤            │
│  Slack · Gmail · Twilio · ElevenLabs    │            │
└─────────────────────────────────────────┘
```

## Cognee Integration — Self-Learning Brain

Cognee powers the agent's memory and learning system. Every interaction is stored, recalled, and used to improve future conversations.

### 4 Memory Datasets

| Dataset | Purpose | When Written |
|---------|---------|-------------|
| `lead_context` | Per-lead interaction summaries (company, contact, stage, facts, next steps) | After every call and email |
| `negotiation_brain` | Lead-specific negotiation history and deal dynamics | After negotiation calls |
| `brain_patterns` | Generalizable sales patterns across all deals | After every interaction |
| `product_knowledge` | Product features, pricing policy, competitive intel | Manually seeded |

### How It Works

**Recall** — Before every call/email, the agent queries Cognee to retrieve prior context:
```
POST /api/v1/recall
Body: {"query": "Allianz Devang Patel insurance sales"}
→ Returns: prior interactions, negotiation history, learned patterns
```

**Learn** — After every interaction, structured summaries are stored:
```
POST /api/v1/add_text
Body: {
  "text_data": ["INBOUND CALL — Company: Allianz | Contact: Devang Patel | 
    Stage: negotiation | Summary: Discussed 30% discount request, 
    counter-offered 10% with annual prepay | Next: email (48h) — 
    send BaFin DPA | Date: 2026-04-19T10:30:00Z"],
  "datasetName": "lead_context"
}
```

### Code References

- **Cognee Recall in voice agent tools**: `recall_cognee` tool in Inbound Call workflow — called silently after identifying the caller
- **Cognee Learn post-call**: Two webhook POST nodes fire after every call — one to `brain_patterns` (generalizable insights) and one to `lead_context` (interaction summary)
- **Dashboard Agent Brain page**: [`dashboard/src/pages/AgentBrain.tsx`](dashboard/src/pages/AgentBrain.tsx) — search bar that queries Cognee recall API with live results

## ElevenLabs Integration — Video Narration

ElevenLabs powers the professional voiceover narration for the hackathon submission video.

### Implementation

- **Voice**: Daniel (British broadcaster) via `eleven_multilingual_v2` model
- **11 narration audio files** generated for the UI journey video (V2)
- **12 narration audio files** generated for the abstract overview video (V1)
- **7 condensed narration files** for the short submission version (V1 Short)

### Code References

- **Audio files**: [`video/public/audio/`](video/public/audio/) (V2), [`video/public/audio_v1/`](video/public/audio_v1/) (V1), [`video/public/audio_v1_short/`](video/public/audio_v1_short/) (V1 Short)
- **Audio component**: [`video/src/components/AudioNarration.tsx`](video/src/components/AudioNarration.tsx)
- **Synced in Video.tsx**: Each `<Sequence>` includes an `<Audio>` component matched to scene duration

### Generation Script Pattern
```bash
curl -s "https://api.elevenlabs.io/v1/text-to-speech/onwK4e9ZLuTAKqWW03F9" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "When Devang from Allianz calls in, the Inbound Call workflow fires...",
    "model_id": "eleven_multilingual_v2",
    "voice_settings": {"stability": 0.6, "similarity_boost": 0.8, "style": 0.3}
  }' --output scene_03_inbound_call.mp3
```

## Workflows

| Workflow | Trigger | What It Does |
|----------|---------|-------------|
| **Inbound Call** | Phone call received | Agent answers, looks up lead, recalls context, qualifies/negotiates, extracts data, updates DB + brain |
| **Outbound Call** | Webhook (from Scheduler) | Pre-loads lead context + Cognee recall, calls lead, same post-call processing |
| **Inbound Email** | Gmail webhook | Extracts sender info, checks Cognee, generates reply or escalates to human |
| **Outbound Email** | Webhook (from Scheduler) | Reads lead + open points, generates stage-appropriate email, sends via Gmail |
| **Scheduler** | Cron (every 15 min) | Reads all leads, classifies due actions, triggers outbound calls/emails |
| **HITL Outbound** | Webhook (from any workflow) | Routes open questions to correct Slack channel by team |
| **HITL Inbound** | Slack event | Processes human answers, updates DB, queues answer delivery |

## Quality System

- **50 Northstars** across voice agents (25 per workflow) covering tool usage, compliance, accuracy, negotiation rules, conversation style
- **15 Adversarial Tests** across 4 suites: Pricing Boundary Attacks, Feature Misrepresentation, Information Extraction, Conversation Hijacking
- **4 Custom Evals**: New Lead Qualification, Negotiation Boundary, Feature Red Zone, Open Point Escalation

## Dashboard

React 18 + TypeScript + Tailwind CSS dashboard with dark glassmorphism theme (Manrope + IBM Plex Mono fonts).

**Pages**: Dashboard (KPIs + pipeline), Leadbook, Calls (with transcripts), Emails (threaded), HITL Queries, Agent Brain (Cognee search), Pipeline (Kanban), Lead Detail (BANT + timeline), Settings

## Video

Built with [Remotion](https://remotion.dev) — programmatic video generation in React.

**3 versions available**:
- `HappierRobot` — UI journey following a lead through the sales cycle (2:38)
- `HappierRobotV1Abstract` — Abstract diagrams and flowcharts (4:10)
- `HappierRobotV1Short` — Condensed abstract version (1:40)

All versions include ElevenLabs narration synced to visual animations.

```bash
# Preview
cd video && npx remotion studio src/index.ts

# Render
npx remotion render src/index.ts HappierRobotV1Short happier_robot.mp4
```

## Quick Start

### Dashboard
```bash
cd dashboard
npm install
# Create .env with your API keys
echo "VITE_HAPPYROBOT_API_KEY=your_key_here" > .env
echo "VITE_COGNEE_API_KEY=your_key_here" >> .env
echo "VITE_COGNEE_TENANT_ID=your_tenant_id" >> .env
npm run dev
# Open http://localhost:5173
```

### Video (Remotion)
```bash
cd video
npm install
npx remotion studio src/index.ts
# Open http://localhost:3000
# Render: npx remotion render src/index.ts HappierRobotV1Short out.mp4
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Workflows | HappyRobot Platform (EU) |
| Memory/Brain | Cognee (4 datasets, recall + learn APIs) |
| Voice Agent | HappyRobot Voice (Daniela HR voice) |
| Narration | ElevenLabs (Daniel voice, eleven_multilingual_v2) |
| Database | HappyRobot Twin DB (leads + open_points tables) |
| Dashboard | React 18 + TypeScript + Vite + Tailwind CSS |
| Video | Remotion (React-based video) |
| Chat | Slack (HITL escalation + resolution) |
| Email | Gmail (inbound + outbound) |

## Team

**Devang Dhumal** — TUM.AI

---

*Built in 24 hours at the TUM.AI x HappyRobot Hackathon 2025*
