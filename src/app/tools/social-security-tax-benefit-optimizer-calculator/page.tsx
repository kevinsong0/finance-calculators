import SocialSecurityTaxBenefitOptimizerCalculator from '@/components/SocialSecurityTaxBenefitOptimizerCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What percentage of Social Security benefits can be taxed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depending on your provisional income, 0%, up to 50%, or up to 85% of your Social Security benefits can be taxable. Single filers: 0% taxable below $25K provisional income, up to 50% at $25K-$34K, up to 85% above $34K. Married filing jointly: 0% below $32K, up to 50% at $32K-$44K, up to 85% above $44K."
      }
    },
    {
      "@type": "Question",
      "name": "What is provisional income for Social Security taxation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Provisional income (also called 'combined income') is your adjusted gross income plus tax-exempt interest (like municipal bonds) plus 50% of your Social Security benefits. This determines how much of your SS benefits are taxable. Note: tax-exempt interest is still counted in provisional income!"
      }
    },
    {
      "@type": "Question",
      "name": "How can I avoid Social Security taxation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strategies to reduce provisional income: Roth conversions before age 62 (Roth withdrawals don't count), manage traditional IRA/401k withdrawals to stay below thresholds, delay Social Security to age 70, invest in tax-managed funds, use HSA for medical expenses, and consider timing of pension/annuity income."
      }
    },
    {
      "@type": "Question",
      "name": "Do states tax Social Security benefits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "37 states do not tax Social Security benefits at all. States that tax SS include: Colorado, Connecticut, Kansas, Minnesota, Missouri, Montana, Nebraska, New Mexico, North Dakota, Rhode Island, Utah, Vermont, and West Virginia. However, many of these states have exemptions or lower thresholds than federal rules."
      }
    },
    {
      "@type": "Question",
      "name": "What's the tax rate on Social Security benefits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Taxable Social Security benefits are taxed at your ordinary income tax rate (10%, 12%, 22%, etc.) based on your total income including the taxable portion of SS. There is no separate 'Social Security tax rate' - the taxable portion is simply added to your other taxable income."
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
      <SocialSecurityTaxBenefitOptimizerCalculator />
    </>
  )
}