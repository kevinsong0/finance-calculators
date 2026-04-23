import type { Metadata } from 'next';
import { Suspense } from 'react';
import RemoteWorkPolicyGuide from '@/components/RemoteWorkPolicyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should a remote work policy include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote work policy components: Eligibility: Which roles eligible, performance requirements, tenure requirements, approval process, conditions for eligibility. Schedule: Days allowed remote, required office days, core hours expectation, flexibility level, meeting attendance requirements. Equipment: What company provides, laptop/computer provision, internet support, ergonomic equipment, software requirements. Expectations: Availability standards, response time expectations, output requirements, performance measurement, accountability mechanisms. Communication: Required tools, communication frequency, meeting expectations, documentation requirements, visibility standards. Security: VPN requirements, data protection, secure workspace expectations, compliance requirements, incident reporting. Policy = comprehensive coverage. Clear eligibility. Schedule expectations. Equipment support. Communication norms. Security requirements."
      }
    },
    {
      "@type": "Question",
      "name": "What are benefits of remote work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote work benefits: For employees: Flexibility - work schedule control, Work-life balance - personal life integration, Reduced commute - time and cost savings, Focus time - less interruption, Location independence - geographic freedom, Comfort - preferred work environment. For organization: Cost savings - office space reduction, Talent access - broader hiring pool, Retention - higher employee retention, Productivity - focus time increase, Absenteeism - fewer sick days, Sustainability - reduced commuting emissions. Considerations: Not all roles suitable, Requires good communication, Needs clear expectations, Security concerns to address, Culture impact to manage. Benefits = for both parties. Employee flexibility. Organization cost savings. Broader talent pool. Balance benefits with challenges. Clear policy needed."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges does remote work create?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote work challenges: Communication: Information gaps, less spontaneous interaction, harder to stay connected, delayed responses, misunderstanding risk. Collaboration: Team coordination harder, brainstorming difficult, project coordination, creative work challenges, informal knowledge sharing. Isolation: Disconnection from team, loneliness risk, missing social aspect, team bonding difficulty, culture dilution. Visibility: Performance perception, recognition challenges, advancement concerns, presence visibility, contribution demonstration. Security: Data protection, secure connections, device security, information privacy, compliance adherence. Management: Different supervision approach, distance challenges, trust building, accountability, keeping engagement. Challenges = address proactively. Communication tools help. Collaboration time scheduled. Connection efforts made. Output-based measurement. Security requirements. Manager training."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage remote employees?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote employee management: Communication: Regular one-on-ones, team check-ins, clear expectations, multiple channels, prompt responses, visibility updates. Measurement: Output-based performance, results focused, clear goals, measurable targets, regular feedback, objective evaluation. Trust: Assume positive intent, avoid micromanagement, give autonomy, check results not hours, build relationship, regular support. Connection: Team meetings virtual, social interaction opportunities, inclusion efforts, face-to-face occasionally, relationship building. Support: Technology assistance, troubleshooting help, career development, resource provision, issue resolution. Management = different approach. Regular communication. Output focus. Trust-based. Connection efforts. Support available. Training for managers essential."
      }
    },
    {
      "@type": "Question",
      "name": "How do I ensure remote work security?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Remote work security: Technical measures: VPN for connections, secure networks required, encrypted communications, approved devices only, multi-factor authentication, regular updates. Policy requirements: Clear security policy, acceptable use guidelines, data handling rules, password requirements, incident reporting, compliance standards. Training: Security awareness training, phishing recognition, safe browsing, data protection, device security, regular refreshers. Physical security: Secure workspace, locked devices, screen privacy, visitor control, document handling. Monitoring: Activity logging where appropriate, compliance checking, regular audits, incident detection. Security = comprehensive approach. Technical tools. Clear policy. Regular training. Physical measures. Ongoing monitoring. Incident response ready."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Remote Work Policy Guide - Components, Benefits & Challenges',
  description: 'Remote work policy components, benefits, challenges, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RemoteWorkPolicyGuide />
    </Suspense>
  );
}