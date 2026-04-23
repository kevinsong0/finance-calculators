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

function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  rate: number,
  monthlyWithdrawal: number
) {
  const yearsToRetirement = retirementAge - currentAge;
  const monthsToRetirement = yearsToRetirement * 12;
  const monthlyRate = rate / 100 / 12;

  // Accumulation phase
  let savingsAtRetirement = currentSavings;
  for (let m = 0; m < monthsToRetirement; m++) {
    savingsAtRetirement = savingsAtRetirement * (1 + monthlyRate) + monthlyContribution;
  }

  // Withdrawal phase - how long will money last?
  const withdrawalMonthlyRate = rate / 100 / 12; // assume same return
  const withdrawalSchedule = [];
  let remaining = savingsAtRetirement;
  let withdrawalMonth = 0;

  while (remaining > 0 && withdrawalMonth < 600) {
    withdrawalMonth++;
    remaining = remaining * (1 + withdrawalMonthlyRate) - monthlyWithdrawal;
    if (remaining > 0) {
      withdrawalSchedule.push({
        month: withdrawalMonth,
        year: Math.ceil(withdrawalMonth / 12),
        remaining: Math.max(0, remaining),
      });
    }
  }

  const yearsMoneyLasts = withdrawalMonth / 12;
  const totalWithdrawals = monthlyWithdrawal * withdrawalMonth;

  return {
    savingsAtRetirement: Math.round(savingsAtRetirement),
    yearsToRetirement,
    yearsMoneyLasts: Math.round(yearsMoneyLasts),
    totalWithdrawals: Math.round(totalWithdrawals),
    withdrawalSchedule,
  };
}

export default function RetirementCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [rate, setRate] = useState(7);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(3000);
  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const result = useMemo(
    () => calculateRetirement(currentAge, retirementAge, currentSavings, monthlyContribution, rate, monthlyWithdrawal),
    [currentAge, retirementAge, currentSavings, monthlyContribution, rate, monthlyWithdrawal]
  );

  const chartData = useMemo(() => {
    if (!result?.withdrawalSchedule) return [];
    return result.withdrawalSchedule.filter((_, i) => i % 12 === 0 || i === result.withdrawalSchedule.length - 1);
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
      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'retirement_calculator',
        lead_type: 'calculation',
        current_age: currentAge,
        retirement_age: retirementAge,
        current_savings: currentSavings,
        monthly_contribution: monthlyContribution,
        page_path: window.location.pathname,
      });
    }, 450);

    return () => { if (leadTimerRef.current) clearTimeout(leadTimerRef.current); };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, rate, monthlyWithdrawal]);

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Retirement Calculator', zh: '退休计算器' },
      subtitle: { en: 'Plan your retirement savings and withdrawal timeline', zh: '规划您的退休储蓄和支出时间表' },
      currentAge: { en: 'Current Age', zh: '当前年龄' },
      retirementAge: { en: 'Retirement Age', zh: '退休年龄' },
      currentSavings: { en: 'Current Savings', zh: '当前储蓄' },
      monthlyContribution: { en: 'Monthly Contribution', zh: '每月投入' },
      rate: { en: 'Expected Return (%)', zh: '预期回报率 (%)' },
      monthlyWithdrawal: { en: 'Monthly Withdrawal', zh: '每月取款' },
      savingsAtRetirement: { en: 'Savings at Retirement', zh: '退休时储蓄' },
      yearsToRetirement: { en: 'Years to Retirement', zh: '距退休年限' },
      yearsMoneyLasts: { en: 'Years Money Lasts', zh: '资金持续年限' },
      yearsLabel: { en: 'years', zh: '年' },
      chartTitle: { en: 'Withdrawal Phase Balance', zh: '取款阶段余额' },
      remaining: { en: 'Remaining', zh: '余额' },
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
          <div className="card space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('currentAge')}</label>
              <input type="number" value={currentAge} onChange={(e) => { markInteraction(); setCurrentAge(Number(e.target.value)); }} className="w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('retirementAge')}</label>
              <select value={retirementAge} onChange={(e) => { markInteraction(); setRetirementAge(Number(e.target.value)); }}>
                {[55, 60, 65, 67, 70].map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('currentSavings')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input type="number" value={currentSavings} onChange={(e) => { markInteraction(); setCurrentSavings(Number(e.target.value)); }} className="w-full pl-8" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('monthlyContribution')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input type="number" value={monthlyContribution} onChange={(e) => { markInteraction(); setMonthlyContribution(Number(e.target.value)); }} className="w-full pl-8" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('rate')}</label>
              <input type="number" value={rate} onChange={(e) => { markInteraction(); setRate(Number(e.target.value)); }} step={0.5} className="w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('monthlyWithdrawal')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input type="number" value={monthlyWithdrawal} onChange={(e) => { markInteraction(); setMonthlyWithdrawal(Number(e.target.value)); }} className="w-full pl-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('savingsAtRetirement')}</div>
                <div className="text-2xl font-bold text-green-600">{formatMoney(result.savingsAtRetirement)}</div>
              </div>
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('yearsToRetirement')}</div>
                <div className="text-2xl font-bold text-primary-600">{result.yearsToRetirement} {t('yearsLabel')}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('yearsMoneyLasts')}</div>
                <div className="text-2xl font-bold text-blue-600">{result.yearsMoneyLasts} {t('yearsLabel')}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">{t('chartTitle')}</h2>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
                  <Tooltip formatter={(value: number) => formatMoney(value)} />
                  <Line type="monotone" dataKey="remaining" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}