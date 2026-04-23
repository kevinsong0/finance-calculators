import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceCultureGuide from '@/components/WorkplaceCultureGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is workplace culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workplace culture definition: Purpose: Shared values and behaviors, guides how people work, defines organizational character, influences decisions and interactions. Elements: Values - core beliefs and principles, Behaviors - how people actually act, Communication - how information flows, Leadership style - how leaders behave, Recognition - how achievements valued, Environment - physical and virtual space. Importance: Drives employee behavior, affects performance and results, influences hiring and retention, shapes organizational identity, impacts reputation. Culture = shared values and behaviors. Define clearly. Model consistently. Measure health. Evolve intentionally. Leadership responsibility."
      }
    },
    {
      "@type": "Question",
      "name": "What types of workplace culture exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Culture types: Collaborative culture: Team-focused approach, sharing and cooperation, collective decision-making, strong relationships, good for innovation and engagement, risk of slower decisions. Competitive culture: Results-driven focus, individual achievement emphasis, performance metrics important, ambitious atmosphere, good for high performance, risk of collaboration challenges. Creative culture: Innovation-focused, risk-taking encouraged, experimentation valued, flexible structure, good for new ideas, risk of inconsistency. Structured culture: Process-focused, organized approach, clear procedures, hierarchy clear, good for consistency, risk of rigidity. Types = choose based on goals. Match to organization needs. Can blend types. Be intentional about culture. Align with strategy."
      }
    },
    {
      "@type": "Question",
      "name": "How do I build positive workplace culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Culture building process: Define values: Identify core beliefs, document clearly, communicate widely, make actionable, align with strategy. Model behavior: Leaders demonstrate values, consistent behavior shown, visible commitment, walk the talk, set example. Communicate: Regularly discuss values, explain expectations, share stories of alignment, reinforce messages, use multiple channels. Recognize: Acknowledge values-aligned behavior, celebrate examples, reward consistency, make recognition visible, reinforce through action. Address misalignment: Address behavior contradicting values, consistent enforcement, fair application, clear expectations, progressive approach. Measure: Survey employee perceptions, track culture indicators, assess health regularly, identify issues early. Building = intentional effort. Define values. Model behavior. Communicate consistently. Recognize alignment. Address misalignment. Measure health."
      }
    },
    {
      "@type": "Question",
      "name": "What are warning signs of poor culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Culture warning signs: Employee indicators: High turnover - people leaving frequently, Low engagement scores - disconnection from work, Absenteeism increase - avoiding workplace, Resistance to change - stuck in old ways. Behavioral indicators: Poor communication - information doesn&apos;t flow, Negative gossip - destructive talk spreading, Fear of speaking up - silence on issues, Lack of collaboration - isolation and silos. Performance indicators: Declining results, Quality issues, Customer complaints, Innovation stagnation. Leadership indicators: Micromanagement, Blame culture, Lack of transparency, Inconsistent behavior. Warning signs = act on early. Survey employees regularly. Watch turnover trends. Address behavioral issues. Leadership sets tone. Fix before escalation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I change workplace culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Culture change process: Assess current: Understand existing culture, identify what to change, recognize root causes, assess readiness for change. Define target: What culture desired, values and behaviors needed, gap between current and desired, realistic timeline. Plan approach: Leadership commitment essential, communicate vision clearly, involve employees, define action steps, allocate resources. Execute: Model desired behaviors first, recognize aligned actions, address misalignment, adjust processes, hiring for culture fit. Sustain: Ongoing reinforcement, regular measurement, adjust as needed, embed in systems, celebrate progress. Change = intentional process. Understand current state. Define desired culture. Leadership commitment. Consistent effort. Measure progress. Patient persistence. Multi-year effort typically."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Culture Guide - Elements, Types & Building',
  description: 'Culture elements, types, building practices, and warning signs.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceCultureGuide />
    </Suspense>
  );
}