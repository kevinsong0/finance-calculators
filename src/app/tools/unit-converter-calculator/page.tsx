import type { Metadata } from 'next';
import { Suspense } from 'react';
import UnitConverterCalculator from '@/components/UnitConverterCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I convert between different units of measurement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a unit converter by selecting the category (length, weight, temperature, etc.), entering the value, choosing the source unit and target unit. The converter uses conversion factors to calculate the result instantly."
      }
    },
    {
      "@type": "Question",
      "name": "How do temperature conversions work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Temperature conversions use specific formulas: Celsius to Fahrenheit: multiply by 9/5 and add 32. Fahrenheit to Celsius: subtract 32 and multiply by 5/9. Kelvin to Celsius: subtract 273.15. These formulas account for the different zero points of each scale."
      }
    },
    {
      "@type": "Question",
      "name": "What is the conversion factor for miles to kilometers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1 mile equals 1.609344 kilometers. To convert miles to kilometers, multiply by 1.609344. To convert kilometers to miles, divide by 1.609344 or multiply by 0.621371."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert pounds to kilograms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1 pound equals 0.453592 kilograms. To convert pounds to kilograms, multiply by 0.453592. To convert kilograms to pounds, multiply by 2.20462. This conversion is useful for international weight measurements."
      }
    },
    {
      "@type": "Question",
      "name": "What are the common volume conversion factors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common volume conversions: 1 US gallon = 3.78541 liters, 1 quart = 0.946353 liters, 1 pint = 0.473176 liters, 1 cup = 0.236588 liters, 1 fluid ounce = 29.5735 milliliters. US and imperial measurements differ slightly."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Unit Converter Calculator - Convert Length, Weight, Temperature, Volume, Area, Speed',
  description: 'Free unit converter calculator for length, weight, temperature, volume, area, and speed. Convert between metric and imperial units instantly.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <UnitConverterCalculator />
    </Suspense>
  );
}