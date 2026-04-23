import type { Metadata } from 'next';
import { Suspense } from 'react';
import TeamBuildingGuide from '@/components/TeamBuildingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are team development stages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Team development stages: Forming: Team comes together, getting acquainted, polite interactions, understanding purpose, learning about each other, setting initial expectations. Storming: Conflicts emerge, disagreements surface, roles clarified, challenging ideas, establishing boundaries, working through differences. Norming: Norms established, cooperation increases, communication improves, trust develops, team identity forms, processes refined. Performing: High performance achieved, effective collaboration, goal achievement, mutual support, autonomy developed, innovation enabled. Adjourning: Team disbands, reflection on work, celebration of achievements, lessons learned, transition support, future connections. Stages = natural progression. Forming introduction. Storming conflict. Norming cooperation. Performing achievement. Adjourning closure. Facilitate each stage."
      }
    },
    {
      "@type": "Question",
      "name": "What team building activities work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Team building activities: Icebreakers: Initial connection activities, introduction exercises, sharing personal information, comfortable environment creation, trust foundation, early team formation. Trust exercises: Build trust between members, vulnerability activities, reliance challenges, mutual support exercises, relationship strengthening, team bonding. Problem-solving: Collaborative challenges, group puzzles, shared objectives, teamwork development, communication practice, creative thinking. Social events: Relationship building outside work, shared experiences, personal connections, stress relief, team cohesion, informal bonding. Work-based: Project collaboration, shared responsibilities, joint problem-solving, process improvement, goal achievement together, learning projects. Activities = match to stage. Icebreakers for forming. Trust for storming. Problem-solving for norming. Social ongoing. Work-based reinforcement. Regular frequency."
      }
    },
    {
      "@type": "Question",
      "name": "What makes teams effective?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective team characteristics: Goals: Clear shared objectives, understood by all, measurable targets, aligned purpose, commitment to goals, regular review. Communication: Open information flow, honest dialogue, regular updates, active listening, feedback exchange, clarity in messaging. Trust: Mutual trust between members, reliance on each other, psychological safety, vulnerability acceptance, support network, confidence in team. Accountability: Individual responsibility, shared accountability, commitment delivery, role ownership, follow-through, mutual accountability. Diversity: Diverse perspectives, varied skills, different viewpoints, complementary strengths, inclusive environment, broad thinking. Conflict: Constructive disagreement, healthy debate, issue resolution, different opinions valued, solution focus, respectful dialogue. Characteristics = build deliberately. Clear goals foundation. Open communication essential. Trust development core. Accountability expectation. Diversity inclusion. Constructive conflict. Supportive environment."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle team conflict?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Team conflict resolution: Prevention: Clear expectations, role clarity, communication norms, shared goals, trust building, regular check-ins. Early detection: Watch for signs, observe interactions, listen to concerns, monitor performance, survey feedback, proactive approach. Intervention: Address early, facilitate dialogue, mediate disagreements, find root causes, focus on issues not people, seek understanding. Resolution: Joint problem-solving, compromise where needed, clear agreements, follow-up plans, behavior changes, relationship repair. Prevention recurrence: Process improvements, communication enhancement, norm reinforcement, ongoing monitoring, regular feedback, team learning. Conflict = address constructively. Prevention first. Early detection. Timely intervention. Joint resolution. Recurrence prevention. Learning from conflict."
      }
    },
    {
      "@type": "Question",
      "name": "How do I maintain team health?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Team health maintenance: Regular check-ins: Periodic health surveys, team discussions, satisfaction measurement, pulse checks, feedback sessions, issue identification. Communication: Keep channels open, regular updates, transparent sharing, listening sessions, feedback forums, dialogue encouragement. Recognition: Acknowledge team achievements, individual contributions, celebrate milestones, visible appreciation, morale building, motivation support. Development: Skill building opportunities, learning together, stretch assignments, cross-training, mentorship, continuous growth. Connection: Maintain relationships, social activities, shared experiences, team rituals, personal connections, community building. Adjustment: Adapt to changes, respond to feedback, evolve processes, address issues, team learning, continuous improvement. Health = ongoing effort. Regular assessment. Open communication. Recognition practice. Development support. Connection maintenance. Continuous adjustment."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Team Building Guide - Stages, Activities & Characteristics',
  description: 'Team development stages, activities, effective characteristics, and conflict resolution.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TeamBuildingGuide />
    </Suspense>
  );
}