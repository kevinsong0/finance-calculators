'use client'

import CreditCardInterestCalculator from '@/components/CreditCardInterestCalculator'

export default function CreditCardInterestCalculatorPage() {
  const faqs = [
    {
      question: "How is credit card interest calculated?",
      answer: "Credit card interest is calculated using daily compounding. Your APR is divided by 365 to get a daily rate. Each day, interest is calculated on your current balance and added to what you owe. This compounds, meaning you pay interest on previously accrued interest."
    },
    {
      question: "What is a grace period on credit cards?",
      answer: "The grace period (typically 21-25 days) is the time between your statement closing date and payment due date. If you pay your full statement balance by the due date, you pay NO interest on purchases. This benefit disappears if you carry a balance."
    },
    {
      question: "Why are minimum payments a trap?",
      answer: "Minimum payments (usually 2-3% of balance) barely cover monthly interest. With typical 24% APR, paying only minimums on $5,000 takes 15+ years and costs $8,000+ in interest. You end up paying 2-3x your original purchases."
    },
    {
      question: "How much interest will I pay on my credit card?",
      answer: "Interest depends on APR, balance, and payment amount. With $5,000 at 24% APR paying $150/month, you'll pay about $1,800 in interest over 4 years. Use our calculator to see your exact payoff timeline and total interest cost."
    },
    {
      question: "What happens if my payment is below the interest charged?",
      answer: "If your monthly payment is less than the monthly interest, your balance grows each month despite making payments. This creates an endless debt spiral. You must pay at least the monthly interest plus some principal to ever pay off the debt."
    },
    {
      question: "How can I avoid credit card interest?",
      answer: "Pay your full statement balance by the due date each month. This utilizes the grace period and results in zero interest. If carrying a balance, consider a balance transfer to a 0% APR card (usually 3-5% transfer fee) or pay extra each month."
    },
    {
      question: "What's the average credit card APR?",
      answer: "Average APRs are 24-25% for standard credit cards and 25-30% for store cards. Premium cards may have lower rates (15-20%). Your actual rate depends on credit score, card type, and whether it's a variable or fixed rate card."
    },
    {
      question: "Does paying double my payment help?",
      answer: "Yes, dramatically. Doubling your payment (e.g., $150 to $300) cuts payoff time by 60-70% and saves 40-50% on interest. Extra payments go directly to principal, reducing the base for future interest calculations."
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
      <CreditCardInterestCalculator />
    </>
  )
}