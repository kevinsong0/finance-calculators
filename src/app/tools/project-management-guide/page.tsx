import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProjectManagementGuide from '@/components/ProjectManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the phases of project management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Project management phases: Initiation - define scope, objectives, stakeholders, create charter. Planning - detailed plan, schedule, budget, WBS, risk assessment. Execution - perform work, manage team, produce deliverables. Monitoring & Controlling - track progress, manage changes, control quality. Closure - final delivery, lessons learned, archive, release team. Not strictly sequential - overlap and iterate. Planning = most time. Execution = longest duration. Each phase has deliverables. Adapt phases to methodology (Agile = iterations instead)."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Work Breakdown Structure (WBS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Work Breakdown Structure (WBS): hierarchical decomposition of project deliverables. Structure: Project > Phases > Deliverables > Work Packages > Tasks. Benefits: Clear scope definition, easier estimation, resource allocation, accountability, progress tracking. Rules: 100% rule (covers all work), mutually exclusive (no overlap), deliverable-focused (not activities), appropriate detail (3-4 levels typical). Work package = smallest unit for assignment (8-80 hours rule). WBS = foundation for schedule, budget, risk management. Create WBS early with team input."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create a project schedule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Project schedule creation: 1. Define activities (from WBS). 2. Sequence activities (dependencies). 3. Estimate durations (effort + resources). 4. Identify resources (who, what). 5. Develop schedule (network diagram, Gantt). 6. Optimize (critical path, float). 7. Review with team. 8. Baseline schedule. Consider: Dependencies (must finish before start), resource availability, constraints, risks. Critical path = longest path, determines project duration. Float = flexibility in timing. Update schedule regularly. Use tools: MS Project, Jira, Asana. Agile: iterations instead of fixed schedule."
      }
    },
    {
      "@type": "Question",
      "name": "What is risk management in projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Project risk management: Identify risks - brainstorm, checklist, expert input, historical data. Assess risks - probability x impact = risk score, prioritize high risks. Plan responses - Avoid (eliminate cause), Mitigate (reduce probability/impact), Transfer (insurance, outsourcing), Accept (contingency plan). Implement responses - execute mitigation, track effectiveness. Monitor risks - watch triggers, reassess regularly, identify new risks. Document in risk register: Risk, probability, impact, response, owner, status. Review weekly. High-probability + high-impact = priority. Proactive risk management prevents failures."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage project stakeholders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stakeholder management: Identify stakeholders - anyone affected by project (sponsor, team, users, vendors, management). Analyze stakeholders - interest level, influence power, support/oppose. Plan engagement - communication frequency, format, content per stakeholder. Engage - regular updates, involve in decisions, address concerns. Monitor - track satisfaction, adjust approach. Key: Manage expectations early, over-communicate (not under), build relationships, address resistance, celebrate successes together. Stakeholder matrix: high influence + high interest = manage closely. Ignored stakeholders = surprises and blockers."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Project Management Guide - Phases, Methods & Best Practices',
  description: 'PM phases, WBS, scheduling, risk management, and stakeholder engagement.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProjectManagementGuide />
    </Suspense>
  );
}