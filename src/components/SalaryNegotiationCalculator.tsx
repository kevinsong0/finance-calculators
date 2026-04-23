'use client'

import { useState } from 'react'

export default function SalaryNegotiationCalculator() {
  const [currentSalary, setCurrentSalary] = useState('')
  const [targetSalary, setTargetSalary] = useState('')
  const [yearsExperience, setYearsExperience] = useState('')
  const [educationLevel, setEducationLevel] = useState('bachelor')
  const [location, setLocation] = useState('')
  const [industry, setIndustry] = useState('tech')

  const calculate = () => {
    const current = parseFloat(currentSalary) || 75000
    const target = parseFloat(targetSalary) || 90000
    const years = parseInt(yearsExperience) || 5
    const education = educationLevel
    const ind = industry

    // Calculate raise percentage
    const raisePercent = ((target - current) / current) * 100

    // Market adjustment by industry (simplified)
    const industryPremiums: Record<string, number> = {
      'tech': 1.15,
      'finance': 1.12,
      'healthcare': 1.08,
      'education': 0.95,
      'retail': 0.90,
      'manufacturing': 1.0
    }
    const industryPremium = industryPremiums[ind] || 1.0

    // Education premium
    const educationPremiums: Record<string, number> = {
      'highschool': 0.85,
      'associate': 0.92,
      'bachelor': 1.0,
      'master': 1.10,
      'phd': 1.20
    }
    const educationPremium = educationPremiums[education] || 1.0

    // Experience factor
    const experiencePremium = Math.min(years * 0.03 + 1, 1.5)

    // Calculate market-based salary
    const marketSalary = current * industryPremium * educationPremium * experiencePremium

    // Negotiation range
    const minAcceptable = current * 1.05 // 5% minimum raise
    const idealTarget = Math.min(marketSalary, current * 1.20) // Max 20% at once
    const stretchTarget = current * 1.25

    // Total compensation comparison
    const benefitsValue = current * 0.30 // Approximate benefits worth 30%
    const totalCurrentComp = current + benefitsValue
    const totalTargetComp = target + benefitsValue

    // Lifetime earnings impact
    const yearsToRetirement = 65 - 30 // Assume age 30
    const lifetimeIncrease = (target - current) * yearsToRetirement

    // Annual compounding effect (raises compound)
    const compoundEffect = (target - current) * Math.pow(1.03, yearsToRetirement)

    return {
      raisePercent: raisePercent.toFixed(1),
      currentSalary: current.toFixed(2),
      targetSalary: target.toFixed(2),
      marketSalary: marketSalary.toFixed(2),
      minAcceptable: minAcceptable.toFixed(2),
      idealTarget: idealTarget.toFixed(2),
      stretchTarget: stretchTarget.toFixed(2),
      totalCurrentComp: totalCurrentComp.toFixed(2),
      totalTargetComp: totalTargetComp.toFixed(2),
      lifetimeIncrease: lifetimeIncrease.toFixed(2),
      compoundEffect: compoundEffect.toFixed(2),
      isReasonable: raisePercent >= 5 && raisePercent <= 25,
      isAboveMarket: target > marketSalary,
      yearsToRetirement
    }
  }

  const result = calculate()

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Salary Negotiation Calculator</h1>
      <p className="text-zinc-600">Calculate appropriate raise requests and lifetime earnings impact.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Current Situation</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Current Salary</label>
            <input
              type="number"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter current annual salary"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Target Salary</label>
            <input
              type="number"
              value={targetSalary}
              onChange={(e) => setTargetSalary(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter desired salary"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Years of Experience</label>
            <input
              type="number"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter years in field"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Education Level</label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="highschool">High School</option>
              <option value="associate">Associate Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD/Doctorate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="tech">Technology</option>
              <option value="finance">Finance/Banking</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="retail">Retail/Service</option>
              <option value="manufacturing">Manufacturing</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-4">Raise Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Raise Percentage</div>
            <div className={`text-2xl font-bold ${result.isReasonable ? 'text-green-600' : 'text-yellow-600'}`}>
              {result.raisePercent}%
            </div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Market-Based Salary</div>
            <div className="text-2xl font-bold">$${result.marketSalary}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Minimum Acceptable</div>
            <div className="text-lg font-bold">$${result.minAcceptable}</div>
          </div>
          <div className="bg-white rounded p-4">
            <div className="text-sm text-zinc-500">Ideal Target</div>
            <div className="text-lg font-bold">$${result.idealTarget}</div>
          </div>
        </div>
      </div>

      {result.isReasonable ? (
        <div className="card bg-green-50 border border-green-200">
          <h3 className="font-medium mb-2 text-green-700">Reasonable Request</h3>
          <div className="text-sm text-green-600">
            {result.raisePercent}% raise is within the typical 5-20% range. This request is reasonable and achievable through negotiation.
          </div>
        </div>
      ) : (
        <div className="card bg-yellow-50 border border-yellow-200">
          <h3 className="font-medium mb-2 text-yellow-700">Large Raise Request</h3>
          <div className="text-sm text-yellow-600">
            {result.raisePercent}% raise exceeds typical range. Consider: demonstrating exceptional performance, promotion justification, or phased approach.
          </div>
        </div>
      )}

      {result.isAboveMarket && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-medium mb-2 text-blue-700">Above Market Rate</h3>
          <div className="text-sm text-blue-600">
            Target $${result.targetSalary} exceeds estimated market rate $${result.marketSalary}. Prepare strong justification: specialized skills, achievements, or competing offers.
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Lifetime Earnings Impact</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Comp (Current)</div>
            <div className="font-bold">$${result.totalCurrentComp}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Total Comp (Target)</div>
            <div className="font-bold">$${result.totalTargetComp}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Lifetime Increase</div>
            <div className="font-bold text-green-600">$${result.lifetimeIncrease}</div>
          </div>
          <div className="bg-white rounded p-3">
            <div className="text-zinc-500">Compound Effect</div>
            <div className="font-bold text-green-600">$${result.compoundEffect}</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Negotiation Strategy</h3>
        <div className="space-y-2 text-xs">
          <div className="bg-white rounded p-3">
            <strong>Research Market Rates</strong>
            <div className="text-zinc-500">Use Glassdoor, Payscale, LinkedIn Salary for benchmarks</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Document Achievements</strong>
            <div className="text-zinc-500">Quantify contributions: revenue, efficiency, cost savings</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Practice Pitch</strong>
            <div className="text-zinc-500">Prepare value statement: "Based on my achievements..."</div>
          </div>
          <div className="bg-white rounded p-3">
            <strong>Negotiate Total Comp</strong>
            <div className="text-zinc-500">If salary limited, negotiate: bonus, equity, PTO, benefits</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Salary Facts</h3>
        <div className="text-xs text-zinc-600">
          Typical raises: 3-5% annual, 10-20% with promotion, 20-30% job change. Raises compound over career. 10% raise today = $200K+ lifetime gain. Negotiate at job offer, annual review, or after major achievement.
        </div>
      </div>
    </main>
  )
}