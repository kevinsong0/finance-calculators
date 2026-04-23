'use client'

import QualifiedSmallBusinessStockCalculator from '@/components/QualifiedSmallBusinessStockCalculator'

export default function QualifiedSmallBusinessStockCalculatorPage() {
  const faqs = [
    {
      question: "What is QSBS (Qualified Small Business Stock)?",
      answer: "QSBS is stock in a qualified small business C corporation that meets specific requirements: assets under $50M at issuance, active business operation, original issue (purchased directly from company). Under Section 1202, gain from QSBS held over 5 years may be 100% excluded from federal capital gains tax."
    },
    {
      question: "What is the Section 1202 QSBS exclusion?",
      answer: "Section 1202 allows 100% exclusion of capital gains from QSBS held more than 5 years (for stock acquired after Sept 27, 2010). No federal capital gains tax on qualifying gains. Maximum exclusion: greater of 10x your investment or $10M per issuer. This is one of the largest tax breaks available."
    },
    {
      question: "What are QSBS requirements?",
      answer: "QSBS must be: 1) C corporation stock, 2) Original issue (bought directly from company, not secondary market), 3) Company assets under $50M when stock issued, 4) Active business (not holding/investment company), 5) Held more than 5 years, 6) Acquired after Sept 27, 2010 for 100% exclusion."
    },
    {
      question: "What is the $10M QSBS exclusion limit?",
      answer: "Maximum QSBS exclusion per issuing company, per taxpayer is $10M OR 10x your investment (whichever is greater). Example: Invest $100K, max exclusion $1M (10x). Invest $2M, max exclusion $20M (10x exceeds $10M). Married filing jointly = 2 taxpayers = $20M potential limit."
    },
    {
      question: "Can I sell QSBS before 5 years?",
      answer: "Yes, but you lose the exclusion. QSBS sold before 5-year holding period receives regular capital gains treatment - no Section 1202 benefit. You pay normal capital gains tax (15% or 20%). Always hold QSBS at least 5 years unless absolutely necessary to sell early."
    },
    {
      question: "Does QSBS work for S corporations or LLCs?",
      answer: "No. QSBS only applies to C corporations. S corporations, partnerships, LLCs do NOT qualify for Section 1202 exclusion. This is why many startups initially form as C corporations to allow investors QSBS treatment. Check corporate structure before assuming QSBS status."
    },
    {
      question: "Can I buy QSBS on the stock market?",
      answer: "No. QSBS requires original issue stock purchased directly from the company. Secondary market purchases (stock exchanges, trading platforms) do NOT qualify. You must be a founder, early investor, or employee receiving stock directly from the company."
    },
    {
      question: "What is Section 1045 QSBS rollover?",
      answer: "Section 1045 allows rolling QSBS gains into new QSBS within 60 days of sale. Defers gain recognition, maintains QSBS eligibility for replacement stock. Must purchase new QSBS with the rolled gains. New stock must meet QSBS requirements and have its own 5-year holding period."
    },
    {
      question: "Does QSBS exemption apply to state taxes?",
      answer: "Depends on state. Some states follow federal QSBS exclusion (no state tax). Some states do NOT conform. California: does NOT follow federal QSBS exclusion - California tax applies. Check your state's treatment of Section 1202 before assuming complete tax exemption."
    },
    {
      question: "How do I verify QSBS status?",
      answer: "Ask company for QSBS certification letter stating: C corp status, assets under $50M at stock issuance, active business, stock is original issue. Keep documentation for IRS records. Company counsel typically provides QSBS certification for investor due diligence. Without proof, IRS may challenge exclusion."
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />
      <QualifiedSmallBusinessStockCalculator />
    </>
  )
}