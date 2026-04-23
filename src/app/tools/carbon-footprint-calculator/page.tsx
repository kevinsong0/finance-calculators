import type { Metadata } from 'next';
import { Suspense } from 'react';
import CarbonFootprintCalculator from '@/components/CarbonFootprintCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a carbon footprint?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Carbon footprint: total greenhouse gas emissions caused by activities. Measured in CO₂ equivalent (kg or tonnes). Includes direct emissions (car, home) and indirect (food, products). Main sources: transportation, energy use, food consumption, goods. Average US footprint: ~16 tonnes/year. Sustainable target: under 2 tonnes/year."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate my carbon footprint?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Calculate footprint by category: Transport (car km × 0.21, flights × 250, bus × 0.089). Energy (electricity kWh × 0.5, gas m³ × 2.0). Food (meat kg × 6.0, dairy × 3.0, plant × 0.5). Sum all categories. Use carbon calculator for accurate estimate. Values vary by location, energy source, vehicle type. Annual footprint = weekly/monthly × frequency."
      }
    },
    {
      "@type": "Question",
      "name": "How can I reduce my carbon footprint?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduce transport: use public transit, bike, walk, electric vehicle, combine trips, fewer flights. Reduce energy: renewable electricity, LED lights, smart thermostat, unplug devices, efficient appliances. Reduce food: less meat, local produce, reduce waste, plant-based meals. General: buy less, secondhand, recycle, carbon offsets. Small changes add up significantly."
      }
    },
    {
      "@type": "Question",
      "name": "What are the biggest sources of carbon emissions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Biggest sources globally: electricity/heat (25%), transport (16%), agriculture (18%), industry (21%). Personal level: car travel (largest for most), home energy, meat consumption, flights. One transatlantic flight: ~1-2 tonnes. Average car: 4 tonnes/year. Meat diet: 2+ tonnes vs plant-based 0.5. Focus on biggest sources for maximum impact."
      }
    },
    {
      "@type": "Question",
      "name": "What is the sustainable carbon footprint target?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sustainable target: under 2 tonnes CO₂ per year per person. Current average: US 16 tonnes, EU 8 tonnes, global 4 tonnes. 2 tonnes: level to limit global warming to 1.5°C. Achievable through: low-carbon transport, renewable energy, plant-based diet, minimal flying, energy efficiency. Carbon offset for remaining emissions."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Carbon Footprint Calculator - Estimate Your CO2 Emissions',
  description: 'Calculate your annual carbon footprint. See breakdown by transport, energy, food. Get tips to reduce emissions. Track environmental impact.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CarbonFootprintCalculator />
    </Suspense>
  );
}