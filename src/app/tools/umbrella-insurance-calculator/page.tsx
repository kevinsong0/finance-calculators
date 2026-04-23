import type { Metadata } from 'next';
import { Suspense } from 'react';
import UmbrellaInsuranceCalculator from '@/components/UmbrellaInsuranceCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much umbrella insurance coverage do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your umbrella coverage should match or exceed your net worth. The minimum is typically $1 million, but high-net-worth individuals ($2M+ assets) should consider $2-5 million coverage. Also factor in future earnings potential - lawsuits can garnish future income. Most experts recommend coverage equal to net worth plus 1-2 years of income."
      }
    },
    {
      "@type": "Question",
      "name": "What underlying insurance limits are required for umbrella coverage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Umbrella policies typically require minimum underlying liability limits of $300,000 on auto insurance and $300,000 on homeowners insurance. Some insurers may accept $250,000 limits. The umbrella policy kicks in after these underlying limits are exhausted. If your current limits are lower, you'll need to increase them before adding umbrella coverage."
      }
    },
    {
      "@type": "Question",
      "name": "How much does umbrella insurance cost per year?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Umbrella insurance is relatively affordable. Average costs are $150-300 per million dollars of coverage annually. A $1 million policy typically costs $150-200/year, while $2 million costs $250-350/year. Premiums may be higher if you have risk factors like teen drivers, rental properties, or recreational vehicles."
      }
    },
    {
      "@type": "Question",
      "name": "What does umbrella insurance cover that regular policies don't?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Umbrella policies cover liability beyond underlying auto/home limits, plus additional risks: libel, slander, defamation, invasion of privacy, rental property liability, some boat coverage, and legal defense costs even for groundless lawsuits. It does not cover intentional acts, business activities, or damage to your own property."
      }
    },
    {
      "@type": "Question",
      "name": "When should I consider buying umbrella insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consider umbrella insurance if: net worth exceeds $300,000, annual income exceeds $100,000, you have teen drivers, own rental properties, have a pool or trampoline, own a dog or boat, or are active on social media. These factors increase lawsuit risk and make you a target for larger liability claims."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Umbrella Insurance Calculator - Determine Coverage Based on Assets & Risk',
  description: 'Calculate recommended umbrella insurance coverage based on net worth, income, and risk factors. Estimate annual premiums and coverage gaps.',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UmbrellaInsuranceCalculator />
    </Suspense>
  );
}