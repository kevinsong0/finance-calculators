import type { Metadata } from 'next';
import { Suspense } from 'react';
import RealEstateInvestingGuide from '@/components/RealEstateInvestingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I start real estate investing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start real estate investing: 1. Educate yourself (books, courses, podcasts). 2. Define goals (cash flow, appreciation, passive income). 3. Assess finances (capital available, debt capacity). 4. Choose strategy (rental, flip, REIT). 5. Research markets (locations, prices, rents). 6. Build network (agents, lenders, contractors). 7. Analyze deals thoroughly. 8. Start small (first property, learn). 9. Scale gradually. Beginner tips: Start with residential rentals (familiar market), consider REITs for passive entry, house hack to reduce costs, buy in areas you know. Don&apos;t rush - research more than you think needed."
      }
    },
    {
      "@type": "Question",
      "name": "What is the 1% rule in real estate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1% rule: monthly rent should be at least 1% of purchase price. Example: $200,000 property = minimum $2,000/month rent. Purpose: Quick filter for cash flow potential. Reality: Many markets don&apos;t meet this. Adjust: 0.5-0.8% acceptable in expensive markets, verify with detailed analysis. Limitations: Doesn&apos;t account for expenses, taxes, maintenance, financing costs. Use as initial screen, then detailed cash flow analysis. Better metric: Calculate actual cash flow (rent - all expenses - mortgage). 1% rule = starting point, not final decision. Markets vary - adjust expectation accordingly."
      }
    },
    {
      "@type": "Question",
      "name": "What are REITs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "REITs (Real Estate Investment Trusts): companies that own/invest in real estate, trade on stock exchanges. Types: Equity REITs (own properties, collect rent), Mortgage REITs (invest in mortgages), Hybrid (both). Benefits: Liquidity (buy/sell like stocks), Diversification (many properties), Passive (no management), Dividends (required to distribute 90%+ income), Lower capital (start with hundreds vs thousands). Downsides: No control over properties, stock market volatility, fees, tax treatment differs. Best for: Passive investors, diversification, limited capital. REITs = real estate exposure without direct ownership. Good starting point for beginners."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate rental property cash flow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cash flow calculation: Income - Expenses - Mortgage payment = Cash flow. Income: Monthly rent, parking fees, other. Expenses: Property tax, insurance, maintenance (10-15% of rent), vacancy allowance (5-10%), property management (if used), HOA fees, utilities (if landlord pays). Mortgage: Principal + interest payment. Example: $2,000 rent - $200 tax - $100 insurance - $200 maintenance - $100 vacancy - $1,200 mortgage = $400 positive cash flow. Include all costs, not just mortgage. Positive cash flow = profit. Negative = subsidy. Aim for positive. Analyze worst-case (vacancy, repairs). Cash flow = sustainability."
      }
    },
    {
      "@type": "Question",
      "name": "What is house hacking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "House hacking: buy property, live in it, rent out parts to cover costs. Strategies: Multi-family (live in one unit, rent others), Single-family + roommates, Basement apartment, House + Airbnb rooms. Benefits: Reduce/eliminate housing costs, build equity, learn property management, low barrier entry. Considerations: Landlord responsibilities, roommate dynamics, privacy trade-offs, financing options (owner-occupied rates better). Best for: First-time buyers, limited capital, willing to share space. House hack = smart entry strategy. Live for free/negative cost while building wealth. Many investors started here."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Real Estate Investing Guide - Types, Strategies & Risks',
  description: 'Real estate investing types, strategies, cash flow, and risk management.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RealEstateInvestingGuide />
    </Suspense>
  );
}