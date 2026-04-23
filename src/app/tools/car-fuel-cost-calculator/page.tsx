import type { Metadata } from 'next';
import { Suspense } from 'react';
import CarFuelCostCalculator from '@/components/CarFuelCostCalculator';

export const metadata: Metadata = {
  title: 'Car Fuel Cost Calculator - Gas Budget Estimator',
  description: 'Calculate your annual and monthly fuel costs based on miles driven, MPG, and local gas prices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <CarFuelCostCalculator />
    </Suspense>
  );
}