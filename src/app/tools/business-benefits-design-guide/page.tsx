import type { Metadata } from 'next';
import { Suspense } from 'react';
import BusinessBenefitsDesignGuide from '@/components/BusinessBenefitsDesignGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of employee benefits exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Employee benefit types include health benefits for medical, dental, vision protection, retirement benefits for 401k and pension future security, time-off benefits for vacation, sick, and holidays work-life balance, insurance benefits for life and disability risk protection, wellness benefits for fitness and mental health wellbeing, and flexible benefits for remote work and flex hours flexibility."
      }
    },
    {
      "@type": "Question",
      "name": "What is the benefits design process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The benefits design process involves assessing employee needs, benchmarking market practices, defining benefits philosophy, designing benefits package, selecting benefit providers, setting benefit costs, implementing benefits programs, communicating benefits options, administering benefits plans, and evaluating benefits effectiveness."
      }
    },
    {
      "@type": "Question",
      "name": "What considerations affect benefits design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefits design considerations include cost management addressing budget and ROI through cost analysis, employee preferences addressing demographics and needs through surveys, legal requirements addressing mandates and compliance through legal review, and competitive positioning addressing market rates through benchmarking."
      }
    },
    {
      "@type": "Question",
      "name": "What are current benefits trends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Current benefits trends include flexible work arrangements, mental health support, student loan assistance, parental leave expansion, wellness programs, professional development, financial wellness programs, and personalized benefits options."
      }
    },
    {
      "@type": "Question",
      "name": "Why invest in benefits design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Benefits design builds employee value proposition through assessing needs, benchmarking practices, defining philosophy, designing package, selecting providers, setting costs, implementing programs, communicating options, administering plans, and evaluating effectiveness."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Business Benefits Design Guide - Types, Process & Trends',
  description: 'Employee benefits types, design process, considerations, and current trends.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BusinessBenefitsDesignGuide />
    </Suspense>
  );
}