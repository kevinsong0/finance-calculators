import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { SITE_URL } from '@/lib/site'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-KTD45LPW6G';

export const metadata: Metadata = {
  title: 'Free Mortgage Calculator (2026) | Monthly Payment + Amortization Schedule',
  description: 'Professional financial calculators for mortgage payments, compound interest, crypto tax, IRS penalties, and retirement planning. Free online tools for smart financial decisions.',
  metadataBase: new URL(SITE_URL),
  keywords: ['mortgage calculator', 'compound interest calculator', 'currency converter', 'loan calculator', 'crypto tax calculator', 'IRS penalty calculator', 'tax extension penalty', 'estimated tax payments', 'retirement withdrawal strategy', 'social security taxation', 'medicare IRMAA', 'umbrella insurance', 'long-term care planning', 'business expense deduction', 'mortgage points calculator', 'HELOC calculator', 'financial calculator', 'early repayment'],
  authors: [{ name: 'Finance Calculators' }],
  openGraph: {
    title: 'Free Mortgage Calculator (2026) | Monthly Payment + Amortization Schedule',
    description: 'Calculate mortgage payments, compound interest, crypto tax, IRS penalties, and retirement planning. Bank-grade accuracy, instant results.',
    type: 'website',
    url: SITE_URL,
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
