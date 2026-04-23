import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessFinancialReportingGuide from '@/components/BusinessFinancialReportingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What financial statements do businesses need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial statements include balance sheet (assets, liabilities, equity), income statement (revenue, expenses, profit), cash flow statement (cash movements), equity statement (owner changes), notes to statements (details and context), and management report (internal analysis)."
      }
    },
    {
      "@type": "Question",
      "name": "What standards guide financial reporting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reporting standards include GAAP compliance, IFRS alignment, consistent methods, accurate timing, full disclosure, materiality principle, going concern basis, and comparative format."
      }
    },
    {
      "@type": "Question",
      "name": "What is the financial reporting process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves collecting financial data, verifying accuracy, applying accounting rules, preparing statements, reviewing for errors, adding disclosures, obtaining approval, distributing reports, archiving documents, and reviewing compliance."
      }
    },
    {
      "@type": "Question",
      "name": "Who uses financial reports?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Report users include management (operational decisions for internal analysis), investors (performance evaluation for investment decisions), lenders (credit assessment for loan decisions), and regulators (compliance verification for regulatory review)."
      }
    },
    {
      "@type": "Question",
      "name": "When should financial reports be prepared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Financial reports should be prepared monthly for internal management, quarterly for investor updates, and annually for regulatory filings and audited statements. Timeliness depends on business needs, regulatory requirements, and stakeholder expectations."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Financial Reporting Guide - Statements, Standards & Process',
  description: 'Financial statements, reporting standards, process, and report users.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessFinancialReportingGuide />
    </Suspense>
  );
}