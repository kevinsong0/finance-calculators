import type { Metadata } from 'next';
import { Suspense } from 'react';
import QualityAssuranceGuide from '@/components/QualityAssuranceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is quality assurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality assurance definition: Purpose: Prevent defects, ensure consistent quality, meet customer requirements, reduce costs, improve processes. Principles: Prevention - avoid defects through design, Continuous improvement - always improve, Customer focus - meet requirements, Process control - monitor and standardize, Employee involvement - everyone responsible, Data-driven - decisions based on measurement. Difference from quality control: QA = process-focused, prevent defects, QC = product-focused, detect defects. QA builds quality into process, QC checks output. Key elements: Standards definition, process design, training, measurement, analysis, improvement. QA = prevention mindset. Build quality into processes. Everyone responsible. Measure and improve. Customer focus. Continuous improvement."
      }
    },
    {
      "@type": "Question",
      "name": "What QA methods should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality assurance methods: Inspection: Check output against standards, detect defects before delivery, visual or measurement-based, manual or automated. Testing: Verify functionality works, test all requirements, pre-release verification, various test types. Review: Examine process or output, peer reviews of work, catch issues early, improve through feedback. Audit: Assess compliance with standards, periodic systematic review, identify gaps, verify procedures followed. Sampling: Check subset of output, statistically valid sample, efficient for large volumes, representative results. Automation: Automated checks, consistent verification, faster than manual, catches common issues, reduces human error. Methods = match to situation. Inspection for detection. Testing for verification. Review for prevention. Audit for compliance. Sampling for volume. Automation for consistency. Multiple methods together."
      }
    },
    {
      "@type": "Question",
      "name": "What quality metrics should I track?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality metrics: Defect rate: Number of defects / units produced, measure quality level, track trends, compare to benchmarks, lower is better. First pass yield: Units passing first inspection / total units, measures process effectiveness, higher is better, identify process issues. Customer complaints: Number of complaints received, customer quality perception, track resolution, indicates satisfaction issues. Return rate: Products returned / products sold, quality failure at customer, indicates real-world performance. Cycle time: Time to complete process, efficiency measure, affects quality indirectly. Cost of quality: Prevention + appraisal + failure costs, total quality expense, balance prevention vs failure. Metrics = comprehensive tracking. Defect rate primary. Yield for efficiency. Complaints for customer view. Costs for economics. Track trends. Act on data."
      }
    },
    {
      "@type": "Question",
      "name": "How do I implement a QA process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "QA process implementation: Define standards: Clear quality requirements, measurable criteria, documented standards, communicated to all. Design controls: Process steps for quality, inspection points, decision criteria, handling of defects. Train employees: Standards understanding, procedures training, responsibility clarity, ongoing refresh. Implement inspection: Inspection points operational, trained inspectors, consistent criteria, documentation. Collect data: Record all quality data, defect tracking, measurement results, consistent format. Analyze results: Pattern identification, root cause analysis, comparison to targets, prioritization. Improve: Corrective actions implemented, process adjustments, verify effectiveness, document changes. Process = systematic approach. Standards first. Controls in process. Train everyone. Inspect consistently. Collect data. Analyze patterns. Improve continuously."
      }
    },
    {
      "@type": "Question",
      "name": "How do I build a quality culture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality culture building: Leadership: Visible commitment to quality, quality prioritized, resources allocated, quality failures addressed seriously. Training: Everyone trained on standards, quality expectations clear, ongoing education, skill development. Involvement: Everyone responsible for quality, empowerment to stop bad quality, suggestions valued, participation in improvements. Recognition: Quality achievements celebrated, good work recognized, quality champions acknowledged, positive reinforcement. Communication: Quality discussed regularly, data shared openly, issues communicated, improvements highlighted. Systems: Clear procedures, consistent standards, reliable measurement, fair evaluation. Culture = shared quality values. Leadership sets tone. Training builds capability. Involvement creates ownership. Recognition reinforces behavior. Systems support execution. Continuous improvement mindset."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Quality Assurance Guide - Principles, Methods & Metrics',
  description: 'QA principles, methods, metrics, and process implementation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <QualityAssuranceGuide />
    </Suspense>
  );
}