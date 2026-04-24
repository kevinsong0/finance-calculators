import type { Metadata } from 'next'

const faqs = [
  {
    q: "What is compound interest and how does it work?",
    a: "Compound interest is interest calculated on both the initial principal and accumulated interest from previous periods. Unlike simple interest, compound interest grows exponentially over time. Each period, interest is added to your balance, and the next period calculates interest on this larger amount."
  },
  {
    q: "How often should interest compound for maximum growth?",
    a: "More frequent compounding yields higher returns. Daily compounding provides the best growth, followed by monthly, quarterly, and annual. For example, $10,000 at 7% for 10 years: annual compounding yields $19,671, while daily compounding yields $20,136 - about $465 more."
  },
  {
    q: "How much should I contribute monthly to reach my savings goal?",
    a: "Use the reverse calculation: divide your target amount by the compound factor, then by the number of months. For $100,000 in 20 years at 7% annual return, you need approximately $195 monthly contribution. Starting early dramatically reduces required contributions."
  },
  {
    q: "What is the Rule of 72 in compound interest?",
    a: "The Rule of 72 estimates doubling time: divide 72 by the annual interest rate. At 7% return, your investment doubles in approximately 10.3 years (72/7). At 10%, it doubles in 7.2 years. This quick mental math helps plan long-term investments."
  },
  {
    q: "How does starting early affect compound interest growth?",
    a: "Starting early dramatically increases final value due to longer compounding. $5,000 invested at age 25 at 7% grows to $38,000 by age 65. The same $5,000 at age 35 only grows to $19,300. Ten years difference creates nearly $19,000 more growth."
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
  "name": "Compound Interest Calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Calculate compound interest growth with different compounding frequencies and monthly contributions.",
  "featureList": ["Compound growth projection", "Monthly contribution analysis", "Multiple compounding frequencies", "Rule of 72 visualization"]
};

// BreadcrumbList schema for navigation
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
    { "@type": "ListItem", "position": 2, "name": "Investment Hub", "item": "https://finance.128345827.xyz/tools/investment-hub" },
    { "@type": "ListItem", "position": 3, "name": "Compound Interest Calculator", "item": "https://finance.128345827.xyz/tools/compound-interest" }
  ]
};

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - Investment Growth Calculator',
  description: 'Calculate compound interest growth with monthly contributions. Visualize how your investments grow over time. Free compound interest calculator.',
  keywords: ['compound interest calculator', 'investment calculator', 'interest growth', 'savings calculator', 'annual return calculator', '复利计算器', '投资收益'],
  openGraph: {
    title: 'Compound Interest Calculator - See Your Money Grow',
    description: 'Free compound interest calculator. Calculate investment growth with different frequencies and monthly contributions.',
    type: 'website',
  },
}

export default function CompoundLayout({
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