import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessLegalComplianceGuide from '@/components/BusinessLegalComplianceGuide';

const faqSchema = {
  "@context": "https: //schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What areas require legal compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance areas include corporate law (company structure with formation compliance), employment law (worker rights with HR regulations), contract law (agreements with enforceable terms), intellectual property (IP protection with rights registration), tax law (taxation with filing obligations), and data privacy (information with protection standards)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the legal compliance process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves identifying applicable laws, assessing current compliance, identifying gaps, developing compliance plan, implementing controls, training personnel, monitoring adherence, documenting compliance, reviewing regularly, and updating for legal changes."
      }
    },
    {
      "@type": "Question",
      "name": "What risks arise from non-compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risks include regulatory penalties (fines and sanctions requiring proactive compliance), legal liability (lawsuits and damages requiring risk management), reputation damage (trust loss requiring ethical practices), and operational disruption (business impact requiring backup plans)."
      }
    },
    {
      "@type": "Question",
      "name": "What responsibilities ensure compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key responsibilities include legal counsel engagement, compliance officer role, management oversight, employee training, policy documentation, regular audits, incident response procedures, and continuous improvement."
      }
    },
    {
      "@type": "Question",
      "name": "How often should compliance be reviewed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance should be reviewed quarterly at minimum, with annual comprehensive audits. More frequent review is needed when laws change, new regulations emerge, business expands, or incidents occur. Ongoing monitoring through automated systems and regular reporting ensures consistent adherence."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Legal Compliance Guide - Areas, Process & Risks',
  description: 'Compliance areas, process, risk factors, and key responsibilities.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessLegalComplianceGuide />
    </Suspense>
  );
}