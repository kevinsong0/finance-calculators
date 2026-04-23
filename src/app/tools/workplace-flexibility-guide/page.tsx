import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceFlexibilityGuide from '@/components/WorkplaceFlexibilityGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What workplace flexibility options exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flexibility arrangements: Remote work: Work from home options, location flexibility, full remote possible, hybrid arrangements, technology support, communication tools. Flexible hours: Flexible start/end times, adjustable schedules, core hours only, personal schedule control, time autonomy, work-life balance. Compressed weeks: Four-day work weeks, longer daily hours, condensed schedule, schedule flexibility, productivity focus, rest days increased. Part-time: Reduced hours option, schedule flexibility, work-life accommodation, phased retirement, gradual return, personal needs. Job sharing: Two-person role share, responsibility division, coverage continuity, skill combination, collaborative arrangement, unique structure. Options = multiple choices. Remote location. Flexible time. Compressed schedule. Part-time option. Job sharing possible. Policy framework needed. Employee choice supported."
      }
    },
    {
      "@type": "Question",
      "name": "What are benefits of workplace flexibility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flexibility benefits: Employee satisfaction: Higher morale, work-life balance improved, stress reduced, personal needs addressed, autonomy valued, engagement increased. Talent attraction: Better candidates attracted, competitive advantage, modern workforce appeal, diverse candidates, broad talent pool, talent retention. Retention: Lower turnover, longer tenure, employee loyalty, commitment increased, turnover cost savings, stability improved. Productivity: Focus time increased, distractions reduced, efficiency improved, output maintained, performance sustained, quality preserved. Cost savings: Office space reduced, overhead lowered, equipment savings, utility costs, facility expenses, real estate cost. Benefits = multiple advantages. Satisfaction improved. Talent attraction. Retention increased. Productivity sustained. Costs saved. Competitive positioning. Employee value."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges does flexibility create?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flexibility challenges: Communication: Information gaps possible, spontaneous interaction reduced, connection harder, delayed responses, misunderstanding risk, collaboration difficulty. Collaboration: Team coordination harder, brainstorming challenging, project coordination, creative work, knowledge sharing, team cohesion. Management: Distance supervision different, performance visibility, accountability challenges, engagement monitoring, relationship building, team connection. Technology: Equipment needs, connectivity requirements, security concerns, access provision, support needed, training required. Culture: Team bonding difficulty, culture dilution risk, values transmission, connection maintenance, belonging feeling, inclusion efforts. Equity: Perceived fairness, equal access, opportunity consistency, consistent treatment, policy fairness, inclusion focus. Challenges = address proactively. Communication tools. Collaboration scheduled. Manager training. Technology support. Culture efforts. Equity ensured. Systematic solutions."
      }
    },
    {
      "@type": "Question",
      "name": "How do I implement flexibility programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Implementation steps: Policy: Define flexibility policy, eligibility criteria, arrangement options, expectations set, approval process, documentation requirements. Communication: Communicate policy clearly, explain options, eligibility understood, expectations clear, process explained, resources shared. Technology: Provide necessary equipment, connectivity ensured, tools provisioned, security measures, support available, training provided. Training: Manager training essential, flexibility management, remote supervision, performance measurement, communication skills, support techniques. Process: Request process defined, approval workflow, documentation requirements, modification process, ending process, transition handling. Monitoring: Track program effectiveness, measure outcomes, gather feedback, assess challenges, evaluate benefits, adjust approach. Implementation = systematic approach. Policy defined. Communication clear. Technology provided. Manager training. Process established. Effectiveness monitoring. Continuous improvement."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage flexible work arrangements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management approaches: Expectations: Clear expectations set, availability defined, output focus, communication requirements, meeting attendance, responsiveness standards. Communication: Regular check-ins scheduled, team meetings held, communication tools used, updates provided, visibility maintained, connection ensured. Performance: Output-based measurement, results focus, objective evaluation, goal tracking, quality assessment, contribution evaluation. Support: Technology support provided, equipment maintained, troubleshooting help, resource availability, issue resolution, ongoing assistance. Adjustment: Monitor effectiveness, address challenges, adjust approach, policy refinement, feedback incorporation, continuous improvement. Management = supportive approach. Clear expectations. Regular communication. Output measurement. Support provided. Effectiveness monitoring. Flexible adaptation. Continuous improvement."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Flexibility Guide - Arrangements, Benefits & Implementation',
  description: 'Flexibility arrangements, benefits, challenges, and implementation steps.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceFlexibilityGuide />
    </Suspense>
  );
}