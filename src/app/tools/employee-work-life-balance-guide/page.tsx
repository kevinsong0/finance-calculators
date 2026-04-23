import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeWorkLifeBalanceGuide from '@/components/EmployeeWorkLifeBalanceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is work-life balance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Work-life balance definition: Concept: Balance between work demands and personal life, time for both, priorities balanced, neither dominates, equilibrium achieved, quality in both areas. Elements: Time management - efficient work, personal time, schedule control, priority focus, productivity maintained. Boundaries - clear limits, work separation, personal protection, availability limits, response boundaries. Flexibility - adapt to needs, schedule adjustment, personal accommodation, work arrangements, life integration. Self-care - physical health, mental wellness, energy maintenance, stress management, health focus. Support - family relationships, friend connections, resource access, help available, network support. Balance = intentional effort. Time managed. Boundaries set. Flexibility used. Self-care practiced. Support accessed. Continuous adjustment. Quality focus."
      }
    },
    {
      "@type": "Question",
      "name": "What are signs of poor work-life balance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Warning signs: Work indicators: Constant overtime, excessive hours, inability to disconnect, work at home, weekend work, vacation skipped, no personal time, always available. Personal indicators: Neglecting relationships, missing family events, no social time, hobbies abandoned, personal needs ignored, family time reduced. Health indicators: Chronic stress, sleep problems, health neglect, fatigue constant, weight changes, appetite issues, physical symptoms. Emotional indicators: Emotional exhaustion, mood changes, irritability, anxiety symptoms, depression signs, motivation loss, burnout indicators. Behavioral indicators: Isolation tendency, withdrawal from activities, alcohol increase, unhealthy coping, neglecting responsibilities, imbalance visible. Signs = recognize early. Work excess. Personal neglect. Health decline. Emotional exhaustion. Behavioral changes. Action needed. Balance restored. Support sought."
      }
    },
    {
      "@type": "Question",
      "name": "How do I achieve work-life balance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Balance strategies: Boundaries: Set clear boundaries, work hours defined, personal time protected, availability limited, response boundaries, disconnect time, work separation. Prioritization: Prioritize effectively, focus on essentials, delegate where possible, eliminate unnecessary, time allocated, efficiency focus, important prioritized. Breaks: Take regular breaks, pause during work, energy restoration, movement breaks, mental rest, productivity improvement, fatigue prevention. Flexibility: Use flexibility available, schedule adjustment, personal accommodation, work arrangements, life integration, needs addressed, balance achieved. Disconnect: Time away from work, technology limits, vacation taken, personal focus, work separation, recovery time, rest achieved. Self-care: Practice self-care, physical health, mental wellness, adequate sleep, exercise regular, healthy eating, stress management. Strategies = practical application. Boundaries set. Priorities clear. Breaks regular. Flexibility used. Disconnect practiced. Self-care maintained. Continuous effort."
      }
    },
    {
      "@type": "Question",
      "name": "How does organization support balance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Organization support: Policy: Flexible work policies, remote options, flexible hours, reasonable workload, PTO encouraged, balance valued, expectation clear, support formal. Culture: Supportive culture, balance respected, model demonstrated, pressure reasonable, balance encouraged, culture positive, values alignment. Resources: Wellness programs, support resources, stress management, counseling access, health programs, fitness options, assistance available. Management: Manager understanding, balance support, reasonable demands, flexibility offered, workload monitored, expectation clear, communication open. Environment: Reasonable environment, manageable demands, sustainable pace, resources adequate, support structure, balance opportunity, stress reduction. Support = organizational commitment. Policy formal. Culture supportive. Resources available. Manager understanding. Environment reasonable. Balance valued. Sustainability focus."
      }
    },
    {
      "@type": "Question",
      "name": "How do I maintain work-life balance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Balance maintenance: Routine: Establish routine, consistent schedule, predictable structure, regular habits, work time defined, personal time planned, structure maintained. Monitoring: Monitor balance regularly, watch for signs, self-assessment, warning awareness, adjust when needed, early recognition, proactive attention. Communication: Communicate needs, discuss with manager, address concerns, seek support, explain situation, solution sought, help requested. Boundaries: Maintain boundaries consistently, work limits held, personal time protected, availability managed, disconnect practiced, separation maintained. Activities: Pursue personal activities, hobbies maintained, relationships nurtured, interests pursued, leisure time, personal fulfillment, life enriched. Support: Seek support when needed, ask for help, use resources, family support, friend connection, professional help, assistance accepted. Maintenance = ongoing effort. Routine established. Balance monitored. Needs communicated. Boundaries held. Activities pursued. Support sought. Continuous attention."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Work-Life Balance Guide - Elements, Signs & Strategies',
  description: 'Work-life balance elements, warning signs, strategies, and organization support.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeWorkLifeBalanceGuide />
    </Suspense>
  );
}