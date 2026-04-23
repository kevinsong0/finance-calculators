import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessComplianceFrameworkGuide from '@/components/BusinessComplianceFrameworkGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the compliance areas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance areas include regulatory compliance for government requirements, industry compliance for sector standards, internal compliance for company policies, data compliance for information rules, financial compliance for reporting standards, and environmental compliance for sustainability rules."
      }
    },
    {
      "@type": "Question",
      "name": "What is the compliance management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The compliance process involves identifying compliance requirements, assessing compliance status, developing compliance policies, creating compliance procedures, implementing compliance controls, training staff on compliance, monitoring compliance activities, auditing compliance adherence, reporting compliance status, and remediating compliance gaps."
      }
    },
    {
      "@type": "Question",
      "name": "What are common compliance frameworks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common compliance frameworks include ISO standards for quality management certification, SOC 2 for security controls trust, GDPR for data protection privacy compliance, and HIPAA for health information patient protection."
      }
    },
    {
      "@type": "Question",
      "name": "What elements are in a compliance framework?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance framework elements include compliance policy, control procedures, training programs, monitoring systems, audit schedules, reporting mechanisms, remediation process, and documentation standards."
      }
    },
    {
      "@type": "Question",
      "name": "Why is compliance important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Compliance ensures regulatory adherence by identifying requirements, assessing status, developing policies, creating procedures, implementing controls, training staff, monitoring activities, auditing adherence, reporting status, and remediating gaps."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Compliance Framework Guide - Areas, Process & Frameworks',
  description: 'Compliance areas, management process, frameworks, and framework elements.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessComplianceFrameworkGuide />
    </Suspense>
  );
}