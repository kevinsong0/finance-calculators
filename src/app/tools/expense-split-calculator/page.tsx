import type { Metadata } from 'next';
import { Suspense } from 'react';
import ExpenseSplitCalculator from '@/components/ExpenseSplitCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do you split expenses fairly among a group?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fair expense splitting tracks who paid each expense and how it should be divided. Each person's share equals (Total Expenses ÷ Number of People) minus (What they already paid). Those who paid less than their fair share owe money to those who paid more."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best way to track group expenses for a trip?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Record each expense with who paid it, then calculate settlements at the end. Alternatively, create a shared pool where everyone contributes an equal amount upfront, expenses come from the pool, and remaining funds are returned evenly."
      }
    },
    {
      "@type": "Question",
      "name": "How are settlements calculated in expense splitting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Settlements minimize the number of transactions. Calculate each person's net balance (paid minus fair share). Debtors (negative balance) pay creditors (positive balance). The algorithm matches smallest debts to smallest credits to minimize transfers."
      }
    },
    {
      "@type": "Question",
      "name": "Should unequal expenses be split evenly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For shared expenses like hotel or group dinners, even splitting is common. For expenses benefiting specific individuals only (like someone's personal purchase), that person should pay the full amount. Discuss splitting rules before the trip."
      }
    },
    {
      "@type": "Question",
      "name": "What apps help with expense splitting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Popular expense splitting apps include Splitwise, Venmo (for simple splits), and settling group bills. This calculator provides instant splitting calculations without needing to install additional apps or create accounts."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Expense Split Calculator - Fair Group Expense Sharing Tool',
  description: 'Track and split group expenses for trips, shared living, or activities. Calculate who owes whom with instant settlements.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ExpenseSplitCalculator />
    </Suspense>
  );
}