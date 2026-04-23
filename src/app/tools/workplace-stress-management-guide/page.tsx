import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceStressManagementGuide from '@/components/WorkplaceStressManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What causes workplace stress?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stress sources: Workload: Excessive workload, too many tasks, tight deadlines, unrealistic expectations, constant pressure, task volume, time constraints, demand level. Relationships: Difficult relationships, conflict with colleagues, manager issues, team tension, communication problems, interpersonal stress, social stress. Role: Role ambiguity, unclear expectations, responsibility confusion, role conflict, mismatched expectations, performance pressure, position stress. Change: Organizational change, restructuring, new systems, process changes, uncertainty, adaptation demands, transition stress. Career: Career uncertainty, advancement concerns, job security, skill development pressure, performance evaluation, future worry. Control: Lack of control, autonomy limited, decision power reduced, influence lacking, choices constrained, agency missing. Sources = multiple factors. Workload common. Relationships variable. Role clarity needed. Change challenging. Career concern. Control important. Address proactively."
      }
    },
    {
      "@type": "Question",
      "name": "What are stress symptoms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stress symptoms: Physical: Physical fatigue, exhaustion feeling, energy low, muscle tension, headaches, sleep disruption, appetite changes, health symptoms, physical tension. Emotional: Emotional exhaustion, mood changes, anxiety feelings, irritability, depression symptoms, frustration, emotional volatility, feeling overwhelmed. Cognitive: Concentration difficulty, memory problems, decision difficulty, focus issues, mental fatigue, thinking affected, attention trouble, mental clarity reduced. Behavioral: Behavior changes, withdrawal tendency, isolation, work quality decline, attendance changes, relationship changes, performance affected, coping changes. Social: Social withdrawal, relationship strain, communication reduced, isolation tendency, connection difficulty, support avoidance, interaction reduced. Symptoms = recognize early. Physical signs. Emotional changes. Cognitive effects. Behavioral shifts. Social withdrawal. Multiple indicators. Attention needed. Action required."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage workplace stress?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management techniques: Time management: Effective scheduling, priority focus, task organization, deadline management, efficiency increase, control feeling, productivity improved. Breaks: Regular breaks taken, work pauses, mental rest, movement breaks, energy restoration, fatigue prevention, productivity maintained. Exercise: Physical activity regular, stress release, energy boost, mood improvement, health benefit, tension relief, wellness enhanced. Mindfulness: Present moment focus, meditation practice, breathing exercises, awareness development, stress reduction, calm achieved, mental clarity. Boundaries: Work limits set, separation maintained, personal time protected, availability managed, balance achieved, stress reduction. Support: Support seeking, talk to others, professional help, counseling access, colleague support, manager communication, assistance accepted. Techniques = practical application. Time managed. Breaks regular. Exercise consistent. Mindfulness practiced. Boundaries held. Support accessed. Combination effective."
      }
    },
    {
      "@type": "Question",
      "name": "How does organization support stress management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Organization support: Workload: Reasonable workload, manageable demands, task distribution, expectation clarity, deadline reasonable, support provided, pressure controlled. Resources: Support resources, counseling access, wellness programs, fitness options, health resources, assistance programs, help available. Culture: Supportive culture, stress awareness, balance valued, pressure reduced, open communication, help encouraged, stigma reduced. Training: Stress awareness training, management skills, coping techniques, resilience building, prevention education, support education. Management: Manager support, understanding shown, workload monitored, feedback given, concerns addressed, communication open, assistance provided. Flexibility: Flexible arrangements, schedule adjustment, personal accommodation, work options, stress reduction, balance support, needs addressed. Support = organizational commitment. Workload reasonable. Resources available. Culture supportive. Training provided. Manager support. Flexibility offered. Continuous attention."
      }
    },
    {
      "@type": "Question",
      "name": "When should I seek help for stress?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Help seeking: Persistent symptoms: Symptoms persist, ongoing stress, continuous impact, no improvement, lasting effects, chronic condition, sustained difficulty. Severity: Severe symptoms, major impact, significant difficulty, intense feelings, overwhelming stress, crisis level, serious concern. Function impact: Function affected, work performance decline, relationship strain, daily difficulty, ability reduced, capability impacted, effectiveness lowered. Health: Health affected, physical symptoms, medical issues, health decline, medical attention needed, physical concern, body impact. Coping failure: Coping insufficient, techniques failing, no improvement, worsening condition, strategies ineffective, situation deteriorating. Resources: Professional help needed, counseling appropriate, medical attention, specialist support, expert assistance, professional guidance. Help = when needed. Persistent symptoms. Severe impact. Function affected. Health decline. Coping failure. Professional sought. No stigma."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Stress Management Guide - Sources, Symptoms & Techniques',
  description: 'Stress sources, symptoms, management techniques, and organization support.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceStressManagementGuide />
    </Suspense>
  );
}