import type { Metadata } from 'next';
import { Suspense } from 'react';
import PresentationSkillsGuide from '@/components/PresentationSkillsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I structure a presentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Presentation structure: Opening Hook (grab attention - story, question, surprising fact). Introduction (state purpose, preview key points). Body (3-5 main points with evidence, examples). Engagement (questions, stories, interaction throughout). Conclusion (summarize key points). Call to Action (specific next step for audience). Closing (strong ending, memorable statement). Rule: Tell them what you'll tell them, tell them, tell them what you told them. 3-5 points = memorable. Start strong (first 30 seconds sets tone), end stronger (last impression lasts)."
      }
    },
    {
      "@type": "Question",
      "name": "How do I overcome presentation anxiety?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Overcome anxiety: Prepare thoroughly (practice reduces uncertainty). Practice multiple times (familiarity builds confidence). Know your content (don't rely on slides). Start with strong opening (confidence after first sentences). Breathe (calm nerves before starting). Focus on message not self (purpose overrides fear). Accept nervousness normal (even experienced speakers feel it). Start small (practice with friendly audiences). Visualize success (mental rehearsal). Reframe: excitement not anxiety (same physical symptoms). Anxiety reduces with practice - first few minutes hardest, then flow."
      }
    },
    {
      "@type": "Question",
      "name": "How many slides should a presentation have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slides count: Rule: 1 slide per 2 minutes (10 min presentation = 5 slides max). Exception: data-heavy presentations need more. Key principles: One main idea per slide. Slides support, not replace speaker. Minimal text (audience reads, not listens). Visuals over words (images, charts, diagrams). Not a teleprompter (know content). Presentation = speaker + slides, not slides alone. Too many slides = rushing, audience overwhelmed. Better: fewer slides, more depth, more engagement. Delete slides that don't add value."
      }
    },
    {
      "@type": "Question",
      "name": "How do I engage the audience?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Engage audience: Ask questions (rhetorical, polling, discussion). Tell stories (narratives connect emotionally). Use visuals (images, diagrams, demos). Eye contact (connect with individuals, scan room). Pause after points (let audience process). Invite participation (Q&A, exercises, examples). Use humor (appropriate, breaks tension). Vary delivery (pace, volume, emphasis). Show passion (energy transfers to audience). Read reactions (adjust if losing attention). Engagement = attention = retention. Passive audience forgets, active audience remembers. Plan engagement moments every 5-10 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle presentation questions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Handle Q&A: Clarify question (ensure understanding before answering). Think briefly (pause, consider answer). Answer concisely (don't ramble). If unknown: admit honestly, offer to follow up. If challenging: stay calm, address substance, not attack. Redirect hostile: 'I appreciate the perspective, here's my view.' Time management: 'We have time for one more question.' Prepare likely questions (anticipate, rehearse answers). Listen fully (don't interrupt questioner). Thank questioner (acknowledge engagement). Q&A = opportunity to deepen connection, address concerns. Handle gracefully = builds credibility."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Presentation Skills Guide - Structure, Techniques & Tips',
  description: 'Presentation structure, techniques, common mistakes, and presentation tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PresentationSkillsGuide />
    </Suspense>
  );
}