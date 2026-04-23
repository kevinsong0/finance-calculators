import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessQualityAssuranceProcessGuide from '@/components/BusinessQualityAssuranceProcessGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What aspects require quality assurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality assurance aspects include product QA for product quality with testing protocols, process QA for process quality with process audits, service QA for service quality with service reviews, document QA for documentation with review cycles, data QA for data quality with validation rules, and code QA for software quality with code reviews."
      }
    },
    {
      "@type": "Question",
      "name": "What methods support quality assurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality assurance methods include defining quality standards, establishing QA processes, creating checklists and templates, conducting quality reviews, performing testing activities, documenting quality findings, tracking quality metrics, reporting quality status, implementing improvements, and validating quality outcomes."
      }
    },
    {
      "@type": "Question",
      "name": "What techniques enable quality assurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality assurance techniques include testing for product verification achieving defect detection, inspection for process review achieving standard adherence, audit for system evaluation achieving compliance, and review for document check achieving accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure QA success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality assurance metrics include defect rate, quality score, review completion, test coverage, error reduction, quality cost, customer satisfaction, and process efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "Why implement quality assurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality assurance delivers excellence through defining standards, establishing processes, creating checklists, conducting reviews, performing testing, documenting findings, tracking metrics, reporting status, implementing improvements, and validating outcomes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Quality Assurance Process Guide - Aspects, Methods & Metrics',
  description: 'QA aspects, process methods, quality techniques, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessQualityAssuranceProcessGuide />
    </Suspense>
  );
}