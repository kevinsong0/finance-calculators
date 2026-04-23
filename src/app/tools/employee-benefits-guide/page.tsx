import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeBenefitsGuide from '@/components/EmployeeBenefitsGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are core employee benefits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Core employee benefits: Health insurance: Medical coverage for employees, preventive care, hospital coverage, prescription drugs, specialist access, mental health, family coverage options. Retirement plans: 401(k) plans, pension options, employer matching, investment choices, retirement savings, future security, tax advantages. Paid time off: Vacation time, sick leave, personal days, holidays, bereavement, jury duty, voting time, flexibility. Life insurance: Death benefit protection, coverage amounts, family protection, financial security, affordable rates, group coverage. Disability insurance: Short-term disability, long-term disability, income protection, illness coverage, injury coverage, income security. Benefits = competitive package. Health essential. Retirement important. Time off valued. Protection needed. Compliance required. Competitive advantage."
      }
    },
    {
      "@type": "Question",
      "name": "What voluntary benefits should I offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Voluntary benefits options: Health additions: Vision insurance for eye care, dental insurance for oral health, hearing coverage, wellness programs, mental health support, telehealth options. Financial: Employee assistance programs, financial counseling, legal assistance, identity theft protection, commuter benefits, student loan help. Lifestyle: Gym memberships, wellness subsidies, child care support, pet insurance, lifestyle spending accounts, educational assistance. Professional: Tuition reimbursement, certification support, professional development, conference attendance, skill training, career growth. Voluntary = enhance package. Vision and dental common. Wellness growing. Financial help valued. Lifestyle options. Professional support. Employee choice. Tax advantages."
      }
    },
    {
      "@type": "Question",
      "name": "How do I administer benefits programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefits administration: Plan selection: Choose appropriate plans, vendor evaluation, cost analysis, coverage comparison, employee needs, budget constraints, market comparison. Enrollment: Enrollment process design, communication timing, enrollment periods, new hire enrollment, life event changes, system support, employee guidance. Communication: Benefits communication plan, plan descriptions, cost sharing, enrollment guides, ongoing updates, changes notification, education materials. Cost management: Budget planning, cost tracking, vendor negotiation, plan design adjustments, contribution strategy, cost sharing, trend monitoring. Compliance: Legal compliance maintained, ACA requirements, ERISA compliance, reporting obligations, documentation standards, audit readiness. Administration = systematic process. Plan selection careful. Enrollment smooth. Communication clear. Cost controlled. Compliance maintained. Vendor managed. Employee supported."
      }
    },
    {
      "@type": "Question",
      "name": "What benefits trends are emerging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefits trends: Flexible work: Remote work options, flexible schedules, hybrid models, work location choice, flexibility valued, productivity focus, talent attraction. Mental health: Mental health coverage expansion, therapy access, stress management, counseling services, wellness apps, mental health days, stigma reduction. Financial wellness: Student loan assistance, financial education, emergency funds, savings programs, debt help, financial counseling, retirement planning. Personalized benefits: Choice in benefits selection, customized packages, flexible options, individual needs, life stage appropriate, voluntary additions. Wellness focus: Preventive care emphasis, health screening, fitness support, nutrition help, lifestyle wellness, holistic health, chronic condition management. Trends = evolving landscape. Flexibility key. Mental health priority. Financial wellness new. Personalization growing. Wellness expanded. Technology enabled."
      }
    },
    {
      "@type": "Question",
      "name": "How do I communicate benefits to employees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefits communication: Timing: Enrollment period communication, new hire orientation, annual renewal, life event guidance, ongoing reminders, change notifications. Content: Plan details explained, coverage descriptions, cost information, enrollment steps, deadlines clear, comparison tools, decision support. Methods: Written materials, online resources, presentations, one-on-one help, HR support, benefits portal, video guides, Q&A sessions. Education: Benefits education sessions, plan comparison help, cost understanding, coverage explanation, decision guidance, value communication. Updates: Change notifications prompt, cost updates clear, coverage changes explained, deadline reminders, important information, timely communication. Communication = thorough approach. Timing strategic. Content clear. Methods varied. Education provided. Updates timely. Support available. Technology helpful."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Benefits Guide - Types, Administration & Trends',
  description: 'Benefits types, administration, voluntary options, trends, and compliance.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeBenefitsGuide />
    </Suspense>
  );
}