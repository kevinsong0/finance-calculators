import type { Metadata } from 'next';
import { Suspense } from 'react';
import TalentAcquisitionGuide from '@/components/TalentAcquisitionGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the talent acquisition process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Talent acquisition process: Job analysis: Define role requirements, identify key skills, determine responsibilities, understand success factors, create job description. Sourcing: Post on job boards, use LinkedIn/social media, leverage referrals, engage recruiters, tap networks. Screening: Review applications, filter by requirements, conduct phone screens, assess basic fit, create shortlist. Interviewing: Structure interviews consistently, use multiple interviewers, assess skills and fit, compare candidates fairly. Selection: Evaluate all candidates, weigh factors appropriately, choose best fit, check references. Offer: Make competitive offer, negotiate if needed, finalize terms, communicate clearly. Onboarding: Welcome new employee, provide orientation, integrate into team, set up for success. Process = systematic approach. Define clearly before searching. Source broadly. Evaluate fairly. Move efficiently. Candidate experience matters."
      }
    },
    {
      "@type": "Question",
      "name": "How do I source candidates effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Candidate sourcing strategies: Job boards: Wide audience reach, many platforms available, filter by location/skills, good for general roles, track response rates. LinkedIn: Professional network, search by skills/experience, reach passive candidates, company pages, recruiting tools. Referrals: Employee recommendations, often higher quality, faster hiring, lower cost, incentivize referrals. Recruiters: Specialized expertise, access to networks, handle screening, higher cost, good for senior/special roles. Company website: Career page, job postings, interested candidates apply, low cost, showcase company. Social media: Facebook, Twitter, industry forums, younger audience, brand awareness, low cost. Campus recruiting: Universities, career fairs, internship programs, entry-level roles, future pipeline. Sourcing = multiple channels. Choose based on role type. Track effectiveness. Optimize over time. Build employer brand."
      }
    },
    {
      "@type": "Question",
      "name": "How do I structure interviews?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Interview structure: Preparation: Review candidate resume, prepare questions, understand role requirements, review evaluation criteria, plan time allocation. Types: Phone screen - initial contact, basic qualification check. Technical - assess specific skills, problem-solving. Behavioral - past experiences, how handled situations. Panel - multiple perspectives, consistent evaluation. Cultural fit - team compatibility, values alignment. Question types: Open-ended questions, specific examples requested, hypothetical scenarios, follow-up probing. Evaluation: Consistent criteria, scoring system, note-taking, multiple interviewer input, calibrate expectations. Post-interview: Compare notes, discuss candidates, make decisions, provide feedback. Structure = consistency important. Same criteria for all. Multiple perspectives. Document evaluation. Train interviewers. Avoid bias."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics should I track in recruiting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recruitment metrics: Time-to-fill: Days from posting to hire, track per role type, benchmark against targets, longer may indicate problems. Cost-per-hire: Total recruiting cost / hires, include advertising, recruiter fees, internal costs, track trends. Quality of hire: Performance ratings, retention rates, manager satisfaction, long-term success. Source effectiveness: Where successful candidates come from, compare channels, optimize sourcing strategy. Applicant volume: Applications per posting, indicates interest, job description quality, market conditions. Selection ratio: Hires / applicants, indicates screening efficiency, too high or low problematic. Offer acceptance rate: Accepted offers / offers made, indicates competitiveness, track rejection reasons. Metrics = measure efficiency and quality. Multiple metrics together. Set targets. Track trends. Improve based on data. Balance speed and quality."
      }
    },
    {
      "@type": "Question",
      "name": "How do I evaluate candidates fairly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fair candidate evaluation: Criteria: Define before interviewing, based on job requirements, measurable indicators, documented and shared. Consistency: Same questions for all candidates, same evaluation scale, same interviewers where possible, structured process. Documentation: Record all answers, note scores, capture observations, maintain records, support decisions. Multiple perspectives: Include diverse interviewers, panel interviews, calibrate scoring, discuss differences. Avoiding bias: Focus on evidence not impressions, consider objective criteria, awareness of biases, structured evaluation. Skills assessment: Work samples, technical tests, problem-solving exercises, realistic job preview. Reference checks: Verify claims, get additional perspective, ask specific questions, multiple references. Fairness = structured process. Defined criteria first. Consistent evaluation. Document everything. Multiple perspectives. Focus on evidence. Check references."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Talent Acquisition Guide - Sourcing, Interviewing & Evaluation',
  description: 'Recruitment stages, sourcing channels, interview types, and metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TalentAcquisitionGuide />
    </Suspense>
  );
}