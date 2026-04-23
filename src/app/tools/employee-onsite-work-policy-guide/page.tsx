import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmployeeOnsiteWorkPolicyGuide from '@/components/EmployeeOnsiteWorkPolicyGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What requirements apply to onsite work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Onsite work requirements include attendance schedule (work hours and location with mandatory presence), workplace conduct (behavior standards for professional environment), safety compliance (health protocols with mandatory adherence), equipment usage (company resources with proper utilization guidelines), meeting participation (collaboration sessions requiring in-person attendance), and visitor protocols (guest management with security procedures)."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of onsite work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Onsite work benefits include direct collaboration (enhanced team interaction measured by project speed), immediate feedback (real-time response measured by decision speed), culture building (shared experience measured by engagement scores), resource access (full equipment availability measured by capability utilization), visibility presence (management awareness measured by recognition frequency), and social connection (relationship building measured by team cohesion)."
      }
    },
    {
      "@type": "Question",
      "name": "What considerations affect onsite work policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key considerations include commute time impact on employees, office capacity limits, flexibility expectations of staff, work-life balance needs, cost implications for company and employees, safety requirements, technology needs for onsite work, and employee preferences for work location."
      }
    },
    {
      "@type": "Question",
      "name": "How should onsite work be managed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Management approach includes clear scheduling requirements, flexibility where possible, safety protocol enforcement, ensuring resource availability, performance monitoring, team coordination, communication clarity, and providing regular feedback to employees."
      }
    },
    {
      "@type": "Question",
      "name": "When is onsite work most appropriate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Onsite work is most appropriate for roles requiring hands-on equipment use, collaborative projects needing frequent in-person interaction, training sessions, client meetings, roles with security-sensitive work, positions requiring direct supervision, and situations where physical presence significantly improves outcomes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Employee Onsite Work Policy Guide - Requirements, Benefits & Management',
  description: 'Onsite work requirements, benefits, considerations, and management approach.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EmployeeOnsiteWorkPolicyGuide />
    </Suspense>
  );
}