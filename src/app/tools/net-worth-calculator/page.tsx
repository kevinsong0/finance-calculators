import type { Metadata } from 'next';
import { Suspense } from 'react';
import NetWorthCalculator from '@/components/NetWorthCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is net worth and how is it calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Net worth is the difference between your total assets and total liabilities. It's calculated by subtracting all your debts (mortgages, loans, credit cards) from everything you own (cash, investments, property, vehicles). Net Worth = Assets - Liabilities."
      }
    },
    {
      "@type": "Question",
      "name": "What should be included as assets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Assets include: cash and savings accounts, investments (stocks, bonds, mutual funds), retirement accounts (401k, IRA), real estate (current market value of homes), vehicles (current market value), and valuable personal property like jewelry or collectibles."
      }
    },
    {
      "@type": "Question",
      "name": "What counts as liabilities when calculating net worth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Liabilities include all debts: mortgage balances, car loans, student loans, credit card debt, personal loans, medical debt, and any other outstanding obligations. Use the current balance owed, not the original loan amount."
      }
    },
    {
      "@type": "Question",
      "name": "What is a healthy debt ratio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A healthy debt ratio (liabilities divided by assets) should ideally be below 50%. A ratio above 50% indicates high debt levels relative to assets. A ratio below 30% is considered excellent financial health."
      }
    },
    {
      "@type": "Question",
      "name": "What net worth should I have by age?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Net worth varies by individual circumstances. A common benchmark: by age 30, aim for net worth equal to your annual salary. By age 40, aim for 3x your salary. By retirement, aim for 10-12x your final salary. These are guidelines, not strict rules."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Net Worth Calculator - Calculate Your Total Assets vs Liabilities',
  description: 'Calculate your net worth by comparing all your assets against your liabilities. Get financial health insights and debt ratio analysis.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NetWorthCalculator />
    </Suspense>
  );
}