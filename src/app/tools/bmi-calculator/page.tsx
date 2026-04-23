import type { Metadata } from 'next';
import { Suspense } from 'react';
import BMICalculator from '@/components/BMICalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate my BMI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BMI is calculated by dividing your weight in kilograms by your height in meters squared. Formula: BMI = weight (kg) / height² (m²). For imperial units: BMI = (weight in lbs × 703) / height² (in²). Use this calculator for instant results."
      }
    },
    {
      "@type": "Question",
      "name": "What is a healthy BMI range?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A healthy BMI range is 18.5 to 24.9. Below 18.5 is considered underweight, 25-29.9 is overweight, and 30 or above is obese. These categories help identify potential health risks associated with weight."
      }
    },
    {
      "@type": "Question",
      "name": "Is BMI accurate for everyone?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BMI is a general guideline but may not be accurate for athletes, elderly people, or those with high muscle mass. It doesn't distinguish between fat and muscle. For a complete health assessment, consult a healthcare professional."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert BMI from metric to imperial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BMI value is the same regardless of unit system. The calculation automatically converts units. For manual calculation with imperial: BMI = (weight lbs × 703) / height in inches squared. The result matches metric calculation."
      }
    },
    {
      "@type": "Question",
      "name": "What is my ideal weight based on BMI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ideal weight range corresponds to BMI 18.5-25. Calculate by: ideal weight min = 18.5 × height² (m²), ideal weight max = 25 × height² (m²). This calculator shows your personalized ideal weight range based on your height."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'BMI Calculator - Calculate Body Mass Index & Ideal Weight Range',
  description: 'Free BMI calculator to calculate your Body Mass Index, find your ideal weight range, and understand BMI categories. Works with metric and imperial units.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BMICalculator />
    </Suspense>
  );
}