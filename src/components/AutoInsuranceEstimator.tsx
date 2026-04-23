'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const STATE_BASE_RATES: Record<string, number> = {
  california: 2200, florida: 2400, newyork: 2600, texas: 1900, ohio: 1200, 
  illinois: 1500, pennsylvania: 1400, georgia: 1800, michigan: 2800, northcarolina: 1300,
  arizona: 1700, washington: 1600, massachusetts: 1800, colorado: 1500, virginia: 1400,
  oregon: 1600, maryland: 1700, nevada: 2100, minnesota: 1400, wisconsin: 1300,
  missouri: 1400, connecticut: 1900, southcarolina: 1600, alabama: 1500, indiana: 1300,
  kansas: 1200, tennessee: 1400, utah: 1400, newjersey: 2400, louisiana: 3000,
  other: 1600,
};

const AGE_FACTORS = {
  18: 2.35, 19: 2.15, 20: 1.95, 21: 1.75, 22: 1.55, 23: 1.35, 24: 1.15,
  25: 1.00, 30: 0.90, 35: 0.85, 40: 0.80, 45: 0.75, 50: 0.72, 55: 0.70, 60: 0.68, 65: 0.70, 70: 0.80,
};

const VEHICLE_TYPE_FACTORS = {
  sedan: 1.00, suv: 1.10, truck: 1.15, sports: 1.35, luxury: 1.50, electric: 1.20,
};

const COVERAGE_LEVEL_FACTORS = {
  minimum: 0.60, standard: 1.00, full: 1.50,
};

const DRIVING_RECORD_FACTORS = {
  clean: 1.00, one_ticket: 1.15, one_accident: 1.25, both: 1.45, sr22: 1.80,
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

function getAgeFactor(age: number): number {
  const ageBuckets = Object.keys(AGE_FACTORS).map(Number).sort((a, b) => a - b);
  let nearestAge = ageBuckets[0];
  for (const bucket of ageBuckets) {
    if (bucket <= age) nearestAge = bucket;
  }
  return AGE_FACTORS[nearestAge as keyof typeof AGE_FACTORS];
}

export default function AutoInsuranceEstimator() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [age, setAge] = useState(num(sp.get('age'), 35));
  const [state, setState] = useState(sp.get('state') || 'california');
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'truck' | 'sports' | 'luxury' | 'electric'>(
    (sp.get('vehicle') as keyof typeof VEHICLE_TYPE_FACTORS) || 'sedan'
  );
  const [coverageLevel, setCoverageLevel] = useState<'minimum' | 'standard' | 'full'>(
    (sp.get('coverage') as keyof typeof COVERAGE_LEVEL_FACTORS) || 'standard'
  );
  const [drivingRecord, setDrivingRecord] = useState<'clean' | 'one_ticket' | 'one_accident' | 'both' | 'sr22'>(
    (sp.get('record') as keyof typeof DRIVING_RECORD_FACTORS) || 'clean'
  );
  const [annualMiles, setAnnualMiles] = useState(num(sp.get('miles'), 12000));
  const [gender, setGender] = useState<'male' | 'female'>(sp.get('gender') === 'female' ? 'female' : 'male');

  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  useEffect(() => {
    const qs = new URLSearchParams({
      age: String(age),
      state: state,
      vehicle: vehicleType,
      coverage: coverageLevel,
      record: drivingRecord,
      miles: String(annualMiles),
      gender: gender,
    });
    router.replace(`${pathname}?${qs.toString()}`, { scroll: false });
  }, [age, state, vehicleType, coverageLevel, drivingRecord, annualMiles, gender, pathname, router]);

  const result = useMemo(() => {
    const baseRate = STATE_BASE_RATES[state] || STATE_BASE_RATES.other;
    const ageFactor = getAgeFactor(age);
    const genderFactor = gender === 'male' ? 1.10 : 0.90;
    const vehicleFactor = VEHICLE_TYPE_FACTORS[vehicleType];
    const coverageFactor = COVERAGE_LEVEL_FACTORS[coverageLevel];
    const recordFactor = DRIVING_RECORD_FACTORS[drivingRecord];
    const mileageFactor = annualMiles > 15000 ? 1.15 : annualMiles < 8000 ? 0.90 : 1.00;

    const annualPremium = baseRate * ageFactor * genderFactor * vehicleFactor * coverageFactor * recordFactor * mileageFactor;
    const monthlyPremium = annualPremium / 12;
    const sixMonthPremium = annualPremium / 2;

    const breakdown = {
      baseRate,
      ageAdjustment: baseRate * (ageFactor - 1),
      genderAdjustment: baseRate * ageFactor * (genderFactor - 1),
      vehicleAdjustment: baseRate * ageFactor * genderFactor * (vehicleFactor - 1),
      coverageAdjustment: baseRate * ageFactor * genderFactor * vehicleFactor * (coverageFactor - 1),
      recordAdjustment: baseRate * ageFactor * genderFactor * vehicleFactor * coverageFactor * (recordFactor - 1),
      mileageAdjustment: baseRate * ageFactor * genderFactor * vehicleFactor * coverageFactor * recordFactor * (mileageFactor - 1),
    };

    return { annualPremium, monthlyPremium, sixMonthPremium, breakdown };
  }, [age, state, vehicleType, coverageLevel, drivingRecord, annualMiles, gender]);

  useEffect(() => {
    if (!hasInteractionRef.current) return;
    if (!Number.isFinite(age) || !Number.isFinite(annualMiles)) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [age, state, vehicleType, coverageLevel, drivingRecord, annualMiles, gender].join('|');
      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'auto_insurance_estimator',
        lead_type: 'insurance_quote',
        age: age,
        state: state,
        vehicle_type: vehicleType,
        coverage_level: coverageLevel,
        driving_record: drivingRecord,
        annual_miles: annualMiles,
        gender: gender,
        estimated_monthly_premium: Number(result.monthlyPremium.toFixed(2)),
        estimated_annual_premium: Number(result.annualPremium.toFixed(2)),
        page_path: window.location.pathname,
      });
    }, 450);

    return () => {
      if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    };
  }, [age, state, vehicleType, coverageLevel, drivingRecord, annualMiles, gender, result]);

  const markInteraction = () => {
    hasInteractionRef.current = true;
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert('Quote link copied to clipboard!');
  };

  const getCoverageDescription = () => {
    if (coverageLevel === 'minimum') {
      return 'State minimum liability only. No collision or comprehensive coverage.';
    }
    if (coverageLevel === 'standard') {
      return 'Standard liability + collision + comprehensive. Recommended for most drivers.';
    }
    return 'Full coverage with higher limits, lower deductibles, and additional protections.';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Auto Insurance Cost Estimator</h1>
        <p className="text-gray-600">Estimate your car insurance premium based on location, age, vehicle, and driving history.</p>
        <p className="text-sm text-gray-500 mt-2">
          <strong>Disclaimer:</strong> This calculator provides estimates based on 2026 industry averages. Actual premiums vary significantly by insurer, specific vehicle model, credit history, and other factors not captured here.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => { markInteraction(); setAge(Number(e.target.value)); }}
                min={18}
                max={85}
                className="w-full"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {[18, 21, 25, 30, 35, 40, 50, 60, 70].map((a) => (
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
              <p className="text-xs text-gray-500 mt-1">
                States with higher accident rates and insurance requirements have higher premiums.
              </p>
            </div>

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
              <p className="text-xs text-gray-500 mt-1">Statistically, male drivers have higher premiums.</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(['sedan', 'suv', 'truck', 'sports', 'luxury', 'electric'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => { markInteraction(); setVehicleType(v); }}
                    className={`px-3 py-2 text-sm rounded ${vehicleType === v ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Level</label>
              <select
                value={coverageLevel}
                onChange={(e) => { markInteraction(); setCoverageLevel(e.target.value as keyof typeof COVERAGE_LEVEL_FACTORS); }}
                className="w-full"
              >
                <option value="minimum">Minimum (Liability Only)</option>
                <option value="standard">Standard (Recommended)</option>
                <option value="full">Full Coverage</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">{getCoverageDescription()}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Driving Record</label>
              <select
                value={drivingRecord}
                onChange={(e) => { markInteraction(); setDrivingRecord(e.target.value as keyof typeof DRIVING_RECORD_FACTORS); }}
                className="w-full"
              >
                <option value="clean">Clean (No violations)</option>
                <option value="one_ticket">One speeding ticket</option>
                <option value="one_accident">One at-fault accident</option>
                <option value="both">Both ticket and accident</option>
                <option value="sr22">SR-22 required</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Miles Driven</label>
              <input
                type="number"
                value={annualMiles}
                onChange={(e) => { markInteraction(); setAnnualMiles(Number(e.target.value)); }}
                min={1000}
                max={50000}
                step={1000}
                className="w-full"
              />
              <div className="flex gap-2 mt-2">
                {[8000, 12000, 15000, 20000].map((m) => (
                  <button
                    key={m}
                    onClick={() => { markInteraction(); setAnnualMiles(m); }}
                    className={`px-3 py-1 text-xs rounded ${annualMiles === m ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {formatMoneyShort(m)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Monthly</div>
                <div className="text-2xl font-bold text-green-600">{formatMoney(result.monthlyPremium)}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">6-Month</div>
                <div className="text-2xl font-bold text-blue-600">{formatMoney(result.sixMonthPremium)}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Annual</div>
                <div className="text-2xl font-bold text-orange-600">{formatMoney(result.annualPremium)}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">State Avg</div>
                <div className="text-2xl font-bold text-purple-600">{formatMoneyShort(STATE_BASE_RATES[state] || STATE_BASE_RATES.other)}</div>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold mb-3">Premium Breakdown</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base rate for {STATE_LABELS[state]}:</span>
                  <span className="font-medium">{formatMoneyShort(result.breakdown.baseRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age adjustment ({age} years):</span>
                  <span className={result.breakdown.ageAdjustment > 0 ? 'text-red-600' : 'text-green-600'}>
                    {result.breakdown.ageAdjustment > 0 ? '+' : ''}{formatMoneyShort(result.breakdown.ageAdjustment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender ({gender}):</span>
                  <span className={result.breakdown.genderAdjustment > 0 ? 'text-red-600' : 'text-green-600'}>
                    {result.breakdown.genderAdjustment > 0 ? '+' : ''}{formatMoneyShort(result.breakdown.genderAdjustment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle ({vehicleType}):</span>
                  <span className={result.breakdown.vehicleAdjustment > 0 ? 'text-red-600' : 'text-green-600'}>
                    {result.breakdown.vehicleAdjustment > 0 ? '+' : ''}{formatMoneyShort(result.breakdown.vehicleAdjustment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coverage ({coverageLevel}):</span>
                  <span className={result.breakdown.coverageAdjustment > 0 ? 'text-red-600' : 'text-green-600'}>
                    {result.breakdown.coverageAdjustment > 0 ? '+' : ''}{formatMoneyShort(result.breakdown.coverageAdjustment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Driving record:</span>
                  <span className={result.breakdown.recordAdjustment > 0 ? 'text-red-600' : 'text-green-600'}>
                    {result.breakdown.recordAdjustment > 0 ? '+' : ''}{formatMoneyShort(result.breakdown.recordAdjustment)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button onClick={copyLink} className="btn-primary">Copy Quote Link</button>
              <a 
                href="https://www.geico.com/?utm_source=finance_tools&utm_medium=calculator&utm_campaign=auto_quote" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                onClick={() => {
                  window.gtag?.('event', 'insurance_affiliate_click', {
                    source_site: 'finance',
                    tool_name: 'auto_insurance_estimator',
                    affiliate_partner: 'geico',
                    state: state,
                    page_path: window.location.pathname,
                  });
                }}
              >
                Get Real Quote
              </a>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Compare Coverage Levels</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left">Coverage</th>
                    <th className="px-3 py-2 text-right">Monthly</th>
                    <th className="px-3 py-2 text-right">Annual</th>
                    <th className="px-3 py-2 text-left">Includes</th>
                  </tr>
                </thead>
                <tbody>
                  {(['minimum', 'standard', 'full'] as const).map((c) => {
                    const coverageFactor = COVERAGE_LEVEL_FACTORS[c];
                    const baseRate = STATE_BASE_RATES[state] || STATE_BASE_RATES.other;
                    const ageFactor = getAgeFactor(age);
                    const genderFactor = gender === 'male' ? 1.10 : 0.90;
                    const vehicleFactor = VEHICLE_TYPE_FACTORS[vehicleType];
                    const recordFactor = DRIVING_RECORD_FACTORS[drivingRecord];
                    const mileageFactor = annualMiles > 15000 ? 1.15 : annualMiles < 8000 ? 0.90 : 1.00;
                    
                    const annual = baseRate * ageFactor * genderFactor * vehicleFactor * coverageFactor * recordFactor * mileageFactor;
                    const monthly = annual / 12;
                    const isSelected = c === coverageLevel;
                    
                    const includesDesc = c === 'minimum' 
                      ? 'Liability only (state minimum)'
                      : c === 'standard' 
                      ? 'Liability + Collision + Comprehensive'
                      : 'Full coverage + Higher limits + Extras';
                    
                    return (
                      <tr key={c} className={`border-b border-gray-100 ${isSelected ? 'bg-primary-50' : ''}`}>
                        <td className="px-3 py-2">
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                          {isSelected && <span className="ml-2 text-xs text-primary-600 font-medium">(Selected)</span>}
                        </td>
                        <td className="px-3 py-2 text-right font-medium">{formatMoney(monthly)}</td>
                        <td className="px-3 py-2 text-right">{formatMoney(annual)}</td>
                        <td className="px-3 py-2 text-xs text-gray-600">{includesDesc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Understanding Auto Insurance Factors</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Why Does Age Matter?</h3>
                <p>Young drivers (under 25) have statistically higher accident rates, leading to premiums up to 2x higher. Rates stabilize around age 25 and decrease until age 60-65.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">How State Affects Premium</h3>
                <p>Michigan, Louisiana, and Florida have the highest rates due to accident frequency, uninsured drivers, and insurance regulations. Ohio, Wisconsin, and Maine typically have lower premiums.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">What Coverage Do You Need?</h3>
                <p>Minimum coverage only satisfies legal requirements but leaves you vulnerable. Standard coverage (recommended) protects your vehicle and provides adequate liability. Full coverage adds higher limits and extras like rental reimbursement.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Driving Record Impact</h3>
                <p>A single speeding ticket can increase premiums by 15-20%. An at-fault accident typically raises rates by 25-40%. SR-22 requirements (for serious violations) can double your premium.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Related Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/tools/auto-loan-calculator" className="text-primary-600 hover:underline">Auto Loan Calculator</a>
              <a href="/tools/term-life-insurance-calculator" className="text-primary-600 hover:underline">Term Life Insurance</a>
              <a href="/tools/mortgage-calculator" className="text-primary-600 hover:underline">Mortgage Calculator</a>
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
                "@id": "https://finance.128345827.xyz/tools/auto-insurance-estimator#calculator",
                "name": "Auto Insurance Cost Estimator",
                "description": "Estimate car insurance premiums based on state, age, vehicle type, driving record, and coverage level.",
                "url": "https://finance.128345827.xyz/tools/auto-insurance-estimator",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web Browser",
                "browserRequirements": "Requires JavaScript",
                "input": [
                  { "@type": "PropertyValueSpecification", "valueName": "state", "description": "US state (30 states supported)" },
                  { "@type": "PropertyValueSpecification", "valueName": "age", "description": "Driver age (18-85)" },
                  { "@type": "PropertyValueSpecification", "valueName": "vehicleType", "description": "Vehicle type: sedan, SUV, truck, sports, luxury, electric" },
                  { "@type": "PropertyValueSpecification", "valueName": "coverageLevel", "description": "Coverage: minimum, standard, full" },
                  { "@type": "PropertyValueSpecification", "valueName": "drivingRecord", "description": "Driving history: clean, one ticket, one accident, both, SR-22" },
                ],
                "output": [
                  { "@type": "PropertyValueSpecification", "valueName": "monthlyPremium", "description": "Estimated monthly premium in USD" },
                  { "@type": "PropertyValueSpecification", "valueName": "annualPremium", "description": "Estimated annual premium in USD" },
                  { "@type": "PropertyValueSpecification", "valueName": "breakdown", "description": "Premium breakdown by factor" },
                ],
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How much does car insurance cost per month?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Average car insurance costs $150-250/month for standard coverage. Young drivers may pay $300-500/month. Premiums vary significantly by state, age, vehicle, and driving history."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What factors affect car insurance premiums most?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The biggest factors are: age (young drivers pay 2x more), location (Michigan/Louisiana are highest), driving record (tickets raise rates 15-25%), vehicle type (sports/luxury cars cost more), and coverage level."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Should I get minimum or full coverage?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Minimum coverage only if your car is old (worth less than $3,000). Standard coverage for most drivers. Full coverage for newer vehicles, leased cars, or if you want maximum protection."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://finance.128345827.xyz" },
                  { "@type": "ListItem", "position": 2, "name": "Auto Insurance Estimator", "item": "https://finance.128345827.xyz/tools/auto-insurance-estimator" }
                ]
              }
            ]
          })
        }}
      />
    </div>
  );
}