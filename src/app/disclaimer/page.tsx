import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Disclaimer | Finance Calculators',
  description: 'Important disclaimer for Finance Calculators tools and content.',
  alternates: { canonical: `${SITE_URL}/disclaimer` },
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Disclaimer</h1>
        <p className="text-gray-600">Last updated: April 18, 2026</p>
      </section>

      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">Educational content only</h2>
        <p className="text-gray-700">
          All calculators and explanations on this website are provided for
          educational and planning purposes only.
        </p>

        <h2 className="text-xl font-semibold">Not financial, legal, or tax advice</h2>
        <p className="text-gray-700">
          We do not provide personalized financial, legal, tax, or investment advice.
          Always confirm final terms and decisions with licensed professionals or
          your financial institution.
        </p>

        <h2 className="text-xl font-semibold">No guarantee of accuracy or outcomes</h2>
        <p className="text-gray-700">
          Results are estimates based on assumptions and user inputs. Actual loan
          terms, insurance premiums, exchange rates, and repayment outcomes may vary.
        </p>

        <h2 className="text-xl font-semibold">Advertising disclosure</h2>
        <p className="text-gray-700">
          This site may display advertising, including Google AdSense ads.
        </p>
      </section>
    </div>
  )
}
