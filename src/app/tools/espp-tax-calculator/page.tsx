'use client'

import ESPPTaxCalculator from '@/components/ESPPTaxCalculator'

export default function ESPPTaxCalculatorPage() {
  const faqs = [
    {
      question: "How are ESPP shares taxed?",
      answer: "ESPP taxation depends on holding period. Qualifying disposition (2+ years from grant, 1+ year from purchase): ordinary income = discount at purchase (limited to gain if sold). Remaining gain taxed as LTCG. Disqualifying disposition (sold early): entire discount taxed as ordinary income. Cost basis differs: qualifying = purchase price + ordinary income. Disqualifying = FMV at purchase. Example: purchase $42 (15% discount from $50), sell $75. Qualifying: ordinary income $8, LTCG $25. Disqualifying: ordinary income $8, LTCG $17."
    },
    {
      question: "What is ESPP qualifying disposition?",
      answer: "Qualifying disposition requirements: Hold 2+ years from OFFERING DATE (grant). AND hold 1+ year from PURCHASE DATE. Offering date = start of enrollment period. Purchase date = when shares bought (end of offering period). Both requirements must be met. Tax benefit: ordinary income limited to discount amount. Remaining gain taxed as LTCG (15% vs marginal). If sold at loss: ordinary income = gain (if any), but limited to discount. Disqualifying: sell before both requirements, entire discount taxed as ordinary income."
    },
    {
      question: "How is ESPP discount calculated?",
      answer: "ESPP discount: typically 15% (IRS maximum). Purchase price: lower of FMV at offering date OR FMV at purchase date, minus discount. Example: offering $50, purchase $60. Purchase price = $50 - 15% = $42.50 (lower of $50/$60, minus discount). Look-back feature: use lower price from offering period. Discount = FMV at purchase - actual purchase price. $60 - $42.50 = $17.50 discount per share. Discount taxed as ordinary income (qualifying: limited to gain, disqualifying: full amount)."
    },
    {
      question: "What is the ESPP look-back provision?",
      answer: "Look-back provision: purchase price based on lower of FMV at offering start OR FMV at purchase end. Benefit: if stock rose during offering period, you get discount on lower (offering) price. Example: offering $40, purchase $60 (stock rose). Purchase price = $40 - 15% = $34. Discount from current price: $60 - $34 = $26 per share. Look-back increases discount when stock rises. Not all ESPPs have look-back (check plan terms). Look-back taxed same as regular discount (ordinary income). Offering period: typically 3-6 months."
    },
    {
      question: "What happens if I sell ESPP immediately?",
      answer: "Immediate sale (same-day sale): disqualifying disposition. Entire discount taxed as ordinary income. Capital gain = $0 (bought at FMV minus discount, sold at FMV). Example: purchase $42.50 (discount), sell $42.50 immediately. Ordinary income $17.50 discount. No capital gain. Benefits: immediate diversification, no future price risk, no concentration. Drawbacks: no LTCG benefit, higher ordinary income tax now. Same-day sale: employer may require waiting period. Tax withheld at sale (supplemental rate 22%). Simple but tax inefficient."
    },
    {
      question: "Should I hold ESPP shares for qualifying disposition?",
      answer: "Hold for qualifying: better tax treatment (LTCG on most gain). Requirements: 2+ years from offering, 1+ year from purchase. LTCG rate 15% vs marginal 24%+ = 9% savings. Risk: price decline during holding period. Company risk: stock may drop below purchase price. Loss scenario: if sold at loss, ordinary income = 0 (qualifying). Disqualifying: still owe ordinary income on discount (even if loss). Qualifying better if: confident in company, stock growing, can hold 2+ years. Disqualifying better if: diversification priority, stock volatile, need cash, price decline risk. Balance tax benefit vs concentration risk."
    },
    {
      question: "How is ESPP reported on tax return?",
      answer: "ESPP tax reporting: W-2 shows ordinary income (discount portion). Form 1099-B shows sale proceeds and basis. Verify 1099-B basis is correct. Qualifying disposition: basis = purchase price + ordinary income. Disqualifying: basis = FMV at purchase. If basis wrong on 1099-B: file Form 8949 to correct. Enter actual basis from W-2 + purchase records. Schedule D: report sale, calculate capital gain. Form 3922: employer provides ESPP purchase details (basis, FMV, dates). Keep Form 3922 for records. Ordinary income on W-2 regardless of qualifying/disqualifying (amount differs)."
    },
    {
      question: "What is Form 3922 for ESPP?",
      answer: "Form 3922: Transfer of Stock Acquired Through ESPP. Employer provides after purchase date. Shows: purchase date, FMV at purchase, actual purchase price, number of shares. Used to calculate: ordinary income, cost basis, capital gain. Keep Form 3922 for tax records. Need for: calculating qualifying disposition, correcting 1099-B basis, verifying holding period. Compare to 1099-B: ensure basis matches. If discrepancy: use Form 3922 data to correct Form 8949. Form 3922 sent annually for ESPP purchases. Essential for accurate ESPP tax reporting."
    },
    {
      question: "What is the maximum ESPP discount?",
      answer: "IRS maximum ESPP discount: 15% of FMV. Most companies offer 15% (maximize benefit). Some offer 5-10%. Discount applies to: lower of FMV at offering OR FMV at purchase (look-back). If no look-back: discount on purchase date FMV only. Tax-free discount for qualifying disposition (taxed as LTCG portion). Ordinary income = discount amount for both qualifying and disqualifying (qualifying limited to gain). $25,000 annual purchase limit (IRS). Purchase limit based on salary percentage or dollar cap (plan terms)."
    },
    {
      question: "How to maximize ESPP tax benefits?",
      answer: "Maximize ESPP benefits: Participate (15% discount = instant gain). Hold for qualifying disposition (2+ years from offering, 1+ from purchase). LTCG on gains above discount. If stock declines: qualifying = no ordinary income tax (sell at loss). Sell strategically: hold if stock growing, sell early if declining. Use look-back feature (enroll during low price periods). Consider diversification: don't hold too much company stock. Enroll each offering period for continuous participation. Contribute maximum allowed ($25K limit or plan cap). Compare: sell immediately vs hold 2+ years (tax vs diversification trade-off)."
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
      <ESPPTaxCalculator />
    </>
  )
}