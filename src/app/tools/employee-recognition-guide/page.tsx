import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeRecognitionGuide from '@/components/EmployeeRecognitionGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of employee recognition exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recognition types: Formal recognition: Structured programs, official awards, performance bonuses, promotions, public ceremonies, documented acknowledgment. Informal recognition: Day-to-day appreciation, verbal thanks, spontaneous praise, casual acknowledgment, personal notes, immediate feedback. Public recognition: Visible acknowledgment, team announcements, meeting mentions, company communications, award presentations, shared celebrations. Private recognition: Personal acknowledgment, one-on-one praise, private notes, individual conversations, personal emails, direct thanks. Team recognition: Group achievements, team awards, collective celebration, shared acknowledgment, team bonuses, group events. Individual recognition: Personal contribution, individual praise, specific acknowledgment, personal rewards, tailored recognition, one person focus. Types = use variety. Formal for major achievements. Informal for daily appreciation. Public for visibility. Private for personal touch. Team for group success. Individual for personal contribution. Match type to situation."
      }
    },
    {
      "@type": "Question",
      "name": "What are benefits of employee recognition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recognition benefits: Engagement: Higher employee commitment, increased motivation, stronger connection to work, improved effort, greater participation, active involvement. Retention: Lower turnover rates, longer employment, cost savings from reduced hiring, talent retention, team stability, knowledge preservation. Performance: Better work results, improved productivity, higher quality output, goal achievement, enhanced effort, performance improvement. Culture: Positive workplace environment, values reinforcement, behavior modeling, morale improvement, team atmosphere, organizational identity. Morale: Improved employee mood, happier workforce, positive atmosphere, reduced stress, better relationships, workplace satisfaction. Productivity: Increased output, efficiency gains, focus improvement, effort enhancement, goal progress, result acceleration. Benefits = significant impact. Engagement increase. Retention improvement. Performance boost. Culture enhancement. Morale uplift. Productivity gain. Investment in recognition pays."
      }
    },
    {
      "@type": "Question",
      "name": "What recognition programs work best?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective recognition programs: Employee awards: Employee of month/quarter, achievement awards, excellence recognition, milestone celebrations, special honors, visible acknowledgment. Performance programs: Performance bonuses, goal achievement rewards, merit recognition, results-based rewards, achievement celebration, performance acknowledgment. Peer recognition: Peer-to-peer systems, coworker appreciation, team member thanks, collaborative recognition, mutual acknowledgment, social recognition. Milestone recognition: Service milestones, project completion, career achievements, tenure acknowledgment, goal reaching, milestone celebrations. Daily recognition: Thank you notes, verbal appreciation, public mentions, meeting acknowledgment, email praise, immediate feedback. Programs = comprehensive approach. Employee awards for major. Performance for results. Peer for teamwork. Milestone for longevity. Daily for regular appreciation. Multiple programs needed."
      }
    },
    {
      "@type": "Question",
      "name": "How do I give effective recognition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective recognition practices: Timeliness: Recognize promptly, immediate acknowledgment, soon after achievement, timely praise, quick response, timely delivery. Specificity: Specific acknowledgment, particular achievement mention, detailed praise, clear recognition, exact contribution, focused appreciation. Authenticity: Genuine appreciation, sincere praise, honest acknowledgment, real gratitude, heartfelt thanks, authentic delivery. Matching: Match to employee preference, individual consideration, personalized approach, preference understanding, tailored recognition, individual needs. Visibility: Public when appropriate, visible acknowledgment, team sharing, appropriate audience, proper setting, suitable visibility. Frequency: Regular recognition, consistent acknowledgment, ongoing appreciation, repeated praise, sustained effort, continuous practice. Effectiveness = deliberate approach. Timely delivery. Specific content. Authentic expression. Preference matching. Appropriate visibility. Regular frequency. Quality over quantity."
      }
    },
    {
      "@type": "Question",
      "name": "How do I measure recognition effectiveness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recognition measurement: Frequency metrics: Recognition count, how often given, program participation, recognition rate, distribution tracking, regular measurement. Employee feedback: Satisfaction surveys, recognition perception, employee input, feedback collection, satisfaction scores, appreciation feeling. Performance correlation: Performance outcomes, goal achievement, productivity changes, quality improvement, effort indicators, result tracking. Retention data: Turnover rates, retention changes, employee tenure, departure analysis, loyalty indicators, staying behavior. Engagement scores: Engagement measurement, commitment levels, participation rates, effort indicators, satisfaction scores, connection strength. Program participation: Award nominations, peer recognition use, program engagement, participation rates, active involvement, usage tracking. Measurement = comprehensive tracking. Frequency count. Employee feedback. Performance correlation. Retention data. Engagement scores. Participation rates. Regular assessment."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Recognition Guide - Types, Benefits & Programs',
  description: 'Recognition types, benefits, programs, best practices, and effectiveness measurement.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeRecognitionGuide />
    </Suspense>
  );
}