import type { Metadata } from 'next';
import { Suspense } from 'react';
import LegalDocumentGenerator from '@/components/LegalDocumentGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What legal documents does a website need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Website legal documents: Privacy Policy (required if collecting any data - names, emails, cookies). Terms of Service/Terms of Use (defines usage rules, liability). Cookie Policy (required if using cookies in EU). Disclaimer (limits liability, especially for advice/content sites). EULA (software/apps license agreement). GDPR compliance notice (if serving EU users). CCPA notice (if serving California users). Place in footer, accessible from all pages."
      }
    },
    {
      "@type": "Question",
      "name": "What should a privacy policy include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Privacy Policy sections: What data is collected (personal, usage, cookies). How data is used (service, analytics, marketing). Who data is shared with (partners, processors, legal). How long data is retained. User rights (access, delete, correct, opt-out). How to exercise rights (contact method). Security measures. Contact information for privacy concerns. Updates and notification method. For GDPR: explicit consent, data portability, breach notification. Keep current, link in footer."
      }
    },
    {
      "@type": "Question",
      "name": "What is GDPR compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GDPR (EU data protection): applies if processing EU residents&apos; data. Requirements: lawful basis for processing (consent, contract, legitimate interest), clear consent mechanism, right to access/delete/correct data, data portability, breach notification (72 hours), privacy by design, data protection officer (large orgs), impact assessments. Penalties: up to 4% annual revenue or 20M EUR. Must have compliant privacy policy, cookie consent banner, data request process. Applies worldwide if EU users."
      }
    },
    {
      "@type": "Question",
      "name": "What is CCPA compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CCPA (California Consumer Privacy Act): applies if serving California residents and meets thresholds. Consumer rights: Right to Know (what data collected/shared), Right to Delete (delete personal data), Right to Opt-Out (stop sale of data), Right to Non-Discrimination (same service if opt-out). Requirements: privacy policy with CCPA disclosures, Do Not Sell My Personal Info link, respond to consumer requests within 45 days. Penalties: $2,500-7,500 per violation. Similar laws in other states emerging."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a lawyer for legal documents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Legal document advice: Templates useful starting point, but need customization. Consult lawyer if: collecting sensitive data (health, financial), serving minors, operating in regulated industry (healthcare, finance), international users (GDPR/CCPA), complex business model, significant liability risk. Template limitations: may miss jurisdiction-specific requirements, outdated for new laws, generic language insufficient. Lawyer ensures compliance, reduces risk. Cost less than penalties. Even basic sites benefit from legal review."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Legal Document Generator Guide - Privacy Policy, Terms & Compliance',
  description: 'Document types, key sections, compliance regulations, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LegalDocumentGenerator />
    </Suspense>
  );
}