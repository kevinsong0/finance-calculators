import type { Metadata } from 'next';
import { Suspense } from 'react';
import SideHustleGuide from '@/components/SideHustleGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a good side hustle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good side hustle criteria: Uses existing skills (less learning curve), low upfront cost (minimize risk), flexible hours (fit around main job), potential to scale or automate, genuine market demand (people pay for this), interesting to you (sustainability), legal/ethical (no conflicts). Best ideas: Freelancing in your profession, consulting/advisory, content creation (blog/YouTube), online tutoring, selling products (digital or physical). Avoid: Get-rich schemes, high-risk ventures, anything conflicting with employer. Start: Leverage what you already know. Test small. Validate demand before investing heavily. Good side hustle = low risk + potential upside + skill building."
      }
    },
    {
      "@type": "Question",
      "name": "How do I start a side hustle while employed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start side hustle employed: Check employer policy: Some restrict side work, conflicts of interest, moonlighting clauses. Know rules. Protect main job: Don&apos;t let side hustle impact performance, use personal time/equipment only, don&apos;t compete with employer. Start small: Weekends/evenings only, minimal investment, test demand first. Time management: Set specific hours (e.g., 2 hrs/weeknight, 4 hrs weekend), protect personal time too, avoid burnout. Track finances: Separate accounts, track income/expenses, prepare for taxes. Best approach: Start while employed (stable income), test and grow, consider transition if scales. Don&apos;t: work on side hustle during job hours, use employer resources, jeopardize main income. Side hustle = supplement, not replacement (initially)."
      }
    },
    {
      "@type": "Question",
      "name": "How much time should a side hustle take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Side hustle time allocation: Minimum viable: 5-10 hrs/week (test phase), reasonable starting point. Growing phase: 10-20 hrs/week (scaling), evenings + weekends. Sustainable: Balance with life, avoid burnout, schedule breaks. Consider: Main job hours, family obligations, personal needs, sleep/health. Types: Project-based (freelancing) = variable hours, Content creation = consistent weekly effort, E-commerce = setup heavy then lighter, Passive income apps = upfront work then minimal. Tips: Start small, set boundaries, protect main job, avoid overcommitting. Burnout = lose both main job and side hustle. Realistic: 10 hrs/week sustainable long-term. 20+ hrs/week = approaching second job intensity. Scale time as income validates."
      }
    },
    {
      "@type": "Question",
      "name": "How do I scale a side hustle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scale side hustle: Validate demand: Customers willing to pay, consistent income, positive feedback. Increase capacity: Automate tasks (tools, templates), outsource (hire help), improve efficiency. Expand reach: New marketing channels, broader audience, partnerships. Increase pricing: Raise rates as reputation grows, premium offerings. Add offerings: More products/services, bundles, subscriptions. Considerations: Time investment scaling, quality maintenance, customer service capacity, legal/tax implications. Decision point: If income approaches main job = consider transition. If unsustainable with main job = scale back or transition. Scaling = investing more. Don&apos;t scale unvalidated ideas. Let demand pull growth."
      }
    },
    {
      "@type": "Question",
      "name": "When should I quit my job for side hustle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quit job for side hustle: Financial readiness: Side income > main job income (or approaching), 6+ months emergency fund, benefits alternative planned (health insurance, retirement). Business maturity: Consistent income (not one-time), clear growth path, systemized operations, validated demand. Personal readiness: Ready for uncertainty, disciplined self-management, support from family, risk tolerance met. Red flags: Don&apos;t quit without savings, don&apos;t quit during unstable side income, don&apos;t quit without benefits plan. Approach: Ramp side hustle while employed, hit income targets, save emergency fund, then transition. Hybrid: Part-time job + part-time side hustle = bridge option. Quitting = big decision. Validate thoroughly. Have backup plans."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Side Hustle Guide - Ideas, Starting & Scaling',
  description: 'Side hustle ideas, getting started while employed, time management, and scaling.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SideHustleGuide />
    </Suspense>
  );
}