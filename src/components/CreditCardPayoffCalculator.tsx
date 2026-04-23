'use client'

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function calculatePayoff(balance: number, apr: number, monthlyPayment: number) {
  const monthlyRate = apr / 100 / 12;
  if (monthlyPayment <= balance * monthlyRate) return null;

  const schedule = [];
  let remaining = balance;
  let month = 0;
  let totalInterest = 0;

  while (remaining > 0) {
    month++;
    const interest = remaining * monthlyRate;
    const principalPaid = Math.min(monthlyPayment - interest, remaining);
    remaining -= principalPaid;
    totalInterest += interest;

    schedule.push({
      month,
      payment: principalPaid + interest,
      principal: principalPaid,
      interest: interest,
      remaining: Math.max(0, remaining),
    });
  }

  return { months: month, totalInterest, schedule };
}

export default function CreditCardPayoffCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(22);
  const [monthlyPayment, setMonthlyPayment] = useState(200);
  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  const result = useMemo(
    () => calculatePayoff(balance, apr, monthlyPayment),
    [balance, apr, monthlyPayment]
  );

  const chartData = useMemo(() => {
    if (!result?.schedule) return [];
    return result.schedule.filter((_, i) => i % 6 === 0 || i === result.schedule.length - 1);
  }, [result]);

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
    if (!result) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [balance, apr, monthlyPayment].join('|');
      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'credit_card_payoff_calculator',
        lead_type: 'calculation',
        balance,
        apr,
        monthly_payment: monthlyPayment,
        page_path: window.location.pathname,
      });
    }, 450);

    return () => { if (leadTimerRef.current) clearTimeout(leadTimerRef.current); };
  }, [balance, apr, monthlyPayment, result]);

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Credit Card Payoff Calculator', zh: '信用卡还款计算器' },
      subtitle: { en: 'Calculate payoff timeline and interest savings with different payment strategies', zh: '计算还清周期和利息节省' },
      balance: { en: 'Current Balance', zh: '当前余额' },
      apr: { en: 'APR (%)', zh: '年利率 (%)' },
      monthlyPayment: { en: 'Monthly Payment', zh: '每月还款' },
      payoffTime: { en: 'Payoff Time', zh: '还清时间' },
      totalInterest: { en: 'Total Interest', zh: '总利息' },
      monthlyPaymentNeeded: { en: 'Monthly Payment Needed', zh: '需要的月还款' },
      months: { en: 'months', zh: '个月' },
      years: { en: 'years', zh: '年' },
      chartTitle: { en: 'Balance Over Time', zh: '余额变化' },
      remaining: { en: 'Remaining Balance', zh: '剩余余额' },
      month: { en: 'Month', zh: '月' },
      insufficient: { en: 'Payment too low. Increase to cover interest.', zh: '还款额过低，请增加以覆盖利息' },
      tip1: { en: 'Pay more than minimum to save interest', zh: '支付超过最低还款额以节省利息' },
      tip2: { en: 'Every $50 extra saves months of payoff time', zh: '每增加$50可缩短数月还款时间' },
    };
    return texts[key]?.[locale] || key;
  };

  const recommendedPayment = balance * 0.03;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('balance')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => { markInteraction(); setBalance(Number(e.target.value)); }}
                  className="w-full pl-8"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[1000, 3000, 5000, 10000].map((v) => (
                  <button key={v} onClick={() => { markInteraction(); setBalance(v); }} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                    ${v}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('apr')}</label>
              <input
                type="number"
                value={apr}
                onChange={(e) => { markInteraction(); setApr(Number(e.target.value)); }}
                step={0.5}
                className="w-full"
              />
              <div className="flex gap-2 mt-2">
                {[15, 18, 22, 25, 30].map((r) => (
                  <button key={r} onClick={() => { markInteraction(); setApr(r); }} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('monthlyPayment')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => { markInteraction(); setMonthlyPayment(Number(e.target.value)); }}
                  className="w-full pl-8"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: {formatMoney(recommendedPayment)} (3% of balance)
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {result ? (
            <>
              <div className="card">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">{t('payoffTime')}</div>
                    <div className="text-2xl font-bold text-primary-600">
                      {Math.floor(result.months / 12)} {t('years')} {result.months % 12} {t('months')}
                    </div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">{t('totalInterest')}</div>
                    <div className="text-2xl font-bold text-orange-600">{formatMoney(result.totalInterest)}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">{t('balance')}</div>
                    <div className="text-2xl font-bold text-green-600">{formatMoney(balance)}</div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold mb-4">{t('chartTitle')}</h2>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(v) => `$${v}`} />
                      <Tooltip formatter={(value: number) => formatMoney(value)} />
                      <Line type="monotone" dataKey="remaining" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card bg-blue-50">
                <div className="space-y-2 text-sm text-gray-600">
                  <p>💡 {t('tip1')}</p>
                  <p>💡 {t('tip2')}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="card">
              <div className="text-center text-red-600 p-8">
                <p className="text-lg font-semibold">{t('insufficient')}</p>
                <p className="mt-2">{t('monthlyPaymentNeeded')}: {formatMoney(balance * (apr / 100 / 12) + 1)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}