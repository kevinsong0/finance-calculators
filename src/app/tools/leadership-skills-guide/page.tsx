import type { Metadata } from 'next';
import { Suspense } from 'react';
import LeadershipSkillsGuide from '@/components/LeadershipSkillsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the leadership styles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leadership styles: Transformational (inspire change, motivate team - use for innovation, growth). Servant (serve team needs first - use for trust, development). Democratic (involve team in decisions - use for buy-in, diverse input). Autocratic (leader decides alone - use for crisis, urgent, clear expertise needed). Coaching (develop capabilities - use for long-term growth). Situational (adapt style to context - most flexible). Best leaders adapt style to situation - no single style works everywhere. Match style to team maturity, task urgency, organizational culture."
      }
    },
    {
      "@type": "Question",
      "name": "What makes a good leader?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good leader qualities: Communication (clear, listens, adapts message to audience). Emotional Intelligence (understand own and others' emotions, motivate). Vision (sets direction, communicates purpose, inspires). Decision Making (analyze, choose, implement decisively). Integrity (ethical, honest, consistent). Delegation (assign effectively, trust team, not micromanage). Accountability (take responsibility, give credit to team). Empathy (understand team perspectives, support). Confidence (believe in decisions, but not arrogant). Growth mindset (learn from failures, seek improvement). Leadership = traits + skills + practice."
      }
    },
    {
      "@type": "Question",
      "name": "How do I develop leadership skills?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Develop leadership skills: Seek feedback (ask team, peers regularly - identify blind spots). Practice daily (apply skills in real situations - meetings, decisions). Learn from mentors (find experienced leader to guide). Read/study (books, courses, case studies). Reflect (review decisions, outcomes, lessons learned). Take on challenges (volunteer for difficult projects). Start small (lead initiatives before large teams). Join leadership programs (formal training). Measure progress (track improvement areas). Key: leadership develops through practice + feedback + reflection. Not innate talent - learned skill. Commit to continuous improvement."
      }
    },
    {
      "@type": "Question",
      "name": "What is servant leadership?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Servant leadership: leader prioritizes team needs above own. Philosophy: serve first, lead second. Focus on: Team growth (develop people). Empowerment (give authority, trust). Listening (understand before directing). Stewardship (care for organization). Building community (team cohesion). Benefits: Higher trust, motivation, loyalty. Team grows, becomes more capable. Best for: long-term development, trust building, collaborative culture. Not for: urgent crisis where quick decisions needed. Servant leaders ask: 'How can I help you succeed?' vs 'Do what I say.'"
      }
    },
    {
      "@type": "Question",
      "name": "How do I lead without authority?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lead without authority: Influence through expertise (be valuable, help others). Build relationships (connect, trust, collaborate). Communicate clearly (persuade with data, logic). Solve problems (be solution-oriented, not complainer). Volunteer for initiatives (lead projects, committees). Mentor others (share knowledge, develop people). Be reliable (deliver consistently, build credibility). Listen first (understand before proposing). Ask questions (guide thinking, not dictate). Model behavior (lead by example, not position). Influence = persuasion + relationships + credibility. Earn leadership through actions, not title."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Leadership Skills Guide - Styles, Skills & Development',
  description: 'Leadership styles, key skills, habits, and development tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LeadershipSkillsGuide />
    </Suspense>
  );
}