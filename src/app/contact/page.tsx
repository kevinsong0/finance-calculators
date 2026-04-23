import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact | Finance Calculators',
  description: 'Contact Finance Calculators for feedback, corrections, or business inquiries.',
  alternates: { canonical: `${SITE_URL}/contact` },
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact</h1>
        <p className="text-gray-600">For support, feedback, or business inquiries, email us below.</p>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">Email</h2>
        <p>
          <a className="text-primary-700 hover:underline" href="mailto:contact@finance.128345827.xyz">
            contact@finance.128345827.xyz
          </a>
        </p>
        <p className="text-gray-700">Typical response time: 2-3 business days.</p>
      </section>
    </div>
  )
}
