import type { Metadata } from 'next';
import { Suspense } from 'react';
import PerformanceAppraisalGuide from '@/components/PerformanceAppraisalGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I conduct a performance appraisal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance appraisal process: Preparation: Review employee&apos;s goals, collect feedback (360 if used), gather objective metrics, prepare examples, schedule private meeting. Discussion: Start with positives, discuss challenges, review metrics vs goals, identify development areas, ask employee perspective, set next period goals. Documentation: Record key points, agreed actions, development plans, signatures from both parties. Follow-up: Quarterly check-ins, progress on development goals, adjust if needed, support resources. Appraisal = development conversation. Not just evaluation - growth opportunity. Be specific, fair, documented."
      }
    },
    {
      "@type": "Question",
      "name": "What is 360-degree feedback?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "360-degree feedback: Multi-source performance evaluation. Sources: Self-assessment, direct manager, peers, direct reports, sometimes customers. Purpose: Comprehensive view, reduce single-person bias, identify blind spots, development insights. Process: Anonymous surveys, standardized questions, aggregated results, shared with employee, development planning. Implementation: Clear purpose communication, confidentiality assurance, trained facilitators, focus on development not punishment, follow-up action plan. Benefits: Balanced perspective, self-awareness improvement, development focus. Challenges: Time-intensive, can create tension, needs careful facilitation. 360 = full picture. Single reviewer = limited view. Use for development primarily."
      }
    },
    {
      "@type": "Question",
      "name": "How often should performance reviews happen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance review frequency: Best practice: Quarterly check-ins + annual formal review. Quarterly: Progress check, goal adjustment, development support, feedback opportunity, no surprises. Annual: Formal documentation, compensation decisions, career planning, comprehensive review. Monthly: Optional for new hires or performance issues, coaching focus, quick feedback. Continuous: Real-time feedback tools, immediate recognition, coaching moments. Traditional: Once per year only - often leads to surprises, delayed development, anxiety. Modern: Frequent lightweight + annual formal. Avoid: Saving all feedback for one meeting. Regular feedback = better performance. Annual alone = missed opportunities. Balance formal with informal."
      }
    },
    {
      "@type": "Question",
      "name": "How do I give negative feedback effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Negative feedback best practices: Preparation: Specific examples ready, private setting chosen, development focus clear, actionable suggestions prepared. Delivery: Direct but respectful, focus on behavior/work not person, explain impact clearly, provide context, offer solutions. Structure: Situation (what happened), Behavior (specific action), Impact (effect on work/team), Development (how to improve). Avoid: Public criticism, vague generalities, personal attacks, no follow-up plan, emotional delivery. After: Ask their perspective, listen actively, agree on action plan, set follow-up date, offer support resources. Negative feedback = growth opportunity. Not punishment - development. Specific, timely, actionable, supportive."
      }
    },
    {
      "@type": "Question",
      "name": "What appraisal mistakes should I avoid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance appraisal mistakes: Surprises: Saving feedback for appraisal only, employee unaware of issues, feels unfair. Vague criteria: Unclear expectations, subjective assessment, inconsistent ratings. Halo/horn effect: One trait dominates evaluation, overlook other areas, bias. Recent bias: Only recent events considered, ignores full period, unfair. Personal bias: Likability affects rating, not performance-based, unfair comparison. No development: Only evaluation, no growth plan, no follow-up, wasted opportunity. Inconsistent standards: Different standards for similar roles, unfair, legal risk. No documentation: Informal process only, no record, disputes difficult. Avoid mistakes = fair appraisal. Train reviewers. Standardize process. Focus development."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Performance Appraisal Guide - Methods, Best Practices & Feedback',
  description: 'Performance evaluation methods, feedback tips, and appraisal best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PerformanceAppraisalGuide />
    </Suspense>
  );
}