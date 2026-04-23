import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessRiskManagementGuide from '@/components/BusinessRiskManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of business risks exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk types include operational risk (process failures mitigated by controls and procedures), financial risk (market and credit exposure mitigated by hedging and diversification), strategic risk (business decisions mitigated by planning and analysis), compliance risk (regulatory violations mitigated by monitoring and training), reputational risk (public perception mitigated by communication and ethics), and cyber risk (security threats mitigated by protection and response)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the risk management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves identifying risks, assessing impact, evaluating probability, prioritizing risks, developing mitigation strategies, implementing controls, monitoring effectiveness, reviewing regularly, updating assessments, and reporting to leadership."
      }
    },
    {
      "@type": "Question",
      "name": "What frameworks guide risk management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Frameworks include ISO 31000 (risk management standard process), COSO ERM (enterprise risk integrated model), NIST CSF (cybersecurity tiered approach), and ISO 27001 (information security management system)."
      }
    },
    {
      "@type": "Question",
      "name": "What tools support risk management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk tools include risk registers for tracking identified risks, heat maps for visualizing risk levels, probability matrices for assessing likelihood, impact assessments for measuring consequences, control testing for verifying mitigation, scenario analysis for exploring possibilities, key risk indicators for early warning, and reporting dashboards for communication."
      }
    },
    {
      "@type": "Question",
      "name": "How often should risk assessments be updated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk assessments should be updated at least annually, quarterly for high-risk areas, after significant business changes, following incidents, when regulations change, and when new risks emerge. Continuous monitoring through key risk indicators provides ongoing assessment between formal reviews."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Risk Management Guide - Types, Process & Frameworks',
  description: 'Risk types, management process, frameworks, and supporting tools.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessRiskManagementGuide />
    </Suspense>
  );
}