import Section199ADeductionMaximizerCalculator from '@/components/Section199ADeductionMaximizerCalculator'

export default function Section199ADeductionMaximizerCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <Section199ADeductionMaximizerCalculator />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the Section 199A QBI deduction?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Section 199A allows eligible self-employed and pass-through business owners to deduct up to 20% of qualified business income (QBI) from their taxable income. This deduction was created under the Tax Cuts and Jobs Act and is available through 2025."
                }
              },
              {
                "@type": "Question",
                "name": "What is a Specified Service Trade or Business (SSTB)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SSTBs include health, law, accounting, actuarial science, performing arts, consulting, athletics, financial services, and any trade where the principal asset is the reputation/skill of employees. SSTBs face full phaseout of QBI deduction above income thresholds ($170,050 single, $340,100 married for 2024)."
                }
              },
              {
                "@type": "Question",
                "name": "What are the income thresholds for QBI deduction limits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For 2024: Phaseout begins at $170,050 (single) or $340,100 (married filing jointly). Full limitation applies above $220,050 (single) or $440,100 (married). Below threshold: full 20% deduction. Above: limited by 50% of W-2 wages or 25% wages + 2.5% qualified property."
                }
              },
              {
                "@type": "Question",
                "name": "How can I maximize my QBI deduction above thresholds?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For non-SSTB businesses above threshold: hire W-2 employees (wages increase deduction limit), invest in qualified property (equipment, buildings), or aggregate multiple businesses. SSTBs cannot exceed threshold for full deduction, so consider income timing strategies."
                }
              },
              {
                "@type": "Question",
                "name": "Does the QBI deduction apply to all business income?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. QBI excludes: capital gains/losses, dividends, interest income, income earned outside the US, reasonable compensation paid to the taxpayer as wages, and guaranteed payments to partners. Only qualified business income from qualified trades or businesses qualifies."
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}