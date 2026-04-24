import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financial Calculators FAQ | Common Questions Answered",
  description: "Answers to common questions about mortgage calculators, crypto taxes, retirement planning, tax deductions, and insurance. Expert guidance for financial decisions.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Financial Calculators FAQ | Expert Answers",
    description: "Answers to common questions about mortgage calculators, crypto taxes, retirement planning, tax deductions, and insurance.",
    url: "/faq",
    type: "website",
  },
};

const faqCategories = [
  {
    category: "Crypto Tax",
    questions: [
      {
        q: "How do I calculate crypto taxes?",
        a: "Crypto is taxed as property. Calculate capital gains by subtracting cost basis from sale proceeds. Use our Crypto Tax Calculator at /tools/crypto-tax-calculator. Short-term gains (held <1 year) are taxed at ordinary income rates. Long-term gains are taxed at 0%, 15%, or 20% based on your income bracket.",
        link: "/tools/crypto-tax-calculator"
      },
      {
        q: "Are crypto staking rewards taxable?",
        a: "Yes, staking rewards are taxable as ordinary income at fair market value when received. The FMV becomes your cost basis for future sales. Use our Crypto Staking Tax Guide at /guides/crypto-staking-rewards-tax-guide.",
        link: "/guides/crypto-staking-rewards-tax-guide"
      },
      {
        q: "Do wash sale rules apply to crypto?",
        a: "Wash sale rules may apply to crypto transactions. The IRS hasn't issued specific guidance, but many tax professionals recommend treating crypto wash sales similarly to stock wash sales. Wait 31 days before repurchasing to avoid potential wash sale issues.",
        link: "/guides/crypto-wash-sale-rule-guide"
      },
      {
        q: "How are crypto NFTs taxed?",
        a: "NFTs are taxed as digital assets. Creating and selling NFTs generates ordinary income at fair market value. Purchasing and selling NFTs creates capital gains/losses. Some NFTs may qualify as collectibles taxed at 28% rate.",
        link: "/guides/crypto-nft-tax-guide"
      },
    ]
  },
  {
    category: "Mortgage & Home",
    questions: [
      {
        q: "When should I refinance my mortgage?",
        a: "Refinance when rate reduction saves enough to cover closing costs before you move. Typical threshold: 0.5-1% rate reduction. Use our Refinance Break-even Calculator at /tools/refinance-break-even-calculator to calculate months to recoup costs.",
        link: "/tools/refinance-break-even-calculator"
      },
      {
        q: "What are mortgage points?",
        a: "Mortgage points are upfront fees to reduce your interest rate. 1 point = 1% of loan amount, typically reduces rate by 0.25%. Points make sense if you'll stay in the home longer than the break-even period. Use our Points vs Rate Guide at /guides/mortgage-points-vs-rate-guide.",
        link: "/guides/mortgage-points-vs-rate-guide"
      },
      {
        q: "How much house can I afford?",
        a: "Use our Home Affordability Calculator at /tools/home-affordability-calculator. Generally, monthly housing costs should not exceed 28% of gross income. Factor in down payment, closing costs, property taxes, insurance, and maintenance.",
        link: "/tools/home-affordability-calculator"
      },
    ]
  },
  {
    category: "Tax Planning",
    questions: [
      {
        q: "What tax credits can I claim?",
        a: "Major tax credits include: Child Tax Credit ($2,000/child), American Opportunity Credit ($2,500 education), Lifetime Learning Credit ($2,000), Earned Income Credit (varies by income/family). Use our Tax Calculator at /tools/tax-calculator to estimate credits.",
        link: "/tools/tax-calculator"
      },
      {
        q: "Should I itemize or take standard deduction?",
        a: "Standard deduction is $14,600 single, $29,200 married (2025). Itemize if deductions exceed standard: mortgage interest, charitable donations, state taxes, medical expenses >7.5% AGI. Use our Tax Deduction Calculator at /tools/tax-deduction-calculator.",
        link: "/tools/tax-deduction-calculator"
      },
      {
        q: "How do quarterly estimated taxes work?",
        a: "Self-employed individuals must pay quarterly estimated taxes. Deadlines: April 15, June 15, September 15, January 15. Pay at least 90% of current year tax or 100% of prior year to avoid underpayment penalty. Use our Estimated Tax Calculator at /tools/estimated-tax-calculator.",
        link: "/tools/estimated-tax-calculator"
      },
    ]
  },
  {
    category: "Retirement",
    questions: [
      {
        q: "How much should I save for retirement?",
        a: "Financial experts recommend saving 15% of income minimum. Start early to benefit from compound growth. Use 401(k) employer match first, then IRA, then additional 401(k). Use our Retirement Calculator at /tools/retirement-calculator.",
        link: "/tools/retirement-calculator"
      },
      {
        q: "When should I take Social Security?",
        a: "Full retirement age is 66-67. Early claiming at 62 reduces benefits 25-30%. Delaying to 70 increases benefits 8% per year. Use our Social Security Break-even Calculator at /tools/social-security-break-even-calculator to find optimal timing.",
        link: "/tools/social-security-break-even-calculator"
      },
      {
        q: "What are required minimum distributions?",
        a: "RMDs begin at age 73 for Traditional IRAs and 401(k)s. Calculate using account balance divided by IRS life expectancy factor. Penalty for missed RMD: 25% of amount not distributed. Use our RMD Calculator at /tools/required-minimum-distribution-calculator.",
        link: "/tools/required-minimum-distribution-calculator"
      },
    ]
  },
  {
    category: "Insurance",
    questions: [
      {
        q: "How much life insurance do I need?",
        a: "Recommendation: 10-15 times annual income. Factor in mortgage, debts, children's education, spouse's income needs. Term life is most affordable for most families. Use our Life Insurance Calculator at /tools/term-life-insurance-calculator.",
        link: "/tools/term-life-insurance-calculator"
      },
      {
        q: "What is umbrella insurance?",
        a: "Umbrella insurance provides liability coverage above your home/auto policy limits. Recommended for high net worth individuals, rental property owners. Typical cost: $150-$300/year for $1 million coverage. Use our Umbrella Insurance Guide at /guides/umbrella-insurance-guide.",
        link: "/guides/umbrella-insurance-guide"
      },
    ]
  },
];

// Generate FAQ schema for SEO/GEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqCategories.flatMap(cat =>
    cat.questions.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    }))
  )
};

export default function FAQPage() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="space-y-3 mb-8">
        <h1 className="text-3xl font-bold">Financial Calculators FAQ</h1>
        <p className="text-zinc-600 dark:text-zinc-300">
          Expert answers to common questions about crypto taxes, mortgage refinancing, tax planning, retirement, and insurance. Each answer links to a calculator or detailed guide.
        </p>
      </section>

      {faqCategories.map((category) => (
        <section key={category.category} className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold">{category.category}</h2>
          <div className="space-y-4">
            {category.questions.map((item, idx) => (
              <div key={idx} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{item.a}</p>
                <Link
                  href={item.link}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Calculator/Guide →
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}

      <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">Home</Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-200">FAQ</span>
      </nav>
    </main>
  );
}