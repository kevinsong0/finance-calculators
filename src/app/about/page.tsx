import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About | Finance Calculators',
  description: 'Learn about Finance Calculators and our approach to practical, educational finance tools.',
  alternates: { canonical: `${SITE_URL}/about` },
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">About Finance Calculators</h1>
        <p className="text-gray-600">
          Finance Calculators provides free tools for mortgage planning, compound interest projection, and currency conversion.
        </p>
      </section>

      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">How to use our tools</h2>
        <p className="text-gray-700">Use the results as planning references and compare assumptions before making financial decisions.</p>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Adjust inputs to reflect your own rates, terms, and fees.</li>
          <li>Compare multiple scenarios before committing to a loan or investment plan.</li>
          <li>Verify final terms with your lender or financial institution.</li>
        </ul>
      </section>
    </div>
  )
}

