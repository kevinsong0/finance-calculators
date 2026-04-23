import type { Metadata } from 'next';
import { Suspense } from 'react';
import HomeBuyingGuide from '@/components/HomeBuyingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much house can I afford?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "House affordability calculation: Income rule: Monthly payment ≤ 28% of gross income. Total debt payments ≤ 36% of income. Down payment: 3% minimum (FHA), 5-10% conventional, 20% avoids PMI. Example: $100k income = ~$2,300/month mortgage = ~$400k house (with 20% down). Factors: Income stability, existing debt, credit score, location prices, interest rates. Calculator: Use mortgage calculator for precise estimate. Consider: Property taxes, insurance, HOA, maintenance (1% of value/year), utilities. Don&apos;t max budget - leave buffer for emergencies. Affordability = monthly payment not total price. Calculate payment first."
      }
    },
    {
      "@type": "Question",
      "name": "What credit score do I need to buy a house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit score requirements: Conventional loan: 620+ minimum, 700+ for better rates, 740+ for best rates. FHA loan: 500+ minimum (with 10% down), 580+ (with 3.5% down), easier qualification. VA loan: No official minimum, lenders often want 580-620+. Improve credit: Pay bills on time, pay down debt, avoid new credit applications, fix errors on report, keep old accounts open. Impact: Lower score = higher rate = higher payment over life of loan. 100 point difference = thousands in interest. Start improving 6-12 months before buying. Credit = crucial for mortgage. Check score early, fix issues."
      }
    },
    {
      "@type": "Question",
      "name": "What are closing costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Closing costs: 2-5% of home price, paid at closing. Components: Lender fees - origination, underwriting, appraisal, credit check. Title fees - title search, insurance, recording. Government fees - transfer taxes, recording fees. Prepaid - property taxes, insurance (first months), interest. Other - inspection, survey, attorney. Typical: $300k house = $6k-15k closing costs. Negotiate: Ask seller to cover some, compare lenders (fees vary), negotiate lender fees. Plan: Budget closing costs separately from down payment. Both needed at closing. Closing costs = hidden expense. Factor into budget. Don&apos;t be surprised at closing."
      }
    },
    {
      "@type": "Question",
      "name": "Should I get a home inspection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Home inspection: Always yes. Purpose: Identify issues before buying, negotiation leverage, avoid expensive surprises, understand home condition. Inspector checks: Structure, roof, plumbing, electrical, HVAC, foundation, appliances, safety issues. Cost: $300-500, worth every penny. New construction: Still inspect - builders make mistakes too. After inspection: Review report, negotiate repairs or price reduction, decide if issues acceptable, walk away if major problems found. Don&apos;t skip: Small cost prevents huge repair bills. One missed issue = thousands. Inspection = protection. Hire qualified inspector (licensed, experienced). Attend inspection, ask questions."
      }
    },
    {
      "@type": "Question",
      "name": "How do I choose a real estate agent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose real estate agent: Qualifications: Licensed in your state, experience (years + transactions), local market knowledge, reviews/referrals. Interview: Ask about experience in your area, recent sales, communication style, negotiation approach, fees/commission. Red flags: Pushy, only shows own listings, doesn&apos;t listen, poor availability, unclear fees. Good agent: Understands your needs, responsive, good negotiator, local expertise, patient. Get referrals: Friends/family who bought recently, online reviews. Interview multiple (2-3), compare. Agent commission: Typically 5-6%, paid by seller usually. Agent = guide through process. Choose carefully. Good agent saves money and stress."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Home Buying Guide - Steps, Costs & Tips',
  description: 'Home buying process, costs, credit requirements, and common mistakes.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeBuyingGuide />
    </Suspense>
  );
}