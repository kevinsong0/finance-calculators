import type { Metadata } from 'next';
import { Suspense } from 'react';
import SupplyChainGuide from '@/components/SupplyChainGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is supply chain management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supply chain management definition: Purpose: Coordinate all activities from raw materials to customer delivery, optimize efficiency and cost, ensure quality and reliability, manage risks and disruptions. Components: Planning - demand forecasting, strategy development, Sourcing - supplier selection, procurement, Production - manufacturing, assembly, Logistics - transportation, warehousing, Returns - reverse logistics, disposal. Flow types: Physical flow - goods movement, Information flow - data sharing, Financial flow - payments, funds. Participants: Suppliers, manufacturers, distributors, retailers, customers. Supply chain = end-to-end process. Plan, source, make, deliver, return. Coordination essential. Optimization continuous."
      }
    },
    {
      "@type": "Question",
      "name": "What are common supply chain risks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supply chain risks: Supplier risks: Supplier failure, quality issues, capacity constraints, financial problems, geographic disruptions. Transportation risks: Delivery delays, carrier issues, route disruptions, customs problems, weather events. Demand risks: Forecast errors, demand volatility, seasonality, market changes, customer cancellations. Inventory risks: Obsolescence, damage, theft, storage limitations, cost increases. External risks: Natural disasters, political instability, regulatory changes, economic downturns, pandemics. Information risks: Data errors, system failures, communication gaps, cybersecurity threats. Risk management: Identify risks, assess impact, develop mitigation, implement controls, monitor continuously. Risks = multiple sources. Plan for disruption. Backup plans essential. Monitor continuously."
      }
    },
    {
      "@type": "Question",
      "name": "How do I optimize supply chain performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supply chain optimization areas: Demand forecasting: Improve prediction accuracy, use historical data, consider market factors, adjust for seasonality, incorporate trends. Inventory management: Right stock levels, reduce carrying costs, prevent stockouts, optimize turnover. Supplier management: Strategic relationships, performance monitoring, collaboration, multiple sources. Lead time reduction: Process improvements, supplier location, faster transportation, efficient handling. Transportation: Route optimization, carrier selection, load optimization, cost negotiation. Information sharing: System integration, real-time data, visibility tools, communication protocols. Process standardization: Consistent procedures, best practices, training, documentation. Optimization = systematic approach. Focus on biggest impact. Measure results. Continuous improvement. Technology enables visibility."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics measure supply chain performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supply chain performance metrics: Delivery metrics: On-time delivery rate, order fulfillment rate, perfect order percentage, delivery accuracy. Inventory metrics: Inventory turnover, days inventory outstanding, inventory accuracy, carrying cost percentage. Cost metrics: Supply chain cost ratio, transportation cost per unit, procurement savings, total landed cost. Supplier metrics: Supplier lead time, supplier quality rate, supplier delivery performance, supplier responsiveness. Efficiency metrics: Cash-to-cash cycle time, supply chain cycle time, process efficiency. Customer metrics: Customer satisfaction, complaint rate, return rate. Metrics = comprehensive view. Set targets, track trends, benchmark competitors. Dashboards for visibility. Act on results. Key metrics vary by industry."
      }
    },
    {
      "@type": "Question",
      "name": "How do I build supply chain resilience?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Supply chain resilience strategies: Diversification: Multiple suppliers, geographic spread, alternative sources, backup suppliers. Flexibility: Agile processes, quick response capability, adaptable inventory, flexible transportation. Visibility: Real-time tracking, information sharing, early warning systems, monitoring tools. Relationships: Strong supplier partnerships, collaborative planning, communication channels, trust building. Planning: Risk assessment, scenario planning, contingency plans, response protocols. Inventory buffers: Safety stock, strategic reserves, critical item stock. Financial reserves: Cash buffers, insurance, financial flexibility. Technology: Digital systems, automation, data analytics, cloud backup. Resilience = proactive preparation. Plan for disruption. Multiple strategies together. Test plans regularly. Learn from incidents. Adapt continuously."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Supply Chain Guide - Components, Risks & Optimization',
  description: 'Supply chain components, risks, optimization, and performance metrics.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SupplyChainGuide />
    </Suspense>
  );
}