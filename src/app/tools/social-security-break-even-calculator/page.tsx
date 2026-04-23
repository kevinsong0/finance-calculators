import SocialSecurityBreakEvenCalculator from '@/components/SocialSecurityBreakEvenCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Social Security break-even age?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The break-even age is when delaying Social Security claiming results in higher total lifetime benefits compared to claiming earlier. For example, if claiming at FRA gives $2,400/month vs $1,500 at age 62, you need to live past approximately age 78 for waiting to pay off."
      }
    },
    {
      "@type": "Question",
      "name": "How does claiming age affect my monthly benefit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claiming at age 62 reduces your benefit by 25-30% permanently. Claiming at Full Retirement Age (67 for most) gives your full benefit. Waiting until age 70 increases your benefit by 24-28% through delayed retirement credits."
      }
    },
    {
      "@type": "Question",
      "name": "Should I claim Social Security early or late?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The optimal claiming age depends on your life expectancy, health, financial needs, and spousal situation. If you expect to live past the break-even age (typically 78-82), delaying usually maximizes lifetime benefits. If you have health issues or immediate financial needs, early claiming may be better."
      }
    },
    {
      "@type": "Question",
      "name": "How do delayed retirement credits work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you delay claiming past Full Retirement Age, you earn delayed retirement credits of 8% per year (2/3 of 1% per month). This means waiting from FRA to age 70 increases your benefit by 24% permanently."
      }
    },
    {
      "@type": "Question",
      "name": "What factors should I consider when choosing my claiming age?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Consider: your health and family longevity history, current financial needs, other income sources, spousal benefits coordination, survivor benefit protection (higher earner should delay), tax implications, and whether you'll continue working before FRA."
      }
    }
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SocialSecurityBreakEvenCalculator />
    </>
  )
}