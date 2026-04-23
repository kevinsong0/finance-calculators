import PortfolioRiskCalculator from '@/components/PortfolioRiskCalculator'

export default function PortfolioRiskCalculatorPage() {
  const faqs = [
    {
      question: 'What is portfolio volatility and standard deviation?',
      answer: 'Portfolio volatility (standard deviation) measures how much returns vary from the average. A 15% volatility means returns typically range within +/-15% of expected return. Higher volatility = higher risk but also potentially higher returns.',
    },
    {
      question: 'What is the Sharpe ratio and why is it important?',
      answer: 'Sharpe ratio = (Portfolio Return - Risk-Free Rate) / Volatility. It measures risk-adjusted performance. Higher Sharpe = better returns per unit of risk. Sharpe above 1.0 is good, above 2.0 is excellent. Compare portfolios using Sharpe, not just returns.',
    },
    {
      question: 'What is Value at Risk (VaR)?',
      answer: 'VaR estimates maximum expected loss at a confidence level. VaR 95% of $50K means: in 95% of typical years, losses won\'t exceed $50K. There\'s a 5% chance of worse outcomes. VaR helps understand worst-case scenarios.',
    },
    {
      question: 'How should my allocation change with age?',
      answer: 'Common rules: "100 - Age" in stocks (age 40 = 60% stocks), or "110 - Age" for longer horizons. Young investors can tolerate more volatility for growth. Older investors need stability but still need 20-30% equity for inflation protection.',
    },
    {
      question: 'Why does diversification reduce risk?',
      answer: 'Different assets don\'t move together (low correlation). When stocks fall, bonds may rise or hold steady. Mixing assets smooths returns and reduces volatility below weighted average. International and REITs add further diversification.',
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
      <PortfolioRiskCalculator />
    </>
  )
}