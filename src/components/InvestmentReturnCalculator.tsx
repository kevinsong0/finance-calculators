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

function calculateInvestment(
  initial: number,
  monthly: number,
  rate: number,
  years: number
) {
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const schedule = [];

  let balance = initial;
  let totalContributions = initial;

  for (let m = 1; m <= months; m++) {
    balance = balance * (1 + monthlyRate) + monthly;
    totalContributions += monthly;

    schedule.push({
      month: m,
      year: Math.ceil(m / 12),
      balance: Math.round(balance),
      contributions: Math.round(totalContributions),
      earnings: Math.round(balance - totalContributions),
    });
  }

  const finalBalance = balance;
  const totalEarnings = finalBalance - totalContributions;

  return { finalBalance, totalContributions, totalEarnings, schedule };
}

export default function InvestmentReturnCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  const result = useMemo(
    () => calculateInvestment(initial, monthly, rate, years),
    [initial, monthly, rate, years]
  );

  const chartData = useMemo(() => {
    if (!result?.schedule) return [];
    return result.schedule.filter((_, i) => i % 12 === 0 || i === result.schedule.length - 1);
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

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [initial, monthly, rate, years].join('|');
      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'investment_return_calculator',
        lead_type: 'calculation',
        initial_investment: initial,
        monthly_contribution: monthly,
        expected_rate: rate,
        investment_years: years,
        page_path: window.location.pathname,
      });
    }, 450);

    return () => { if (leadTimerRef.current) clearTimeout(leadTimerRef.current); };
  }, [initial, monthly, rate, years]);

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Investment Return Calculator', zh: '投资回报计算器' },
      subtitle: { en: 'Project your investment growth over time', zh: '预测您的投资增长' },
      initial: { en: 'Initial Investment', zh: '初始投资' },
      monthly: { en: 'Monthly Contribution', zh: '每月投入' },
      rate: { en: 'Expected Annual Return (%)', zh: '预期年回报率 (%)' },
      years: { en: 'Investment Period', zh: '投资期限' },
      finalBalance: { en: 'Final Balance', zh: '最终余额' },
      totalContributions: { en: 'Total Contributions', zh: '总投入' },
      totalEarnings: { en: 'Investment Earnings', zh: '投资收益' },
      yearsLabel: { en: 'years', zh: '年' },
      chartTitle: { en: 'Growth Over Time', zh: '增长曲线' },
      balance: { en: 'Balance', zh: '余额' },
      contributions: { en: 'Contributions', zh: '投入' },
      earnings: { en: 'Earnings', zh: '收益' },
      year: { en: 'Year', zh: '年' },
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
          <div className="card">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('initial')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={initial}
                  onChange={(e) => { markInteraction(); setInitial(Number(e.target.value)); }}
                  className="w-full pl-8"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[5000, 10000, 25000, 50000].map((v) => (
                  <button key={v} onClick={() => { markInteraction(); setInitial(v); }} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                    ${v / 1000}k
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('monthly')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={monthly}
                  onChange={(e) => { markInteraction(); setMonthly(Number(e.target.value)); }}
                  className="w-full pl-8"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[100, 500, 1000, 2000].map((v) => (
                  <button key={v} onClick={() => { markInteraction(); setMonthly(v); }} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                    ${v}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('rate')}</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => { markInteraction(); setRate(Number(e.target.value)); }}
                step={0.5}
                className="w-full"
              />
              <div className="flex gap-2 mt-2">
                {[4, 6, 8, 10, 12].map((r) => (
                  <button key={r} onClick={() => { markInteraction(); setRate(r); }} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('years')}</label>
              <select value={years} onChange={(e) => { markInteraction(); setYears(Number(e.target.value)); }}>
                {[5, 10, 15, 20, 25, 30].map((y) => (
                  <option key={y} value={y}>{y} {t('yearsLabel')}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('finalBalance')}</div>
                <div className="text-2xl font-bold text-primary-600">{formatMoney(result.finalBalance)}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('totalContributions')}</div>
                <div className="text-2xl font-bold text-green-600">{formatMoney(result.totalContributions)}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('totalEarnings')}</div>
                <div className="text-2xl font-bold text-blue-600">{formatMoney(result.totalEarnings)}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">{t('chartTitle')}</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
                  <Tooltip formatter={(value: number) => formatMoney(value)} />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} name={t('balance')} />
                  <Line type="monotone" dataKey="contributions" stroke="#10b981" strokeWidth={2} name={t('contributions')} />
                  <Line type="monotone" dataKey="earnings" stroke="#f59e0b" strokeWidth={2} name={t('earnings')} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}