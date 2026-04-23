import type { Metadata } from 'next';
import { Suspense } from 'react';
import PerformanceFeedbackGuide from '@/components/PerformanceFeedbackGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I give effective performance feedback?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective feedback principles: Structure: Context - describe situation, Observation - specific behavior seen, Impact - result of behavior, Next step - what to do (COIN model). Delivery: Private setting appropriate, Timely - soon after event, Specific not vague, Focus on behavior not person, Avoid personal attacks, Listen to response, Offer support, Follow up later. Balance: Positive feedback regularly, Constructive when needed, Developmental for growth, Corrective for problems. Effective = structured approach. Be specific. Explain impact. Offer solutions. Listen actively. Follow up. Balance positive and constructive."
      }
    },
    {
      "@type": "Question",
      "name": "What types of feedback exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Feedback types: Positive feedback: Recognize achievements, reinforce good behavior, build confidence, given regularly and frequently. Constructive feedback: Improve performance, address issues, offer solutions, given when improvement needed. Developmental feedback: Build skills, develop capability, career growth, given regularly through coaching. Corrective feedback: Address problems, stop negative behavior, given when issues occur, may be more formal. Motivational feedback: Encourage effort, boost morale, given to maintain engagement. Coaching feedback: Skill development, technique improvement, ongoing developmental conversation. Types = match to purpose. Positive for recognition. Constructive for improvement. Developmental for growth. Corrective for problems. Give appropriate type for situation."
      }
    },
    {
      "@type": "Question",
      "name": "When should I give feedback?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Feedback timing: Immediate feedback: Significant events - achievements or errors, High impact situations, Learning opportunities, Time-sensitive issues, reinforce or correct quickly. Regular feedback: Ongoing performance, Weekly or monthly meetings, Part of regular conversations, Developmental discussions, Prevents surprises at review. Performance reviews: Formal assessment, Periodic comprehensive review, Documented feedback, Goal setting discussion, Development planning. Project milestones: Project-specific feedback, End of project assessment, What worked/will improve, Learning documentation. Timing = match to situation. Immediate for significant. Regular for ongoing. Reviews for formal. Milestones for project. Don&apos;t delay important feedback. Regular feedback better than accumulation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I deliver negative feedback?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Negative feedback delivery: Setting: Private conversation, Neutral location, Not in front of others, Not when emotions high. Approach: Focus on behavior not person, Specific examples provided, Impact explained clearly, Solutions offered, Support available. Tone: Calm and professional, Not angry or accusatory, Objective language, Future-focused not past-blaming. Response: Allow employee to respond, Listen to their perspective, Acknowledge feelings, Find common understanding. Follow-up: Document feedback, Check progress later, Provide ongoing support, Recognize improvement. Negative = constructive approach. Private setting. Focus on behavior. Offer solutions. Listen to response. Support improvement. Follow up."
      }
    },
    {
      "@type": "Question",
      "name": "How do I receive feedback effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Receiving feedback well: Attitude: Open mindset, Not defensive, View as opportunity, Thank the giver. During feedback: Listen actively, Don&apos;t interrupt, Ask clarifying questions, Acknowledge what&apos;s said, Take notes if helpful. Processing: Reflect on feedback, Separate emotion from content, Identify actionable items, Decide what to change. Response: Thank for feedback, Commit to action if appropriate, Ask for support if needed, Follow up on progress. Growth mindset: Feedback helps improve, Not judgment of worth, Learning opportunity, Part of development. Receiving = open attitude. Listen actively. Process thoughtfully. Take action. Thank giver. View as growth opportunity."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Performance Feedback Guide - Types, Structure & Delivery',
  description: 'Feedback types, COIN structure, delivery practices, and timing.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PerformanceFeedbackGuide />
    </Suspense>
  );
}