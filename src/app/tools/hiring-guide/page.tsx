import type { Metadata } from 'next';
import { Suspense } from 'react';
import HiringGuide from '@/components/HiringGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I write a job description?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Job description components: Title - clear, specific role name. Summary - brief overview of position purpose. Responsibilities - key duties (5-8 bullet points), clear actions expected. Requirements - skills, experience, education needed, distinguish required vs preferred. Benefits - compensation range, perks, growth opportunities. Culture - company values, team description. Location - remote, hybrid, office requirements. Process - how to apply, timeline. Tips: Use clear language, be specific, focus on outcomes not tasks, include growth potential, avoid gendered language, distinguish must-have from nice-to-have. Good job description = attracts right candidates. Poor description = wrong applicants, wasted time. Be honest about requirements."
      }
    },
    {
      "@type": "Question",
      "name": "What interview questions should I ask?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Interview questions by type: Technical - job-specific skills, problem-solving scenarios, demonstrate expertise. Behavioral - past experiences (STAR method), how handled situations, teamwork examples, challenges overcome. Culture - values alignment, work style preferences, team fit, communication approach. Common questions: Tell me about yourself, greatest achievement, failure and learning, why this role, why this company, 5-year goals, team conflicts handled, difficult decisions. Tips: Prepare structured questions, ask same core questions to all candidates, dig into specific examples, evaluate against criteria, allow candidate questions. Good questions = reveal true candidate. Unstructured = biased evaluation. Use rubric for consistent assessment."
      }
    },
    {
      "@type": "Question",
      "name": "How do I evaluate candidates objectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Objective candidate evaluation: Rubric: Create scoring criteria before interviews, specific competencies rated, consistent scale (1-5), weigh criteria appropriately. Structured feedback: Gather from all interviewers, standardized form, specific examples from interview, compare against requirements, not against other candidates initially. Debrief: Discuss after all interviews complete, compare scores, identify concerns, weigh evidence, reach consensus or document disagreement. Documentation: Record all feedback, decisions justified, evidence-based, avoid subjective feelings. Bias mitigation: Structured process, diverse interviewers, blind resume review (remove names initially), focus on job-related criteria, multiple evaluators. Objectivity = structured process. Unstructured = bias. Document decisions. Compare to criteria not candidates."
      }
    },
    {
      "@type": "Question",
      "name": "How long should the hiring process take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hiring timeline: Average: 4-8 weeks from posting to offer. Breakdown: Application collection (1-2 weeks), screening (1 week), interviews (2-3 weeks), decision (1 week), offer negotiation (1 week). Factors: Role complexity, candidate availability, interviewer scheduling, company decision speed, competition from other offers. Best practices: Respond within 48h to applications, schedule interviews quickly, provide feedback within days, don&apos;t delay decisions unnecessarily. Too slow: Candidates lose interest, accept other offers, negative impression. Too rushed: Poor evaluation, bad hires. Balance: Speed with thoroughness. 3-4 weeks reasonable for most roles. Executive roles = longer (8-12 weeks). Set timeline expectations upfront. Communicate progress to candidates."
      }
    },
    {
      "@type": "Question",
      "name": "What should onboarding include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Onboarding components: Pre-boarding (before start): Welcome email, paperwork, equipment ordered, schedule shared, team introduction. Day 1: Orientation, HR paperwork, office/setup, team introductions, tools access, company overview, first tasks. Week 1: Role training, meet key colleagues, understand processes, initial projects, ask questions freely. Month 1: Deepen knowledge, take on responsibilities, performance expectations, feedback session, integration to team. 90-day check-in: Evaluate progress, adjust goals, identify support needs, retention focus. Documentation: Company policies, team processes, role-specific guides, key contacts, success metrics. Onboarding = retention foundation. Poor onboarding = early turnover. 90-day retention predicts long-term. Invest in onboarding process."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Hiring Guide - Steps, Interviews & Best Practices',
  description: 'Hiring process steps, interview types, evaluation, and onboarding.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HiringGuide />
    </Suspense>
  );
}