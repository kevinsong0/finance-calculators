import type { Metadata } from 'next';
import { Suspense } from 'react';
import InventoryGuide from '@/components/InventoryGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is inventory management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inventory management definition: Purpose: Balance stock availability with cost efficiency, prevent stockouts, minimize holding costs, optimize working capital. Key decisions: How much to order, when to order, where to store, how to track. Trade-offs: Too much inventory = excessive costs, wasted capital, obsolescence risk. Too little inventory = stockouts, lost sales, customer dissatisfaction. Optimal = minimize total cost while meeting demand. Components: Raw materials, work-in-progress, finished goods, maintenance supplies. Management areas: Forecasting demand, setting reorder points, tracking inventory, controlling costs, managing storage. Inventory management = continuous optimization. Balance availability vs cost. Track, analyze, adjust. Systematic approach essential."
      }
    },
    {
      "@type": "Question",
      "name": "What inventory management methods exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inventory management methods: ABC Analysis: Classify items by value/importance, A items = high value, tight control, B items = moderate, normal control, C items = low value, simplified control. Just-in-Time (JIT): Minimize inventory levels, receive goods as needed, reduce holding costs, requires reliable suppliers. Safety Stock: Buffer stock for demand variability, prevent stockouts, balance with holding cost. Economic Order Quantity (EOQ): Optimal order size mathematically, minimize total ordering + holding costs. Perpetual System: Real-time inventory tracking, continuous updates, accurate counts, computerized systems. Periodic System: Count at intervals, simpler but less accurate, suitable for small operations. FIFO/LIFO: Inventory flow methods for accounting, FIFO = first-in-first-out, LIFO = last-in-first-out. Method selection = match to business needs. Consider volume, value, variability, systems available. One method or combination. Consistency important."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate inventory turnover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inventory turnover calculation: Formula: Cost of goods sold / Average inventory, or: Units sold / Average units in stock. Average inventory: (Beginning inventory + Ending inventory) / 2, or monthly averages for accuracy. Interpretation: Higher turnover = efficient, products selling well, lower turnover = slow sales, excess inventory. Target varies: Industry benchmarks available, 4-6 turnover typical retail, 8-10 for efficient operations, 2-3 for some industries. Days inventory outstanding: 365 / Inventory turnover, days to sell current inventory, lower = better cash flow. Improving turnover: Increase sales, reduce inventory levels, improve forecasting, eliminate slow items, optimize ordering. Turnover = efficiency indicator. Monitor regularly. Compare to benchmarks. Improve through action. Balance with stockout risk."
      }
    },
    {
      "@type": "Question",
      "name": "What are inventory holding costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inventory holding cost components: Storage costs: Warehouse space, utilities, handling equipment, security. Insurance: Property insurance on inventory, varies by value and risk. Depreciation/obsolescence: Product value decline, expired goods, outdated items, damage. Opportunity cost: Capital tied up in inventory, could be used elsewhere, lost investment return. Taxes: Property taxes on inventory (varies by location). Labor: Staff to manage, move, count inventory. Total holding cost estimate: Typically 20-30% of inventory value annually, varies by industry and product type. Cost reduction: Minimize storage needs, improve turnover, reduce obsolescence, negotiate better terms, optimize order quantities. Holding cost = significant expense. Calculate for your situation. Reduce through efficiency. Consider in ordering decisions."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prevent stockouts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stockout prevention strategies: Reorder points: Set minimum level for each item, trigger order when reached, consider lead time demand, adjust for variability. Safety stock: Extra inventory buffer, covers demand variability, supplier delays, quality issues. Demand forecasting: Predict customer demand, historical patterns, seasonal factors, market trends, adjust for promotions. Supplier management: Reliable suppliers, backup sources, clear agreements, regular communication. Lead time tracking: Know supplier delivery times, include buffer for variability, plan for delays. Monitoring: Track inventory levels daily, alerts at reorder points, review fast-moving items frequently. Response plan: Emergency supplier contacts, partial shipment options, customer communication procedures. Prevention = proactive planning. Multiple strategies together. Monitor closely. Adjust for changing conditions. Customer satisfaction depends on availability."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Inventory Management Guide - Methods, Metrics & Controls',
  description: 'Inventory methods, turnover calculation, holding costs, and prevention.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <InventoryGuide />
    </Suspense>
  );
}