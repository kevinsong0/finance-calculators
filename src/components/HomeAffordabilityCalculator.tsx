'use client'

import { useState, useMemo, useEffect, useRef } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function calculateAffordability(
  income: number,
  downPayment: number,
  rate: number,
  monthlyDebts: number,
  propertyTax: number,
  insurance: number
) {
  const monthlyIncome = income / 12;

  // 28% rule for housing
  const maxHousingPayment = monthlyIncome * 0.28;
  // 36% rule for total debt
  const maxTotalPayment = monthlyIncome * 0.36 - monthlyDebts;

  const maxPayment = Math.min(maxHousingPayment, maxTotalPayment);

  const monthlyRate = rate / 100 / 12;
  const months = 360; // 30 years

  // Calculate max loan amount from payment
  const maxLoanAmount = maxPayment * ((Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months)));

  // Subtract tax and insurance from available payment
  const availableForPiti = maxPayment - propertyTax / 12 - insurance / 12;
  const maxLoanFromPiti = availableForPiti > 0
    ? availableForPiti * ((Math.pow(1 + monthlyRate, months) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, months)))
    : 0;

  const maxHomePrice = Math.min(maxLoanAmount, maxLoanFromPiti) + downPayment;
  const monthlyPayment = Math.min(maxPayment, availableForPiti + propertyTax / 12 + insurance / 12);

  return {
    maxHomePrice: Math.round(maxHomePrice),
    maxLoanAmount: Math.round(Math.min(maxLoanAmount, maxLoanFromPiti)),
    monthlyPayment: Math.round(monthlyPayment),
    downPaymentPercent: Math.round((downPayment / maxHomePrice) * 100) || 20,
  };
}

export default function HomeAffordabilityCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [income, setIncome] = useState(80000);
  const [downPayment, setDownPayment] = useState(50000);
  const [rate, setRate] = useState(6.5);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [propertyTax, setPropertyTax] = useState(3600);
  const [insurance, setInsurance] = useState(1200);
  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const result = useMemo(
    () => calculateAffordability(income, downPayment, rate, monthlyDebts, propertyTax, insurance),
    [income, downPayment, rate, monthlyDebts, propertyTax, insurance]
  );

  const formatMoney = (n: number) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n);
  };

  const markInteraction = () => { hasInteractionRef.current = true; };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hasInteractionRef.current) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'home_affordability_calculator',
        lead_type: 'calculation',
        income,
        down_payment: downPayment,
        rate,
        page_path: window.location.pathname,
      });
    }, 450);

    return () => { if (leadTimerRef.current) clearTimeout(leadTimerRef.current); };
  }, [income, downPayment, rate, monthlyDebts, propertyTax, insurance]);

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Home Affordability Calculator', zh: '房屋负担能力计算器' },
      subtitle: { en: 'Find out how much home you can afford based on your finances', zh: '根据您的财务状况计算可负担的房价' },
      income: { en: 'Annual Income', zh: '年收入' },
      downPayment: { en: 'Down Payment', zh: '首付' },
      rate: { en: 'Interest Rate (%)', zh: '利率 (%)' },
      monthlyDebts: { en: 'Monthly Debt Payments', zh: '每月债务还款' },
      propertyTax: { en: 'Annual Property Tax', zh: '年房产税' },
      insurance: { en: 'Annual Insurance', zh: '年保险费' },
      maxHomePrice: { en: 'Maximum Home Price', zh: '最高房价' },
      maxLoan: { en: 'Maximum Loan', zh: '最高贷款额' },
      monthlyPayment: { en: 'Monthly Payment', zh: '月还款' },
      downPaymentPercent: { en: 'Down Payment %', zh: '首付比例' },
      rules28: { en: '28% Rule: Housing should not exceed 28% of gross income', zh: '28%规则: 房贷不应超过收入的28%' },
      rules36: { en: '36% Rule: Total debt should not exceed 36% of gross income', zh: '36%规则: 总债务不应超过收入的36%' },
    };
    return texts[key]?.[locale] || key;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('income')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input type="number" value={income} onChange={(e) => { markInteraction(); setIncome(Number(e.target.value)); }} className="w-full pl-8" />
              </div>
              <div className="flex gap-2 mt-2">
                {[50000, 80000, 120000, 150000].map((v) => (
                  <button key={v} onClick={() => { markInteraction(); setIncome(v); }} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                    ${v / 1000}k
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('downPayment')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input type="number" value={downPayment} onChange={(e) => { markInteraction(); setDownPayment(Number(e.target.value)); }} className="w-full pl-8" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('rate')}</label>
              <input type="number" value={rate} onChange={(e) => { markInteraction(); setRate(Number(e.target.value)); }} step={0.5} className="w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('monthlyDebts')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input type="number" value={monthlyDebts} onChange={(e) => { markInteraction(); setMonthlyDebts(Number(e.target.value)); }} className="w-full pl-8" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('propertyTax')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input type="number" value={propertyTax} onChange={(e) => { markInteraction(); setPropertyTax(Number(e.target.value)); }} className="w-full pl-8" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('insurance')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input type="number" value={insurance} onChange={(e) => { markInteraction(); setInsurance(Number(e.target.value)); }} className="w-full pl-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('maxHomePrice')}</div>
                <div className="text-2xl font-bold text-primary-600">{formatMoney(result.maxHomePrice)}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('maxLoan')}</div>
                <div className="text-2xl font-bold text-green-600">{formatMoney(result.maxLoanAmount)}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('monthlyPayment')}</div>
                <div className="text-2xl font-bold text-orange-600">{formatMoney(result.monthlyPayment)}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('downPaymentPercent')}</div>
                <div className="text-2xl font-bold text-blue-600">{result.downPaymentPercent}%</div>
              </div>
            </div>
          </div>

          <div className="card bg-blue-50">
            <div className="space-y-2 text-sm text-gray-600">
              <p>💡 {t('rules28')}</p>
              <p>💡 {t('rules36')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}