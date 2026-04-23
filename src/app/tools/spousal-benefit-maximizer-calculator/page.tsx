import SpousalBenefitMaximizerCalculator from '@/components/SpousalBenefitMaximizerCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Social Security spousal benefit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A spousal benefit allows a lower-earning spouse to receive up to 50% of the higher-earning spouse's Full Retirement Age benefit. The spouse can choose between their own benefit or the spousal benefit, whichever is higher."
      }
    },
    {
      "@type": "Question",
      "name": "When can I claim spousal benefits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can claim spousal benefits at age 62, but they will be reduced if claimed before your Full Retirement Age. Importantly, spousal benefits require the higher-earning spouse to have already filed for their own benefits."
      }
    },
    {
      "@type": "Question",
      "name": "Should the higher earner delay claiming to age 70?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For most couples, yes. Delaying the higher earner's claim to 70 maximizes both their own benefit and the survivor benefit. When the higher earner dies, the survivor receives the deceased's full benefit amount, making this strategy valuable for long-term protection."
      }
    },
    {
      "@type": "Question",
      "name": "How does the survivor benefit work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When a spouse dies, the surviving spouse can claim the deceased spouse's full benefit amount as a survivor benefit. This is often much larger than the spousal benefit. This is why the higher earner delaying to 70 protects the lower-earning spouse."
      }
    },
    {
      "@type": "Question",
      "name": "What is the optimal claiming strategy for married couples?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The typical optimal strategy: higher earner delays to age 70 to maximize survivor benefit, lower earner claims at 62 or FRA depending on needs. However, the best strategy depends on both spouses' life expectancies, benefit amounts, and financial situation."
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
      <SpousalBenefitMaximizerCalculator />
    </>
  )
}