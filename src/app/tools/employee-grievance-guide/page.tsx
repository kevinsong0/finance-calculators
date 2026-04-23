import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeGrievanceGuide from '@/components/EmployeeGrievanceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an employee grievance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee grievance definition: Purpose: Formal complaint mechanism, employee concerns addressed, workplace issues resolved, fair process provided, rights protected, dispute resolution. Types: Work conditions - environment, equipment, safety concerns, scheduling issues, workload complaints, resource concerns. Treatment - fairness issues, manager behavior, colleague issues, discrimination concerns, favoritism complaints, respect issues. Policy - policy interpretation disputes, application concerns, inconsistent enforcement, unclear rules, policy changes. Compensation - pay concerns, benefits issues, overtime disputes, bonus disagreements, raise concerns, classification issues. Harassment - behavior complaints, harassment allegations, discrimination reports, hostile environment, inappropriate conduct. Grievance = formal complaint process. Multiple types. Work conditions. Treatment issues. Policy disputes. Compensation concerns. Harassment reports. Fair process. Rights protected."
      }
    },
    {
      "@type": "Question",
      "name": "How should grievance process work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Grievance process steps: Submission: Employee submits grievance, designated form or channel, specific issue described, resolution desired stated, documentation provided. Acknowledgment: Acknowledge receipt promptly, timeline communicated, process explained, employee rights confirmed, confidentiality assured. Investigation: Investigate issue thoroughly, gather information, interview relevant parties, review documentation, assess policy application, determine facts. Determination: Review investigation findings, apply policy standards, make determination, document reasoning, consider resolution options, ensure fairness. Resolution: Implement resolution, communicate decision, explain reasoning, address concerns, set expectations, document outcome. Appeal: Appeal mechanism available, timeline for appeal, review process defined, higher level review, final decision process, documentation maintained. Process = structured approach. Submission formal. Prompt acknowledgment. Thorough investigation. Fair determination. Clear resolution. Appeal available. Documentation throughout."
      }
    },
    {
      "@type": "Question",
      "name": "What rights do employees have in grievance process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee grievance rights: Submission: Submit without fear of retaliation, multiple channels available, anonymous option where appropriate, timely submission, specific issue stated, evidence provided. Process: Receive acknowledgment, be informed of process, timely investigation, fair treatment throughout, access to information, representation option if desired. Resolution: Receive decision explanation, understand reasoning, fair consideration, appropriate resolution, implementation timely, outcome communicated. Appeal: Appeal if dissatisfied, timeline to appeal, higher review level, reconsideration opportunity, final decision explanation, documentation of outcome. Protection: No retaliation for grievance, continued fair treatment, confidentiality maintained, protection from harassment, support available, safe environment. Rights = protected throughout. Submission without fear. Fair process. Timely resolution. Appeal available. Retaliation prohibited. Support provided. Confidentiality maintained."
      }
    },
    {
      "@type": "Question",
      "name": "How do I resolve grievances effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Grievance resolution methods: Direct discussion: Manager and employee discuss, informal resolution, mutual understanding, immediate issues, quick resolution, relationship preserved. Mediation: Neutral mediator assists, structured dialogue, mutual agreement sought, relationship issues, longer-standing concerns, voluntary participation. Investigation: Formal investigation conducted, evidence gathered, findings documented, determination made, policy applied, formal resolution. Appeal: Higher level review, reconsideration of decision, additional investigation if needed, final determination, documentation completed, process concluded. Considerations: Severity of issue, relationship impact, policy application, consistency required, documentation standards, timeline requirements. Resolution = match to issue. Discussion for minor. Mediation for relationship. Investigation for serious. Appeal for dispute. Documentation essential. Follow-up important."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prevent grievances?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Grievance prevention: Communication: Open communication culture, regular feedback, clear expectations, accessible management, concerns addressed early, dialogue encouraged. Fairness: Consistent policy application, equal treatment, clear standards, transparent decisions, bias avoided, objective criteria. Training: Manager training on fairness, communication skills, conflict resolution, policy understanding, documentation standards, employee relations. Environment: Respectful workplace, positive culture, supportive atmosphere, safe reporting, inclusive environment, values demonstration. Resolution: Address concerns early, informal resolution encouraged, proactive management, issue identification, early intervention, continuous improvement. Prevention = proactive approach. Open communication. Fair treatment. Manager training. Positive culture. Early resolution. Continuous improvement. Issue monitoring."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Grievance Guide - Types, Process & Rights',
  description: 'Grievance types, process steps, employee rights, and resolution methods.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeGrievanceGuide />
    </Suspense>
  );
}