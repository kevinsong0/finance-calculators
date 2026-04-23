import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeTravelPolicyGuide from '@/components/EmployeeTravelPolicyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What components should a travel policy include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Travel policy components include booking procedures (flights, hotels, cars with approved vendors), expense limits (daily allowances with per diem rates), approval process (pre-travel authorization with required sign-offs), reimbursement rules (expense submission with documentation requirements), travel classes (flight and hotel tiers with role-based limits), and safety requirements (security measures with company protocols)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the employee travel process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The process involves submitting travel request, obtaining approval, booking arrangements, following expense limits, documenting expenses during trip, completing trip objectives, submitting expense report, reviewing submissions, processing reimbursement, and updating travel records."
      }
    },
    {
      "@type": "Question",
      "name": "What key policies govern employee travel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key policies include advance booking requirements, preferred vendor usage, class of travel limits, per diem allowances, receipt documentation requirements, timely submission deadlines, approval hierarchy procedures, and travel safety protocols."
      }
    },
    {
      "@type": "Question",
      "name": "What considerations guide travel policy design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Design considerations include budget control (cost limits with per diem system), employee comfort (travel fatigue with class flexibility), company liability (safety risks with insurance coverage), and policy fairness (consistent application with clear guidelines)."
      }
    },
    {
      "@type": "Question",
      "name": "What per diem rates should companies use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Per diem rates vary by location and company policy. Many companies use GSA rates for US travel as benchmarks. Rates typically cover meals, incidentals, and lodging separately or as combined daily allowances. Custom rates may be set based on travel frequency and budget constraints."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Travel Policy Guide - Components, Process & Policies',
  description: 'Travel policy components, process, key policies, and design considerations.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeeTravelPolicyGuide />
    </Suspense>
  );
}