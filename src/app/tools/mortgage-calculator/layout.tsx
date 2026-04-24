import type { Metadata } from 'next'

const faqs = [
  {
    q: "What is the difference between equal payment and equal principal?",
    a: "Equal payment (amortization) has fixed monthly payments throughout the loan term. Equal principal has decreasing payments - you pay the same principal amount each month plus decreasing interest. Equal principal saves about 10-20% in total interest but has higher initial payments."
  },
  {
    q: "How much can I save with early repayment?",
    a: "Early repayment in the first 1/3 of your loan term can save significant interest. For a $300,000 30-year mortgage at 6.5%, a $50,000 early payment at month 12 can save approximately $90,000 in interest and reduce the term by about 10 years."
  },
  {
    q: "Should I choose fixed or adjustable rate mortgage?",
    a: "Fixed rate provides payment stability and protects against rate increases. Adjustable rate (ARM) typically starts lower but can increase. Choose fixed if you plan to stay long-term or prefer predictable payments. ARM may suit short-term owners who can handle payment fluctuation."
  },
  {
    q: "What percentage of my income should go to mortgage?",
    a: "Most lenders recommend spending no more than 28% of gross monthly income on mortgage payments, and no more than 36% on total debt payments including mortgage, car loans, and credit cards. This helps ensure affordable payments and approval chances."
  },
  {
    q: "How does loan term affect total interest?",
    a: "Shorter terms mean higher monthly payments but much lower total interest. A 15-year mortgage at 6.5% on $300,000 has about $85,000 total interest versus $382,000 for a 30-year term. The 15-year saves nearly $300,000 despite higher monthly payments."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

// SoftwareApplication schema for AI crawlers (GEO)
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Mortgage Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Calculate mortgage monthly payment, total interest, amortization schedule, and early repayment savings.",
  "featureList": ["Monthly payment calculation", "Amortization schedule", "Equal payment vs equal principal", "Early repayment analysis", "PMI estimation"]
};

// BreadcrumbList schema for navigation
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
    { "@type": "ListItem", "position": 2, "name": "Mortgage Hub", "item": "https://finance.128345827.xyz/tools/mortgage-hub" },
    { "@type": "ListItem", "position": 3, "name": "Mortgage Calculator", "item": "https://finance.128345827.xyz/tools/mortgage-calculator" }
  ]
};

export const metadata: Metadata = {
  title: 'Mortgage Calculator (2026) - Monthly Payment, Interest & Amortization',
  description: 'Calculate mortgage monthly payment, total interest, amortization, and early repayment impact. Compare equal payment vs equal principal methods.',
  keywords: ['mortgage calculator', 'home loan calculator', 'mortgage payment calculator', 'loan interest calculator', 'early repayment calculator', '房贷计算器', '月供计算'],
  openGraph: {
    title: 'Mortgage Calculator (2026) - Monthly Payment, Interest & Amortization',
    description: 'Estimate monthly payment, amortization, total interest, and early repayment savings before taking a home loan.',
    type: 'website',
  },
}

export default function MortgageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  )
}
