import type { Metadata } from 'next';
import { Suspense } from 'react';
import FreelanceGuide from '@/components/FreelanceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I start freelancing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start freelancing: 1. Choose specialty - what service you offer (writing, design, dev, consulting). 2. Build portfolio - examples of work (past projects, personal projects). 3. Set rates - calculate minimum viable rate. 4. Find first clients - network, job boards, direct outreach. 5. Deliver excellent work - reputation matters most. 6. Get referrals - ask happy clients. 7. Scale gradually. Start part-time if possible. Build client base before quitting job. Freelancing = finding work + doing work + running business. Don&apos;t quit until you have clients. Emergency fund required (3+ months). Marketing is ongoing."
      }
    },
    {
      "@type": "Question",
      "name": "How do I set freelance rates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set freelance rates: Calculate: Desired annual income / working hours = base hourly. Add overhead: Self-employment tax (15%), health insurance, tools, business expenses, time off. Adjust: Market rates for your skill level, client&apos;s budget, project complexity, urgency. Formula: (Salary goal + 30% overhead) / 1,000 billable hours = hourly rate. Example: $80k goal + $24k overhead = $104/hr minimum. Start higher, negotiate down if needed. Don&apos;t undervalue - low rates attract low-quality clients. Raise rates as skills/reputation grow. Value-based: charge based on client&apos;s ROI, not hours. Different rates for different services/clients acceptable."
      }
    },
    {
      "@type": "Question",
      "name": "How do I find freelance clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Find freelance clients: Networks: LinkedIn - post content, engage, connect with potential clients. Personal network - friends, past colleagues, industry contacts. Platforms: Upwork/Fiverr (for beginners, lower rates), specialized platforms (Toptal, 99designs), job boards. Direct outreach: Identify target companies, cold email/LinkedIn, follow up politely. Content marketing: Blog, YouTube, social media - attract inbound leads. Referrals: Ask happy clients for referrals, referral bonuses, testimonials. Best: Build reputation, get repeat clients. One good client = multiple projects over years. Marketing = consistent effort. Track where clients come from. Double down on winning channels."
      }
    },
    {
      "@type": "Question",
      "name": "What taxes do freelancers pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Freelancer taxes (US): Self-employment tax: 15.3% (Social Security + Medicare) - employer + employee portion. Income tax: Federal + state based on income level. Deductible expenses: Business tools/software, home office, travel, equipment, marketing, education, portion of internet/phone. Tax planning: Quarterly estimated taxes (April, June, September, January), track income monthly, deduct all legitimate expenses, save 25-30% of income for taxes. Forms: Schedule C (income/expenses), Schedule SE (self-employment tax). Use accounting software (QuickBooks, FreshBooks). Consult accountant. Track everything. Taxes = biggest surprise for new freelancers. Prepare ahead."
      }
    },
    {
      "@type": "Question",
      "name": "Should I freelance full-time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Full-time freelancing decision: Good when: Have 3+ months savings, established client base, marketable skills, enjoy independence, comfortable with uncertainty, good at self-marketing. Not ready when: No savings, no clients yet, need employer benefits, prefer structure/stability, struggle with self-discipline. Transition approach: Start part-time while employed, build client base, save emergency fund, then quit. Test first. Part-time freelancing gives flexibility + stability. Hybrid: part-time freelance + part-time job. Full-time = full uncertainty. Benefits: health insurance, retirement harder. Need to buy individually. Freelancing not for everyone. Freedom + responsibility. Assess honestly before jumping."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Freelance Guide - Getting Started, Rates & Clients',
  description: 'Freelancing pros/cons, setting rates, finding clients, and taxes.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FreelanceGuide />
    </Suspense>
  );
}