// ─── SINGLE SOURCE OF TRUTH ───
// Every page derives its data from this file.

export interface Lead {
  id: string
  company_name: string
  contact_name: string
  contact_email: string
  contact_phone: string
  role: string
  stage: 'new' | 'unqualified' | 'qualified' | 'negotiation' | 'followup' | 'on_hold' | 'won' | 'lost'
  current_state: 'progressing' | 'at_risk' | 'blocked' | 'closing' | 'won' | 'lost' | 'qualified' | 'unqualified' | 'no_decision'
  confidence: number
  preferred_channel: string
  next_action: string
  next_action_at: string
  created_at: string
  updated_at: string
  engagement_score: number
  deal_value: number
  bant: { budget: string; authority: string; need: string; timeline: string }
  calls: Call[]
  emails: EmailThread[]
  hitl_queries: HITLQuery[]
  activities: Activity[]
}

export interface Call {
  id: string
  lead_id: string
  date: string
  duration: string
  outcome: string
  transcript: string
}

export interface EmailThread {
  id: string
  lead_id: string
  subject: string
  messages: EmailMessage[]
}

export interface EmailMessage {
  id: string
  from: string
  to: string
  body: string
  timestamp: string
  direction: 'inbound' | 'outbound'
}

export interface HITLQuery {
  id: string
  lead_id: string
  question: string
  team: 'pricing' | 'product' | 'legal' | 'sales'
  status: 'open' | 'answered' | 'resolved_with_lead'
  answer?: string
  slack_thread_id?: string
  asked_at: string
  answered_at?: string
}

export interface Activity {
  id: string
  lead_id: string
  type: 'call' | 'email_sent' | 'email_received' | 'hitl_created' | 'hitl_answered' | 'stage_change' | 'demo_scheduled' | 'deal_won' | 'deal_lost'
  summary: string
  timestamp: string
  detail?: string
}

// ──────────────────────────────────────────────────
// LEAD 1: Allianz — Negotiation, At Risk
// ──────────────────────────────────────────────────
const allianzCalls: Call[] = [
  {
    id: 'c-al-1',
    lead_id: 'lead-1',
    date: '2026-03-28 10:00',
    duration: '22:15',
    outcome: 'Inbound inquiry, qualified',
    transcript: `Agent: Good morning, thank you for calling Happier Robot. My name is Max, how can I help you today?

Devang Patel: Hi Max, this is Devang Patel from Allianz. I am the VP of Product here. We have been looking into AI voice agents for our customer service operations and your name came up a few times.

Agent: Great to hear from you Devang. Welcome. Could you tell me a bit more about what you are looking for?

Devang Patel: Sure. We handle about fifteen thousand inbound calls per day across our claims and policy departments. Right now we have a legacy IVR that frustrates customers. We want something that can actually understand context, handle multi turn conversations, and route intelligently.

Agent: That is exactly what we specialize in. Fifteen thousand calls per day is a solid volume. Are these primarily in German or do you need multilingual support?

Devang Patel: Mostly German, but we also need English and French for our Swiss and international clients. Maybe ten percent of calls are non German.

Agent: We support all three natively with very low latency. Our German language model is actually our strongest. Can you walk me through what a typical call flow looks like today?

Devang Patel: A customer calls in. They get a menu with eight options. They press a number. Then they wait on hold. Average hold time is about four minutes. Then they talk to an agent who often has to ask them to repeat everything they already entered.

Agent: So the main pain points are long hold times, repetitive information gathering, and a rigid menu system. Is that fair?

Devang Patel: Exactly. We want the AI to handle the first level, gather context, and either resolve the issue directly or warm transfer with all the context to a human agent.

Agent: That is our bread and butter. Let me ask about your technical stack. What telephony system are you on?

Devang Patel: We use Genesys Cloud for our contact center.

Agent: Perfect, we have a native integration with Genesys. The setup is typically two to three weeks for the integration itself. Now regarding the AI handling, what percentage of calls do you think could be fully resolved without a human?

Devang Patel: Our internal analysis says about thirty to thirty five percent. Things like policy status checks, claim status updates, address changes, that kind of thing.

Agent: That aligns with what we see at similar insurance companies. We typically get that to forty to forty five percent within the first three months as the model learns your specific patterns. What is your timeline for implementation?

Devang Patel: We want to pilot in Q three this year and then roll out fully by Q one next year.

Agent: That is very doable. Let me suggest we schedule a technical demo where I can show you the platform, walk through a few scenarios specific to insurance, and discuss the integration architecture. Would next Thursday work?

Devang Patel: Thursday works. Let us say two PM Berlin time.

Agent: Perfect. I will send over a calendar invite. Before we go, what does your budget look like for a project like this? Just so I can tailor the demo appropriately.

Devang Patel: We have allocated between two hundred and three hundred thousand euros annually for this initiative. But it depends on the ROI projections.

Agent: Understood. I will make sure we include an ROI calculator in the demo. Thank you Devang, looking forward to Thursday.

Devang Patel: Thanks Max, talk then.`,
  },
  {
    id: 'c-al-2',
    lead_id: 'lead-1',
    date: '2026-04-03 14:00',
    duration: '35:42',
    outcome: 'Demo completed, strong interest',
    transcript: `Agent: Good afternoon Devang, welcome to the demo. I have prepared a few scenarios specific to insurance claims handling. Are your technical team members joining as well?

Devang Patel: Yes, I have our CTO Maria and our Head of Claims Ops Stefan on the line.

Agent: Great, welcome Maria and Stefan. Let me share my screen. What you are seeing is our workflow builder. I have pre built a claims intake flow. Let me play a simulated call.

Devang Patel: Go ahead.

Agent: So in this scenario, a customer calls about a car accident claim. The AI greets them, identifies them by their policy number, and then guides them through the claim details. Notice how it asks follow up questions based on the type of incident. It also checks if they have glass coverage and roadside assistance automatically.

Maria: That is impressive. How does it handle ambiguous responses? Our customers often give vague descriptions.

Agent: Great question Maria. The model uses contextual understanding, so if a customer says something like I had a fender bender last week, it extracts the incident type, approximate date, and can ask clarifying questions naturally. Let me show you an example.

Maria: Can it also access our policy database in real time?

Agent: Absolutely. We integrate via API with your Genesys setup and can pull policy data, claim history, and customer preferences in real time. The latency is typically under two hundred milliseconds for database lookups.

Stefan: What about compliance recording? We need all calls recorded and transcribed for regulatory purposes.

Agent: Every call is recorded, transcribed, and stored with full audit trails. We are compliant with GDPR, and we can configure data retention policies to match your requirements. The transcripts are searchable and exportable.

Devang Patel: This looks very promising. What about the pricing? We discussed our budget on the last call.

Agent: Right. For your volume of fifteen thousand calls per day, I would recommend our Enterprise tier. Let me pull up the pricing. At your scale, we are looking at around twenty four thousand euros per month, which comes to two hundred eighty eight thousand annually. This includes unlimited calls, premium support, and the Genesys integration.

Devang Patel: That is at the top of our range. Can we discuss volume discounts?

Agent: Of course. I can put together a few options. We typically offer discounts for annual commitments and we have a ramp up pricing model where you pay less during the first three months as we tune the system. Let me send you a detailed proposal by end of week.

Stefan: One more question. Can we run a pilot with just one department first?

Agent: Absolutely. In fact we recommend that approach. We can start with claims intake, measure the results over four to six weeks, and then expand. The pilot pricing would be proportional.

Devang Patel: That sounds good. Send the proposal and we will review it next week.

Agent: Will do. Thank you all for your time today.`,
  },
  {
    id: 'c-al-3',
    lead_id: 'lead-1',
    date: '2026-04-14 11:00',
    duration: '18:30',
    outcome: 'Negotiation - asked for 30% discount',
    transcript: `Agent: Hi Devang, good to speak again. I trust you had a chance to review the proposal?

Devang Patel: Yes, we did. The team is very impressed with the product. However, we have some concerns about the pricing.

Agent: I appreciate that. What specifically would you like to discuss?

Devang Patel: Frankly, we have been talking to another vendor, Parloa, and their pricing is about thirty percent lower for a similar offering. We would like to stay with you because the product is better, but we need the numbers to work.

Agent: I understand. Can I ask what Parloa is offering specifically? Sometimes it is hard to compare apples to apples.

Devang Patel: They quoted us about two hundred thousand for the year. But I will be honest, their German language support is not as good as yours and they do not have the Genesys integration out of the box.

Agent: Right, and that integration alone would cost you fifty to seventy thousand euros to build custom with another vendor. So the total cost of ownership is actually comparable. That said, I want to make this work. Let me see what I can do on our side.

Devang Patel: We need at least a thirty percent discount to get sign off from our procurement team.

Agent: Thirty percent is significant. Let me be transparent, our margins do not support that level of discount on the base pricing. However, I have a few ideas. Let me take this to our pricing team and come back to you with a creative solution. Can I have until Friday?

Devang Patel: Friday works. But Devang, I really need a competitive number. Our CFO is watching this closely.

Agent: Understood. I will do my best. One thing that would help on our side is if you could commit to a two year term instead of one. That gives us more flexibility on pricing.

Devang Patel: Two years could work if the price is right and there is a performance clause. We need to be able to exit if the AI does not hit certain KPIs.

Agent: That is reasonable. Let me factor that into the proposal. I will include a performance based pricing component and a two year structure. Talk Friday.

Devang Patel: Sounds good. Thanks Max.`,
  },
]

const allianzEmails: EmailThread[] = [
  {
    id: 'et-al-1',
    lead_id: 'lead-1',
    subject: 'Happier Robot x Allianz — Demo Follow-up & Proposal',
    messages: [
      {
        id: 'em-al-1',
        from: 'agent@happierrobot.ai',
        to: 'devang.patel@allianz.de',
        body: 'Hi Devang,\n\nThank you for the excellent demo session today. As promised, please find attached our Enterprise proposal tailored for Allianz.\n\nKey highlights:\n- 15,000 calls/day capacity with auto-scaling\n- Native Genesys Cloud integration (2-3 week setup)\n- German, English, French language support\n- Premium 24/7 support with 1hr SLA\n- Annual pricing: EUR 288,000\n\nI have also included an ROI calculator showing projected savings of EUR 1.2M annually based on your current call volumes and handle times.\n\nLooking forward to your feedback.\n\nBest,\nMax\nHappier Robot',
        timestamp: '2026-04-04 09:00',
        direction: 'outbound',
      },
      {
        id: 'em-al-2',
        from: 'devang.patel@allianz.de',
        to: 'agent@happierrobot.ai',
        body: 'Hi Max,\n\nThanks for the detailed proposal. The team reviewed it and we are generally positive. A few points:\n\n1. The pricing is at the top of our budget range. We need to discuss discounts.\n2. We need a DPA (Data Processing Agreement) that is specific to insurance data.\n3. Can we start with a pilot for claims intake only?\n\nLet us schedule a call next week to discuss.\n\nBest,\nDevang',
        timestamp: '2026-04-08 14:30',
        direction: 'inbound',
      },
    ],
  },
  {
    id: 'et-al-2',
    lead_id: 'lead-1',
    subject: 'Re: Pricing Discussion — Counter Proposal',
    messages: [
      {
        id: 'em-al-3',
        from: 'agent@happierrobot.ai',
        to: 'devang.patel@allianz.de',
        body: 'Hi Devang,\n\nFollowing our call, I have worked with our pricing team on a creative solution. Here is what we can offer:\n\nOption A — 2-Year Commitment:\n- Year 1: EUR 245,000 (15% discount)\n- Year 2: EUR 230,000 (20% discount)\n- Performance clause: exit if <35% containment rate after 6 months\n\nOption B — Annual with Ramp:\n- Months 1-3 (pilot): EUR 12,000/month\n- Months 4-12: EUR 22,000/month\n- Total Year 1: EUR 234,000\n\nBoth options include the Genesys integration and premium support.\n\nLet me know which direction interests you, or if you want to discuss further.\n\nBest,\nMax',
        timestamp: '2026-04-16 10:00',
        direction: 'outbound',
      },
    ],
  },
]

const allianzHITL: HITLQuery[] = [
  {
    id: 'hitl-al-1',
    lead_id: 'lead-1',
    question: 'Allianz is asking for 30% discount on Enterprise tier (EUR 288k/yr). Parloa quoted them EUR 200k. What is the maximum discount we can offer and can we structure a 2-year deal with performance clauses?',
    team: 'pricing',
    status: 'answered',
    answer: 'Max discount approved: 20% on a 2-year term. We can offer Year 1 at EUR 245k and Year 2 at EUR 230k. Performance clause OK: exit allowed if containment rate below 35% after 6 months. Do not go below EUR 220k/year.',
    slack_thread_id: 'C04-pricing-1234',
    asked_at: '2026-04-14 15:00',
    answered_at: '2026-04-15 11:00',
  },
]

const allianzActivities: Activity[] = [
  { id: 'a-al-1', lead_id: 'lead-1', type: 'call', summary: 'Inbound call from Devang Patel at Allianz. Discussed AI voice agent needs for 15k calls/day. Demo scheduled for Apr 3.', timestamp: '2026-03-28 10:00' },
  { id: 'a-al-2', lead_id: 'lead-1', type: 'stage_change', summary: 'Stage changed from New to Qualified based on BANT assessment.', timestamp: '2026-03-28 10:30' },
  { id: 'a-al-3', lead_id: 'lead-1', type: 'demo_scheduled', summary: 'Demo scheduled for April 3 at 2PM Berlin time.', timestamp: '2026-03-28 10:35' },
  { id: 'a-al-4', lead_id: 'lead-1', type: 'call', summary: 'Demo completed with Devang, CTO Maria, and Head of Claims Ops Stefan. Strong interest. Proposal to follow.', timestamp: '2026-04-03 14:00' },
  { id: 'a-al-5', lead_id: 'lead-1', type: 'email_sent', summary: 'Sent Enterprise proposal to Devang with ROI calculator. Annual pricing EUR 288k.', timestamp: '2026-04-04 09:00' },
  { id: 'a-al-6', lead_id: 'lead-1', type: 'email_received', summary: 'Devang responded — positive on product but pricing concerns. Wants DPA and pilot option.', timestamp: '2026-04-08 14:30' },
  { id: 'a-al-7', lead_id: 'lead-1', type: 'stage_change', summary: 'Stage changed from Qualified to Negotiation.', timestamp: '2026-04-08 15:00' },
  { id: 'a-al-8', lead_id: 'lead-1', type: 'call', summary: 'Negotiation call. Devang asked for 30% discount citing Parloa at EUR 200k. Escalated to pricing team.', timestamp: '2026-04-14 11:00' },
  { id: 'a-al-9', lead_id: 'lead-1', type: 'hitl_created', summary: 'HITL query sent to pricing team: max discount and 2-year deal structure for Allianz.', timestamp: '2026-04-14 15:00' },
  { id: 'a-al-10', lead_id: 'lead-1', type: 'hitl_answered', summary: 'Pricing team approved 20% max discount on 2-year term. Performance clause OK.', timestamp: '2026-04-15 11:00' },
  { id: 'a-al-11', lead_id: 'lead-1', type: 'email_sent', summary: 'Sent counter-proposal with two pricing options: 2-year commitment or annual with ramp.', timestamp: '2026-04-16 10:00' },
]

// ──────────────────────────────────────────────────
// LEAD 2: BMW — Qualified, Progressing
// ──────────────────────────────────────────────────
const bmwCalls: Call[] = [
  {
    id: 'c-bm-1',
    lead_id: 'lead-2',
    date: '2026-04-08 15:30',
    duration: '28:10',
    outcome: 'Technical deep-dive, qualified',
    transcript: `Agent: Hello, this is Max from Happier Robot. Am I speaking with Klaus Weber?

Klaus Weber: Yes, hi Max. Thanks for getting back to me. I received your cold email and I have to say the timing is perfect. We have been evaluating voice AI solutions for our dealer network.

Agent: Great to hear that Klaus. I saw from your email that you are the CTO at BMW Group. Can you tell me more about what you are looking for?

Klaus Weber: Sure. We have about four thousand dealers worldwide and each one handles their own appointment scheduling, service reminders, and basic customer inquiries by phone. It is a mess. Every dealer does it differently and the customer experience is inconsistent.

Agent: Four thousand dealers, that is significant scale. So you want to centralize and standardize the voice experience across all dealers?

Klaus Weber: Exactly. We want a single AI voice agent that handles incoming calls for all dealers, but with the ability to customize greetings, operating hours, and service menus per dealer.

Agent: That is a multi-tenant architecture, which is something we support natively. Each dealer would get their own configuration but share the same underlying AI model. Let me ask about the technical side. What systems do your dealers use?

Klaus Weber: That is where it gets complicated. About sixty percent are on our centralized DMS, BMW DCS. The other forty percent use third party systems like Xtime or CDK. We need the voice agent to integrate with all of them.

Agent: We have built integrations with CDK and Xtime before. The BMW DCS integration would be custom but very doable. Typically that takes four to six weeks of API work. Do you have API documentation for DCS?

Klaus Weber: Yes, we have a well documented REST API. I can share the docs with you. But I have a specific technical question. What are your API rate limits? With four thousand dealers, we could be looking at peaks of fifty thousand concurrent calls.

Agent: That is a great question and one I want to give you an accurate answer on. Our standard Enterprise tier supports up to ten thousand concurrent calls. For fifty thousand, we would need to set up a dedicated cluster. Let me check with our product team on the exact specs and get back to you.

Klaus Weber: OK. Also, what about data residency? We need all data to stay within the EU.

Agent: All of our EU customer data is processed and stored in Frankfurt. We use AWS eu-central-1. We are ISO twenty seven thousand one certified and SOC two Type two compliant.

Klaus Weber: Good. What about the AI model itself? Is it your own model or are you using a third party like OpenAI?

Agent: We use a combination. Our core voice understanding model is proprietary, trained specifically for phone conversations. For the generative responses, we use a fine-tuned version of a large language model that runs within our EU infrastructure. No data leaves the EU.

Klaus Weber: That is important for us. OK Max, I think the next step would be a demo. But I specifically want to see the multi-tenant setup and the dealer customization capabilities.

Agent: Absolutely. I will set up a custom demo environment with three simulated dealers showing different configurations. How does next Wednesday at ten AM work?

Klaus Weber: Wednesday works. Send me the invite.

Agent: Will do. And I will get back to you on the API rate limits question before the demo. Thanks Klaus.

Klaus Weber: Thanks Max. Talk soon.`,
  },
]

const bmwEmails: EmailThread[] = [
  {
    id: 'et-bm-1',
    lead_id: 'lead-2',
    subject: 'AI Voice Agents for BMW Dealer Network',
    messages: [
      {
        id: 'em-bm-1',
        from: 'agent@happierrobot.ai',
        to: 'klaus.weber@bmw.de',
        body: 'Hi Klaus,\n\nI noticed BMW is expanding its dealer network across Eastern Europe. Congrats on the growth!\n\nAt Happier Robot, we help automotive OEMs standardize their dealer phone experience with AI voice agents. Companies like Mercedes-Benz and Volkswagen Group use our platform to handle appointment scheduling, service reminders, and customer inquiries across their dealer networks.\n\nWould you be open to a 15-minute call to explore if this could be relevant for BMW?\n\nBest,\nMax\nHappier Robot',
        timestamp: '2026-04-02 09:00',
        direction: 'outbound',
      },
      {
        id: 'em-bm-2',
        from: 'klaus.weber@bmw.de',
        to: 'agent@happierrobot.ai',
        body: 'Hi Max,\n\nGreat timing. We are actually evaluating solutions right now. I am the CTO and this falls under my umbrella.\n\nCan we do a 30 minute call instead? I have specific technical questions about scalability and integration with our dealer management systems.\n\nAvailable next Tuesday or Wednesday afternoon.\n\nKlaus',
        timestamp: '2026-04-04 16:22',
        direction: 'inbound',
      },
      {
        id: 'em-bm-3',
        from: 'agent@happierrobot.ai',
        to: 'klaus.weber@bmw.de',
        body: 'Hi Klaus,\n\nThat is great to hear! Let us do Tuesday April 8 at 3:30 PM CET. I will send a calendar invite.\n\nIn the meantime, here is a case study from our work with a major European automotive group (under NDA, but the metrics are real): they went from 12-minute average handle time to 3.5 minutes with 62% full containment.\n\nLooking forward to the conversation.\n\nBest,\nMax',
        timestamp: '2026-04-05 08:15',
        direction: 'outbound',
      },
    ],
  },
  {
    id: 'et-bm-2',
    lead_id: 'lead-2',
    subject: 'Demo Confirmation — BMW Multi-Tenant Setup',
    messages: [
      {
        id: 'em-bm-4',
        from: 'agent@happierrobot.ai',
        to: 'klaus.weber@bmw.de',
        body: 'Hi Klaus,\n\nConfirming our demo for Wednesday April 16 at 10:00 AM CET.\n\nI have prepared a custom demo environment with three simulated BMW dealers showing:\n1. Different greeting languages (German, English, Polish)\n2. Custom service menus per dealer\n3. Real-time appointment booking via API\n\nI am also working on getting you the API rate limit specs for 50k concurrent calls. Will have that before the demo.\n\nSee you Wednesday!\n\nBest,\nMax',
        timestamp: '2026-04-10 09:00',
        direction: 'outbound',
      },
    ],
  },
]

const bmwHITL: HITLQuery[] = [
  {
    id: 'hitl-bm-1',
    lead_id: 'lead-2',
    question: 'BMW needs support for 50,000 concurrent calls across 4,000 dealers. Our standard Enterprise tier supports 10k. What is the architecture and pricing for a dedicated cluster at 50k concurrent? Need answer before demo on Apr 16.',
    team: 'product',
    status: 'open',
    slack_thread_id: 'C04-product-5678',
    asked_at: '2026-04-09 10:00',
  },
]

const bmwActivities: Activity[] = [
  { id: 'a-bm-1', lead_id: 'lead-2', type: 'email_sent', summary: 'Cold outreach email sent to Klaus Weber, CTO at BMW.', timestamp: '2026-04-02 09:00' },
  { id: 'a-bm-2', lead_id: 'lead-2', type: 'email_received', summary: 'Klaus responded positively. Wants a 30-min technical call.', timestamp: '2026-04-04 16:22' },
  { id: 'a-bm-3', lead_id: 'lead-2', type: 'email_sent', summary: 'Confirmed call for Apr 8. Shared automotive case study.', timestamp: '2026-04-05 08:15' },
  { id: 'a-bm-4', lead_id: 'lead-2', type: 'call', summary: 'Technical deep-dive with Klaus. 4k dealers, need multi-tenant setup. Asked about 50k concurrent call limits.', timestamp: '2026-04-08 15:30' },
  { id: 'a-bm-5', lead_id: 'lead-2', type: 'stage_change', summary: 'Stage changed from New to Qualified. Strong technical fit.', timestamp: '2026-04-08 16:00' },
  { id: 'a-bm-6', lead_id: 'lead-2', type: 'hitl_created', summary: 'HITL query sent to product team: architecture for 50k concurrent calls.', timestamp: '2026-04-09 10:00' },
  { id: 'a-bm-7', lead_id: 'lead-2', type: 'demo_scheduled', summary: 'Demo scheduled for Apr 16 — multi-tenant dealer setup.', timestamp: '2026-04-10 09:00' },
  { id: 'a-bm-8', lead_id: 'lead-2', type: 'email_sent', summary: 'Demo confirmation email sent with agenda.', timestamp: '2026-04-10 09:00' },
]

// ──────────────────────────────────────────────────
// LEAD 3: Siemens — Won
// ──────────────────────────────────────────────────
const siemensCalls: Call[] = [
  {
    id: 'c-si-1',
    lead_id: 'lead-3',
    date: '2026-02-10 09:00',
    duration: '19:45',
    outcome: 'Inbound inquiry, qualified',
    transcript: `Agent: Good morning, Happier Robot, this is Max speaking.

Anna Schmidt: Hi Max, I am Anna Schmidt, Head of Customer Service at Siemens Digital Industries. We are looking to modernize our technical support line.

Agent: Welcome Anna. Siemens is a great fit for our platform. Can you tell me about your current setup?

Anna Schmidt: We handle about eight thousand technical support calls per day. Mostly engineers calling about PLC programming issues, drive configuration, and warranty questions. Our first level support is overwhelmed.

Agent: Technical support is one of our strongest verticals. The AI can handle diagnostic trees, lookup warranty status, and guide engineers through configuration steps. What is your current first call resolution rate?

Anna Schmidt: About forty five percent. We want to get it above sixty percent.

Agent: We typically see a fifteen to twenty percentage point improvement. For Siemens specifically, we could train the model on your product documentation and knowledge base. Does your team use ServiceNow or a similar ticketing system?

Anna Schmidt: Yes, ServiceNow. We need the AI to create tickets automatically when it cannot resolve an issue.

Agent: We have a native ServiceNow integration. The AI creates tickets with full context from the call, including any diagnostic steps already attempted. This saves the level two engineer about five minutes per ticket.

Anna Schmidt: That sounds exactly what we need. What is the next step?

Agent: I would recommend a demo focused on technical support scenarios. I can prepare some PLC-related call flows. How does next week look?

Anna Schmidt: Next Tuesday works. Let us do ten AM.

Agent: Perfect. I will send the invite. Thank you Anna.`,
  },
  {
    id: 'c-si-2',
    lead_id: 'lead-3',
    date: '2026-02-18 10:00',
    duration: '42:30',
    outcome: 'Demo completed, very positive',
    transcript: `Agent: Good morning Anna, welcome to the demo. I have prepared three technical support scenarios based on Siemens products.

Anna Schmidt: Great, I have our IT Director Hans and our ServiceNow admin Petra joining.

Agent: Welcome Hans and Petra. Let me walk through the first scenario. This simulates an engineer calling about a SIMATIC S7 fifteen hundred PLC that is showing a communication fault. The AI identifies the error code, walks through the diagnostic steps, and if needed, creates a ServiceNow ticket with all the context.

Anna Schmidt: Can you show the ServiceNow ticket creation?

Agent: Absolutely. Watch the right panel. As the AI gathers information during the call, it pre-populates the ticket fields. When the call ends without resolution, it creates the ticket automatically. The level two engineer sees exactly what was discussed and what was already tried.

Hans: What about security? These calls might contain proprietary engineering data.

Agent: All data is encrypted in transit and at rest. We can set up a dedicated instance for Siemens in our Frankfurt data center. No data is shared between tenants and we can sign a custom DPA.

Petra: How does the ServiceNow integration work technically?

Agent: We use the ServiceNow REST API with OAuth two point zero authentication. We can map to your custom fields and we support mid-call ticket creation if the AI determines it needs to escalate.

Anna Schmidt: I am very impressed. Let us talk pricing.

Agent: For eight thousand calls per day, our Enterprise tier would be two hundred ten thousand euros annually. This includes the ServiceNow integration, German and English language support, and premium support with four-hour SLA.

Anna Schmidt: We will need to negotiate on pricing and I need to involve our legal team for the DPA. Can we set up a follow-up next week?

Agent: Of course. I will also prepare a draft DPA for your legal team to review.`,
  },
  {
    id: 'c-si-3',
    lead_id: 'lead-3',
    date: '2026-03-05 14:00',
    duration: '25:15',
    outcome: 'Negotiation round 1 - pricing and legal',
    transcript: `Agent: Hi Anna, how is the review going?

Anna Schmidt: Good news and some work to do. Our procurement team is on board with the concept but wants to negotiate the price down. They are targeting one hundred eighty thousand.

Agent: I appreciate the transparency. One hundred eighty thousand would be below our cost for the dedicated instance you need. What if we structure it as one hundred ninety five thousand for a two-year commitment?

Anna Schmidt: That could work. I need to check with procurement. The bigger issue right now is legal. Our DPA requires specific clauses about data sub-processors and data deletion timelines.

Agent: I understand. We sent the draft DPA last week. Have your legal team reviewed it?

Anna Schmidt: They have. They flagged two issues: one about sub-processor notification and one about the right to audit. Can we set up a call between our legal teams?

Agent: Absolutely. I will escalate this to our legal team and arrange a direct call. We are usually very flexible on DPA terms for enterprise clients.

Anna Schmidt: Good. Once legal is sorted, I think we can move quickly on the commercial side.

Agent: That is great to hear. Let me get the legal call scheduled this week.`,
  },
  {
    id: 'c-si-4',
    lead_id: 'lead-3',
    date: '2026-03-20 11:00',
    duration: '15:20',
    outcome: 'Final terms agreed, deal won',
    transcript: `Agent: Anna, great news on the legal front. I heard our teams aligned on all DPA terms yesterday.

Anna Schmidt: Yes, our legal team is satisfied. They signed off this morning. Now let us finalize the commercial terms.

Agent: Perfect. So we agreed on one hundred ninety five thousand euros for a two-year commitment, with the dedicated Frankfurt instance, ServiceNow integration, and premium support. Is that correct?

Anna Schmidt: Yes. Our procurement team approved the two-year structure. We are ready to sign.

Agent: Wonderful. I will send over the final contract today. Welcome to Happier Robot, Anna. We are excited to work with Siemens.

Anna Schmidt: Thank you Max. When can we start the implementation?

Agent: We can kick off next week. I will set up an onboarding call with our implementation team for Monday. They will walk through the timeline and milestones.

Anna Schmidt: Perfect. Looking forward to it.

Agent: One last thing, I will introduce you to your dedicated Customer Success Manager, Julia, who will be your main point of contact going forward.

Anna Schmidt: Sounds good. Thanks Max, this has been a smooth process.`,
  },
]

const siemensEmails: EmailThread[] = [
  {
    id: 'et-si-1',
    lead_id: 'lead-3',
    subject: 'Siemens x Happier Robot — Proposal & DPA',
    messages: [
      {
        id: 'em-si-1',
        from: 'agent@happierrobot.ai',
        to: 'anna.schmidt@siemens.com',
        body: 'Hi Anna,\n\nFollowing our demo, please find attached:\n1. Enterprise proposal for Siemens Digital Industries\n2. Draft Data Processing Agreement (DPA)\n3. Technical architecture document for the dedicated Frankfurt instance\n\nKey terms:\n- 8,000 calls/day capacity\n- ServiceNow integration included\n- German & English support\n- Annual pricing: EUR 210,000\n\nLooking forward to your feedback.\n\nBest,\nMax',
        timestamp: '2026-02-19 09:00',
        direction: 'outbound',
      },
      {
        id: 'em-si-2',
        from: 'anna.schmidt@siemens.com',
        to: 'agent@happierrobot.ai',
        body: 'Hi Max,\n\nProposal looks good. Two things:\n1. Procurement wants to discuss pricing — targeting EUR 180k\n2. Legal flagged issues with DPA sections 7.3 (sub-processors) and 9.1 (audit rights)\n\nCan we schedule a call to discuss both?\n\nBest,\nAnna',
        timestamp: '2026-02-26 11:30',
        direction: 'inbound',
      },
    ],
  },
  {
    id: 'et-si-2',
    lead_id: 'lead-3',
    subject: 'Re: Siemens DPA — Legal Team Alignment',
    messages: [
      {
        id: 'em-si-3',
        from: 'agent@happierrobot.ai',
        to: 'anna.schmidt@siemens.com',
        body: 'Hi Anna,\n\nGreat news! Our legal team has reviewed and accepted the amendments to sections 7.3 and 9.1 of the DPA. The revised document is attached.\n\nKey changes:\n- 30-day advance notification for sub-processor changes (up from 14 days)\n- Annual audit rights with 30-day notice period\n- Data deletion within 30 days of contract termination\n\nPlease have your legal team confirm and we can proceed to final commercial terms.\n\nBest,\nMax',
        timestamp: '2026-03-15 10:00',
        direction: 'outbound',
      },
    ],
  },
  {
    id: 'et-si-3',
    lead_id: 'lead-3',
    subject: 'Welcome to Happier Robot — Siemens Onboarding',
    messages: [
      {
        id: 'em-si-4',
        from: 'agent@happierrobot.ai',
        to: 'anna.schmidt@siemens.com',
        body: 'Hi Anna,\n\nCongratulations and welcome to Happier Robot! We are thrilled to have Siemens on board.\n\nHere is what happens next:\n1. Onboarding kickoff call: Monday March 24 at 10 AM\n2. Your CSM Julia Berger will reach out separately\n3. Technical integration timeline: 4 weeks\n4. Go-live target: April 21\n\nThe signed contract is attached for your records.\n\nLooking forward to a great partnership!\n\nBest,\nMax',
        timestamp: '2026-03-21 09:00',
        direction: 'outbound',
      },
    ],
  },
]

const siemensHITL: HITLQuery[] = [
  {
    id: 'hitl-si-1',
    lead_id: 'lead-3',
    question: 'Siemens legal requires amendments to DPA sections 7.3 (sub-processor notification from 14 to 30 days) and 9.1 (annual audit rights). Can our legal team accommodate?',
    team: 'legal',
    status: 'resolved_with_lead',
    answer: 'Legal approved both amendments. Revised DPA sent to Siemens. No impact on commercial terms.',
    slack_thread_id: 'C04-legal-9012',
    asked_at: '2026-03-06 09:00',
    answered_at: '2026-03-14 16:00',
  },
  {
    id: 'hitl-si-2',
    lead_id: 'lead-3',
    question: 'Siemens procurement wants EUR 180k (vs our quoted EUR 210k). What is the minimum we can accept for a 2-year deal with dedicated instance?',
    team: 'pricing',
    status: 'resolved_with_lead',
    answer: 'Floor price for dedicated instance is EUR 190k/yr. Approved EUR 195k for 2-year commitment. Below EUR 190k requires VP approval.',
    slack_thread_id: 'C04-pricing-3456',
    asked_at: '2026-03-05 15:00',
    answered_at: '2026-03-07 10:00',
  },
]

const siemensActivities: Activity[] = [
  { id: 'a-si-1', lead_id: 'lead-3', type: 'call', summary: 'Inbound call from Anna Schmidt, Head of CS at Siemens. 8k tech support calls/day. Demo scheduled.', timestamp: '2026-02-10 09:00' },
  { id: 'a-si-2', lead_id: 'lead-3', type: 'stage_change', summary: 'Stage changed from New to Qualified.', timestamp: '2026-02-10 09:30' },
  { id: 'a-si-3', lead_id: 'lead-3', type: 'call', summary: 'Demo completed with Anna, IT Director Hans, and ServiceNow admin Petra. Very positive.', timestamp: '2026-02-18 10:00' },
  { id: 'a-si-4', lead_id: 'lead-3', type: 'email_sent', summary: 'Sent proposal and draft DPA. EUR 210k annual.', timestamp: '2026-02-19 09:00' },
  { id: 'a-si-5', lead_id: 'lead-3', type: 'email_received', summary: 'Anna responded — pricing pushback (EUR 180k target) and DPA legal issues.', timestamp: '2026-02-26 11:30' },
  { id: 'a-si-6', lead_id: 'lead-3', type: 'stage_change', summary: 'Stage changed from Qualified to Negotiation.', timestamp: '2026-02-26 12:00' },
  { id: 'a-si-7', lead_id: 'lead-3', type: 'call', summary: 'Negotiation call. Offered EUR 195k on 2-year commitment. Legal escalation initiated.', timestamp: '2026-03-05 14:00' },
  { id: 'a-si-8', lead_id: 'lead-3', type: 'hitl_created', summary: 'HITL query to pricing: minimum price for Siemens 2-year dedicated instance.', timestamp: '2026-03-05 15:00' },
  { id: 'a-si-9', lead_id: 'lead-3', type: 'hitl_created', summary: 'HITL query to legal: DPA amendment requests from Siemens.', timestamp: '2026-03-06 09:00' },
  { id: 'a-si-10', lead_id: 'lead-3', type: 'hitl_answered', summary: 'Pricing team approved EUR 195k floor on 2-year deal.', timestamp: '2026-03-07 10:00' },
  { id: 'a-si-11', lead_id: 'lead-3', type: 'hitl_answered', summary: 'Legal approved DPA amendments for sub-processor notification and audit rights.', timestamp: '2026-03-14 16:00' },
  { id: 'a-si-12', lead_id: 'lead-3', type: 'email_sent', summary: 'Sent revised DPA with accepted amendments to Siemens legal.', timestamp: '2026-03-15 10:00' },
  { id: 'a-si-13', lead_id: 'lead-3', type: 'call', summary: 'Final negotiation call. All terms agreed. EUR 195k/yr, 2-year deal. Contract to be signed.', timestamp: '2026-03-20 11:00' },
  { id: 'a-si-14', lead_id: 'lead-3', type: 'deal_won', summary: 'Deal won! Siemens signed 2-year contract at EUR 195k/yr. Total deal value EUR 390k.', timestamp: '2026-03-20 16:00' },
  { id: 'a-si-15', lead_id: 'lead-3', type: 'email_sent', summary: 'Welcome email sent with onboarding schedule. Go-live target: April 21.', timestamp: '2026-03-21 09:00' },
]

// ──────────────────────────────────────────────────
// LEAD 4: Munich Re — Lost
// ──────────────────────────────────────────────────
const munichReCalls: Call[] = [
  {
    id: 'c-mr-1',
    lead_id: 'lead-4',
    date: '2026-03-12 11:00',
    duration: '20:30',
    outcome: 'Initial qualification call',
    transcript: `Agent: Hello Thomas, this is Max from Happier Robot. Thank you for responding to our email. How can I help you today?

Thomas Berger: Hi Max. I am the Director of Operations at Munich Re. We are exploring AI voice solutions for our reinsurance broker support line. About three thousand calls per day.

Agent: Interesting use case Thomas. Reinsurance is a specialized domain. Can you walk me through what the calls typically look like?

Thomas Berger: Mostly brokers calling to check on treaty status, submit loss notifications, and ask questions about coverage terms. Very technical language with a lot of industry-specific terminology.

Agent: We have experience in insurance, though reinsurance is more specialized. We would need to do a custom training phase with your terminology and processes. How quickly are you looking to implement?

Thomas Berger: Ideally by end of Q two. We have board pressure to reduce operational costs by fifteen percent.

Agent: That is an aggressive timeline but potentially doable for a focused use case. What is your budget range?

Thomas Berger: We are looking at one hundred to one hundred fifty thousand per year. We are evaluating three vendors including Bland AI and Cognigy.

Agent: I appreciate the transparency. Let me put together a proposal and schedule a demo. We can show you how we handle insurance-specific terminology.

Thomas Berger: Sounds good. But I should mention that Bland AI has already done a demo and they were quite impressive on the multilingual front. We need German, English, and Japanese for our Tokyo office.

Agent: We support all three. Let me make sure the demo highlights our multilingual capabilities. How does next Thursday work?

Thomas Berger: Thursday works. Two PM.`,
  },
  {
    id: 'c-mr-2',
    lead_id: 'lead-4',
    date: '2026-03-25 14:00',
    duration: '32:00',
    outcome: 'Demo done, competitive pressure from Bland AI',
    transcript: `Agent: Thomas, welcome to the demo. I have prepared scenarios around treaty management and loss notification intake.

Thomas Berger: Thanks Max. I have our Head of IT Sabine and our Tokyo office lead Yuki joining.

Agent: Great. Let me start with the treaty status check scenario. A broker calls asking about a specific treaty. The AI identifies the broker, looks up the treaty, and provides real-time status including the latest endorsements.

Thomas Berger: How does it handle the Japanese language calls?

Agent: Let me switch to the Japanese scenario. This simulates a call from your Tokyo office where a broker is asking about a catastrophe loss notification in Japanese.

Yuki: The Japanese is good but there are some issues with the technical reinsurance terminology. It said saihoken instead of the correct term saihokengyo for reinsurance operations.

Agent: That is a great catch Yuki. Those terminology issues would be resolved during the custom training phase where we train on your specific vocabulary. This typically takes two to three weeks.

Thomas Berger: I have to be honest Max. Bland AI did their demo last week and their Japanese was more polished out of the box. They also came in at a lower price point.

Agent: I appreciate the honesty. Can I ask what Bland quoted?

Thomas Berger: They quoted ninety thousand per year. And they can start immediately with a pre-built insurance module.

Agent: That is significantly lower than our Enterprise pricing. Let me see what we can do. Our platform is more customizable and has stronger compliance features which matters in reinsurance. But I understand price is a factor.

Thomas Berger: The compliance point is valid. But Sabine, what do you think about the technical comparison?

Sabine: Both platforms are capable. Bland AI has a slight edge on out-of-the-box insurance features. Happier Robot has better API flexibility.

Thomas Berger: OK Max, send us your best offer by end of week. We need to make a decision by April first.

Agent: Understood. I will have it to you by Thursday.`,
  },
]

const munichReEmails: EmailThread[] = [
  {
    id: 'et-mr-1',
    lead_id: 'lead-4',
    subject: 'AI Voice Solutions for Munich Re — Introduction',
    messages: [
      {
        id: 'em-mr-1',
        from: 'agent@happierrobot.ai',
        to: 'thomas.berger@munichre.com',
        body: 'Hi Thomas,\n\nI am reaching out because Munich Re has been a pioneer in digital transformation in the reinsurance space. Our AI voice platform helps insurers and reinsurers automate broker support, claims intake, and policy inquiries.\n\nWould you be interested in a brief call to explore how we could help Munich Re reduce operational costs while maintaining the specialized service your brokers expect?\n\nBest,\nMax\nHappier Robot',
        timestamp: '2026-03-05 09:00',
        direction: 'outbound',
      },
      {
        id: 'em-mr-2',
        from: 'thomas.berger@munichre.com',
        to: 'agent@happierrobot.ai',
        body: 'Max,\n\nThanks for reaching out. Good timing — we are evaluating solutions right now. Let us schedule a call.\n\nAvailable next Thursday morning.\n\nThomas Berger\nDirector of Operations, Munich Re',
        timestamp: '2026-03-07 15:45',
        direction: 'inbound',
      },
    ],
  },
  {
    id: 'et-mr-2',
    lead_id: 'lead-4',
    subject: 'Re: Munich Re — Decision Update',
    messages: [
      {
        id: 'em-mr-3',
        from: 'thomas.berger@munichre.com',
        to: 'agent@happierrobot.ai',
        body: 'Hi Max,\n\nThank you for the revised proposal and for accommodating our timeline. After careful evaluation, we have decided to move forward with Bland AI for this project.\n\nThe key factors were:\n1. Lower total cost (EUR 90k vs your EUR 140k)\n2. Pre-built insurance module with Japanese language support\n3. Faster time to deployment\n\nYour platform is technically superior in several areas and we may revisit for future projects. I appreciate the professional engagement throughout.\n\nBest regards,\nThomas',
        timestamp: '2026-04-02 10:00',
        direction: 'inbound',
      },
    ],
  },
]

const munichReHITL: HITLQuery[] = []

const munichReActivities: Activity[] = [
  { id: 'a-mr-1', lead_id: 'lead-4', type: 'email_sent', summary: 'Cold outreach email to Thomas Berger, Director of Ops at Munich Re.', timestamp: '2026-03-05 09:00' },
  { id: 'a-mr-2', lead_id: 'lead-4', type: 'email_received', summary: 'Thomas responded — interested, wants to schedule a call.', timestamp: '2026-03-07 15:45' },
  { id: 'a-mr-3', lead_id: 'lead-4', type: 'call', summary: 'Qualification call. 3k calls/day, reinsurance domain. Evaluating Bland AI and Cognigy.', timestamp: '2026-03-12 11:00' },
  { id: 'a-mr-4', lead_id: 'lead-4', type: 'stage_change', summary: 'Stage changed from New to Qualified.', timestamp: '2026-03-12 11:30' },
  { id: 'a-mr-5', lead_id: 'lead-4', type: 'demo_scheduled', summary: 'Demo scheduled for Mar 25 — treaty management and loss notifications.', timestamp: '2026-03-13 09:00' },
  { id: 'a-mr-6', lead_id: 'lead-4', type: 'call', summary: 'Demo completed. Competitive pressure from Bland AI at EUR 90k. Japanese terminology issues flagged.', timestamp: '2026-03-25 14:00' },
  { id: 'a-mr-7', lead_id: 'lead-4', type: 'stage_change', summary: 'Stage changed from Qualified to Negotiation.', timestamp: '2026-03-25 15:00' },
  { id: 'a-mr-8', lead_id: 'lead-4', type: 'email_received', summary: 'Thomas informed us they chose Bland AI. Lower cost and faster deployment were deciding factors.', timestamp: '2026-04-02 10:00' },
  { id: 'a-mr-9', lead_id: 'lead-4', type: 'deal_lost', summary: 'Deal lost to Bland AI. EUR 90k vs our EUR 140k. Pre-built insurance module was a differentiator.', timestamp: '2026-04-02 10:00' },
  { id: 'a-mr-10', lead_id: 'lead-4', type: 'stage_change', summary: 'Stage changed from Negotiation to Lost.', timestamp: '2026-04-02 10:05' },
]

// ──────────────────────────────────────────────────
// LEAD 5: SAP — Follow-up, Progressing
// ──────────────────────────────────────────────────
const sapCalls: Call[] = [
  {
    id: 'c-sa-1',
    lead_id: 'lead-5',
    date: '2026-04-01 10:00',
    duration: '24:00',
    outcome: 'Inbound inquiry, qualified',
    transcript: `Agent: Good morning, Happier Robot. This is Max.

Lisa Chen: Hi Max, Lisa Chen here, Product Owner at SAP for our internal IT helpdesk. We are looking to automate our tier one IT support calls.

Agent: Hi Lisa, great to hear from SAP. Internal IT helpdesk is an interesting use case. Can you tell me about the volume and types of calls?

Lisa Chen: We have about twelve hundred calls per day internally. Password resets, VPN issues, software installation requests, hardware requests. The usual IT stuff.

Agent: Classic IT helpdesk automation. We have done this for several large enterprises. What system do you use for ticketing?

Lisa Chen: We use SAP Service Cloud, naturally. And our identity management is through SAP Identity Authentication Service.

Agent: Makes sense. We have built SAP Service Cloud integrations before. The identity management integration would be important for things like password resets and access requests. How are you handling password resets today?

Lisa Chen: An employee calls, verifies their identity with their employee ID and manager name, and then a helpdesk agent manually resets it in the system. It takes about five minutes per call. We get about three hundred password reset calls per day.

Agent: Three hundred password resets at five minutes each. That is twenty five hours of agent time per day just for password resets. Our AI can handle that in about ninety seconds per call with proper identity verification. The ROI on that alone is significant.

Lisa Chen: Exactly what our business case shows. What about SCIM provisioning? We need the AI to trigger SCIM workflows for access requests.

Agent: SCIM is on our roadmap but not in production yet. I would need to check the timeline with our product team. Can I get back to you on that?

Lisa Chen: Please do. That is a key requirement for us.

Agent: Understood. Let me also schedule a demo. We can show you the password reset flow and the SAP Service Cloud integration. How does next week look?

Lisa Chen: Next Wednesday works. Ten AM.

Agent: Perfect. I will have the SCIM timeline answer before then too.`,
  },
  {
    id: 'c-sa-2',
    lead_id: 'lead-5',
    date: '2026-04-09 10:00',
    duration: '30:15',
    outcome: 'Demo done, needs stakeholder alignment',
    transcript: `Agent: Lisa, welcome to the demo. I also have an update on the SCIM question.

Lisa Chen: Great, let us hear the SCIM update first.

Agent: So I spoke with our product team. SCIM provisioning support is planned for Q three this year, specifically the August release. It is in active development. For your go-live, we could support basic SCIM read operations, but full provisioning workflows would come in the August update.

Lisa Chen: Hmm. That is later than ideal. We were hoping to go live with the full feature set by July. Let me think about whether we can phase the rollout.

Agent: That is a reasonable approach. We could go live in June with password resets, VPN troubleshooting, and software requests. Then add the SCIM-based access provisioning in August when it is ready.

Lisa Chen: That could work. Let me run it by our IT Director. He is the final decision maker.

Agent: Of course. Now let me show you the demo. I have prepared three scenarios. First, the password reset flow.

Lisa Chen: Go ahead.

Agent: In this scenario, an employee calls about a forgotten password. The AI verifies their identity using employee ID and a security question, then triggers the password reset via your SAP Identity Authentication API. The employee gets an SMS with a temporary password within thirty seconds.

Lisa Chen: That is smooth. Can it also handle the multi factor authentication setup?

Agent: Not yet in the demo, but we can configure that. The AI would guide the employee through setting up their authenticator app and verify the first code.

Lisa Chen: Good. I need to discuss this with my director and our security team. Can we reconnect in about a week?

Agent: Absolutely. Take the time you need. I will send you a summary of today's demo and the SCIM timeline for your internal discussions.

Lisa Chen: Thanks Max. I will be in touch.`,
  },
]

const sapEmails: EmailThread[] = [
  {
    id: 'et-sa-1',
    lead_id: 'lead-5',
    subject: 'Happier Robot x SAP — Demo Summary & SCIM Timeline',
    messages: [
      {
        id: 'em-sa-1',
        from: 'agent@happierrobot.ai',
        to: 'lisa.chen@sap.com',
        body: 'Hi Lisa,\n\nThank you for the great demo session today. Here is a summary for your internal discussions:\n\n1. Password Reset Flow: Fully automated, 90-second average handle time (vs 5 min today)\n2. VPN Troubleshooting: Guided diagnostic with automatic ticket creation\n3. Software Installation: Self-service catalog with approval workflows\n\nSCIM Timeline:\n- Basic SCIM read: Available at launch (June)\n- Full SCIM provisioning: August release (Q3)\n- Phased approach recommended\n\nPricing for 1,200 calls/day: EUR 96,000/year (Enterprise tier)\n\nHappy to answer any questions from your director or security team.\n\nBest,\nMax',
        timestamp: '2026-04-09 15:00',
        direction: 'outbound',
      },
    ],
  },
  {
    id: 'et-sa-2',
    lead_id: 'lead-5',
    subject: 'Re: SAP Internal Review — Follow-up',
    messages: [
      {
        id: 'em-sa-2',
        from: 'lisa.chen@sap.com',
        to: 'agent@happierrobot.ai',
        body: 'Hi Max,\n\nQuick update. I presented to our IT Director and he is interested but wants to see a more detailed security assessment. Our CISO team has a standard vendor security questionnaire they need completed.\n\nCan you fill that out? I will send it over.\n\nAlso, the SCIM timeline is a concern but the phased approach could work if we can get a commitment on the August date.\n\nLisa',
        timestamp: '2026-04-14 10:30',
        direction: 'inbound',
      },
      {
        id: 'em-sa-3',
        from: 'agent@happierrobot.ai',
        to: 'lisa.chen@sap.com',
        body: 'Hi Lisa,\n\nThanks for the update! Happy to complete the security questionnaire. Please send it over and we will turn it around within 3 business days.\n\nRegarding the SCIM commitment: I have confirmed with our product team that the August release date is firm. We can include a contractual SLA for the SCIM delivery date.\n\nLet me know if there is anything else your director or CISO team needs.\n\nBest,\nMax',
        timestamp: '2026-04-14 14:00',
        direction: 'outbound',
      },
    ],
  },
]

const sapHITL: HITLQuery[] = [
  {
    id: 'hitl-sa-1',
    lead_id: 'lead-5',
    question: 'SAP needs SCIM provisioning support for their IT helpdesk use case. They want to go live in July. What is the exact timeline for SCIM provisioning in our product roadmap?',
    team: 'product',
    status: 'answered',
    answer: 'SCIM provisioning is in active development. Basic SCIM read operations available now. Full provisioning workflows (create/update/delete users, group management) targeted for August 2026 release. Date is firm — already committed to two other Enterprise customers.',
    slack_thread_id: 'C04-product-7890',
    asked_at: '2026-04-02 14:00',
    answered_at: '2026-04-03 10:00',
  },
]

const sapActivities: Activity[] = [
  { id: 'a-sa-1', lead_id: 'lead-5', type: 'call', summary: 'Inbound call from Lisa Chen, Product Owner at SAP. IT helpdesk automation for 1.2k calls/day.', timestamp: '2026-04-01 10:00' },
  { id: 'a-sa-2', lead_id: 'lead-5', type: 'stage_change', summary: 'Stage changed from New to Qualified.', timestamp: '2026-04-01 10:30' },
  { id: 'a-sa-3', lead_id: 'lead-5', type: 'hitl_created', summary: 'HITL query to product: SCIM provisioning timeline for SAP.', timestamp: '2026-04-02 14:00' },
  { id: 'a-sa-4', lead_id: 'lead-5', type: 'hitl_answered', summary: 'Product confirmed SCIM provisioning in August 2026 release.', timestamp: '2026-04-03 10:00' },
  { id: 'a-sa-5', lead_id: 'lead-5', type: 'demo_scheduled', summary: 'Demo scheduled for Apr 9 — IT helpdesk scenarios.', timestamp: '2026-04-03 11:00' },
  { id: 'a-sa-6', lead_id: 'lead-5', type: 'call', summary: 'Demo completed. Lisa needs to check with stakeholders. SCIM phased approach discussed.', timestamp: '2026-04-09 10:00' },
  { id: 'a-sa-7', lead_id: 'lead-5', type: 'email_sent', summary: 'Demo summary sent with SCIM timeline and pricing (EUR 96k/yr).', timestamp: '2026-04-09 15:00' },
  { id: 'a-sa-8', lead_id: 'lead-5', type: 'stage_change', summary: 'Stage changed from Qualified to Follow-up. Waiting for stakeholder alignment.', timestamp: '2026-04-10 09:00' },
  { id: 'a-sa-9', lead_id: 'lead-5', type: 'email_received', summary: 'Lisa update: IT Director interested, CISO needs security questionnaire completed.', timestamp: '2026-04-14 10:30' },
  { id: 'a-sa-10', lead_id: 'lead-5', type: 'email_sent', summary: 'Offered to complete security questionnaire. Confirmed SCIM August date with contractual SLA.', timestamp: '2026-04-14 14:00' },
]

// ──────────────────────────────────────────────────
// LEAD 6: Delivery Hero — New, Progressing
// ──────────────────────────────────────────────────
const deliveryHeroCalls: Call[] = [
  {
    id: 'c-dh-1',
    lead_id: 'lead-6',
    date: '2026-04-17 16:00',
    duration: '15:20',
    outcome: 'Initial intro call, early stage',
    transcript: `Agent: Good afternoon, Happier Robot. This is Max.

Marco Rossi: Hey Max, Marco Rossi here. I am VP of Engineering at Delivery Hero. I came across your platform at a conference last week and wanted to learn more.

Agent: Hi Marco, thanks for reaching out. Delivery Hero is a great company. What specifically caught your attention at the conference?

Marco Rossi: We saw your demo of the restaurant partner support agent. We have a massive problem with restaurant onboarding calls. We onboard about five hundred new restaurants per week across twelve markets and each one needs a forty five minute call to set up their account, menu, and delivery zones.

Agent: Five hundred restaurants per week with forty five minute calls each. That is a significant operational burden. How many agents do you have handling onboarding?

Marco Rossi: About eighty. And it is our highest churn role because it is repetitive work.

Agent: The restaurant onboarding use case is perfect for AI. We can automate the structured parts like data collection, menu setup, and zone configuration while keeping a human in the loop for edge cases. Have you tried any automation before?

Marco Rossi: We built a basic chatbot but restaurants prefer talking over the phone. Especially the smaller ones who are not tech savvy.

Agent: Makes sense. Voice is still the preferred channel for that segment. What markets are your priorities?

Marco Rossi: Germany, Turkey, and the Middle East are our biggest. So we need German, Turkish, and Arabic support.

Agent: We support German and Arabic natively. Turkish is supported but I would want to verify the quality for technical restaurant terminology. Can I set up a quick test?

Marco Rossi: Sure. But let us not get ahead of ourselves. I am in early exploration mode. I just wanted to understand the capabilities. Can you send me some materials and maybe we schedule a proper demo in two weeks?

Agent: Absolutely. I will send you a case study from a similar marketplace platform and our capability overview. Then we can schedule the demo when you are ready.

Marco Rossi: Sounds good. Thanks Max.

Agent: Thank you Marco. Talk soon.`,
  },
]

const deliveryHeroEmails: EmailThread[] = []
const deliveryHeroHITL: HITLQuery[] = []

const deliveryHeroActivities: Activity[] = [
  { id: 'a-dh-1', lead_id: 'lead-6', type: 'call', summary: 'Inbound call from Marco Rossi, VP Eng at Delivery Hero. Restaurant onboarding use case — 500 restaurants/week.', timestamp: '2026-04-17 16:00' },
  { id: 'a-dh-2', lead_id: 'lead-6', type: 'stage_change', summary: 'New lead created. Early exploration stage.', timestamp: '2026-04-17 16:20' },
]

// ──────────────────────────────────────────────────
// LEAD 7: Flixbus — Unqualified, No Decision
// ──────────────────────────────────────────────────
const flixbusCalls: Call[] = [
  {
    id: 'c-fb-1',
    lead_id: 'lead-7',
    date: '2026-04-10 14:00',
    duration: '12:45',
    outcome: 'Interest but timing not right',
    transcript: `Agent: Good afternoon, Happier Robot. Max speaking.

Sarah Kim: Hi Max. Sarah Kim, Head of CX at Flixbus. We are thinking about AI for our customer service line but honestly it is more of a next quarter thing for us.

Agent: No worries Sarah. It is good to start exploring early. Can you tell me what you are dealing with today?

Sarah Kim: We get about six thousand calls per day. Mostly booking changes, cancellations, and delay information. We have a team of about a hundred and twenty agents across three call centers.

Agent: Those are very automatable call types. Booking changes and cancellations can typically be fully automated. Delay information can be pulled from your operations system in real time. What is driving the interest?

Sarah Kim: Cost pressure mostly. Our board wants to reduce CX costs by twenty percent next year. But we also want to improve CSAT which has been declining.

Agent: The good news is that AI typically improves both. Faster resolution times lead to higher CSAT and lower costs. What is your current CSAT score?

Sarah Kim: About three point eight out of five. We want to get to four point two.

Agent: We have helped similar companies achieve that improvement. But I understand the timing. Is there a budget allocated for next quarter?

Sarah Kim: Not yet. We are doing the business case now. The earliest we could move would be Q four this year, maybe Q one next year.

Agent: That is fine. Let me send you some materials and a rough ROI estimate based on your numbers. When the time comes, we can schedule a proper demo.

Sarah Kim: That would be helpful. Thanks Max.

Agent: One question — would you like me to check in next quarter, say July, to revisit?

Sarah Kim: Yes, July would be good. Set a reminder.

Agent: Will do. Thanks Sarah, talk in July.`,
  },
]

const flixbusEmails: EmailThread[] = [
  {
    id: 'et-fb-1',
    lead_id: 'lead-7',
    subject: 'Happier Robot — CX Automation Overview for Flixbus',
    messages: [
      {
        id: 'em-fb-1',
        from: 'agent@happierrobot.ai',
        to: 'sarah.kim@flixbus.com',
        body: 'Hi Sarah,\n\nGreat speaking with you today. As promised, here is a high-level overview of how AI voice agents can help Flixbus:\n\nBased on your 6,000 calls/day:\n- Estimated 60-70% automation rate for booking changes, cancellations, and delay info\n- Projected cost reduction: EUR 1.8M annually\n- Expected CSAT improvement: +0.3-0.5 points\n\nI have attached a detailed ROI analysis and two case studies from transportation companies.\n\nI will check in with you in July as discussed. In the meantime, feel free to reach out if anything changes.\n\nBest,\nMax\nHappier Robot',
        timestamp: '2026-04-10 17:00',
        direction: 'outbound',
      },
    ],
  },
]

const flixbusHITL: HITLQuery[] = []

const flixbusActivities: Activity[] = [
  { id: 'a-fb-1', lead_id: 'lead-7', type: 'call', summary: 'Inbound call from Sarah Kim, Head of CX at Flixbus. Interested but timing is Q4/Q1 next year.', timestamp: '2026-04-10 14:00' },
  { id: 'a-fb-2', lead_id: 'lead-7', type: 'stage_change', summary: 'Marked as Unqualified — timing not right, no budget allocated.', timestamp: '2026-04-10 14:15' },
  { id: 'a-fb-3', lead_id: 'lead-7', type: 'email_sent', summary: 'Sent CX automation overview with ROI analysis. Follow-up scheduled for July.', timestamp: '2026-04-10 17:00' },
]

// ──────────────────────────────────────────────────
// LEAD 8: N26 — On Hold, Blocked
// ──────────────────────────────────────────────────
const n26Calls: Call[] = [
  {
    id: 'c-n26-1',
    lead_id: 'lead-8',
    date: '2026-03-01 10:00',
    duration: '18:30',
    outcome: 'Inbound inquiry, qualified',
    transcript: `Agent: Good morning, Happier Robot. Max here.

Jan Mueller: Hi Max. Jan Mueller, CTO at N26. We need an AI voice agent for our customer authentication and fraud alert calls.

Agent: Hi Jan. N26 is a great fit. Banking use cases are one of our strongest areas. Tell me more about the fraud alert workflow.

Jan Mueller: When our fraud detection system flags a suspicious transaction, we need to call the customer immediately to verify. Right now a human agent makes that call. We get about eight hundred fraud alerts per day and the volume is growing.

Agent: Speed is critical in fraud prevention. Our AI can make outbound calls within seconds of a fraud alert trigger. The AI would verify the customer identity, describe the suspicious transaction, and get a confirm or deny. If denied, it can immediately lock the account.

Jan Mueller: Exactly what we need. But we are a licensed bank regulated by BaFin. Any vendor handling customer data needs to meet very specific compliance requirements.

Agent: Understood. BaFin compliance is something we have encountered before with other fintech clients. What specific requirements are you most concerned about?

Jan Mueller: Mainly the MaRisk guidelines for outsourcing IT services. We need to demonstrate that the AI vendor meets the same security standards as our internal systems. And there is the question of whether an AI making outbound calls counts as automated decision making under GDPR.

Agent: Those are important questions. On the MaRisk side, we have a compliance documentation package. On the GDPR automated decision making question, I would need to consult with our legal team. This is a nuanced area.

Jan Mueller: OK. Can you send me the compliance documentation and get a legal opinion on the GDPR question?

Agent: Absolutely. I will prioritize this. Let me also schedule a technical demo. How does next week work?

Jan Mueller: Next Wednesday. But Max, I want to be clear — we cannot move forward until the legal and compliance questions are fully resolved. Our compliance team has veto power.

Agent: Completely understood. Let me get those answers as quickly as possible.`,
  },
  {
    id: 'c-n26-2',
    lead_id: 'lead-8',
    date: '2026-03-12 10:00',
    duration: '35:00',
    outcome: 'Demo + compliance discussion',
    transcript: `Agent: Jan, welcome to the demo. I have also invited our Head of Compliance, Sarah, to join and address the regulatory questions.

Jan Mueller: Good. I have our Chief Compliance Officer Robert and our Head of IT Security Maria joining as well.

Agent: Great. Let me first show the fraud alert call flow, then we will dive into compliance.

Jan Mueller: Go ahead.

Agent: In this scenario, the fraud detection system sends a webhook to our platform. Within two seconds, the AI initiates an outbound call to the customer. It verifies identity using date of birth and the last four digits of their IBAN. Then it describes the flagged transaction and asks for confirmation.

Robert: How is the customer data handled during the call? Where is the PII stored?

Sarah from our team: Robert, great question. All PII is encrypted in transit using TLS one point three and at rest using AES two fifty six. Data is stored in our Frankfurt data center and we process data only for the duration needed. PII is purged within twenty four hours unless there is a legal hold.

Maria: What about call recordings? BaFin requires certain calls to be recorded.

Sarah: We record all calls and store recordings encrypted for up to seven years, configurable to your requirements. The recordings are stored in a separate encrypted vault with access controls.

Robert: Now about the automated decision making question. If the AI locks an account based on a customer saying the transaction is not theirs, does that constitute automated decision making under Article twenty two of GDPR?

Sarah: Our legal analysis is that this does not constitute solely automated decision making because the customer is actively participating in the decision. The AI is facilitating the customer's own instruction to lock the account. However, we recommend adding a confirmation step and providing the customer with an option to speak to a human agent at any point.

Robert: I need to review this with our DPO. That interpretation is reasonable but we need our own legal sign-off.

Jan Mueller: Max, how long do these compliance reviews usually take with banks?

Agent: In our experience, four to eight weeks for the full review including BaFin notification. We can support the process with our compliance documentation and our team is available for any follow-up questions.

Jan Mueller: OK. Let us proceed with the compliance review. But I want to be realistic — this might take longer with BaFin given the AI angle. They have been cautious about AI in banking.

Agent: Understood. We will support wherever we can.`,
  },
  {
    id: 'c-n26-3',
    lead_id: 'lead-8',
    date: '2026-04-05 11:00',
    duration: '10:15',
    outcome: 'Blocked on BaFin compliance, on hold',
    transcript: `Agent: Jan, any update on the compliance review?

Jan Mueller: Yes but not great news. Our compliance team submitted the vendor assessment to BaFin and they came back with additional questions. Specifically about the AI model governance and how we ensure the AI does not make biased decisions in fraud alerts.

Agent: AI model governance is a fair concern. We have documentation on our model testing, bias monitoring, and audit trails. I can send that over.

Jan Mueller: Please do. But Jan, I have to be honest, BaFin is being very thorough on this. Our CCO Robert thinks it could take another six to eight weeks before we get clearance.

Agent: I understand. This is not uncommon with financial regulators. Should we put the commercial discussions on hold until the compliance review is complete?

Jan Mueller: Yes, that is the right approach. I do not want to waste your time or ours negotiating terms if we cannot get regulatory clearance.

Agent: Makes sense. I will send the AI governance documentation today and our team remains available for any questions from BaFin. Let us reconnect in six weeks.

Jan Mueller: Agreed. Thanks for understanding Max.`,
  },
]

const n26Emails: EmailThread[] = [
  {
    id: 'et-n26-1',
    lead_id: 'lead-8',
    subject: 'N26 x Happier Robot — Compliance Documentation',
    messages: [
      {
        id: 'em-n26-1',
        from: 'agent@happierrobot.ai',
        to: 'jan.mueller@n26.com',
        body: 'Hi Jan,\n\nFollowing our call, please find attached:\n1. MaRisk Outsourcing Compliance Package\n2. ISO 27001 Certificate\n3. SOC 2 Type II Report\n4. GDPR Data Processing Agreement (draft)\n5. Legal opinion on AI-assisted fraud calls and GDPR Art. 22\n\nOur Head of Compliance Sarah is available to discuss any of these documents with your CCO Robert.\n\nBest,\nMax',
        timestamp: '2026-03-02 14:00',
        direction: 'outbound',
      },
    ],
  },
  {
    id: 'et-n26-2',
    lead_id: 'lead-8',
    subject: 'Re: N26 BaFin Review — AI Governance Docs',
    messages: [
      {
        id: 'em-n26-2',
        from: 'agent@happierrobot.ai',
        to: 'jan.mueller@n26.com',
        body: 'Hi Jan,\n\nAs discussed, here is our AI Model Governance Framework document. It covers:\n- Model training data sources and validation\n- Bias detection and monitoring procedures\n- Model update and version control processes\n- Human oversight mechanisms\n- Audit trail and explainability\n\nPlease share this with Robert and your BaFin contact. Happy to schedule a call with BaFin directly if that would help.\n\nWe are on hold commercially but standing by to support the compliance process.\n\nBest,\nMax',
        timestamp: '2026-04-05 14:00',
        direction: 'outbound',
      },
    ],
  },
]

const n26HITL: HITLQuery[] = [
  {
    id: 'hitl-n26-1',
    lead_id: 'lead-8',
    question: 'N26 (BaFin-regulated bank) asks: does an AI making outbound fraud verification calls and locking accounts constitute automated decision-making under GDPR Art. 22? They need a legal opinion for their DPO and BaFin submission.',
    team: 'legal',
    status: 'answered',
    answer: 'Legal opinion: This does NOT constitute solely automated decision-making under Art. 22 because the customer actively participates (confirms/denies the transaction). The AI facilitates the customer\'s instruction, not its own decision. Recommend adding: 1) explicit confirmation step, 2) option to speak to human at any point, 3) notification that call is AI-assisted. Shared formal legal memo with N26.',
    slack_thread_id: 'C04-legal-2345',
    asked_at: '2026-03-01 16:00',
    answered_at: '2026-03-02 11:00',
  },
]

const n26Activities: Activity[] = [
  { id: 'a-n26-1', lead_id: 'lead-8', type: 'call', summary: 'Inbound call from Jan Mueller, CTO at N26. Fraud alert AI use case, 800 alerts/day.', timestamp: '2026-03-01 10:00' },
  { id: 'a-n26-2', lead_id: 'lead-8', type: 'stage_change', summary: 'Stage changed from New to Qualified.', timestamp: '2026-03-01 10:30' },
  { id: 'a-n26-3', lead_id: 'lead-8', type: 'hitl_created', summary: 'HITL query to legal: GDPR Art. 22 applicability for AI fraud calls.', timestamp: '2026-03-01 16:00' },
  { id: 'a-n26-4', lead_id: 'lead-8', type: 'hitl_answered', summary: 'Legal confirmed: not solely automated decision-making. Memo prepared.', timestamp: '2026-03-02 11:00' },
  { id: 'a-n26-5', lead_id: 'lead-8', type: 'email_sent', summary: 'Sent compliance documentation package to Jan (MaRisk, ISO 27001, SOC 2, DPA, legal opinion).', timestamp: '2026-03-02 14:00' },
  { id: 'a-n26-6', lead_id: 'lead-8', type: 'demo_scheduled', summary: 'Demo scheduled for Mar 12 with compliance deep-dive.', timestamp: '2026-03-03 09:00' },
  { id: 'a-n26-7', lead_id: 'lead-8', type: 'call', summary: 'Demo completed with Jan, CCO Robert, and Head of IT Security Maria. Compliance review initiated.', timestamp: '2026-03-12 10:00' },
  { id: 'a-n26-8', lead_id: 'lead-8', type: 'stage_change', summary: 'Stage changed from Qualified to Negotiation.', timestamp: '2026-03-12 11:00' },
  { id: 'a-n26-9', lead_id: 'lead-8', type: 'call', summary: 'Status update call. BaFin review ongoing, additional questions on AI governance. 6-8 weeks expected.', timestamp: '2026-04-05 11:00' },
  { id: 'a-n26-10', lead_id: 'lead-8', type: 'stage_change', summary: 'Stage changed from Negotiation to On Hold. Blocked on BaFin compliance review.', timestamp: '2026-04-05 11:30' },
  { id: 'a-n26-11', lead_id: 'lead-8', type: 'email_sent', summary: 'Sent AI Model Governance Framework documentation for BaFin submission.', timestamp: '2026-04-05 14:00' },
]

// ──────────────────────────────────────────────────
// ALL LEADS
// ──────────────────────────────────────────────────
export const mockLeads: Lead[] = [
  {
    id: 'lead-1',
    company_name: 'Allianz',
    contact_name: 'Devang Patel',
    contact_email: 'devang.patel@allianz.de',
    contact_phone: '+49 89 3800 0',
    role: 'VP Product',
    stage: 'negotiation',
    current_state: 'at_risk',
    confidence: 0.55,
    preferred_channel: 'phone',
    next_action: 'Follow up on counter-proposal',
    next_action_at: '2026-04-21',
    created_at: '2026-03-28',
    updated_at: '2026-04-16',
    engagement_score: 7,
    deal_value: 245000,
    bant: { budget: 'EUR 200-300k allocated', authority: 'VP Product, needs CFO sign-off', need: 'Replace legacy IVR for 15k calls/day', timeline: 'Pilot Q3, Full rollout Q1 2027' },
    calls: allianzCalls,
    emails: allianzEmails,
    hitl_queries: allianzHITL,
    activities: allianzActivities,
  },
  {
    id: 'lead-2',
    company_name: 'BMW',
    contact_name: 'Klaus Weber',
    contact_email: 'klaus.weber@bmw.de',
    contact_phone: '+49 89 382 0',
    role: 'CTO',
    stage: 'qualified',
    current_state: 'progressing',
    confidence: 0.65,
    preferred_channel: 'email',
    next_action: 'Deliver multi-tenant demo',
    next_action_at: '2026-04-16',
    created_at: '2026-04-02',
    updated_at: '2026-04-10',
    engagement_score: 6,
    deal_value: 500000,
    bant: { budget: 'Not disclosed yet', authority: 'CTO, decision maker', need: 'Standardize voice across 4k dealers', timeline: 'Evaluating, no hard deadline' },
    calls: bmwCalls,
    emails: bmwEmails,
    hitl_queries: bmwHITL,
    activities: bmwActivities,
  },
  {
    id: 'lead-3',
    company_name: 'Siemens',
    contact_name: 'Anna Schmidt',
    contact_email: 'anna.schmidt@siemens.com',
    contact_phone: '+49 89 636 0',
    role: 'Head of Customer Service',
    stage: 'won',
    current_state: 'won',
    confidence: 1.0,
    preferred_channel: 'email',
    next_action: 'Onboarding kickoff',
    next_action_at: '2026-03-24',
    created_at: '2026-02-10',
    updated_at: '2026-03-21',
    engagement_score: 10,
    deal_value: 390000,
    bant: { budget: 'EUR 195k/yr approved', authority: 'Head of CS + procurement sign-off', need: 'Automate 8k tech support calls/day', timeline: 'Implementation started, go-live Apr 21' },
    calls: siemensCalls,
    emails: siemensEmails,
    hitl_queries: siemensHITL,
    activities: siemensActivities,
  },
  {
    id: 'lead-4',
    company_name: 'Munich Re',
    contact_name: 'Thomas Berger',
    contact_email: 'thomas.berger@munichre.com',
    contact_phone: '+49 89 3891 0',
    role: 'Director of Operations',
    stage: 'lost',
    current_state: 'lost',
    confidence: 0,
    preferred_channel: 'email',
    next_action: 'Re-engage in Q3',
    next_action_at: '2026-07-01',
    created_at: '2026-03-05',
    updated_at: '2026-04-02',
    engagement_score: 3,
    deal_value: 140000,
    bant: { budget: 'EUR 100-150k', authority: 'Director, board pressure', need: '3k reinsurance broker support calls/day', timeline: 'Needed by end of Q2' },
    calls: munichReCalls,
    emails: munichReEmails,
    hitl_queries: munichReHITL,
    activities: munichReActivities,
  },
  {
    id: 'lead-5',
    company_name: 'SAP',
    contact_name: 'Lisa Chen',
    contact_email: 'lisa.chen@sap.com',
    contact_phone: '+49 6227 7 0',
    role: 'Product Owner',
    stage: 'followup',
    current_state: 'progressing',
    confidence: 0.50,
    preferred_channel: 'email',
    next_action: 'Complete security questionnaire',
    next_action_at: '2026-04-18',
    created_at: '2026-04-01',
    updated_at: '2026-04-14',
    engagement_score: 6,
    deal_value: 96000,
    bant: { budget: 'Not confirmed, business case in progress', authority: 'Product Owner, needs IT Director approval', need: 'Automate 1.2k IT helpdesk calls/day', timeline: 'Go-live target July, SCIM needed Aug' },
    calls: sapCalls,
    emails: sapEmails,
    hitl_queries: sapHITL,
    activities: sapActivities,
  },
  {
    id: 'lead-6',
    company_name: 'Delivery Hero',
    contact_name: 'Marco Rossi',
    contact_email: 'marco.rossi@deliveryhero.com',
    contact_phone: '+49 30 5444 59000',
    role: 'VP Engineering',
    stage: 'new',
    current_state: 'progressing',
    confidence: 0.25,
    preferred_channel: 'phone',
    next_action: 'Send case study and capability overview',
    next_action_at: '2026-04-19',
    created_at: '2026-04-17',
    updated_at: '2026-04-17',
    engagement_score: 3,
    deal_value: 200000,
    bant: { budget: 'Unknown', authority: 'VP Eng, exploring', need: 'Automate restaurant onboarding calls (500/week)', timeline: 'Early exploration, no timeline' },
    calls: deliveryHeroCalls,
    emails: deliveryHeroEmails,
    hitl_queries: deliveryHeroHITL,
    activities: deliveryHeroActivities,
  },
  {
    id: 'lead-7',
    company_name: 'Flixbus',
    contact_name: 'Sarah Kim',
    contact_email: 'sarah.kim@flixbus.com',
    contact_phone: '+49 30 300 137 300',
    role: 'Head of CX',
    stage: 'unqualified',
    current_state: 'no_decision',
    confidence: 0.15,
    preferred_channel: 'email',
    next_action: 'Follow up in July',
    next_action_at: '2026-07-01',
    created_at: '2026-04-10',
    updated_at: '2026-04-10',
    engagement_score: 2,
    deal_value: 180000,
    bant: { budget: 'No budget allocated yet', authority: 'Head of CX, needs board approval', need: '6k CX calls/day, 20% cost reduction target', timeline: 'Q4 2026 or Q1 2027 earliest' },
    calls: flixbusCalls,
    emails: flixbusEmails,
    hitl_queries: flixbusHITL,
    activities: flixbusActivities,
  },
  {
    id: 'lead-8',
    company_name: 'N26',
    contact_name: 'Jan Mueller',
    contact_email: 'jan.mueller@n26.com',
    contact_phone: '+49 30 364 286 880',
    role: 'CTO',
    stage: 'on_hold',
    current_state: 'blocked',
    confidence: 0.40,
    preferred_channel: 'email',
    next_action: 'Check BaFin review status',
    next_action_at: '2026-05-15',
    created_at: '2026-03-01',
    updated_at: '2026-04-05',
    engagement_score: 5,
    deal_value: 160000,
    bant: { budget: 'Budget available pending compliance', authority: 'CTO + CCO veto power', need: '800 fraud alert calls/day, growing', timeline: 'Blocked on BaFin — 6-8 weeks for clearance' },
    calls: n26Calls,
    emails: n26Emails,
    hitl_queries: n26HITL,
    activities: n26Activities,
  },
]

// ──────────────────────────────────────────────────
// DERIVED EXPORTS — used by all pages
// ──────────────────────────────────────────────────

/** All calls across all leads */
export function getAllCalls(): Call[] {
  return mockLeads.flatMap(l => l.calls)
}

/** All email threads across all leads */
export function getAllEmailThreads(): EmailThread[] {
  return mockLeads.flatMap(l => l.emails)
}

/** All HITL queries across all leads */
export function getAllHITLQueries(): HITLQuery[] {
  return mockLeads.flatMap(l => l.hitl_queries)
}

/** All activities across all leads, sorted by timestamp descending */
export function getAllActivities(): Activity[] {
  return mockLeads
    .flatMap(l => l.activities)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

/** Get lead by ID */
export function getLeadById(id: string): Lead | undefined {
  return mockLeads.find(l => l.id === id)
}

/** Pipeline chart data — deal values by stage */
export const mockPipelineData = [
  { day: 'New', value: 200000 },
  { day: 'Qualified', value: 500000 },
  { day: 'Negotiation', value: 245000 },
  { day: 'Follow-up', value: 96000 },
  { day: 'On Hold', value: 160000 },
]

/** Stage distribution — count of leads per stage */
export const mockStageData = (() => {
  const stageColors: Record<string, string> = {
    new: '#FFB867',
    unqualified: '#D8D2C8',
    qualified: '#7BE0AE',
    negotiation: '#F0CB82',
    followup: '#9BB8ED',
    on_hold: '#D6A0D6',
    won: '#68D39B',
    lost: '#FF8B85',
  }
  const stageLabels: Record<string, string> = {
    new: 'New',
    unqualified: 'Unqualified',
    qualified: 'Qualified',
    negotiation: 'Negotiation',
    followup: 'Follow-up',
    on_hold: 'On Hold',
    won: 'Won',
    lost: 'Lost',
  }
  const counts: Record<string, number> = {}
  mockLeads.forEach(l => { counts[l.stage] = (counts[l.stage] || 0) + 1 })
  return Object.entries(counts).map(([stage, value]) => ({
    name: stageLabels[stage] || stage,
    value,
    color: stageColors[stage] || '#D8D2C8',
  }))
})()
