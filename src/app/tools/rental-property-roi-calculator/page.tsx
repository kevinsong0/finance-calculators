import RentalPropertyROICalculator from '@/components/RentalPropertyROICalculator'

export const metadata = {
  title: 'Rental Property ROI Calculator 2024 | Cap Rate, Cash-on-Cash, Total Return',
  description: 'Calculate comprehensive rental property investment metrics including Cap Rate, Cash-on-Cash Return, DSCR, GRM, and total ROI over holding period. Analyze investment property performance.',
  keywords: 'rental property ROI calculator, cap rate calculator, cash on cash return, rental property investment analysis, DSCR calculator, GRM calculator, real estate ROI',
}

const faqData = [
  {
    question: 'What is a good Cap Rate for rental property?',
    answer: 'A good Cap Rate typically ranges from 5-8% for stable markets, with higher rates (8-12%) in riskier or less competitive markets. Lower Cap Rates (3-5%) indicate premium properties in high-demand areas. Compare Cap Rates within the same market for meaningful analysis.',
  },
  {
    question: 'What is the 1% rule for rental property?',
    answer: 'The 1% rule states that monthly rent should equal at least 1% of the purchase price. For a $200,000 property, rent should be $2,000+. This rule helps quickly screen properties for positive cash flow potential, though actual analysis requires full expense calculation.',
  },
  {
    question: 'What DSCR do lenders require for investment property?',
    answer: 'Most lenders require a DSCR (Debt Service Coverage Ratio) of at least 1.25, meaning NOI must cover 125% of debt payments. Some lenders accept 1.0-1.2, while stricter lenders require 1.3+. Higher DSCR indicates lower risk and better cash flow.',
  },
  {
    question: 'How do you calculate total ROI on rental property?',
    answer: 'Total ROI includes: (1) Annual cash flow × holding period, (2) Property appreciation over holding period, (3) Loan principal paydown. Divide total profit by initial investment (down payment + closing costs) and annualize for comparison.',
  },
  {
    question: 'What is Cash-on-Cash Return vs Cap Rate?',
    answer: 'Cash-on-Cash Return measures levered return: Annual cash flow divided by actual cash invested (down payment). Cap Rate measures unlevered return: NOI divided by property value. Cash-on-Cash is higher when using leverage effectively; Cap Rate ignores financing.',
  },
]

export default function RentalPropertyROICalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((faq) => ({
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
      <RentalPropertyROICalculator />
    </>
  )
}