import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeOffboardingGuide from '@/components/EmployeeOffboardingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is employee offboarding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee offboarding definition: Purpose: Manage departure professionally, ensure knowledge transfer, recover company assets, maintain relationships, protect company interests. Process: Notification - inform employee of departure, Documentation - complete paperwork, Asset recovery - collect company property, Access revocation - remove system access, Knowledge transfer - transfer responsibilities, Exit interview - conduct final discussion. Importance: Security protection, knowledge retention, professional relationship, legal compliance, smooth transition. Offboarding = professional departure. Document process. Transfer knowledge. Recover assets. Remove access. Maintain relationship. Protect company."
      }
    },
    {
      "@type": "Question",
      "name": "What assets should be recovered during offboarding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Asset recovery checklist: Physical assets: Computer/laptop, Mobile devices (phones, tablets), Keys and access cards, Uniforms and equipment, Company vehicles, Tools and supplies. Digital assets: Software licenses, Company credit cards, VPN tokens, Badge passes, Equipment accessories. Information assets: Documents and files, Electronic data, Customer information, Login credentials, Work products. Recovery = complete collection. Document what&apos;s issued. Check all items returned. Verify condition. Track missing items. Secure sensitive data."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle knowledge transfer during offboarding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Knowledge transfer process: Documentation: Document current work, List pending tasks, Identify key contacts, Process documentation, File locations and access, System requirements. Meetings: Meet with replacement/colleague, Walk through responsibilities, Demonstrate key processes, Answer questions, Share insights. Files: Organize files clearly, Name documents appropriately, Provide context, Archive appropriately. Contacts: Key stakeholders identified, Relationship notes, Communication preferences, Background provided. Transfer = comprehensive handover. Document thoroughly. Meet with successor. Organize files. Share contacts. Provide context. Allow time for questions."
      }
    },
    {
      "@type": "Question",
      "name": "What should an exit interview cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exit interview topics: Work experience: Role satisfaction, Work environment feedback, Management feedback, Team dynamics observations, Suggestions for improvement. Departure reason: Primary reason for leaving, Factors that influenced decision, What would have kept employee, Other opportunities considered. Company insights: Strengths of organization, Areas needing improvement, Competitive observations, Culture observations. Recommendations: Suggestions for role, Advice for successor, Process improvements, Team development ideas. Benefits information: Understanding of continuation options, COBRA if applicable, 401k/retirement options, Other benefit status. Exit interview = valuable feedback. Ask open questions. Listen without defending. Document responses. Identify patterns. Use for improvement. Keep confidential."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle access revocation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Access revocation process: System access: Email accounts - deactivate, System logins - remove, VPN access - revoke, Cloud services - remove, Software licenses - transfer/revoke. Physical access: Building access - deactivate cards, Parking access - revoke, Secure areas - remove permissions, Lockers/storage - clear and close. Communication: Email forwarding - set up or remove, Auto-replies - set departure message, Calendar - clear appointments, Teams/channels - remove access. Timing: Day of departure typically, Coordinate with IT, Coordinate with facilities, Verify all access removed, Emergency access provisions if needed. Revocation = comprehensive removal. All systems covered. Physical and digital. Verify completion. Coordinate timing. Emergency protocols."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Offboarding Guide - Steps, Assets & Knowledge Transfer',
  description: 'Offboarding process, asset recovery, knowledge transfer, and exit interview.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmployeeOffboardingGuide />
    </Suspense>
  );
}