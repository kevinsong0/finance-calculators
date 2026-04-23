import type { Metadata } from 'next';
import { Suspense } from 'react';
import AutoInsuranceEstimator from '@/components/AutoInsuranceEstimator';

const faqs = [
  {
    q: "How much car insurance coverage do I need?",
    a: "Most states require minimum liability coverage, but experts recommend higher limits: 100/300/100 ($100K per person, $300K per accident bodily injury, $100K property damage). Consider your assets and risk. If you have significant assets, choose higher liability limits. For newer cars, add comprehensive and collision coverage."
  },
  {
    q: "What factors affect auto insurance premiums?",
    a: "Premiums depend on: age (young drivers pay 50-100% more), location (urban areas cost more), driving history (accidents and tickets increase rates 20-40%), vehicle type (sports cars and luxury vehicles cost more), coverage level, deductible amount, annual mileage, credit score in most states, and marital status."
  },
  {
    q: "How much does car insurance cost per state?",
    a: "Average annual premiums vary significantly: Michigan ($2,600), Florida ($2,200), New York ($2,100) are highest. Ohio ($900), Maine ($850), Vermont ($800) are lowest. California averages $1,700, Texas $1,800. Urban zip codes within states can vary 30-50% from rural areas."
  },
  {
    q: "What is the difference between liability, collision, and comprehensive?",
    a: "Liability covers damage you cause to others (required in most states). Collision covers damage to your car from accidents regardless of fault. Comprehensive covers non-accident damage: theft, weather, vandalism, animal collisions. Full coverage combines all three. Liability-only saves money but risks your car's value."
  },
  {
    q: "How can I lower my auto insurance premium?",
    a: "Effective strategies: increase deductible ($500 to $1000 saves 10-15%), bundle home and auto (save 10-20%), maintain good credit, take safe driver courses, remove collision on old cars, ask about discounts (good student, low mileage, safe driver), compare quotes annually, and avoid filing small claims."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const metadata: Metadata = {
  title: 'Auto Insurance Cost Estimator | Calculate Your Premium',
  description: 'Estimate your car insurance premium based on state, age, vehicle type, coverage level, and driving history. Compare coverage options and get instant estimates.',
  alternates: { canonical: '/tools/auto-insurance-estimator' },
  openGraph: {
    title: 'Auto Insurance Cost Estimator',
    description: 'Estimate your car insurance premium based on location, age, vehicle, and driving history.',
    url: '/tools/auto-insurance-estimator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Insurance Cost Estimator',
    description: 'Estimate your car insurance premium based on location, age, vehicle, and driving history.',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading calculator...</div>}>
          <AutoInsuranceEstimator />
        </Suspense>
      </main>
    </>
  );
}