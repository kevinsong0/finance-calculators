import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessProcessImprovementGuide from '@/components/BusinessProcessImprovementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What methods improve business processes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improvement methods include Lean (waste elimination for efficiency gains), Six Sigma (variation reduction for quality improvement), Kaizen (continuous improvement for incremental progress), Business process reengineering (process redesign for transformation), TQM (quality culture for organization-wide quality), and Agile (flexibility for adaptability)."
      }
    },
    {
      "@type": "Question",
      "name": "What steps guide process improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improvement steps include identifying improvement opportunity, analyzing current process, defining improvement goals, designing improved process, implementing changes, monitoring results, standardizing improvements, and continuing improvement cycle."
      }
    },
    {
      "@type": "Question",
      "name": "What tools support process improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improvement tools include value stream mapping (process visualization to identify waste), root cause analysis (problem solving to find causes), benchmarking (performance comparison to set targets), and PDCA cycle (iterative improvement for continuous progress)."
      }
    },
    {
      "@type": "Question",
      "name": "What benefits result from process improvement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improvement benefits include cost reduction, quality improvement, time savings, customer satisfaction, employee engagement, competitive advantage, risk reduction, and innovation enablement."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure process improvement success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Measure success through key metrics: cycle time reduction, defect rate decrease, cost savings achieved, productivity improvement, customer satisfaction increase, employee efficiency gains, and throughput enhancement. Establish baseline measurements before improvement to quantify gains accurately."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Process Improvement Guide - Methods, Steps & Tools',
  description: 'Improvement methods, steps, supporting tools, and benefits.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessProcessImprovementGuide />
    </Suspense>
  );
}