import type { Metadata } from 'next';
import { Suspense } from 'react';
import StakeholderGuide from '@/components/StakeholderGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is stakeholder management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder management definition: Purpose: Identify parties affected by organization, understand their interests, manage relationships, address concerns, align expectations. Stakeholder types: Internal - employees, managers, owners. External - customers, suppliers, partners. Investors - shareholders, lenders. Regulators - government, agencies. Community - local area, media. Process: Identify stakeholders, analyze influence and interest, understand needs and concerns, plan engagement, execute communication, monitor relationships. Importance: Success depends on stakeholder support, conflicts can derail initiatives, relationships affect outcomes, trust enables collaboration. Stakeholder management = relationship building. Identify systematically. Understand interests. Engage appropriately. Monitor ongoing. Build trust."
      }
    },
    {
      "@type": "Question",
      "name": "How do I analyze stakeholders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder analysis process: Identify: List all stakeholders affected by initiative, consider internal and external, think broadly, document all parties. Prioritize: Assess influence - how much power they have, assess interest - how much they care, high influence + high interest = key stakeholders, map on influence-interest grid. Understand: Identify needs and expectations, understand concerns and fears, know what they want from organization, recognize their perspective. Plan: Engagement strategy for each stakeholder, communication approach tailored, frequency of interaction, who manages relationship. Analysis = systematic mapping. Identify all parties. Prioritize by influence/interest. Understand each perspective. Plan tailored engagement. Document clearly."
      }
    },
    {
      "@type": "Question",
      "name": "How do I engage stakeholders effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder engagement practices: Communication: Regular updates on relevant matters, appropriate channels for each stakeholder, clear and honest messages, timely not delayed. Listening: Seek feedback actively, understand concerns, acknowledge perspectives, respond to input. Involvement: Include in decisions where appropriate, seek input early, consider views in planning, involve affected parties. Relationship building: Know stakeholders personally, maintain contact, show appreciation, build trust over time. Problem resolution: Address issues promptly, fair process, clear communication, follow through. Engagement = ongoing process. Communicate regularly. Listen actively. Involve appropriately. Build relationships. Address concerns promptly. Adjust approach as needed."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage stakeholder conflicts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder conflict management: Identify conflicts: Competing priorities between groups, resource allocation disputes, different expectations, trust and communication issues. Resolution approaches: Find common ground - shared interests exist, prioritize by importance - balance competing needs, increase communication - reduce misunderstanding, involve in decisions - give ownership, fair process - transparent criteria, compromise where possible. Prevention: Early engagement, clear expectations, regular communication, address small issues before escalation. Escalation: Higher authority if needed, formal dispute resolution, clear process defined. Conflicts = address proactively. Understand competing needs. Find common ground. Communicate clearly. Fair process. Prevent escalation. Formal process if needed."
      }
    },
    {
      "@type": "Question",
      "name": "What are stakeholder engagement levels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Engagement level spectrum: Inform: One-way communication, stakeholders receive updates, appropriate for low interest/low influence, keep aware of activities. Consult: Two-way communication, seek input before decisions, stakeholders provide feedback, organization decides, appropriate for consultation situations. Involve: Work directly with stakeholders, concerns reflected in decisions, incorporate input into plans, stakeholders help shape outcomes. Collaborate: Partnership in decisions, shared decision-making, stakeholders actively participate, joint problem-solving, appropriate for key stakeholders. Empower: Final decision by stakeholders, organization supports implementation, high trust required, appropriate when stakeholder ownership essential. Levels = match to stakeholder. Not all need same level. High influence/interest = higher engagement. Low influence/interest = inform. Consider stakeholder needs. Adjust approach appropriately."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Stakeholder Management Guide - Types, Analysis & Engagement',
  description: 'Stakeholder types, analysis, engagement practices, and conflict resolution.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StakeholderGuide />
    </Suspense>
  );
}