import type { Metadata } from 'next';
import { Suspense } from 'react';
import LLCOperatingAgreementGuide from '@/components/LLCOperatingAgreementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an LLC operating agreement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An LLC operating agreement is a legal document that outlines the ownership, management, and operating procedures of a limited liability company. It defines member rights, profit distribution, voting rules, and dissolution procedures. While not required by most states, it's essential for protecting members and avoiding disputes."
      }
    },
    {
      "@type": "Question",
      "name": "Is an operating agreement required for LLC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most states don't legally require an operating agreement, but it's highly recommended. Without one, your LLC follows default state rules which may not match your intentions. Single-member LLCs should still have one to strengthen liability protection. Multi-member LLCs absolutely need one to define relationships."
      }
    },
    {
      "@type": "Question",
      "name": "What should be included in an operating agreement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key sections: company name and purpose, member information and ownership percentages, management structure (member or manager-managed), voting rights and decision-making, capital contributions and profit allocation, membership changes (admission, withdrawal, transfer), dissolution procedures, and amendment process."
      }
    },
    {
      "@type": "Question",
      "name": "Can I write my own LLC operating agreement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can write your own, especially for simple single-member LLCs. Templates are available online. However, for multi-member LLCs or complex situations, consult an attorney. Custom clauses for buyouts, dispute resolution, and special allocations benefit from professional drafting."
      }
    },
    {
      "@type": "Question",
      "name": "Does an operating agreement need to be filed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, operating agreements are internal documents and don't need to be filed with the state. Keep signed copies with all members and store safely. Banks may request it when opening accounts. Update it when membership changes and keep records of all versions."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'LLC Operating Agreement Guide - Essential Sections & Clauses',
  description: 'Learn what to include in your LLC operating agreement. Required sections, key clauses, member-managed vs manager-managed structures, and best practices.',
  keywords: ['LLC operating agreement', 'operating agreement guide', 'LLC formation', 'LLC members', 'LLC management', 'business legal documents', 'LLC structure', 'member agreement'],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LLCOperatingAgreementGuide />
    </Suspense>
  );
}