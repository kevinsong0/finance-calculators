'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FPL_2026: Record<number, number> = {
  1: 15060, 2: 20440, 3: 25820, 4: 31200, 5: 36580, 6: 41960, 7: 47340, 8: 52720,
};

const FPL_ADDITIONAL = 5380;

const AGE_RATING_FACTORS = {
  0: 0.14, 1: 0.14, 2: 0.14, 3: 0.14, 4: 0.14, 5: 0.14, 6: 0.14, 7: 0.14, 8: 0.14,
  9: 0.14, 10: 0.14, 11: 0.14, 12: 0.14, 13: 0.14, 14: 0.27, 15: 0.27, 16: 0.27,
  17: 0.27, 18: 0.27, 19: 0.27, 20: 0.35, 21: 1.00, 22: 1.00, 23: 1.00, 24: 1.00,
  25: 1.00, 26: 1.00, 27: 1.02, 28: 1.04, 29: 1.06, 30: 1.08, 31: 1.10, 32: 1.12,
  33: 1.14, 34: 1.16, 35: 1.18, 36: 1.20, 37: 1.22, 38: 1.24, 39: 1.26, 40: 1.27,
  41: 1.28, 42: 1.29, 43: 1.30, 44: 1.31, 45: 1.32, 46: 1.33, 47: 1.34, 48: 1.35,
  49: 1.36, 50: 1.37, 51: 1.38, 52: 1.39, 53: 1.40, 54: 1.41, 55: 1.42, 56: 1.43,
  57: 1.44, 58: 1.45, 59: 1.46, 60: 1.47, 61: 1.50, 62: 1.53, 63: 1.56, 64: 1.60,
};

const INCOME_CONTRIBUTION_CAPS = [
  { min: 100, max: 150, cap: 0.020 },
  { min: 150, max: 200, cap: 0.040 },
  { min: 200, max: 250, cap: 0.063 },
  { min: 250, max: 300, cap: 0.083 },
  { min: 300, max: 400, cap: 0.098 },
];

const STATE_BENCHMARK_RATES: Record<string, number> = {
  california: 420, florida: 380, newyork: 520, texas: 340, ohio: 280,
  illinois: 320, pennsylvania: 300, georgia: 290, michigan: 350, northcarolina: 310,
  arizona: 330, washington: 400, massachusetts: 450, colorado: 350, virginia: 320,
  oregon: 380, maryland: 340, nevada: 360, minnesota: 320, wisconsin: 280,
  missouri: 260, connecticut: 420, southcarolina: 280, alabama: 270, indiana: 290,
  kansas: 250, tennessee: 270, utah: 280, newjersey: 480, louisiana: 300,
  other: 350,
};

const STATE_LIST = [
  'california', 'florida', 'newyork', 'texas', 'ohio', 'illinois', 'pennsylvania',
  'georgia', 'michigan', 'northcarolina', 'arizona', 'washington', 'massachusetts',
  'colorado', 'virginia', 'oregon', 'maryland', 'nevada', 'minnesota', 'wisconsin',
  'missouri', 'connecticut', 'southcarolina', 'alabama', 'indiana', 'kansas',
  'tennessee', 'utah', 'newjersey', 'louisiana', 'other',
];

const STATE_LABELS: Record<string, string> = {
  california: 'California', florida: 'Florida', newyork: 'New York', texas: 'Texas',
  ohio: 'Ohio', illinois: 'Illinois', pennsylvania: 'Pennsylvania', georgia: 'Georgia',
  michigan: 'Michigan', northcarolina: 'North Carolina', arizona: 'Arizona',
  washington: 'Washington', massachusetts: 'Massachusetts', colorado: 'Colorado',
  virginia: 'Virginia', oregon: 'Oregon', maryland: 'Maryland', nevada: 'Nevada',
  minnesota: 'Minnesota', wisconsin: 'Wisconsin', missouri: 'Missouri',
  connecticut: 'Connecticut', southcarolina: 'South Carolina', alabama: 'Alabama',
  indiana: 'Indiana', kansas: 'Kansas', tennessee: 'Tennessee', utah: 'Utah',
  newjersey: 'New Jersey', louisiana: 'Louisiana', other: 'Other States',
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function num(str: string | null, fallback: number): number {
  if (!str) return fallback;
  const parsed = Number(str);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatMoney(n: number) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatMoneyShort(n: number) {
  return `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

function getFPL(householdSize: number): number {
  if (householdSize <= 8) return FPL_2026[householdSize];
  return FPL_2026[8] + (householdSize - 8) * FPL_ADDITIONAL;
}

function getIncomeCap(fplPercent: number): number {
  for (const tier of INCOME_CONTRIBUTION_CAPS) {
    if (fplPercent >= tier.min && fplPercent < tier.max) {
      return tier.cap;
    }
  }
  return 0.098;
}

function getAgeRatingFactor(age: number): number {
  type AgeKey = keyof typeof AGE_RATING_FACTORS;
  if (age <= 20) return AGE_RATING_FACTORS[0 as AgeKey];
  if (age >= 64) return AGE_RATING_FACTORS[64 as AgeKey];
  return AGE_RATING_FACTORS[age as AgeKey] || 1.00;
}

export default function ACAPremiumSubsidyCalculator() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [annualIncome, setAnnualIncome] = useState(num(sp.get('income'), 50000));
  const [householdSize, setHouseholdSize] = useState(num(sp.get('size'), 2));
  const [state, setState] = useState(sp.get('state') || 'california');
  const [primaryAge, setPrimaryAge] = useState(num(sp.get('age'), 35));
  const [spouseAge, setSpouseAge] = useState(num(sp.get('spouseAge'), 35));
  const [childrenCount, setChildrenCount] = useState(num(sp.get('children'), 0));
  const [tobaccoUse, setTobaccoUse] = useState(sp.get('tobacco') === 'true');

  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  useEffect(() => {
    const qs = new URLSearchParams({
      income: String(annualIncome),
      size: String(householdSize),
      state: state,
      age: String(primaryAge),
      spouseAge: String(spouseAge),
      children: String(childrenCount),
      tobacco: tobaccoUse ? 'true' : 'false',
    });
    router.replace(`${pathname}?${qs.toString()}`, { scroll: false });
  }, [annualIncome, householdSize, state, primaryAge, spouseAge, childrenCount, tobaccoUse, pathname, router]);

  const result = useMemo(() => {
    const fpl = getFPL(householdSize);
    const fplPercent = (annualIncome / fpl) * 100;
    const incomeCap = getIncomeCap(fplPercent);
    const maxContribution = annualIncome * incomeCap;

    const baseBenchmarkRate = STATE_BENCHMARK_RATES[state] || STATE_BENCHMARK_RATES.other;

    const adultCount = householdSize - childrenCount;
    let totalAgeRating = 0;

    if (adultCount >= 1) totalAgeRating += getAgeRatingFactor(primaryAge);
    if (adultCount >= 2) totalAgeRating += getAgeRatingFactor(spouseAge);
    totalAgeRating += childrenCount * 0.27;

    const benchmarkPremium = baseBenchmarkRate * totalAgeRating;
    const tobaccoSurcharge = tobaccoUse ? baseBenchmarkRate * 0.5 : 0;

    const totalBenchmark = benchmarkPremium + tobaccoSurcharge;
    const subsidy = Math.max(0, totalBenchmark - maxContribution);
    const yourCost = Math.max(0, totalBenchmark - subsidy);

    const isEligible = fplPercent >= 100 && fplPercent <= 400;
    const medicaidEligible = fplPercent < 100;
    const ineligible = fplPercent > 400;

    return {
      fpl,
      fplPercent,
      incomeCap,
      maxContribution,
      benchmarkPremium: totalBenchmark,
      subsidy,
      yourCost,
      isEligible,
      medicaidEligible,
      ineligible,
      baseBenchmarkRate,
      totalAgeRating,
    };
  }, [annualIncome, householdSize, state, primaryAge, spouseAge, childrenCount, tobaccoUse]);

  useEffect(() => {
    if (!hasInteractionRef.current) return;
    if (!Number.isFinite(annualIncome)) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [annualIncome, householdSize, state, primaryAge, spouseAge, childrenCount, tobaccoUse].join('|');
      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'aca_premium_subsidy_calculator',
        lead_type: 'insurance_quote',
        annual_income: annualIncome,
        household_size: householdSize,
        state: state,
        primary_age: primaryAge,
        fpl_percent: Number(result.fplPercent.toFixed(1)),
        estimated_subsidy: Number(result.subsidy.toFixed(2)),
        estimated_monthly_cost: Number(result.yourCost.toFixed(2)),
        page_path: window.location.pathname,
      });
    }, 450);

    return () => {
      if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    };
  }, [annualIncome, householdSize, state, primaryAge, spouseAge, childrenCount, tobaccoUse, result]);

  const markInteraction = () => {
    hasInteractionRef.current = true;
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert('Quote link copied to clipboard!');
  };

  const getEligibilityStatus = () => {
    if (result.medicaidEligible) {
      return { status: 'Medicaid Eligible', color: 'blue', message: 'Your income is below 100% FPL. You may qualify for Medicaid or CHIP coverage at minimal cost.' };
    }
    if (result.ineligible) {
      return { status: 'Not Eligible for Subsidy', color: 'red', message: 'Your income exceeds 400% FPL. You can still purchase marketplace plans but without premium subsidies.' };
    }
    return { status: 'ACA Subsidy Eligible', color: 'green', message: 'Your income is between 100-400% FPL. You qualify for premium tax credits.' };
  };

  const eligibility = getEligibilityStatus();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ACA Health Insurance Subsidy Calculator</h1>
        <p className="text-gray-600">Calculate your Affordable Care Act (Obamacare) premium tax credit based on income, household size, and location.</p>
        <p className="text-sm text-gray-500 mt-2">
          <strong>Disclaimer:</strong> This calculator provides estimates based on 2026 federal guidelines. Actual subsidies depend on specific plan selection, zip code rating areas, and insurer pricing. Consult healthcare.gov or a licensed agent for accurate quotes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Household Income</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => { markInteraction(); setAnnualIncome(Number(e.target.value)); }}
                  className="w-full pl-8"
                />
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {[25000, 40000, 60000, 80000, 100000, 150000].map((i) => (
                  <button
                    key={i}
                    onClick={() => { markInteraction(); setAnnualIncome(i); }}
                    className={`px-3 py-1 text-xs rounded ${annualIncome === i ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {formatMoneyShort(i)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Household Size</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <button
                    key={s}
                    onClick={() => { markInteraction(); setHouseholdSize(s); }}
                    className={`px-4 py-2 rounded ${householdSize === s ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Number of people who will be covered on your health plan.</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={state}
                onChange={(e) => { markInteraction(); setState(e.target.value); }}
                className="w-full"
              >
                {STATE_LIST.map((s) => (
                  <option key={s} value={s}>{STATE_LABELS[s]}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
              <input
                type="number"
                value={primaryAge}
                onChange={(e) => { markInteraction(); setPrimaryAge(Number(e.target.value)); }}
                min={18}
                max={65}
                className="w-full"
              />
              <div className="flex gap-2 mt-2">
                {[25, 35, 45, 55, 64].map((a) => (
                  <button
                    key={a}
                    onClick={() => { markInteraction(); setPrimaryAge(a); }}
                    className={`px-3 py-1 text-xs rounded ${primaryAge === a ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {householdSize > 1 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Age</label>
                <input
                  type="number"
                  value={spouseAge}
                  onChange={(e) => { markInteraction(); setSpouseAge(Number(e.target.value)); }}
                  min={18}
                  max={65}
                  className="w-full"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Children (under 21)</label>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((c) => (
                  <button
                    key={c}
                    onClick={() => { markInteraction(); setChildrenCount(c); }}
                    className={`px-4 py-2 rounded ${childrenCount === c ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tobacco Use</label>
              <div className="flex gap-2">
                <button
                  onClick={() => { markInteraction(); setTobaccoUse(false); }}
                  className={`flex-1 px-4 py-2 rounded ${!tobaccoUse ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  No
                </button>
                <button
                  onClick={() => { markInteraction(); setTobaccoUse(true); }}
                  className={`flex-1 px-4 py-2 rounded ${tobaccoUse ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  Yes
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Tobacco users may pay up to 50% more for premiums.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className={`card border-2 ${eligibility.color === 'green' ? 'border-green-500' : eligibility.color === 'blue' ? 'border-blue-500' : 'border-red-500'}`}>
            <div className="mb-4">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${eligibility.color === 'green' ? 'bg-green-100 text-green-800' : eligibility.color === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                {eligibility.status}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{eligibility.message}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">FPL %</div>
                <div className="text-2xl font-bold">{result.fplPercent.toFixed(0)}%</div>
                <div className="text-xs text-gray-500">Federal Poverty Level</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">FPL Threshold</div>
                <div className="text-2xl font-bold text-blue-600">{formatMoneyShort(result.fpl)}</div>
                <div className="text-xs text-gray-500">For {householdSize} people</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Your Contribution</div>
                <div className="text-2xl font-bold text-orange-600">{(result.incomeCap * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-500">Max income share</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Max Monthly</div>
                <div className="text-2xl font-bold text-purple-600">{formatMoney(result.maxContribution / 12)}</div>
                <div className="text-xs text-gray-500">You pay max</div>
              </div>
            </div>

            {result.isEligible && (
              <div className="mt-4 border-t pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Monthly Subsidy</div>
                    <div className="text-2xl font-bold text-green-600">{formatMoney(result.subsidy)}</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Benchmark Premium</div>
                    <div className="text-2xl font-bold">{formatMoney(result.benchmarkPremium)}</div>
                  </div>
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Your Cost</div>
                    <div className="text-2xl font-bold text-primary-600">{formatMoney(result.yourCost)}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Subsidy applies to the <strong>Second Lowest Cost Silver Plan</strong> in your area. Bronze plans will be cheaper; Gold plans will cost more.
                </p>
              </div>
            )}

            {!result.isEligible && !result.medicaidEligible && (
              <div className="mt-4 border-t pt-4">
                <p className="text-sm text-gray-600">
                  Without subsidy, benchmark Silver plan costs <strong>{formatMoney(result.benchmarkPremium)}/month</strong>.
                  Consider cheaper Bronze plans or check if employer coverage is available.
                </p>
              </div>
            )}

            {result.medicaidEligible && (
              <div className="mt-4 border-t pt-4">
                <p className="text-sm text-gray-600">
                  Medicaid eligibility varies by state. Some states have expanded Medicaid to cover adults up to 138% FPL.
                  Check your state&apos;s Medicaid program or visit healthcare.gov for more information.
                </p>
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <button onClick={copyLink} className="btn-primary">Copy Quote Link</button>
              <a 
                href="https://www.healthcare.gov/?utm_source=finance_tools&utm_medium=calculator&utm_campaign=aca_quote" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                onClick={() => {
                  window.gtag?.('event', 'insurance_affiliate_click', {
                    source_site: 'finance',
                    tool_name: 'aca_premium_subsidy_calculator',
                    affiliate_partner: 'healthcare_gov',
                    state: state,
                    page_path: window.location.pathname,
                  });
                }}
              >
                Visit Healthcare.gov
              </a>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Income Tier Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left">FPL Range</th>
                    <th className="px-3 py-2 text-right">Income Cap</th>
                    <th className="px-3 py-2 text-right">Your Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {INCOME_CONTRIBUTION_CAPS.map((tier, idx) => {
                    const isCurrentTier = result.fplPercent >= tier.min && result.fplPercent < tier.max;
                    const incomeRangeLow = result.fpl * (tier.min / 100);
                    const incomeRangeHigh = result.fpl * (tier.max / 100);
                    
                    return (
                      <tr key={idx} className={`border-b border-gray-100 ${isCurrentTier ? 'bg-primary-50' : ''}`}>
                        <td className="px-3 py-2">
                          {tier.min}-{tier.max}% FPL
                          {isCurrentTier && <span className="ml-2 text-xs text-primary-600 font-medium">(Your tier)</span>}
                        </td>
                        <td className="px-3 py-2 text-right">{(tier.cap * 100).toFixed(1)}% of income</td>
                        <td className="px-3 py-2 text-right text-xs text-gray-500">
                          {formatMoneyShort(incomeRangeLow)} - {formatMoneyShort(incomeRangeHigh)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Understanding ACA Subsidies</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">What is the Premium Tax Credit?</h3>
                <p>The ACA Premium Tax Credit (subsidy) reduces your monthly health insurance premium. It&apos;s based on your income relative to the Federal Poverty Level and applies to plans purchased through healthcare.gov or state exchanges.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">How is the Subsidy Calculated?</h3>
                <p>Your subsidy = Benchmark Silver Plan Premium - (Income × Contribution Cap). The benchmark is the second-lowest-cost Silver plan in your area. Your contribution cap increases as your income rises from 100% to 400% FPL.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">What Plans Does the Subsidy Apply to?</h3>
                <p>The subsidy amount is calculated using Silver plans, but can be applied to any metal tier: Bronze (cheaper for you), Silver (benchmark), Gold (more expensive), or Platinum (most expensive).</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">2026 Federal Poverty Level Guidelines</h3>
                <p>For a single person: ${FPL_2026[1].toLocaleString()}. For a family of 4: ${FPL_2026[4].toLocaleString()}. Each additional person adds ${FPL_ADDITIONAL.toLocaleString()}.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/tools/term-life-insurance-calculator" className="text-primary-600 hover:underline">Term Life Insurance</a>
              <a href="/tools/auto-insurance-estimator" className="text-primary-600 hover:underline">Auto Insurance</a>
              <a href="/tools/savings-goal-calculator" className="text-primary-600 hover:underline">Savings Goal</a>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "@id": "https://finance.128345827.xyz/tools/aca-premium-subsidy-calculator#calculator",
                "name": "ACA Health Insurance Subsidy Calculator",
                "description": "Calculate Affordable Care Act (Obamacare) premium tax credit eligibility based on income and household size.",
                "url": "https://finance.128345827.xyz/tools/aca-premium-subsidy-calculator",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web Browser",
                "browserRequirements": "Requires JavaScript",
                "input": [
                  { "@type": "PropertyValueSpecification", "valueName": "income", "description": "Annual household income in USD" },
                  { "@type": "PropertyValueSpecification", "valueName": "householdSize", "description": "Number of household members" },
                  { "@type": "PropertyValueSpecification", "valueName": "state", "description": "US state for benchmark rates" },
                  { "@type": "PropertyValueSpecification", "valueName": "age", "description": "Primary applicant age" },
                ],
                "output": [
                  { "@type": "PropertyValueSpecification", "valueName": "fplPercent", "description": "Income as percentage of Federal Poverty Level" },
                  { "@type": "PropertyValueSpecification", "valueName": "subsidy", "description": "Monthly premium tax credit in USD" },
                  { "@type": "PropertyValueSpecification", "valueName": "yourCost", "description": "Estimated monthly premium after subsidy" },
                ],
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How do ACA health insurance subsidies work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "ACA subsidies (Premium Tax Credits) reduce monthly premiums for marketplace plans. Your subsidy equals the benchmark Silver plan premium minus your required income contribution. Eligibility requires income between 100-400% of the Federal Poverty Level."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What income qualifies for ACA subsidies in 2026?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "For 2026, households with income between 100-400% FPL qualify. For a single person, that's approximately $15,060-$60,240. For a family of 4, it's approximately $31,200-$124,800."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the Federal Poverty Level for 2026?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "2026 FPL for 1 person: $15,060. For 2: $20,440. For 3: $25,820. For 4: $31,200. Each additional person adds $5,380."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
                  { "@type": "ListItem", "position": 2, "name": "ACA Health Insurance Subsidy Calculator", "item": "https://finance.128345827.xyz/tools/aca-premium-subsidy-calculator" }
                ]
              }
            ]
          })
        }}
      />
    </div>
  );
}