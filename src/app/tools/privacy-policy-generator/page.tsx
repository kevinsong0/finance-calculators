import type { Metadata } from 'next';
import { Suspense } from 'react';
import PrivacyPolicyGenerator from '@/components/PrivacyPolicyGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should a privacy policy include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Privacy policy must include: what data collected, how data used, data storage and security, cookies usage, third-party sharing, user rights (access, delete, correct), data retention policy, children's privacy, policy update process, contact information. For GDPR: lawful basis, consent mechanisms, data portability. For CCPA: opt-out rights, sale disclosure."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a privacy policy for my website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, privacy policy required for: any website collecting user data, AdSense/Ad approval, app store submission, GDPR compliance (EU users), CCPA compliance (California users), ecommerce sites, SaaS products. Legal requirement in most jurisdictions. Display in footer, link from all pages. Users expect transparency."
      }
    },
    {
      "@type": "Question",
      "name": "What is GDPR privacy policy requirement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GDPR requirements: identify data controller, purpose of processing, lawful basis, data categories, recipients, retention period, user rights (access, rectification, erasure, portability, objection), right to withdraw consent, complaint right to supervisory authority, automated decision info, security measures. Explicit for EU users. Consent required before collection."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write a CCPA compliant privacy policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CCPA requirements: categories of personal info collected, categories of sources, business purpose, categories of third parties sharing, right to know, right to delete, right to opt-out of sale, right to non-discrimination, Do Not Sell link if selling data. California residents rights. Opt-out mechanism required. Notice at collection point."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I update my privacy policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Update privacy policy: when changing data practices, adding new services, legal requirement changes, new third-party integrations, change in business model. Review annually minimum. Notify users of significant changes. Update effective date. Keep version history. Major changes require user consent in some jurisdictions."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Privacy Policy Generator - Create Website Privacy Policy',
  description: 'Generate privacy policy for your website. Customize company name, data types, contact. Basic template for websites and apps. Not legal advice.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PrivacyPolicyGenerator />
    </Suspense>
  );
}