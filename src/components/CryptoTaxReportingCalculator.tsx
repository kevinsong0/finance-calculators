'use client'

import { useState } from 'react'

export default function CryptoTaxReportingCalculator() {
  const [totalCryptoSales, setTotalCryptoSales] = useState('15000')
  const [totalGains, setTotalGains] = useState('8000')
  const [totalLosses, setTotalLosses] = useState('2000')
  const [holdingPeriod, setHoldingPeriod] = useState('mixed')
  const [miningIncome, setMiningIncome] = useState('0')
  const [stakingIncome, setStakingIncome] = useState('0')
  const [airdrops, setAirdrops] = useState('0')
  const [nftSales, setNftSales] = useState('0')
  const [exchangesTraded, setExchangesTraded] = useState('3')
  const [transactionsCount, setTransactionsCount] = useState('50')
  const [filingStatus, setFilingStatus] = useState('single')
  const [taxYear, setTaxYear] = useState('2024')

  const calculate = () => {
    const sales = parseFloat(totalCryptoSales) || 0
    const gains = parseFloat(totalGains) || 0
    const losses = parseFloat(totalLosses) || 0
    const mining = parseFloat(miningIncome) || 0
    const staking = parseFloat(stakingIncome) || 0
    const airdropIncome = parseFloat(airdrops) || 0
    const nftIncome = parseFloat(nftSales) || 0
    const exchanges = parseFloat(exchangesTraded) || 0
    const txCount = parseFloat(transactionsCount) || 0

    // Net capital gains/losses
    const netGains = gains - losses

    // Calculate capital gains tax
    let stGains = 0
    let ltGains = 0
    if (holdingPeriod === 'short') {
      stGains = netGains
    } else if (holdingPeriod === 'long') {
      ltGains = netGains
    } else {
      // Mixed: assume 50/50
      stGains = netGains / 2
      ltGains = netGains / 2
    }

    // Tax rates
    const stRate = 0.35 // Ordinary income rate
    const ltRate = 0.15 // Preferential rate
    const ordinaryRate = 0.22

    const stTax = stGains > 0 ? stGains * stRate : 0
    const ltTax = ltGains > 0 ? ltGains * ltRate : 0

    // Income from mining/staking/airdrops taxed as ordinary income
    const ordinaryIncome = mining + staking + airdropIncome
    const ordinaryTaxOnIncome = ordinaryIncome * ordinaryRate

    // NFTs may be taxed as collectibles (28% max rate) or ordinary income
    const nftTaxRate = 0.28 // Collectibles rate (simplified)
    const nftTax = nftIncome > 0 ? nftIncome * nftTaxRate : 0

    const totalTax = stTax + ltTax + ordinaryTaxOnIncome + nftTax

    // Reporting requirements
    const needs8949 = sales > 0 || txCount > 0
    const needsScheduleD = netGains !== 0 || losses > 0
    const needsScheduleC = mining > 0 // Mining as self-employment
    const needsSchedule1 = ordinaryIncome > 0 || staking > 0 || airdropIncome > 0
    const needsForm8949Separate = exchanges > 1 || txCount > 50

    // Threshold for FBAR (foreign bank account report) - if using foreign exchanges
    const fbarThreshold = 10000

    // Penalties for non-reporting
    const underreportingPenalty = totalTax * 0.20 // 20% accuracy-related penalty
    const fraudPenalty = totalTax * 0.75 // 75% fraud penalty (worst case)
    const lateFilingPenalty = totalTax * 0.05 // 5% per month late filing

    // Documentation needed
    const docsNeeded = [
      'Exchange transaction history exports',
      'Wallet addresses used',
      'Date/time of each transaction',
      'USD value at time of acquisition',
      'USD value at time of sale/disposal',
      'Proof of holding period (for LT qualification)',
      'Cost basis tracking spreadsheet',
    ]

    // IRS guidance references
    const irsReferences = [
      'IRS Notice 2014-21: Virtual currency guidance',
      'IRS FAQ on Virtual Currency Transactions',
      'Form 8949: Sales and Other Dispositions of Capital Assets',
      'Schedule D: Capital Gains and Losses',
      'Schedule C: Business income (for mining)',
      'Revenue Ruling 2019-24: Hard forks and airdrops',
    ]

    return {
      totalCryptoSales: sales.toFixed(2),
      totalGains: gains.toFixed(2),
      totalLosses: losses.toFixed(2),
      netGains: netGains.toFixed(2),
      holdingPeriod: holdingPeriod === 'short' ? 'Short-Term (<1 year)' : holdingPeriod === 'long' ? 'Long-Term (>1 year)' : 'Mixed (both ST and LT)',
      stGains: stGains.toFixed(2),
      ltGains: ltGains.toFixed(2),

      miningIncome: mining.toFixed(2),
      stakingIncome: staking.toFixed(2),
      airdropIncome: airdropIncome.toFixed(2),
      nftIncome: nftIncome.toFixed(2),
      ordinaryIncome: ordinaryIncome.toFixed(2),

      stTax: stTax.toFixed(2),
      ltTax: ltTax.toFixed(2),
      ordinaryTaxOnIncome: ordinaryTaxOnIncome.toFixed(2),
      nftTax: nftTax.toFixed(2),
      totalTax: totalTax.toFixed(2),

      exchangesTraded: exchanges.toFixed(0),
      transactionsCount: txCount.toFixed(0),

      filingStatus: filingStatus === 'single' ? 'Single' : 'Married Filing Jointly',
      taxYear: taxYear,

      needs8949,
      needsScheduleD,
      needsScheduleC,
      needsSchedule1,
      needsForm8949Separate,
      needsMultiple8949: exchanges > 1,

      underreportingPenalty: underreportingPenalty.toFixed(2),
      fraudPenalty: fraudPenalty.toFixed(2),
      lateFilingPenalty: lateFilingPenalty.toFixed(2),

      docsNeeded,
      irsReferences,

      hasGains: netGains > 0,
      hasLosses: losses > 0,
      hasIncome: ordinaryIncome > 0,
      hasNfts: nftIncome > 0,
      highTxCount: txCount > 100,
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Cryptocurrency Tax Reporting Calculator</h1>
      <p className="text-zinc-600">Calculate crypto tax reporting requirements. Understand Form 8949, Schedule D, income vs capital gains treatment, and documentation needed for IRS compliance.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Capital Gains/Losses from Crypto Sales</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Crypto Sold ($)</label>
            <input
              type="number"
              value={totalCryptoSales}
              onChange={(e) => setTotalCryptoSales(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Capital Gains ($)</label>
            <input
              type="number"
              value={totalGains}
              onChange={(e) => setTotalGains(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              Profit from selling crypto held as investment.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Capital Losses ($)</label>
            <input
              type="number"
              value={totalLosses}
              onChange={(e) => setTotalLosses(e.target.value)}
              className="input"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Holding Period</label>
            <select
              value={holdingPeriod}
              onChange={(e) => setHoldingPeriod(e.target.value)}
              className="input"
            >
              <option value="short">Short-Term (held under 1 year)</option>
              <option value="long">Long-Term (held over 1 year)</option>
              <option value="mixed">Mixed (some ST, some LT)</option>
            </select>
            <div className="text-xs text-zinc-500 mt-1">
              Long-term (12+ months) taxed at preferential 15% rate. Short-term taxed at ordinary rate.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-medium mb-2 text-yellow-700">Crypto Income (Not Capital Gains)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Mining Income ($)</label>
            <input
              type="number"
              value={miningIncome}
              onChange={(e) => setMiningIncome(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-yellow-600 mt-1">
              Taxed as ordinary income + self-employment tax. Fair market value at time received.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Staking/Reward Income ($)</label>
            <input
              type="number"
              value={stakingIncome}
              onChange={(e) => setStakingIncome(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-yellow-600 mt-1">
              Taxed as ordinary income when received. FMV at time of receipt.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Airdrop Income ($)</label>
            <input
              type="number"
              value={airdrops}
              onChange={(e) => setAirdrops(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-yellow-600 mt-1">
              New coins from airdrops/hard forks taxed as ordinary income when you have dominion.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">NFT Sales ($)</label>
            <input
              type="number"
              value={nftSales}
              onChange={(e) => setNftSales(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-yellow-600 mt-1">
              NFTs may be taxed as collectibles (28% max rate) or ordinary income. Complex rules.
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Transaction Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Number of Exchanges Used</label>
            <input
              type="number"
              value={exchangesTraded}
              onChange={(e) => setExchangesTraded(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              May need separate Form 8949 for each exchange. Keep records from all sources.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Total Transactions Count</label>
            <input
              type="number"
              value={transactionsCount}
              onChange={(e) => setTransactionsCount(e.target.value)}
              className="input"
              min="0"
            />
            <div className="text-xs text-zinc-500 mt-1">
              High transaction counts require detailed tracking. Consider crypto tax software.
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Tax Year</label>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="input"
            >
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-medium mb-2 text-blue-700">Capital Gains Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Total Crypto Sold:</span>
            <span className="font-bold ml-2">${result.totalCryptoSales}</span>
          </div>
          <div>
            <span className="text-zinc-600">Holding Period:</span>
            <span className="font-medium ml-2">{result.holdingPeriod}</span>
          </div>
          <div>
            <span className="text-zinc-600">Short-Term Gains:</span>
            <span className={`font-medium ml-2 ${parseFloat(result.stGains) > 0 ? 'text-red-600' : ''}`}>${result.stGains}</span>
          </div>
          <div>
            <span className="text-zinc-600">Long-Term Gains:</span>
            <span className={`font-medium ml-2 ${parseFloat(result.ltGains) > 0 ? 'text-green-600' : ''}`}>${result.ltGains}</span>
          </div>
          <div>
            <span className="text-zinc-600">Net Gains:</span>
            <span className={`font-bold ml-2 ${parseFloat(result.netGains) >= 0 ? 'text-red-600' : 'text-green-600'}`}>${result.netGains}</span>
          </div>
        </div>
      </div>

      {result.hasIncome && (
        <div className="card bg-orange-50 border border-orange-200">
          <h3 className="font-medium mb-2 text-orange-700">Ordinary Income from Crypto</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-600">Mining Income:</span>
              <span className="font-medium ml-2">${result.miningIncome}</span>
            </div>
            <div>
              <span className="text-zinc-600">Staking Income:</span>
              <span className="font-medium ml-2">${result.stakingIncome}</span>
            </div>
            <div>
              <span className="text-zinc-600">Airdrop Income:</span>
              <span className="font-medium ml-2">${result.airdropIncome}</span>
            </div>
            <div>
              <span className="text-zinc-600">Total Ordinary Income:</span>
              <span className="font-bold ml-2">${result.ordinaryIncome}</span>
            </div>
          </div>
          <div className="text-xs text-orange-600 mt-2">
            Income from mining/staking/airdrops taxed as ordinary income (10-37%), not capital gains.
          </div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Tax Estimate</h3>
        <div className="text-2xl font-bold text-red-800">${result.totalTax}</div>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <span className="text-zinc-600">ST Capital Gains Tax:</span>
            <span className="font-medium ml-2">${result.stTax}</span>
          </div>
          <div>
            <span className="text-zinc-600">LT Capital Gains Tax:</span>
            <span className="font-medium ml-2">${result.ltTax}</span>
          </div>
          {result.hasIncome && (
            <div>
              <span className="text-zinc-600">Ordinary Income Tax:</span>
              <span className="font-medium ml-2">${result.ordinaryTaxOnIncome}</span>
            </div>
          )}
          {result.hasNfts && (
            <div>
              <span className="text-zinc-600">NFT Tax:</span>
              <span className="font-medium ml-2">${result.nftTax}</span>
            </div>
          )}
        </div>
        <div className="text-xs text-red-600 mt-2">
          Estimate only. Consult tax professional. Rates vary based on total income and bracket.
        </div>
      </div>

      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-medium mb-2 text-green-700">Forms Required</h3>
        <div className="space-y-2 text-sm">
          {result.needs8949 && (
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Form 8949:</strong> Report each crypto sale with date, proceeds, cost basis, gain/loss</span>
            </div>
          )}
          {result.needsScheduleD && (
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Schedule D:</strong> Summary of capital gains/losses from Form 8949</span>
            </div>
          )}
          {result.needsSchedule1 && (
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Schedule 1:</strong> Additional income from staking/airdrops</span>
            </div>
          )}
          {result.needsScheduleC && (
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              <span><strong>Schedule C:</strong> Mining as self-employment business + SE tax</span>
            </div>
          )}
        </div>
        {result.needsMultiple8949 && (
          <div className="text-xs text-green-600 mt-2">
            Multiple exchanges may require separate Form 8949 pages for each source.
          </div>
        )}
      </div>

      {result.highTxCount && (
        <div className="card bg-purple-50 border border-purple-200">
          <h3 className="font-medium mb-2 text-purple-700">High Transaction Warning</h3>
          <div className="text-sm text-purple-600">
            {result.transactionsCount} transactions require detailed tracking. Consider crypto tax software (CoinTracker, Koinly, CryptoTrader.Tax) to auto-import and calculate gains/losses.
          </div>
        </div>
      )}

      <div className="card bg-red-50 border border-red-200">
        <h3 className="font-medium mb-2 text-red-700">Non-Reporting Penalties</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-600">Underreporting (20%):</span>
            <span className="font-bold ml-2 text-red-700">${result.underreportingPenalty}</span>
          </div>
          <div>
            <span className="text-zinc-600">Fraud (75% max):</span>
            <span className="font-bold ml-2 text-red-700">${result.fraudPenalty}</span>
          </div>
          <div>
            <span className="text-zinc-600">Late Filing (5%/mo):</span>
            <span className="font-medium ml-2">${result.lateFilingPenalty}</span>
          </div>
        </div>
        <div className="text-xs text-red-600 mt-2">
          IRS actively pursues crypto non-reporting. Exchange data shared with IRS since 2019.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Documentation Needed</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.docsNeeded.map((doc, i) => (
            <li key={i}>{doc}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">IRS Guidance References</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          {result.irsReferences.map((ref, i) => (
            <li key={i}>{ref}</li>
          ))}
        </ul>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Crypto Tax Key Points</h3>
        <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4">
          <li><strong>Property Treatment:</strong> Crypto is property, not currency. Every sale/trade is taxable event.</li>
          <li><strong>Cost Basis:</strong> Track USD value at acquisition. FIFO, specific ID, or other methods allowed.</li>
          <li><strong>Like-Kind Exchange:</strong> NOT allowed between different cryptos. Each crypto-to-crypto trade is taxable.</li>
          <li><strong>Income vs Gains:</strong> Mining/staking/airdrops = ordinary income. Selling = capital gains/losses.</li>
          <li><strong>Holding Period:</strong> 12+ months for preferential LT rates (0-20%). Under 12 months = ST (10-37%).</li>
          <li><strong>Wash Sales:</strong> Debateable if applies to crypto. Conservative: assume it does. Avoid same crypto within 30 days.</li>
          <li><strong>Hard Forks:</strong> New coins from fork = ordinary income when you have dominion (Rev Rul 2019-24).</li>
          <li><strong>NFTs:</strong> May be collectibles (28% max) or ordinary income. Depends on nature and holding period.</li>
          <li><strong>DeFi:</strong> Complex. Lending interest = income. Liquidity pools = multiple taxable events.</li>
        </ul>
      </div>
    </main>
  )
}