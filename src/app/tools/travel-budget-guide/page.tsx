import type { Metadata } from 'next';
import { Suspense } from 'react';
import TravelBudgetGuide from '@/components/TravelBudgetGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I budget for a trip?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trip budgeting: Research destination costs (daily averages for food, transport, accommodation). Calculate: Transportation (flights, trains, rental), Accommodation (nights x nightly rate), Food (daily food budget x days), Activities (tours, attractions), Insurance (travel insurance), Buffer (20% for unexpected). Set total budget, allocate per category. Track during trip. Apps: Trail Wallet, TravelSpend, spreadsheets. Pre-book major items for cost certainty. Daily tracking prevents overspending. Budget = stress-free travel. Plan before, track during, review after."
      }
    },
    {
      "@type": "Question",
      "name": "How do I save money on travel?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Save on travel: Timing: Off-season travel (lower prices, fewer crowds), midweek flights (cheaper than weekends), book early for better rates. Transportation: Compare flight sites (Google Flights, Kayak), consider trains/buses for shorter distances, use points/miles for free flights. Accommodation: Mix hotels + Airbnb/hostels, loyalty programs for discounts, stay outside tourist centers. Food: Eat local restaurants not tourist traps, cook some meals (Airbnb with kitchen), street food for cheap authentic meals. Activities: Free attractions first, paid highlights selectively, city passes for multiple sites. Points/miles: Credit card rewards for free travel. Research + flexibility = savings. Every category has save opportunities."
      }
    },
    {
      "@type": "Question",
      "name": "Should I get travel insurance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Travel insurance considerations: When needed: International trips (health insurance doesn&apos;t cover), expensive prepaid bookings, adventure activities, remote destinations. Coverage: Medical emergencies, trip cancellation, lost luggage, evacuation, delays. Cost: 4-10% of trip cost. When optional: Short domestic trips, low-cost bookings, healthy + young. Compare: Read coverage details (exclusions, limits), compare providers (World Nomads, Allianz, Seven Corners), check existing coverage (credit cards, health insurance). Not: Just for medical? Check if your health insurance covers abroad. Adventure sports? Some policies exclude. Read carefully. Recommendation: International trips = yes, domestic weekend = probably no. Peace of mind = worth cost for big trips."
      }
    },
    {
      "@type": "Question",
      "name": "How do I track travel expenses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Track travel expenses: Apps: Trail Wallet (simple, designed for travel), TravelSpend (group trips), Expensify (business travel), Spending Tracker (general). Manual: Spreadsheet (categories, daily), notebook (simple tracking), photos of receipts. Methods: Log daily (don&apos;t wait), categorize (transport, food, accommodation, activities), note currency conversions. Tips: Set daily limit, log immediately after spending, include cash tips/small expenses, convert to home currency for accurate tracking. Review: Daily review vs budget, weekly totals, post-trip analysis. Tracking = awareness. Prevents overspending. Don&apos;t let unknown expenses surprise you. Track from day 1."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I budget per day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Daily travel budget varies by destination: Budget destinations (SE Asia, Eastern Europe): $50-80/day (hostels, local food, public transport). Mid-range destinations (Western Europe, Japan): $100-150/day (mid-range hotels, mix of restaurants). Luxury destinations (Switzerland, expensive cities): $200-300+/day (nice hotels, fine dining). Components: Accommodation (20-40% of daily), Food (15-30%), Transport (10-20%), Activities (10-20%). Adjust: Style (budget vs luxury affects accommodation/food), activities (more paid activities = higher), location (capital cities cost more). Research destination-specific costs. Use travel blogs for actual budgets. Your style = your budget. Set realistic limit based on destination + comfort level."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Travel Budget Guide - Costs, Strategies & Tips',
  description: 'Travel budgeting, cost categories, saving strategies, and expense tracking.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TravelBudgetGuide />
    </Suspense>
  );
}