import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeOnboardingGuide from '@/components/EmployeeOnboardingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should onboarding include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Onboarding components: Pre-boarding (before start): Welcome email, paperwork completion, equipment ordered, schedule prepared, team introduction email, workspace setup. Day 1: HR orientation, company overview, workspace introduction, team meetings, key contacts, initial tools/training, welcome lunch. Week 1: Role training, process documentation, key systems access, project introduction, meeting key stakeholders, buddy/mentor meetings, expectations clarification. Month 1: Regular check-ins, feedback sessions, project ownership, performance goals, cultural integration, training completion. Quarter 1: 90-day review, full integration assessment, development planning, independence evaluation, long-term goal setting. Onboarding = structured process. Not one day event. 90-day focus critical."
      }
    },
    {
      "@type": "Question",
      "name": "How long should onboarding take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Onboarding duration: Minimum: 90 days for full integration. Day 1: Orientation basics. Week 1: Initial role training. Month 1: Core competency building. Quarter 1: Full productivity expected. Factors: Role complexity, experience level, company size, remote vs in-person, support resources. Best practice: Structured program through 90 days with graduated expectations. Common mistake: Treating onboarding as day 1 only - leads to confusion, slow productivity, early turnover. Research: 90-day retention predicts long-term retention. Strong onboarding = 95%+ 90-day retention. Weak onboarding = 30%+ early turnover. 90 days = integration period. One day = insufficient. Structure through quarter."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create an onboarding plan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Onboarding plan creation: Template: Standard plan for role type, customize for specific hire. Timeline: Pre-boarding tasks, day 1 schedule, week 1 plan, month 1 milestones, quarter 1 goals. Activities: Orientation sessions, training modules, meetings scheduled, project assignments, feedback check-ins. Resources: Documentation needed, tools access, mentor/buddy assigned, support contacts. Milestones: Paperwork complete, training done, first project, independence level, 90-day review. Checkpoints: Daily first week, weekly first month, monthly first quarter, 90-day formal review. Owners: HR for logistics, manager for role, buddy for culture, mentor for development. Plan = structured integration. Not improvised. Document, schedule, assign owners."
      }
    },
    {
      "@type": "Question",
      "name": "What is pre-boarding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pre-boarding: Activities before employee&apos;s start date. Purpose: Reduce day 1 stress, complete logistics early, build excitement, prepare workspace, start relationship. Activities: Welcome email with first day details, paperwork sent electronically, equipment ordered and configured, workspace prepared, team notified of arrival, schedule for first week created, buddy/mentor assigned, company materials shared (values, handbook). Benefits: Employee feels welcomed, day 1 focuses on integration not logistics, productivity starts faster, reduces anxiety. Timeline: Start pre-boarding upon offer acceptance, complete all tasks before start date. Pre-boarding = day 1 readiness. No pre-boarding = chaotic start. Start before they start."
      }
    },
    {
      "@type": "Question",
      "name": "How do I onboard remote employees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote onboarding best practices: Equipment: Ship laptop/equipment early, set up before start, test all tools. Documentation: Comprehensive guides for tools, processes, culture - all accessible online. Communication: Video call on day 1, daily check-ins first week, virtual team introductions, Slack/email introduction threads. Training: Video tutorials, recorded sessions, interactive online modules, Q&A sessions scheduled. Culture: Virtual coffee chats, team video meetings, company values session, online social events. Support: Assigned remote buddy, clear escalation paths, regular video check-ins, responsive messaging support. Challenges: Isolation risk, slower relationship building, tech issues, missing informal learning. Solutions: Extra communication, structured social touchpoints, proactive support. Remote = extra intentional contact. More check-ins. Video not just text. Combat isolation."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Onboarding Guide - Phases, Checklist & Best Practices',
  description: 'Onboarding phases, checklist items, and integration best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeOnboardingGuide />
    </Suspense>
  );
}