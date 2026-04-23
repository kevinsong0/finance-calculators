import CorporateTaxCalculator from '@/components/CorporateTaxCalculator'

export default function CorporateTaxCalculatorPage() {
  const faqs = [
    {
      question: 'What is the federal corporate tax rate for C-Corporations?',
      answer: 'C-Corporations face graduated tax rates: 15% on the first $50,000, 25% on $50,000-$75,000, 34% on $75,000-$100,000, 39% on $100,000-$335,000, 34% up to $10 million, then 35%, 38%, and finally a flat 21% rate for income over $18.33 million.',
    },
    {
      question: 'What is double taxation for C-Corporations?',
      answer: 'Double taxation occurs when C-Corp profits are taxed at the corporate level (up to 21% federal) and then taxed again at the shareholder level when distributed as dividends (typically 15-20% qualified dividend rate). This can result in total tax of 35-40% on distributed profits.',
    },
    {
      question: 'What is the difference between C-Corp and pass-through entities?',
      answer: 'C-Corps pay corporate income tax and face potential double taxation on dividends. Pass-through entities (S-Corps, LLCs) do not pay corporate tax - income passes directly to owners who report it on personal returns. Pass-throughs may qualify for the 20% QBI deduction.',
    },
    {
      question: 'What deductions can C-Corporations claim?',
      answer: 'C-Corporations can deduct operating expenses, salaries, interest expense, depreciation, and charitable contributions (limited to 10% of taxable income). They cannot deduct dividends paid to shareholders. Employee salaries are deductible, reducing corporate taxable income.',
    },
    {
      question: 'When should a business choose C-Corp vs S-Corp structure?',
      answer: 'C-Corp is preferred for businesses planning to retain earnings (no immediate double taxation), seek outside investors, offer stock options, or have tax-exempt shareholders. S-Corp is preferred for businesses distributing most profits to owners who want pass-through taxation and QBI deduction benefits.',
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
      <CorporateTaxCalculator />
    </>
  )
}