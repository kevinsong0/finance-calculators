import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProcurementGuide from '@/components/ProcurementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is procurement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Procurement definition: Purpose: Obtain goods/services for organization needs, achieve best value for money, ensure quality and reliability, manage supplier relationships. Process stages: Need identification - define requirements, Supplier selection - research and evaluate, Negotiation - terms and pricing, Contracting - formal agreement, Order management - place and track, Evaluation - performance review. Difference from purchasing: Procurement = strategic sourcing process, purchasing = transactional buying, procurement includes planning and strategy, purchasing focuses on transactions. Key activities: Supplier research, evaluation criteria, negotiation tactics, contract management, performance monitoring. Procurement = strategic process. Not just buying. Plan, source, negotiate, manage. Value optimization goal."
      }
    },
    {
      "@type": "Question",
      "name": "How do I select suppliers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supplier selection process: Research: Market analysis, potential suppliers, industry reputation, references and reviews. Evaluation criteria: Quality - product/service quality, certifications, standards compliance. Cost - pricing competitiveness, total cost, payment terms. Delivery - lead times, reliability, location. Service - responsiveness, support, communication. Financial - stability, business longevity, capacity. Capability - technical ability, innovation, flexibility. Compliance - regulations, certifications, ethical standards. Selection methods: Request for proposal (RFP), request for quote (RFQ), vendor evaluation scorecard, site visits, trial orders. Decision factors: Total value not just price, strategic importance, risk assessment, relationship potential. Selection = systematic evaluation. Multiple criteria. Not just lowest price. Verify capabilities."
      }
    },
    {
      "@type": "Question",
      "name": "What procurement strategies exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Procurement strategy types: Sourcing strategy: Single source - one supplier, partnership focus, risk of dependence, use for unique items. Multiple sources - several suppliers, competition benefits, complexity increases, use for common items. Organizational strategy: Centralized - one purchasing unit, volume leverage, control benefits, slower response. Decentralized - local purchasing, speed advantages, local knowledge, higher costs. Relationship strategy: Transactional - price focus, competitive bidding, short-term contracts, use for commoditized goods. Collaborative - partnership approach, joint planning, long-term agreements, use for strategic items. Strategy = match to situation. Consider item importance. Balance risk and benefit. Align with organization goals. Consistency across categories."
      }
    },
    {
      "@type": "Question",
      "name": "How do I achieve procurement savings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Procurement cost savings methods: Volume leverage: Consolidate purchases across departments, negotiate volume discounts, aggregate similar needs, standardize specifications. Competitive bidding: Multiple supplier quotes, competitive tension, transparent evaluation, fair process. Contract optimization: Long-term agreements for stability, price lock-in where appropriate, favorable payment terms, renegotiation at renewal. Process efficiency: Reduce administrative costs, automate where possible, streamline approvals, reduce cycle time. Specification review: Avoid over-specification, standardize where possible, consider alternatives, balance quality and cost. Total cost analysis: Consider all costs, not just purchase price, include shipping, storage, handling, lifecycle costs. Savings = multiple methods. Total cost focus. Continuous improvement. Measure and track savings. Balance cost with quality."
      }
    },
    {
      "@type": "Question",
      "name": "How do I evaluate supplier performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supplier performance evaluation: Metrics: Quality metrics - defect rates, specification compliance, certifications. Delivery metrics - on-time percentage, lead time accuracy, order completeness. Cost metrics - pricing stability, invoice accuracy, cost competitiveness. Service metrics - responsiveness, problem resolution, communication quality. Evaluation process: Define metrics, collect data regularly, calculate scores, compare to targets, communicate results, identify improvement areas. Frequency: Quarterly reviews typical, monthly for critical suppliers, annual comprehensive review. Actions: Recognize good performance, address poor performance, develop improvement plans, consider alternative suppliers if needed. Evaluation = objective measurement. Set clear metrics. Regular assessment. Address issues. Build relationships. Continuous improvement."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Procurement Guide - Stages, Strategies & Savings',
  description: 'Procurement stages, supplier selection, strategies, and cost savings.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProcurementGuide />
    </Suspense>
  );
}