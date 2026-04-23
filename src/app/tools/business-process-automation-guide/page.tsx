import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessProcessAutomationGuide from '@/components/BusinessProcessAutomationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of process automation exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Process automation types include workflow automation for process steps with efficiency benefit, task automation for individual tasks with productivity benefit, data automation for information handling with accuracy benefit, decision automation for rule-based choices with consistency benefit, integration automation for system connections with seamlessness benefit, and notification automation for communications with timeliness benefit."
      }
    },
    {
      "@type": "Question",
      "name": "What is the automation process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The automation process involves identifying automation opportunities, assessing automation feasibility, selecting automation tools, designing automation workflows, building automation solutions, testing automation processes, implementing automation, monitoring automation performance, maintaining automation systems, and optimizing automation continuously."
      }
    },
    {
      "@type": "Question",
      "name": "What tools support process automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Process automation tools include RPA software for task automation used for repetitive work, workflow platforms for process automation used for multi-step flows, integration tools for system connection used for data sync, and AI automation for smart automation used for decision support."
      }
    },
    {
      "@type": "Question",
      "name": "How do you measure automation success?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Process automation metrics include automation coverage, time saved, error reduction, cost savings, process speed, staff productivity, automation ROI, and maintenance effort."
      }
    },
    {
      "@type": "Question",
      "name": "Why implement process automation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Process automation delivers operational efficiency through identifying opportunities, assessing feasibility, selecting tools, designing workflows, building solutions, testing processes, implementing automation, monitoring performance, maintaining systems, and optimizing continuously."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Process Automation Guide - Types, Process & Metrics',
  description: 'Automation types, implementation process, automation tools, and success metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessProcessAutomationGuide />
    </Suspense>
  );
}