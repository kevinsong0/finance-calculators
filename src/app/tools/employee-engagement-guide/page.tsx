import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeEngagementGuide from '@/components/EmployeeEngagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What drives employee engagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee engagement drivers: Meaningful work: Employees understand purpose, see contribution impact, connect work to organizational mission, feel their work matters. Recognition: Contributions acknowledged, effort appreciated, achievements celebrated, feedback given regularly. Growth opportunities: Career advancement paths, skill development, learning opportunities, mentoring available. Relationships: Strong team connections, trust with colleagues, positive manager relationships, supportive environment. Autonomy: Control over work methods, decision authority, flexibility in approach, empowerment to act. Fairness: Equitable treatment, transparent decisions, consistent policies, fair compensation. Drivers = combination of factors. Different drivers matter to different people. Identify key drivers for your team. Address multiple drivers together. Regular assessment essential."
      }
    },
    {
      "@type": "Question",
      "name": "How do I measure employee engagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Engagement measurement methods: Surveys: Annual comprehensive surveys, pulse surveys (frequent, short), specific topic surveys, benchmark comparisons. Conversations: One-on-one discussions, team meetings, informal feedback, listening sessions. Metrics: Turnover rates (voluntary departure), absenteeism patterns, productivity measures, participation rates. Exit interviews: Reasons for leaving, engagement factors missed, improvement suggestions. Indicators: Quality of work, initiative shown, collaboration level, advocacy for organization. Measurement = multiple methods together. Surveys for quantitative data. Conversations for qualitative insights. Metrics for objective indicators. Regular measurement. Act on results. Not just measure, improve."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve employee engagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Engagement improvement actions: Survey response: Act on survey feedback, communicate actions taken, show feedback valued, address identified issues. Communication: Improve information sharing, increase transparency, regular updates, accessible leadership. Recognition: Regular acknowledgment, public appreciation, specific praise, varied recognition methods. Growth: Provide development opportunities, career path clarity, training access, mentoring programs. Team building: Strengthen relationships, team activities, collaboration opportunities, trust building. Autonomy: Increase decision authority, reduce unnecessary oversight, empower problem-solving. Leadership: Develop engaging leaders, train management skills, model engagement behaviors. Improvement = act on drivers. Multiple actions together. Communicate changes. Measure impact. Continuous process. Leadership essential."
      }
    },
    {
      "@type": "Question",
      "name": "What are signs of disengagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Disengagement warning signs: Behavioral: Decreased participation, minimal effort, lack of initiative, withdrawn from team, reduced collaboration. Attendance: Increased absenteeism, late arrivals, leaving early, missed meetings. Performance: Lower quality work, missed deadlines, decreased productivity, errors increasing. Attitude: Negative comments, complaining, resistance to change, cynicism. Physical: Fatigue appearance, low energy, lack of enthusiasm. Communication: Reduced communication, avoiding discussions, non-responsiveness. Turnover: Expressing desire to leave, job searching, actual departure. Signs = indicators not proof. Investigate underlying causes. Address proactively. Early intervention. Support struggling employees. Not all signs equal severity."
      }
    },
    {
      "@type": "Question",
      "name": "How do leaders impact employee engagement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leadership impact on engagement: Direct influence: Managers are primary engagement driver, daily interactions shape experience, manager relationship critical, trust building essential. Leadership behaviors: Show appreciation regularly, provide clear direction, support development, listen actively, give autonomy appropriately, maintain fairness. Communication: Transparent about decisions, accessible for questions, regular check-ins, honest feedback. Support: Help with challenges, remove obstacles, provide resources, advocate for team. Development: Coach for growth, identify opportunities, discuss career path, invest in learning. Culture: Model engagement behaviors, set positive tone, reinforce values, recognize contributions. Leaders = key engagement factor. Manager relationship most important. Train leaders in engagement skills. Hold leaders accountable. Leadership development essential."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Engagement Guide - Drivers, Measurement & Improvement',
  description: 'Engagement drivers, measurement methods, improvement actions, and warning signs.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeEngagementGuide />
    </Suspense>
  );
}