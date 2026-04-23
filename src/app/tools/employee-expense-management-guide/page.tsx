import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeExpenseManagementGuide from '@/components/EmployeeExpenseManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What categories of employee expenses need management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Expense categories include travel expenses (flights, hotels, meals with pre-approval), office supplies (equipment, materials with budget limits), professional development (training, conferences with approval process), client entertainment (meals, events with spending limits), vehicle expenses (mileage, fuel with reimbursement rates), and home office costs (internet, equipment for remote work)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the expense management process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves establishing expense policy, defining approval workflow, setting spending limits, choosing submission method, requiring documentation, reviewing submissions, approving or denying requests, processing reimbursement, tracking spending trends, and reporting to finance."
      }
    },
    {
      "@type": "Question",
      "name": "What control measures apply to expense management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Control measures include pre-approval requirements, spending limits by category, documentation standards, approval hierarchies, timely submission rules, fraud detection measures, budget monitoring, and policy enforcement procedures."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges arise in expense management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common challenges include policy compliance (inconsistent adherence requiring clear communication), processing delays (slow approvals requiring automated workflow), documentation gaps (missing receipts requiring mandatory uploads), and budget overruns (excessive spending requiring regular monitoring)."
      }
    },
    {
      "@type": "Question",
      "name": "How long should expense reimbursement take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Expense reimbursement should typically be processed within 30 days of submission. Many companies aim for 10-15 business days after approval. Timely reimbursement improves employee satisfaction and ensures accurate financial reporting."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Expense Management Guide - Categories, Process & Controls',
  description: 'Expense categories, management process, control measures, and challenges.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeeExpenseManagementGuide />
    </Suspense>
  );
}