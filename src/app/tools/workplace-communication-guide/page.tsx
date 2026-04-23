import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceCommunicationGuide from '@/components/WorkplaceCommunicationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What workplace communication channels exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Communication channels: Email: Formal written communication, documentation purpose, record creation, broader distribution, detailed content, official communication, time-shifted interaction. Instant messaging: Quick real-time communication, immediate questions, brief exchanges, informal updates, rapid response, team collaboration, casual interaction. Video calls: Visual connection, remote meetings, face-to-face interaction, personal touch, presentation sharing, relationship building, complex discussion. In-person: Direct face-to-face, relationship building, sensitive topics, immediate feedback, non-verbal cues, personal connection, important conversations. Documentation: Written reference, knowledge sharing, permanent record, accessible information, detail provided, policy communication, instruction delivery. Channels = choose appropriately. Email for formal. Chat for quick. Video for remote. In-person for sensitive. Documentation for reference. Match channel to purpose. Consider audience. Consider urgency. Consider permanence."
      }
    },
    {
      "@type": "Question",
      "name": "How do I communicate effectively at work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective communication: Clarity: Clear message crafting, simple language, concise content, organized structure, main point first, supporting details, easy understanding, no ambiguity. Channel: Appropriate channel selection, match to purpose, consider audience, urgency appropriate, permanence needed, formality level, relationship context. Timing: Timely communication, appropriate timing, urgency matched, response prompt, deadline consideration, schedule awareness, availability respected. Tone: Professional tone maintained, respectful language, appropriate formality, positive framing, constructive approach, polite expression, audience consideration. Listening: Active listening practiced, full attention, understanding sought, clarification asked, response appropriate, feedback given, engagement shown. Feedback: Constructive feedback delivered, specific input, actionable suggestions, positive framing, timing appropriate, method suitable, improvement focus. Effectiveness = deliberate approach. Clear content. Appropriate channel. Timely delivery. Professional tone. Active listening. Constructive feedback. Continuous improvement."
      }
    },
    {
      "@type": "Question",
      "name": "What communication challenges exist at work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Communication challenges: Information overload: Too much communication, message volume, attention divided, priority unclear, filtering needed, essential drowning, response difficulty. Miscommunication: Message misunderstood, unclear content, interpretation difference, context missing, assumption made, detail lacking, confusion created. Language barriers: Language differences, expression difficulty, understanding challenged, translation needed, simple language required, visual aids helpful, patience needed. Remote challenges: Distance communication, face-to-face reduced, connection harder, relationship building, non-verbal missing, engagement difficult, technology dependence. Silence: Information not shared, concerns unvoiced, issues hidden, feedback missing, communication avoidance, withholding information, proactive needed. Challenges = address proactively. Prioritize messages. Clarify content. Simple language. Regular check-ins. Proactive sharing. Feedback encouragement. Barrier removal."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle difficult conversations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Difficult conversation handling: Preparation: Prepare thoroughly, know objective, gather facts, anticipate reactions, plan approach, consider setting, timing appropriate. Setting: Private location, appropriate environment, comfortable setting, minimal distraction, neutral space, adequate time, interruption avoided. Approach: Direct but respectful, address issue clearly, specific language, avoid blame, focus behavior, separate person, constructive tone, empathy shown. Listening: Listen to response, acknowledge feelings, understand perspective, validate concerns, allow expression, show patience, respect shown. Resolution: Focus on resolution, problem solving, future improvement, agreement sought, path forward, expectation clear, support offered. Follow-up: Monitor progress, check outcomes, provide support, adjust approach, recognize improvement, continued attention, relationship maintained. Difficult = handled professionally. Thorough preparation. Appropriate setting. Respectful approach. Active listening. Resolution focus. Follow-up support. Relationship preserved."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve workplace communication culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Culture improvement: Encouragement: Communication encouraged, openness promoted, sharing valued, feedback welcomed, dialogue supported, questions invited, information shared. Training: Communication training provided, skill development, feedback training, listening skills, conflict resolution, presentation skills, writing improvement. Tools: Appropriate tools provided, technology support, platform access, collaboration tools, documentation systems, communication channels, support available. Norms: Communication norms established, expectation clear, response standards, channel guidance, tone expectations, frequency norms, respect standards. Leadership: Leadership modeling, example shown, communication practiced, feedback given, listening demonstrated, openness shown, transparency modeled. Recognition: Good communication recognized, effective sharing praised, clarity appreciated, responsiveness valued, collaboration acknowledged, culture reinforced. Culture = intentional building. Encouragement active. Training provided. Tools available. Norms established. Leadership modeled. Recognition given. Continuous reinforcement."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Communication Guide - Channels, Practices & Challenges',
  description: 'Communication channels, best practices, types, and challenges.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceCommunicationGuide />
    </Suspense>
  );
}