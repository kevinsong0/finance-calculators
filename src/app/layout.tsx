import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { SITE_URL } from '@/lib/site'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-KTD45LPW6G';

export const metadata: Metadata = {
  title: 'Free Financial Calculators (2026) | Mortgage, Tax, Crypto, Retirement',
  description: '333+ free online financial calculators and guides for mortgage payments, crypto taxes, retirement planning, tax deductions, and insurance decisions. Expert guidance with instant calculations.',
  metadataBase: new URL(SITE_URL),
  keywords: ['mortgage calculator', 'crypto tax calculator', 'retirement calculator', 'tax calculator', 'compound interest calculator', 'loan calculator', 'crypto staking tax', 'crypto NFT tax', 'tax loss harvesting', 'refinance calculator', 'HELOC calculator', 'social security calculator', '401k calculator', 'IRA calculator', 'life insurance calculator', 'financial calculator', 'tax deduction', 'capital gains calculator', 'estimated tax calculator', 'RMD calculator'],
  authors: [{ name: 'Finance Tools' }],
  openGraph: {
    title: 'Free Financial Calculators (2026) | 333+ Expert Guides',
    description: '333+ free online financial calculators and guides for mortgage, crypto tax, retirement, tax planning, and insurance. Bank-grade accuracy, instant results.',
    type: 'website',
    url: SITE_URL,
    locale: 'en_US',
    siteName: 'Finance Tools',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Organization and WebSite schema for GEO (Generative Engine Optimization)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Finance Tools",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": "Free online financial calculators and guides for personal finance, tax planning, retirement, mortgage, and cryptocurrency taxation.",
    "sameAs": [
      "https://github.com/kevinsong0/finance-calculators"
    ],
    "contactInfo": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@finance.128345827.xyz"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Finance Tools",
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "about": [
      {"@type": "Thing", "name": "Financial Calculator"},
      {"@type": "Thing", "name": "Mortgage Calculator"},
      {"@type": "Thing", "name": "Tax Calculator"},
      {"@type": "Thing", "name": "Retirement Calculator"},
      {"@type": "Thing", "name": "Crypto Tax Calculator"}
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Organization and WebSite structured data for AI crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
