'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PremiumReportExport from './PremiumReportExport';

// Premium rate tables (per $1000 coverage per year) - Based on 2026 industry averages
const PREMIUM_RATES = {
  male: {
    preferredPlus: {
      10: { 25: 0.35, 30: 0.40, 35: 0.55, 40: 0.80, 45: 1.20, 50: 1.90, 55: 3.00, 60: 4.80 },
      15: { 25: 0.45, 30: 0.50, 35: 0.70, 40: 1.00, 45: 1.50, 50: 2.40, 55: 3.80, 60: 6.20 },
      20: { 25: 0.55, 30: 0.65, 35: 0.90, 40: 1.30, 45: 1.90, 50: 3.10, 55: 4.90, 60: 8.00 },
      25: { 25: 0.70, 30: 0.85, 35: 1.15, 40: 1.65, 45: 2.40, 50: 3.90, 55: 6.20, 60: 10.20 },
      30: { 25: 0.85, 30: 1.00, 35: 1.40, 40: 2.00, 45: 2.90, 50: 4.70, 55: 7.50, 60: 12.50 },
    },
    preferred: {
      10: { 25: 0.45, 30: 0.55, 35: 0.75, 40: 1.10, 45: 1.60, 50: 2.50, 55: 4.00, 60: 6.40 },
      15: { 25: 0.60, 30: 0.70, 35: 0.95, 40: 1.35, 45: 2.00, 50: 3.20, 55: 5.10, 60: 8.30 },
      20: { 25: 0.75, 30: 0.90, 35: 1.20, 40: 1.75, 45: 2.55, 50: 4.10, 55: 6.50, 60: 10.70 },
      25: { 25: 0.95, 30: 1.15, 35: 1.55, 40: 2.20, 45: 3.20, 50: 5.20, 55: 8.30, 60: 13.60 },
      30: { 25: 1.15, 30: 1.35, 35: 1.85, 40: 2.65, 45: 3.85, 50: 6.20, 55: 10.00, 60: 16.70 },
    },
    standardPlus: {
      10: { 25: 0.60, 30: 0.75, 35: 1.00, 40: 1.45, 45: 2.10, 50: 3.30, 55: 5.30, 60: 8.50 },
      15: { 25: 0.80, 30: 0.95, 35: 1.30, 40: 1.80, 45: 2.65, 50: 4.25, 55: 6.80, 60: 11.00 },
      20: { 25: 1.00, 30: 1.20, 35: 1.65, 40: 2.35, 45: 3.40, 50: 5.45, 55: 8.65, 60: 14.20 },
      25: { 25: 1.25, 30: 1.50, 35: 2.10, 40: 2.95, 45: 4.25, 50: 6.85, 55: 11.00, 60: 18.00 },
      30: { 25: 1.50, 30: 1.80, 35: 2.50, 40: 3.55, 45: 5.10, 50: 8.20, 55: 13.30, 60: 22.20 },
    },
    standard: {
      10: { 25: 0.80, 30: 1.00, 35: 1.35, 40: 1.95, 45: 2.80, 50: 4.40, 55: 7.00, 60: 11.30 },
      15: { 25: 1.05, 30: 1.30, 35: 1.75, 40: 2.40, 45: 3.55, 50: 5.65, 55: 9.00, 60: 14.70 },
      20: { 25: 1.35, 30: 1.65, 35: 2.20, 40: 3.10, 45: 4.50, 50: 7.25, 55: 11.50, 60: 18.90 },
      25: { 25: 1.70, 30: 2.05, 35: 2.80, 40: 3.90, 45: 5.65, 50: 9.10, 55: 14.60, 60: 24.00 },
      30: { 25: 2.00, 30: 2.45, 35: 3.35, 40: 4.70, 45: 6.80, 50: 10.90, 55: 17.70, 60: 29.60 },
    },
  },
  female: {
    preferredPlus: {
      10: { 25: 0.30, 30: 0.35, 35: 0.45, 40: 0.65, 45: 0.95, 50: 1.50, 55: 2.40, 60: 3.90 },
      15: { 25: 0.40, 30: 0.45, 35: 0.60, 40: 0.85, 45: 1.25, 50: 2.00, 55: 3.20, 60: 5.20 },
      20: { 25: 0.50, 30: 0.55, 35: 0.75, 40: 1.10, 45: 1.60, 50: 2.55, 55: 4.10, 60: 6.70 },
      25: { 25: 0.65, 30: 0.75, 35: 0.95, 40: 1.40, 45: 2.00, 50: 3.20, 55: 5.20, 60: 8.60 },
      30: { 25: 0.75, 30: 0.90, 35: 1.15, 40: 1.70, 45: 2.45, 50: 3.90, 55: 6.30, 60: 10.50 },
    },
    preferred: {
      10: { 25: 0.40, 30: 0.45, 35: 0.60, 40: 0.85, 45: 1.25, 50: 2.00, 55: 3.20, 60: 5.20 },
      15: { 25: 0.50, 30: 0.60, 35: 0.80, 40: 1.10, 45: 1.65, 50: 2.65, 55: 4.25, 60: 6.90 },
      20: { 25: 0.65, 30: 0.75, 35: 1.00, 40: 1.45, 45: 2.15, 50: 3.40, 55: 5.45, 60: 8.90 },
      25: { 25: 0.80, 30: 0.95, 35: 1.30, 40: 1.85, 45: 2.70, 50: 4.25, 55: 6.90, 60: 11.40 },
      30: { 25: 0.95, 30: 1.15, 35: 1.55, 40: 2.20, 45: 3.25, 50: 5.15, 55: 8.40, 60: 14.00 },
    },
    standardPlus: {
      10: { 25: 0.50, 30: 0.60, 35: 0.80, 40: 1.10, 45: 1.65, 50: 2.65, 55: 4.25, 60: 6.90 },
      15: { 25: 0.65, 30: 0.80, 35: 1.05, 40: 1.45, 45: 2.20, 50: 3.50, 55: 5.65, 60: 9.20 },
      20: { 25: 0.85, 30: 1.00, 35: 1.35, 40: 1.90, 45: 2.85, 50: 4.50, 55: 7.25, 60: 11.90 },
      25: { 25: 1.05, 30: 1.25, 35: 1.70, 40: 2.40, 45: 3.60, 50: 5.65, 55: 9.20, 60: 15.20 },
      30: { 25: 1.25, 30: 1.50, 35: 2.05, 40: 2.90, 45: 4.35, 50: 6.85, 55: 11.10, 60: 18.60 },
    },
    standard: {
      10: { 25: 0.65, 30: 0.80, 35: 1.05, 40: 1.45, 45: 2.20, 50: 3.50, 55: 5.65, 60: 9.20 },
      15: { 25: 0.85, 30: 1.05, 35: 1.40, 40: 1.90, 45: 2.90, 50: 4.65, 55: 7.50, 60: 12.30 },
      20: { 25: 1.10, 30: 1.35, 35: 1.80, 40: 2.50, 45: 3.80, 50: 6.00, 55: 9.60, 60: 16.00 },
      25: { 25: 1.40, 30: 1.70, 35: 2.25, 40: 3.15, 45: 4.80, 50: 7.60, 55: 12.20, 60: 20.40 },
      30: { 25: 1.70, 30: 2.05, 35: 2.75, 40: 3.80, 45: 5.80, 50: 9.20, 55: 14.80, 60: 25.00 },
    },
  },
};

const HEALTH_CLASS_LABELS = {
  preferredPlus: 'Preferred Plus (Excellent Health)',
  preferred: 'Preferred (Very Good Health)',
  standardPlus: 'Standard Plus (Good Health)',
  standard: 'Standard (Average Health)',
};

const TERM_LENGTHS = [10, 15, 20, 25, 30];

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

export default function TermLifeInsuranceCalculator() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [age, setAge] = useState(num(sp.get('age'), 35));
  const [gender, setGender] = useState<'male' | 'female'>(sp.get('gender') === 'female' ? 'female' : 'male');
  const [healthClass, setHealthClass] = useState<'preferredPlus' | 'preferred' | 'standardPlus' | 'standard'>(
    (sp.get('health') as keyof typeof HEALTH_CLASS_LABELS) || 'preferred'
  );
  const [coverage, setCoverage] = useState(num(sp.get('coverage'), 500000));
  const [term, setTerm] = useState(num(sp.get('term'), 20));

  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  // URL state sync
  useEffect(() => {
    const qs = new URLSearchParams({
      age: String(age),
      gender: gender,
      health: healthClass,
      coverage: String(coverage),
      term: String(term),
    });
    router.replace(`${pathname}?${qs.toString()}`, { scroll: false });
  }, [age, gender, healthClass, coverage, term, pathname, router]);

  const result = useMemo(() => {
    const rateTable = PREMIUM_RATES[gender][healthClass][term as keyof typeof PREMIUM_RATES.male.preferredPlus];
    
    type AgeKey = '25' | '30' | '35' | '40' | '45' | '50' | '55' | '60';
    const ageBuckets = (Object.keys(rateTable) as AgeKey[]).map(Number).sort((a, b) => a - b);
    let nearestAge = ageBuckets[0];
    for (const bucket of ageBuckets) {
      if (bucket <= age) nearestAge = bucket;
    }
    
    let baseRate = rateTable[String(nearestAge) as AgeKey];
    const nextBucketIdx = ageBuckets.indexOf(nearestAge) + 1;
    if (nextBucketIdx < ageBuckets.length && age > nearestAge) {
      const nextAge = ageBuckets[nextBucketIdx];
      const nextRate = rateTable[String(nextAge) as AgeKey];
      const ratio = (age - nearestAge) / (nextAge - nearestAge);
      baseRate = baseRate + (nextRate - baseRate) * ratio;
    }
    
    const annualPremium = baseRate * (coverage / 1000);
    const monthlyPremium = annualPremium / 12;
    const totalPremium = annualPremium * term;
    
    const coverageRatio = coverage / totalPremium;
    
    return {
      annualPremium,
      monthlyPremium,
      totalPremium,
      coverageRatio,
      ratePerThousand: baseRate,
    };
  }, [age, gender, healthClass, coverage, term]);

  // Lead signal tracking
  useEffect(() => {
    if (!hasInteractionRef.current) return;
    if (!Number.isFinite(age) || !Number.isFinite(coverage)) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [age, gender, healthClass, coverage, term].join('|');
      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'term_life_insurance_calculator',
        lead_type: 'insurance_quote',
        age: age,
        gender: gender,
        health_class: healthClass,
        coverage_amount: coverage,
        term_years: term,
        estimated_monthly_premium: Number(result.monthlyPremium.toFixed(2)),
        estimated_annual_premium: Number(result.annualPremium.toFixed(2)),
        page_path: window.location.pathname,
      });
    }, 450);

    return () => {
      if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    };
  }, [age, gender, healthClass, coverage, term, result]);

  const markInteraction = () => {
    hasInteractionRef.current = true;
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert('Quote link copied to clipboard!');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Term Life Insurance Calculator</h1>
        <p className="text-gray-600">Estimate your term life insurance premium based on age, health, and coverage needs.</p>
        <p className="text-sm text-gray-500 mt-2">
          <strong>Disclaimer:</strong> This calculator provides estimates only. Actual premiums vary by insurer, lifestyle factors, and medical history. Always consult with a licensed insurance agent for personalized quotes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <div className="card">
            {/* Age */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => { markInteraction(); setAge(Number(e.target.value)); }}
                min={20}
                max={65}
                className="w-full"
              />
              <div className="flex gap-2 mt-2">
                {[25, 30, 35, 40, 45, 50, 55, 60].map((a) => (
                  <button
                    key={a}
                    onClick={() => { markInteraction(); setAge(a); }}
                    className={`px-3 py-1 text-xs rounded ${age === a ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex gap-2">
                <button
                  onClick={() => { markInteraction(); setGender('male'); }}
                  className={`flex-1 px-4 py-2 rounded ${gender === 'male' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  Male
                </button>
                <button
                  onClick={() => { markInteraction(); setGender('female'); }}
                  className={`flex-1 px-4 py-2 rounded ${gender === 'female' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Health Class */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Health Class</label>
              <select
                value={healthClass}
                onChange={(e) => { markInteraction(); setHealthClass(e.target.value as keyof typeof HEALTH_CLASS_LABELS); }}
                className="w-full"
              >
                {Object.entries(HEALTH_CLASS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                <strong>Preferred Plus:</strong> No tobacco, excellent BMI, no major health issues.<br/>
                <strong>Preferred:</strong> No tobacco, good BMI, minor health history.<br/>
                <strong>Standard Plus:</strong> May have quit tobacco recently, average BMI.<br/>
                <strong>Standard:</strong> Average health profile, may include tobacco use.
              </p>
            </div>

            {/* Coverage Amount */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={coverage}
                  onChange={(e) => { markInteraction(); setCoverage(Number(e.target.value)); }}
                  step={50000}
                  min={100000}
                  max={10000000}
                  className="w-full pl-8"
                />
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {[100000, 250000, 500000, 750000, 1000000, 2000000].map((c) => (
                  <button
                    key={c}
                    onClick={() => { markInteraction(); setCoverage(c); }}
                    className={`px-3 py-1 text-xs rounded ${coverage === c ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {formatMoneyShort(c)}
                  </button>
                ))}
              </div>
            </div>

            {/* Term Length */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Term Length</label>
              <div className="flex gap-2">
                {TERM_LENGTHS.map((t) => (
                  <button
                    key={t}
                    onClick={() => { markInteraction(); setTerm(t); }}
                    className={`px-4 py-2 text-sm rounded ${term === t ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {t} yr
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Premium Summary */}
          <div className="card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Monthly Premium</div>
                <div className="text-2xl font-bold text-green-600">{formatMoney(result.monthlyPremium)}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Annual Premium</div>
                <div className="text-2xl font-bold text-blue-600">{formatMoney(result.annualPremium)}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Total ({term} Years)</div>
                <div className="text-2xl font-bold text-orange-600">{formatMoney(result.totalPremium)}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Coverage Ratio</div>
                <div className="text-2xl font-bold text-purple-600">{result.coverageRatio.toFixed(1)}x</div>
                <div className="text-xs text-gray-500">Coverage / Total Paid</div>
              </div>
            </div>

            {/* Rate Breakdown */}
            <div className="mt-4 border-t pt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Rate per $1,000:</span>
                  <span className="ml-2 font-semibold">{formatMoney(result.ratePerThousand)}/year</span>
                </div>
                <div>
                  <span className="text-gray-600">Coverage:</span>
                  <span className="ml-2 font-semibold">{formatMoneyShort(coverage)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-3 flex-wrap">
              <button onClick={copyLink} className="btn-primary">
                Copy Quote Link
              </button>
              <PremiumReportExport
                data={{
                  calculatorName: 'Term Life Insurance Calculator',
                  calculatorUrl: 'https://finance.128345827.xyz/tools/term-life-insurance-calculator',
                  inputs: [
                    { label: 'Age', value: `${age} years` },
                    { label: 'Gender', value: gender },
                    { label: 'Health Class', value: HEALTH_CLASS_LABELS[healthClass] },
                    { label: 'Coverage Amount', value: formatMoneyShort(coverage) },
                    { label: 'Term Length', value: `${term} years` },
                  ],
                  outputs: [
                    { label: 'Monthly Premium', value: formatMoney(result.monthlyPremium) },
                    { label: 'Annual Premium', value: formatMoney(result.annualPremium) },
                    { label: 'Total Premium (over term)', value: formatMoney(result.totalPremium) },
                    { label: 'Coverage Ratio', value: `${result.coverageRatio.toFixed(1)}x` },
                    { label: 'Rate per $1,000', value: `${formatMoney(result.ratePerThousand)}/year` },
                  ],
                  generatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                }}
              />
              <a 
                href="https://www.policygenius.com/life-insurance/?utm_source=finance_tools&utm_medium=calculator&utm_campaign=term_life_quote" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                onClick={() => {
                  window.gtag?.('event', 'insurance_affiliate_click', {
                    source_site: 'finance',
                    tool_name: 'term_life_insurance_calculator',
                    affiliate_partner: 'policygenius',
                    coverage_amount: coverage,
                    page_path: window.location.pathname,
                  });
                }}
              >
                Get Real Quote
              </a>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Compare Health Classes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left">Health Class</th>
                    <th className="px-3 py-2 text-right">Monthly</th>
                    <th className="px-3 py-2 text-right">Annual</th>
                    <th className="px-3 py-2 text-right">Total ({term} yr)</th>
                  </tr>
                </thead>
                <tbody>
                  {(['preferredPlus', 'preferred', 'standardPlus', 'standard'] as const).map((hc) => {
                    const rateTable = PREMIUM_RATES[gender][hc][term as keyof typeof PREMIUM_RATES.male.preferredPlus];
                    type AgeKey = '25' | '30' | '35' | '40' | '45' | '50' | '55' | '60';
                    const ageBuckets = (Object.keys(rateTable) as AgeKey[]).map(Number).sort((a, b) => a - b);
                    let nearestAge = ageBuckets[0];
                    for (const bucket of ageBuckets) {
                      if (bucket <= age) nearestAge = bucket;
                    }
                    let baseRate = rateTable[String(nearestAge) as AgeKey];
                    const nextBucketIdx = ageBuckets.indexOf(nearestAge) + 1;
                    if (nextBucketIdx < ageBuckets.length && age > nearestAge) {
                      const nextAge = ageBuckets[nextBucketIdx];
                      const nextRate = rateTable[String(nextAge) as AgeKey];
                      const ratio = (age - nearestAge) / (nextAge - nearestAge);
                      baseRate = baseRate + (nextRate - baseRate) * ratio;
                    }
                    const annual = baseRate * (coverage / 1000);
                    const monthly = annual / 12;
                    const total = annual * term;
                    const isSelected = hc === healthClass;
                    
                    return (
                      <tr key={hc} className={`border-b border-gray-100 ${isSelected ? 'bg-primary-50' : ''}`}>
                        <td className="px-3 py-2">
                          {HEALTH_CLASS_LABELS[hc]}
                          {isSelected && <span className="ml-2 text-xs text-primary-600 font-medium">(Selected)</span>}
                        </td>
                        <td className="px-3 py-2 text-right font-medium">{formatMoney(monthly)}</td>
                        <td className="px-3 py-2 text-right">{formatMoney(annual)}</td>
                        <td className="px-3 py-2 text-right">{formatMoney(total)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Premium estimates based on 2026 industry averages for non-tobacco users. Actual rates vary by insurer.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Understanding Term Life Insurance</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">What is Term Life Insurance?</h3>
                <p>Term life insurance provides coverage for a specific period (10-30 years). If you pass away during the term, your beneficiaries receive the death benefit. It's the most affordable type of life insurance.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">How Much Coverage Do I Need?</h3>
                <p>A common rule is 10-12 times your annual income. Consider: mortgage balance, children's education costs, existing debts, and 5-10 years of living expenses for your family.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">What Determines Your Health Class?</h3>
                <p>Insurers evaluate: tobacco use (past 12 months), BMI, blood pressure, cholesterol, family medical history, driving record, and occupation. Preferred Plus requires excellent metrics across all categories.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Why Are Female Rates Lower?</h3>
                <p>Statistically, women have longer life expectancies and lower mortality rates, resulting in lower premiums for the same coverage and health class.</p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Related Financial Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/tools/mortgage-calculator" className="text-primary-600 hover:underline">
                Mortgage Calculator
              </a>
              <a href="/tools/debt-payoff-calculator" className="text-primary-600 hover:underline">
                Debt Payoff Calculator
              </a>
              <a href="/tools/savings-goal-calculator" className="text-primary-600 hover:underline">
                Savings Goal Calculator
              </a>
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
                "@id": "https://finance.128345827.xyz/tools/term-life-insurance-calculator#calculator",
                "name": "Term Life Insurance Calculator",
                "description": "Estimate term life insurance premiums based on age, health class, gender, coverage amount, and term length.",
                "url": "https://finance.128345827.xyz/tools/term-life-insurance-calculator",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web Browser",
                "browserRequirements": "Requires JavaScript",
                "input": [
                  { "@type": "PropertyValueSpecification", "valueName": "age", "description": "Applicant age (20-65)" },
                  { "@type": "PropertyValueSpecification", "valueName": "gender", "description": "Male or Female" },
                  { "@type": "PropertyValueSpecification", "valueName": "healthClass", "description": "Health classification: Preferred Plus, Preferred, Standard Plus, Standard" },
                  { "@type": "PropertyValueSpecification", "valueName": "coverage", "description": "Coverage amount in USD" },
                  { "@type": "PropertyValueSpecification", "valueName": "term", "description": "Policy term length in years (10-30)" },
                ],
                "output": [
                  { "@type": "PropertyValueSpecification", "valueName": "monthlyPremium", "description": "Estimated monthly premium in USD" },
                  { "@type": "PropertyValueSpecification", "valueName": "annualPremium", "description": "Estimated annual premium in USD" },
                  { "@type": "PropertyValueSpecification", "valueName": "totalPremium", "description": "Total premium over term length" },
                ],
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is term life insurance?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Term life insurance provides coverage for a specific period (10-30 years). If you pass away during the term, your beneficiaries receive the death benefit. It's the most affordable type of life insurance."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How much term life insurance coverage do I need?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A common rule is 10-12 times your annual income. Consider your mortgage balance, children's education costs, existing debts, and 5-10 years of living expenses for your family."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What health class should I choose?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Health classes depend on tobacco use, BMI, blood pressure, cholesterol, family history, and lifestyle. Preferred Plus requires excellent health metrics. Most applicants qualify for Standard or Standard Plus."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why is my estimated premium higher than expected?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Premiums increase significantly with age. A 45-year-old pays roughly 2-3x more than a 30-year-old for the same coverage. Tobacco use, health conditions, and risky occupations also increase rates."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
                  { "@type": "ListItem", "position": 2, "name": "Term Life Insurance Calculator", "item": "https://finance.128345827.xyz/tools/term-life-insurance-calculator" }
                ]
              }
            ]
          })
        }}
      />
    </div>
  );
}