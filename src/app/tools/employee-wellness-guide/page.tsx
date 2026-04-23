import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeWellnessGuide from '@/components/EmployeeWellnessGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is employee wellness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee wellness definition: Purpose: Support employee health, improve productivity, reduce healthcare costs, increase engagement, enhance retention. Areas: Physical health - fitness, nutrition, health screening, Mental health - counseling, stress management, emotional support, Financial health - planning, education, security, Social health - connections, community, relationships, Work environment - safety, ergonomics, supportive culture. Approach: Holistic view of employee wellbeing, multiple dimensions addressed, programs tailored to needs, ongoing support provided. Wellness = holistic employee health. Multiple areas covered. Programs match needs. Measure outcomes. Culture of wellness. Investment in people."
      }
    },
    {
      "@type": "Question",
      "name": "What wellness programs should I offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wellness program options: Physical wellness: Health insurance benefits, fitness subsidies or facilities, wellness challenges, health screenings, ergonomic assessments, preventive care. Mental wellness: Counseling services, stress management programs, mental health days, meditation/mindfulness training, employee assistance programs, burnout prevention. Financial wellness: Financial education, retirement planning help, budgeting assistance, financial counseling, debt management resources. Social wellness: Team building events, community involvement, social activities, peer support programs, mentorship opportunities. Work-life balance: Flexible schedules, remote work options, adequate PTO, manageable workload, boundary support. Programs = match to employee needs. Survey employees first. Prioritize by impact. Budget appropriately. Start with basics. Expand over time. Measure effectiveness."
      }
    },
    {
      "@type": "Question",
      "name": "How do I implement wellness programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wellness implementation: Assessment: Survey employee needs, identify priority areas, understand current state, budget constraints. Planning: Define wellness goals, choose program components, allocate budget, set timeline, identify resources. Communication: Explain programs clearly, communicate benefits, make sign-up easy, regular reminders, ongoing promotion. Execution: Launch programs, make participation accessible, remove barriers, provide support, track participation. Measurement: Participation rates, health outcomes, employee feedback, absenteeism changes, engagement surveys, healthcare cost trends. Improvement: Adjust based on data, expand successful programs, discontinue ineffective, add new components. Implementation = systematic approach. Assess needs. Plan carefully. Communicate well. Track participation. Measure outcomes. Improve continuously."
      }
    },
    {
      "@type": "Question",
      "name": "What are benefits of wellness programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wellness program benefits: For employees: Better physical health, improved mental wellbeing, financial security knowledge, work-life balance, stress reduction, overall satisfaction increase. For organization: Reduced absenteeism - better attendance, Higher productivity - better performance, Employee retention - lower turnover, Engagement increase - more commitment, Healthcare cost reduction - lower insurance costs, Culture improvement - positive workplace. ROI: Studies show positive return, cost savings from reduced absenteeism, lower healthcare costs, higher productivity, better retention. Benefits = tangible and intangible. Employee health improvement. Organizational performance gains. Cost savings measurable. Culture enhancement. Investment in wellness pays back."
      }
    },
    {
      "@type": "Question",
      "name": "How do I measure wellness program success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wellness measurement: Participation metrics: Enrollment rates, active participation, completion rates, engagement levels. Health outcomes: Biometric improvements, health risk reduction, fitness gains, screening results. Organizational metrics: Absenteeism rates, turnover rates, healthcare claims, workers&apos; compensation. Employee perception: Satisfaction surveys, program feedback, wellness perception, culture surveys. ROI calculation: Program costs vs benefits, healthcare savings, productivity gains, retention savings. Reporting: Regular reporting to leadership, trend analysis, comparison to benchmarks, adjustment recommendations. Measurement = comprehensive tracking. Participation first. Health outcomes follow. Organizational impact over time. Employee perception important. ROI demonstrates value."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Wellness Guide - Areas, Programs & Benefits',
  description: 'Wellness areas, program options, benefits, and implementation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeWellnessGuide />
    </Suspense>
  );
}