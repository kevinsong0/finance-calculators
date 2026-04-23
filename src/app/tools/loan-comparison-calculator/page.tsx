import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoanComparisonCalculator from '@/components/LoanComparisonCalculator';

export const metadata: Metadata = {
  title: 'Loan Comparison Calculator - Compare Two Loan Options',
  description: 'Compare two loan rates to find the best deal. Calculate monthly payments and total interest savings.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <LoanComparisonCalculator />
    </Suspense>
  );
}