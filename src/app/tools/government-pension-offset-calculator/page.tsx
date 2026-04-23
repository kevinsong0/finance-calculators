import GovernmentPensionOffsetCalculator from '@/components/GovernmentPensionOffsetCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Government Pension Offset (GPO)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GPO reduces Social Security spousal and survivor benefits for people who receive pensions from government employment not covered by Social Security. It offsets your benefit by 2/3 of your government pension amount."
      }
    },
    {
      "@type": "Question",
      "name": "How is GPO calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GPO reduces your spousal or survivor benefit by 2/3 of your monthly government pension. For example, if you receive a $2,000 government pension, GPO reduces your Social Security spousal/survivor benefit by $1,333. This can completely eliminate your Social Security benefit."
      }
    },
    {
      "@type": "Question",
      "name": "Does GPO apply to both spousal and survivor benefits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, GPO affects both spousal benefits (when your spouse is alive) and survivor benefits (when your spouse dies). This is different from WEP, which only affects your own retirement benefit but not survivor benefits."
      }
    },
    {
      "@type": "Question",
      "name": "Can I avoid GPO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Limited options: work the last 60 months of government employment in a Social Security-covered position, or consider whether taking the government pension is the best option for your situation. GPO applies regardless of when you claim your pension."
      }
    },
    {
      "@type": "Question",
      "name": "How does GPO differ from WEP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WEP affects your own earned Social Security retirement benefit, while GPO affects spousal and survivor benefits. WEP has a maximum dollar cap and can be reduced/eliminated with 30+ years of substantial covered earnings. GPO has no cap (can eliminate entire benefit) and cannot be reduced through additional covered work."
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
      <GovernmentPensionOffsetCalculator />
    </>
  )
}