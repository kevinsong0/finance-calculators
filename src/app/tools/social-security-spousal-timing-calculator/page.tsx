import SocialSecuritySpousalTimingCalculator from '@/components/SocialSecuritySpousalTimingCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When can I claim spousal Social Security benefits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spousal benefits can only be claimed after the higher-earning spouse has filed for their own benefits. You cannot receive spousal benefits while the higher earner delays claiming, even if you have reached retirement age."
      }
    },
    {
      "@type": "Question",
      "name": "Can I claim my own benefit first and switch to spousal later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, this is a common strategy. You can claim your own reduced benefit at age 62, then when the higher earner files for benefits later, you can switch to the higher spousal benefit (if it exceeds your own). This strategy provides income while the higher earner delays."
      }
    },
    {
      "@type": "Question",
      "name": "How much is the spousal benefit reduction if I claim before FRA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you claim spousal benefits before your Full Retirement Age (67 for most), the benefit is reduced by approximately 6.67% per year (about 25% reduction if claimed at 62). Unlike your own benefit, spousal benefits have no delayed retirement credits - waiting past FRA doesn't increase them."
      }
    },
    {
      "@type": "Question",
      "name": "What is the optimal spousal claiming strategy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The optimal strategy depends on ages and benefits. Often: higher earner delays to age 70 to maximize survivor benefit, lower earner claims own benefit at 62, then switches to spousal when higher earner claims. This maximizes household lifetime benefits while providing income during the gap years."
      }
    },
    {
      "@type": "Question",
      "name": "What happens to spousal benefits when the higher earner dies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When the higher earner dies, the surviving spouse can switch from spousal benefit to survivor benefit, which equals the deceased spouse's full benefit amount. This is why having the higher earner delay to age 70 is important - it maximizes the survivor benefit for years after death."
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
      <SocialSecuritySpousalTimingCalculator />
    </>
  )
}