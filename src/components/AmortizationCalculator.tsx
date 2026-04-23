'use client'

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function calculateAmortization(
  principal: number,
  annualRate: number,
  months: number
) {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const schedule = [];
  let remainingPrincipal = principal;
  let cumulativeInterest = 0;
  let cumulativePrincipal = 0;

  for (let i = 1; i <= months; i++) {
    const interest = remainingPrincipal * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    remainingPrincipal -= principalPaid;
    cumulativeInterest += interest;
    cumulativePrincipal += principalPaid;

    schedule.push({
      month: i,
      year: Math.ceil(i / 12),
      payment: monthlyPayment,
      principal: principalPaid,
      interest: interest,
      remaining: Math.max(0, remainingPrincipal),
      cumulativeInterest,
      cumulativePrincipal,
    });
  }

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  return { monthlyPayment, totalPayment, totalInterest, schedule };
}

function calculateWithExtraPayment(
  principal: number,
  annualRate: number,
  months: number,
  extraMonthly: number
) {
  const monthlyRate = annualRate / 100 / 12;
  const basePayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = basePayment + extraMonthly;

  const schedule = [];
  let remainingPrincipal = principal;
  let cumulativeInterest = 0;
  let actualMonths = 0;

  while (remainingPrincipal > 0 && actualMonths < months * 2) {
    actualMonths++;
    const interest = remainingPrincipal * monthlyRate;
    const principalPaid = Math.min(totalPayment - interest, remainingPrincipal);
    remainingPrincipal -= principalPaid;
    cumulativeInterest += interest;

    schedule.push({
      month: actualMonths,
      payment: totalPayment,
      principal: principalPaid,
      interest: interest,
      remaining: Math.max(0, remainingPrincipal),
    });
  }

  const totalInterestPaid = cumulativeInterest;
  const savedInterest = (basePayment * months - principal) - totalInterestPaid;
  const savedMonths = months - actualMonths;

  return {
    actualMonths,
    totalPayment: basePayment,
    totalInterestPaid,
    savedInterest,
    savedMonths,
    schedule,
  };
}

export default function AmortizationCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [principal, setPrincipal] = useState(300000);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(6.5);
  const [showExtra, setShowExtra] = useState(false);
  const [extraMonthly, setExtraMonthly] = useState(200);
  const [viewMode, setViewMode] = useState<'yearly' | 'monthly'>('yearly');
  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  const months = years * 12;
  const result = useMemo(() => calculateAmortization(principal, rate, months), [principal, rate, months]);
  const extraResult = useMemo(
    () => showExtra ? calculateWithExtraPayment(principal, rate, months, extraMonthly) : null,
    [showExtra, principal, rate, months, extraMonthly]
  );

  const chartData = useMemo(() => {
    return result.schedule
      .filter((_, i) => i % 12 === 0 || i === result.schedule.length - 1)
      .map(s => ({
        year: Math.ceil(s.month / 12),
        principal: Math.round(s.cumulativePrincipal),
        interest: Math.round(s.cumulativeInterest),
        remaining: Math.round(s.remaining),
      }));
  }, [result.schedule]);

  const yearlySchedule = useMemo(() => {
    const yearly: Record<number, { year: number; payment: number; principal: number; interest: number; remaining: number }> = {};
    result.schedule.forEach(s => {
      const yr = s.year;
      if (!yearly[yr]) {
        yearly[yr] = { year: yr, payment: 0, principal: 0, interest: 0, remaining: s.remaining };
      }
      yearly[yr].payment += s.payment;
      yearly[yr].principal += s.principal;
      yearly[yr].interest += s.interest;
      yearly[yr].remaining = s.remaining;
    });
    return Object.values(yearly);
  }, [result.schedule]);

  const formatMoney = (n: number) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: locale === 'zh' ? 'CNY' : 'USD',
      maximumFractionDigits: 0,
    }).format(n);
  };

  const formatMoneyShort = (n: number) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      maximumFractionDigits: 0,
    }).format(n);
  };

  const markInteraction = () => { hasInteractionRef.current = true; };

  const updatePrincipal = (value: number) => { markInteraction(); setPrincipal(value); };
  const updateYears = (value: number) => { markInteraction(); setYears(value); };
  const updateRate = (value: number) => { markInteraction(); setRate(value); };
  const toggleExtra = () => { markInteraction(); setShowExtra(prev => !prev); };
  const updateExtraMonthly = (value: number) => { markInteraction(); setExtraMonthly(value); };
  const updateViewMode = (value: 'yearly' | 'monthly') => { markInteraction(); setViewMode(value); };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hasInteractionRef.current) return;
    if (!Number.isFinite(principal) || !Number.isFinite(rate) || !Number.isFinite(years)) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [principal, years, rate, showExtra ? 1 : 0, extraMonthly].join('|');
      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'amortization_calculator',
        lead_type: 'calculation',
        loan_amount: principal,
        interest_rate: rate,
        term_years: years,
        has_extra_payment: showExtra,
        extra_monthly: extraMonthly,
        page_path: window.location.pathname,
      });
    }, 450);

    return () => { if (leadTimerRef.current) clearTimeout(leadTimerRef.current); };
  }, [principal, years, rate, showExtra, extraMonthly]);

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Amortization Calculator', zh: '分期还款计算器' },
      subtitle: { en: 'View complete payment schedule with principal and interest breakdown', zh: '查看完整的还款计划，包括本金和利息明细' },
      loanAmount: { en: 'Loan Amount', zh: '贷款金额' },
      interestRate: { en: 'Interest Rate (%)', zh: '利率 (%)' },
      loanTerm: { en: 'Loan Term', zh: '贷款期限' },
      years: { en: 'years', zh: '年' },
      monthlyPayment: { en: 'Monthly Payment', zh: '每月还款' },
      totalInterest: { en: 'Total Interest', zh: '总利息' },
      totalPayment: { en: 'Total Payment', zh: '还款总额' },
      extraPaymentTitle: { en: 'Extra Monthly Payment', zh: '额外月还款' },
      extraPaymentAmount: { en: 'Extra Amount', zh: '额外金额' },
      savedInterest: { en: 'Interest Saved', zh: '节省利息' },
      savedMonths: { en: 'Months Saved', zh: '提前还款月数' },
      newTerm: { en: 'New Term', zh: '新期限' },
      scheduleTitle: { en: 'Amortization Schedule', zh: '还款计划表' },
      viewMode: { en: 'View', zh: '查看方式' },
      yearly: { en: 'Yearly', zh: '按年' },
      monthly: { en: 'Monthly', zh: '按月' },
      year: { en: 'Year', zh: '年' },
      month: { en: 'Month', zh: '月' },
      payment: { en: 'Payment', zh: '还款额' },
      principal: { en: 'Principal', zh: '本金' },
      interest: { en: 'Interest', zh: '利息' },
      balance: { en: 'Balance', zh: '余额' },
      chartTitle: { en: 'Cumulative Payment Breakdown', zh: '累计还款构成' },
      cumulativePrincipal: { en: 'Cumulative Principal', zh: '累计本金' },
      cumulativeInterest: { en: 'Cumulative Interest', zh: '累计利息' },
      faqTitle: { en: 'Understanding Amortization', zh: '分期还款知识' },
      faqWhatIs: { en: 'What is Amortization?', zh: '什么是分期还款？' },
      faqWhatIsDesc: { en: 'Amortization spreads loan payments over time, with each payment covering interest and principal. Early payments are mostly interest; later payments are mostly principal.', zh: '分期还款将贷款还款分散在时间内，每次还款包含利息和本金。前期还款主要是利息，后期主要是本金。' },
      faqRatio: { en: 'Principal vs Interest Ratio', zh: '本金与利息比例' },
      faqRatioDesc: { en: 'In the first years, interest dominates. For a 30-year loan, it takes about 18-20 years before principal exceeds interest in each payment.', zh: '前几年利息占主导。对于30年期贷款，大约需要18-20年后每次还款中的本金才会超过利息。' },
      faqExtra: { en: 'Benefits of Extra Payments', zh: '额外还款的好处' },
      faqExtraDesc: { en: 'Adding extra payments directly reduces principal, saving significant interest. Even $100 extra monthly can save thousands in interest and shorten loan term.', zh: '额外还款直接减少本金，节省大量利息。每月额外还款100美元可以节省数千美元利息并缩短贷款期限。' },
    };
    return texts[key]?.[locale] || key;
  };

  const displaySchedule = viewMode === 'yearly' ? yearlySchedule : result.schedule.slice(0, 60);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('loanAmount')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => updatePrincipal(Number(e.target.value))}
                  className="w-full pl-8"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[100000, 200000, 300000, 500000].map((v) => (
                  <button key={v} onClick={() => updatePrincipal(v)} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                    ${formatMoneyShort(v)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('interestRate')}</label>
              <input type="number" value={rate} onChange={(e) => updateRate(Number(e.target.value))} step={0.125} className="w-full" />
              <div className="flex gap-2 mt-2">
                {[5.0, 5.5, 6.0, 6.5, 7.0, 7.5].map((r) => (
                  <button key={r} onClick={() => updateRate(r)} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('loanTerm')}</label>
              <select value={years} onChange={(e) => updateYears(Number(e.target.value))}>
                {[10, 15, 20, 25, 30].map((y) => (
                  <option key={y} value={y}>{y} {t('years')} ({y * 12} {locale === 'en' ? 'months' : '个月'})</option>
                ))}
              </select>
            </div>

            <div className="border-t pt-4">
              <button onClick={toggleExtra} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <svg className={`w-4 h-4 transition-transform ${showExtra ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('extraPaymentTitle')}
              </button>
              {showExtra && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('extraPaymentAmount')}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input type="number" value={extraMonthly} onChange={(e) => updateExtraMonthly(Number(e.target.value))} className="w-full pl-8" />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[100, 200, 300, 500].map((v) => (
                      <button key={v} onClick={() => updateExtraMonthly(v)} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                        ${v}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('monthlyPayment')}</div>
                <div className="text-2xl font-bold text-primary-600">{formatMoney(result.monthlyPayment)}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('loanAmount')}</div>
                <div className="text-2xl font-bold text-green-600">{formatMoney(principal)}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('totalInterest')}</div>
                <div className="text-2xl font-bold text-orange-600">{formatMoney(result.totalInterest)}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('totalPayment')}</div>
                <div className="text-2xl font-bold text-purple-600">{formatMoney(result.totalPayment)}</div>
              </div>
            </div>

            {showExtra && extraResult && (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold mb-3 text-green-600">{t('extraPaymentTitle')}</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">{t('savedInterest')}</div>
                    <div className="text-xl font-bold text-green-600">{formatMoney(extraResult.savedInterest)}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">{t('savedMonths')}</div>
                    <div className="text-xl font-bold text-blue-600">{extraResult.savedMonths} {locale === 'en' ? 'months' : '个月'}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">{t('newTerm')}</div>
                    <div className="text-xl font-bold text-gray-800">{extraResult.actualMonths} {locale === 'en' ? 'months' : '个月'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">{t('chartTitle')}</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tickFormatter={(v) => `${t('year')} ${v}`} />
                  <YAxis tickFormatter={(v) => `$${formatMoneyShort(v)}`} />
                  <Tooltip formatter={(value: number) => formatMoney(value)} labelFormatter={(label) => `${t('year')} ${label}`} />
                  <Legend />
                  <Area type="monotone" dataKey="principal" name={t('cumulativePrincipal')} stroke="#10b981" fill="#10b981" fillOpacity={0.3} stackId="1" />
                  <Area type="monotone" dataKey="interest" name={t('cumulativeInterest')} stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} stackId="1" />
                  <Line type="monotone" dataKey="remaining" name={t('balance')} stroke="#3b82f6" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{t('scheduleTitle')}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => updateViewMode('yearly')}
                  className={`px-3 py-1 text-sm rounded ${viewMode === 'yearly' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
                >
                  {t('yearly')}
                </button>
                <button
                  onClick={() => updateViewMode('monthly')}
                  className={`px-3 py-1 text-sm rounded ${viewMode === 'monthly' ? 'bg-primary-600 text-white' : 'bg-gray-100'}`}
                >
                  {t('monthly')}
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2 text-left">{viewMode === 'yearly' ? t('year') : t('month')}</th>
                    <th className="px-3 py-2 text-right">{t('payment')}</th>
                    <th className="px-3 py-2 text-right">{t('principal')}</th>
                    <th className="px-3 py-2 text-right">{t('interest')}</th>
                    <th className="px-3 py-2 text-right">{t('balance')}</th>
                  </tr>
                </thead>
                <tbody>
                  {displaySchedule.slice(0, 30).map((row, idx) => {
                    const periodLabel = viewMode === 'yearly'
                      ? String((row as unknown as { year: number }).year)
                      : String((row as unknown as { month: number }).month);
                    return (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="px-3 py-2">{periodLabel}</td>
                      <td className="px-3 py-2 text-right">{formatMoney(row.payment)}</td>
                      <td className="px-3 py-2 text-right">{formatMoney(row.principal)}</td>
                      <td className="px-3 py-2 text-right">{formatMoney(row.interest)}</td>
                      <td className="px-3 py-2 text-right">{formatMoney(row.remaining)}</td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
              {viewMode === 'monthly' && result.schedule.length > 60 && (
                <p className="text-xs text-gray-500 mt-2 text-center">Showing first 60 months. Full schedule available in yearly view.</p>
              )}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">{t('faqTitle')}</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('faqWhatIs')}</h3>
                <p>{t('faqWhatIsDesc')}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('faqRatio')}</h3>
                <p>{t('faqRatioDesc')}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('faqExtra')}</h3>
                <p>{t('faqExtraDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}