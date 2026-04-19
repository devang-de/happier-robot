# HappyRobot Product Overview

## What Is HappyRobot?

HappyRobot is a platform for building and deploying autonomous AI agents that operate across voice (phone), SMS, email, and WhatsApp channels. Organizations use HappyRobot to automate outbound and inbound conversations at scale -- from sales prospecting and lead qualification to customer support, appointment scheduling, and internal workflow orchestration.

The platform provides a visual workflow builder where teams design multi-step agent behaviors without writing code. Each workflow can include branching logic, variable injection, knowledge-base lookups, API calls, and handoff rules. Once published, workflows run autonomously: an agent can call a lead, negotiate terms, send a follow-up email, and update a CRM record -- all within a single execution.

## Core Platform Capabilities

### Multi-Channel Agent Deployment

HappyRobot agents are channel-native. A single workflow can be configured to operate on:

- **Voice (Phone):** Outbound and inbound calls with real-time speech synthesis and recognition. Agents handle turn-taking, interruptions, and silence detection natively.
- **SMS:** Two-way conversational SMS with session management.
- **Email:** Threaded email conversations with template support and attachment handling.
- **WhatsApp:** Business API integration for structured and free-form messaging.

Agents can be triggered by inbound events (e.g., an incoming call) or scheduled/triggered outbound (e.g., a campaign run or webhook).

### Visual Workflow Builder

The drag-and-drop workflow editor lets non-technical users compose agent behavior from modular nodes: triggers, AI agent steps, conditional branches, API actions, loops, and human-handoff points. Workflows support versioning, so teams can iterate on agent behavior without disrupting live deployments.

### Knowledge Bases

Teams can upload documents, FAQs, and structured data into knowledge bases that agents reference during conversations. Knowledge bases support PDF, Markdown, and plain text, and agents retrieve relevant passages at inference time to ground responses in approved content.

### Integrations and Actions

HappyRobot ships with a library of pre-built integrations (CRMs, helpdesks, webhooks, databases) and supports custom API actions. Agents can read from and write to external systems mid-conversation, enabling real-time data lookups and record updates.

### Variables and Dynamic Content

Workflows use a variable system to inject dynamic content -- lead names, pricing figures, dates, prior conversation context -- into agent prompts and messages. Variables can be sourced from triggers, prior workflow steps, API responses, or static configuration.

## Security and Compliance Features (Native Today)

HappyRobot includes the following security and governance capabilities as part of the platform today:

- **Single Sign-On (SSO):** SAML 2.0 and OIDC-based SSO integration, allowing organizations to enforce their identity provider policies across HappyRobot access.
- **Multi-Factor Authentication (MFA):** Native MFA support for all user accounts, including TOTP-based authenticator apps.
- **Role-Based Access Control (RBAC):** Basic RBAC with predefined roles (Admin, Editor, Viewer) that control access to workflows, knowledge bases, and organization settings. Granular per-resource permissions are scoped to the current role model.
- **Audit Log:** Immutable audit trail of user actions, workflow changes, and agent executions. Audit logs are queryable by date range, user, and action type, and can be exported for compliance review.
- **API Access:** RESTful API with key-based authentication for programmatic workflow management, run triggering, and data retrieval.
- **Webhooks:** Configurable outbound webhooks for event-driven integration with external systems (e.g., notifying a downstream service when a call completes or a lead status changes).

## What HappyRobot Is Not

HappyRobot is a cloud-hosted SaaS platform. It is not available as an on-premise deployment, white-label product, or source-code-licensed offering. All data processing occurs in HappyRobot-managed infrastructure. For EU data residency requirements, HappyRobot can discuss deployment region options on a case-by-case basis with Enterprise customers.

## Target Use Cases

- **Sales:** Outbound prospecting, lead qualification, demo scheduling, and deal negotiation.
- **Customer Support:** Inbound call handling, ticket triage, FAQ resolution, and escalation routing.
- **Operations:** Appointment reminders, survey collection, internal notifications, and cross-system data synchronization.

## Platform Maturity

HappyRobot is production-grade and actively used by organizations ranging from startups to large enterprises across multiple industries. The platform handles thousands of concurrent agent sessions and is built for reliability, with monitoring, alerting, and SLA-backed uptime for Enterprise customers.
