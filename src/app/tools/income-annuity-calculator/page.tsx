import IncomeAnnuityCalculator from '@/components/IncomeAnnuityCalculator'

export default function IncomeAnnuityCalculatorPage() {
  const faqs = [
    {
      question: 'What is an income annuity?',
      answer: 'An income annuity converts a lump sum into guaranteed lifetime payments. You purchase an annuity from an insurance company, and they pay you (or your spouse) a fixed amount for the rest of your life. It provides predictable retirement income but gives up liquidity.',
    },
    {
      question: 'How is the annuity payout rate determined?',
      answer: 'Payout rates primarily depend on age at purchase: older ages get higher rates because expected payment period is shorter. Age 55: ~4%, Age 65: ~5.5%, Age 75: ~7.5%. Rates also adjust for joint life options, guarantee periods, deferral, and inflation protection riders.',
    },
    {
      question: 'What is the difference between fixed and variable annuities?',
      answer: 'Fixed annuities provide guaranteed payments for life with no market risk. Variable annuities link payments to investment performance, offering potential upside but with risk of lower income. Indexed annuities offer a hybrid with limited upside linked to an index (like S&P 500).',
    },
    {
      question: 'Should I add inflation protection to my annuity?',
      answer: 'Inflation protection (COLA rider) increases payments annually but reduces initial payout ~25%. Consider it if: (1) expecting long retirement (20+ years), (2) worried about rising costs, (3) annuity is major income source. For shorter retirements, the reduced initial payout may not offset inflation benefits.',
    },
    {
      question: 'Can I get my money back from an annuity?',
      answer: 'Generally no - annuities are irrevocable once purchased. However, guarantee periods provide some protection: if you die within the guarantee period (e.g., 10 years), remaining payments go to your beneficiary. Joint life options also protect your spouse. There is no refund for surrendering early.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <IncomeAnnuityCalculator />
    </>
  )
}