import InvestmentTaxEfficiencyCalculator from '@/components/InvestmentTaxEfficiencyCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is asset location and why does it matter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Asset location refers to which account type (taxable, traditional IRA/401k, Roth) holds each investment. Different asset types have different tax characteristics. Proper location can reduce tax drag (annual tax costs) by 0.5-1.5% of portfolio value, compounding to significant wealth gains over decades."
      }
    },
    {
      "@type": "Question",
      "name": "Which assets should go in Roth accounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "High-growth assets (stocks, growth funds, emerging markets, small-cap) belong in Roth accounts because all gains are tax-free forever. You want assets with highest expected total return in accounts where you'll never pay tax on gains. REITs also benefit from Roth location due to high taxable dividends."
      }
    },
    {
      "@type": "Question",
      "name": "Which assets belong in Traditional IRA/401k?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Income-producing assets (bonds, bond funds, CDs, money market) are best in Traditional accounts. Their regular interest distributions are taxed as ordinary income annually in taxable accounts. Traditional accounts defer all taxes until withdrawal, allowing bonds to compound without annual tax drag."
      }
    },
    {
      "@type": "Question",
      "name": "What should I keep in taxable brokerage accounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Broad-market stock index funds (qualified dividends taxed at lower 15-20% rate), tax-managed funds, municipal bonds (tax-free interest), and assets you may need before retirement age. Avoid bonds, REITs, and actively traded funds in taxable accounts due to higher tax costs."
      }
    },
    {
      "@type": "Question",
      "name": "How much wealth can asset location optimization add?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Studies show proper asset location can add 0.2-0.75% annually to after-tax returns. Over 20-30 years, this compounds to 5-20% additional wealth. For a $500,000 portfolio over 25 years, optimal location could add $100,000-$300,000 compared to random placement. Benefits increase with higher tax rates and longer horizons."
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
      <InvestmentTaxEfficiencyCalculator />
    </>
  )
}