import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy | Finance Calculators',
  description: 'Privacy Policy for Finance Calculators, including cookie, analytics, and advertising disclosures.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
        <p className="text-gray-600">Effective date: April 16, 2026</p>
      </section>

      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">Information we collect</h2>
        <p className="text-gray-700">
          We may collect limited technical and usage data such as page visits, browser type, and device information to improve the site.
        </p>

        <h2 className="text-xl font-semibold">Cookies and analytics</h2>
        <p className="text-gray-700">We may use cookies and analytics tools to measure traffic and improve user experience.</p>

        <h2 className="text-xl font-semibold">Advertising</h2>
        <p className="text-gray-700">
          This site may display ads via Google AdSense. Google and partners may use cookies to serve personalized ads where permitted.
        </p>

        <h2 className="text-xl font-semibold">Your choices</h2>
        <p className="text-gray-700">You can manage cookie settings through your browser controls.</p>

        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-gray-700">
          Privacy requests: <a className="text-primary-700 hover:underline" href="mailto:privacy@finance.128345827.xyz">privacy@finance.128345827.xyz</a>
        </p>
      </section>
    </div>
  )
}
