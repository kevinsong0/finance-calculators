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

// 房贷计算核心逻辑
function calculateMortgage(
  principal: number,
  annualRate: number,
  months: number,
  method: 'equal-interest' | 'equal-principal'
) {
  const monthlyRate = annualRate / 100 / 12;

  if (method === 'equal-interest') {
    // 等额本息
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    const schedule = [];
    let remainingPrincipal = principal;
    for (let i = 1; i <= months; i++) {
      const interest = remainingPrincipal * monthlyRate;
      const principalPaid = monthlyPayment - interest;
      remainingPrincipal -= principalPaid;
      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPaid,
        interest: interest,
        remaining: Math.max(0, remainingPrincipal),
      });
    }

    return { monthlyPayment, totalPayment, totalInterest, schedule };
  } else {
    // 等额本金
    const principalPerMonth = principal / months;
    const schedule = [];
    let totalInterest = 0;
    let remainingPrincipal = principal;

    for (let i = 1; i <= months; i++) {
      const interest = remainingPrincipal * monthlyRate;
      const payment = principalPerMonth + interest;
      totalInterest += interest;
      remainingPrincipal -= principalPerMonth;
      schedule.push({
        month: i,
        payment,
        principal: principalPerMonth,
        interest,
        remaining: Math.max(0, remainingPrincipal),
      });
    }

    const firstMonthPayment = principalPerMonth + principal * monthlyRate;
    const lastMonthPayment = principalPerMonth + principalPerMonth * monthlyRate;
    const totalPayment = principal + totalInterest;

    return {
      monthlyPayment: firstMonthPayment,
      lastMonthPayment,
      totalPayment,
      totalInterest,
      schedule,
    };
  }
}

export default function MortgageCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [principal, setPrincipal] = useState(300000);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(6.5);
  const [method, setMethod] = useState<'equal-interest' | 'equal-principal'>('equal-interest');
  const [showEarlyPay, setShowEarlyPay] = useState(false);
  const [earlyPayMonth, setEarlyPayMonth] = useState(12);
  const [earlyPayAmount, setEarlyPayAmount] = useState(50000);
  const [earlyPayMethod, setEarlyPayMethod] = useState<'reduce-term' | 'reduce-payment'>('reduce-term');
  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  const months = years * 12;
  const result = useMemo(() => calculateMortgage(principal, rate, months, method), [principal, rate, months, method]);

  // 提前还款计算
  const earlyPayResult = useMemo(() => {
    if (!showEarlyPay || !result.schedule) return null;
    const remainingAtMonth = result.schedule[earlyPayMonth - 1]?.remaining || 0;
    const newPrincipal = remainingAtMonth - earlyPayAmount;
    if (newPrincipal <= 0) return null;

    const originalRemainingInterest = result.schedule.slice(earlyPayMonth).reduce((sum, s) => sum + s.interest, 0);
    const monthlyRate = rate / 100 / 12;

    const newMonths = earlyPayMethod === 'reduce-term' ? Math.ceil(newPrincipal / result.schedule[0].principal) : months - earlyPayMonth;
    const newMonthlyPayment = (newPrincipal * monthlyRate * Math.pow(1 + monthlyRate, newMonths)) /
      (Math.pow(1 + monthlyRate, newMonths) - 1);
    const newTotalInterest = newMonthlyPayment * newMonths - newPrincipal;

    return {
      newPrincipal,
      newMonths,
      newMonthlyPayment,
      savedInterest: originalRemainingInterest - newTotalInterest,
    };
  }, [showEarlyPay, result, earlyPayMonth, earlyPayAmount, earlyPayMethod, rate, months]);

  const chartData = useMemo(() => {
    if (!result.schedule) return [];
    return result.schedule
      .filter((_, i) => i % 12 === 0 || i === result.schedule.length - 1)
      .map(s => ({
        year: Math.ceil(s.month / 12),
        payment: Math.round(s.payment),
        principal: Math.round(s.principal),
        interest: Math.round(s.interest),
        remaining: Math.round(s.remaining),
      }));
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

  const markInteraction = () => {
    hasInteractionRef.current = true;
  };

  const updatePrincipal = (value: number) => {
    markInteraction();
    setPrincipal(value);
  };

  const updateYears = (value: number) => {
    markInteraction();
    setYears(value);
  };

  const updateRate = (value: number) => {
    markInteraction();
    setRate(value);
  };

  const updateMethod = (value: 'equal-interest' | 'equal-principal') => {
    markInteraction();
    setMethod(value);
  };

  const toggleEarlyPay = () => {
    markInteraction();
    setShowEarlyPay((prev) => !prev);
  };

  const updateEarlyPayMonth = (value: number) => {
    markInteraction();
    setEarlyPayMonth(value);
  };

  const updateEarlyPayAmount = (value: number) => {
    markInteraction();
    setEarlyPayAmount(value);
  };

  const updateEarlyPayMethod = (value: 'reduce-term' | 'reduce-payment') => {
    markInteraction();
    setEarlyPayMethod(value);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hasInteractionRef.current) return;
    if (!Number.isFinite(principal) || !Number.isFinite(rate) || !Number.isFinite(years)) return;
    if (principal <= 0 || rate <= 0 || years <= 0) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [
        principal,
        years,
        rate,
        method,
        showEarlyPay ? 1 : 0,
        earlyPayMonth,
        earlyPayAmount,
        earlyPayMethod,
      ].join('|');

      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'mortgage_calculator',
        lead_type: 'calculation',
        loan_amount: principal,
        interest_rate: rate,
        term_years: years,
        payment_method: method,
        has_early_pay: showEarlyPay,
        page_path: window.location.pathname,
      });
    }, 450);

    return () => {
      if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    };
  }, [principal, years, rate, method, showEarlyPay, earlyPayMonth, earlyPayAmount, earlyPayMethod]);

  // 翻译文本
  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Mortgage Calculator', zh: '房贷计算器' },
      subtitle: { en: 'Calculate monthly payments, total interest, and early repayment strategies', zh: '计算月供、总利息，分析提前还款策略' },
      loanAmount: { en: 'Loan Amount', zh: '贷款金额' },
      interestRate: { en: 'Interest Rate (%)', zh: '利率 (%)' },
      loanTerm: { en: 'Loan Term', zh: '贷款期限' },
      years: { en: 'years', zh: '年' },
      paymentMethod: { en: 'Payment Method', zh: '还款方式' },
      equalInterest: { en: 'Equal Payment (Amortization)', zh: '等额本息' },
      equalPrincipal: { en: 'Equal Principal', zh: '等额本金' },
      equalInterestDesc: { en: 'Fixed monthly payment, suitable for stable income', zh: '每月还款金额固定，适合收入稳定人群' },
      equalPrincipalDesc: { en: 'Decreasing payment, higher initial pressure but less total interest', zh: '每月还款金额递减，前期压力大但总利息少' },
      monthlyPayment: { en: 'Monthly Payment', zh: '每月还款' },
      firstPayment: { en: 'First Payment', zh: '首月还款' },
      lastPayment: { en: 'Last Payment', zh: '末月还款' },
      totalInterest: { en: 'Total Interest', zh: '支付利息' },
      totalPayment: { en: 'Total Payment', zh: '还款总额' },
      earlyPayTitle: { en: 'Early Repayment Analysis', zh: '提前还款分析' },
      earlyPayMonth: { en: 'Repayment Month', zh: '提前还款时间' },
      earlyPayAmount: { en: 'Early Repayment Amount', zh: '提前还款金额' },
      earlyPayMethod: { en: 'Treatment Method', zh: '处理方式' },
      reduceTerm: { en: 'Reduce Term', zh: '缩短年限' },
      reducePayment: { en: 'Reduce Payment', zh: '减少月供' },
      savedInterest: { en: 'Interest Saved', zh: '节省利息' },
      newTerm: { en: 'New Term', zh: '新期限' },
      newPayment: { en: 'New Payment', zh: '新月供' },
      remainingPrincipal: { en: 'Remaining Principal', zh: '剩余本金' },
      chartTitle: { en: 'Payment Trend', zh: '还款趋势' },
      balance: { en: 'Balance', zh: '剩余本金' },
      paymentChart: { en: 'Payment', zh: '月供' },
      year: { en: 'Year', zh: '年' },
      knowledgeTitle: { en: 'Mortgage Knowledge', zh: '房贷还款知识' },
      knowledgeMethods: { en: 'Choosing Between Payment Methods', zh: '等额本息与等额本金的选择' },
      knowledgeMethodsDesc: { en: 'Equal payment suits stable income. Equal principal suits higher current income, saves 10-20% total interest.', zh: '等额本息适合收入稳定人群。等额本金适合当前收入较高者，总利息少约10%-20%。' },
      knowledgeEarlyPay: { en: 'Best Time for Early Repayment', zh: '提前还款的最佳时机' },
      knowledgeEarlyPayDesc: { en: 'Most effective in first 1/3 of term when interest ratio is highest. After halfway, savings are limited.', zh: '在贷款前期（1/3之前）提前还款效果最好。超过一半期限后，节省利息有限。' },
      knowledgeRates: { en: 'Fixed vs Adjustable Rates', zh: '固定利率与浮动利率' },
      knowledgeRatesDesc: { en: 'Fixed rates provide stability. Adjustable rates start lower but can increase.', zh: '固定利率提供还款稳定性。浮动利率初期较低但可能上涨。' },
    };
    return texts[key]?.[locale] || key;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 输入区 */}
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
                {[100000, 300000, 500000, 750000].map((v) => (
                  <button
                    key={v}
                    onClick={() => updatePrincipal(v)}
                    className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                  >
                    ${formatMoneyShort(v)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('interestRate')}</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => updateRate(Number(e.target.value))}
                step={0.125}
                className="w-full"
              />
              <div className="flex gap-2 mt-2">
                {[5.5, 6.0, 6.5, 7.0, 7.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => updateRate(r)}
                    className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                  >
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('paymentMethod')}</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateMethod('equal-interest')}
                  className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                    method === 'equal-interest' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t('equalInterest')}
                </button>
                <button
                  onClick={() => updateMethod('equal-principal')}
                  className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                    method === 'equal-principal' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t('equalPrincipal')}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {method === 'equal-interest' ? t('equalInterestDesc') : t('equalPrincipalDesc')}
              </p>
            </div>

            {/* 提前还款 */}
            <div className="border-t pt-4">
              <button
                onClick={toggleEarlyPay}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <svg className={`w-4 h-4 transition-transform ${showEarlyPay ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {t('earlyPayTitle')}
              </button>
              {showEarlyPay && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('earlyPayMonth')}</label>
                    <input type="number" value={earlyPayMonth} onChange={(e) => updateEarlyPayMonth(Number(e.target.value))} className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('earlyPayAmount')}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input type="number" value={earlyPayAmount} onChange={(e) => updateEarlyPayAmount(Number(e.target.value))} className="w-full pl-8" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('earlyPayMethod')}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => updateEarlyPayMethod('reduce-term')}
                        className={`py-2 px-3 rounded-lg text-sm transition-colors ${earlyPayMethod === 'reduce-term' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {t('reduceTerm')}
                      </button>
                      <button
                        onClick={() => updateEarlyPayMethod('reduce-payment')}
                        className={`py-2 px-3 rounded-lg text-sm transition-colors ${earlyPayMethod === 'reduce-payment' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {t('reducePayment')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 结果区 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{method === 'equal-interest' ? t('monthlyPayment') : t('firstPayment')}</div>
                <div className="text-2xl font-bold text-primary-600">{formatMoney(result.monthlyPayment)}</div>
                {method === 'equal-principal' && result.lastMonthPayment && (
                  <div className="text-xs text-gray-500 mt-1">{t('lastPayment')}: {formatMoney(result.lastMonthPayment)}</div>
                )}
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

            {showEarlyPay && earlyPayResult && (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold mb-3 text-green-600">{t('earlyPayTitle')}</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">{t('savedInterest')}</div>
                    <div className="text-xl font-bold text-green-600">{formatMoney(earlyPayResult.savedInterest)}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">{earlyPayMethod === 'reduce-term' ? t('newTerm') : t('newPayment')}</div>
                    <div className="text-xl font-bold text-blue-600">
                      {earlyPayMethod === 'reduce-term' ? `${earlyPayResult.newMonths} ${locale === 'en' ? 'months' : '个月'}` : formatMoney(earlyPayResult.newMonthlyPayment)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 mb-1">{t('remainingPrincipal')}</div>
                    <div className="text-xl font-bold text-gray-800">{formatMoney(earlyPayResult.newPrincipal)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 图表 */}
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
                  <Area type="monotone" dataKey="remaining" name={t('balance')} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  <Line type="monotone" dataKey="payment" name={t('paymentChart')} stroke="#10b981" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 知识科普 */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">{t('knowledgeTitle')}</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('knowledgeMethods')}</h3>
                <p>{t('knowledgeMethodsDesc')}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('knowledgeEarlyPay')}</h3>
                <p>{t('knowledgeEarlyPayDesc')}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('knowledgeRates')}</h3>
                <p>{t('knowledgeRatesDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
