'use client'

import { useState, useMemo, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
} from 'recharts';

function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundFrequency: number,
  monthlyContribution: number
) {
  const schedule = [];
  let balance = principal;
  let totalContributions = principal;
  let totalInterest = 0;

  for (let year = 1; year <= years; year++) {
    const startBalance = balance;
    const yearContributions = monthlyContribution * 12;
    totalContributions += yearContributions;

    for (let period = 0; period < compoundFrequency; period++) {
      const periodRate = annualRate / 100 / compoundFrequency;
      balance += balance * periodRate;
    }
    totalInterest += balance - startBalance - yearContributions;
    balance += yearContributions;

    schedule.push({
      year,
      startBalance,
      contributions: yearContributions,
      interestEarned: balance - startBalance - yearContributions,
      endBalance: balance,
    });
  }

  const effectiveRate = Math.pow(1 + annualRate / 100 / compoundFrequency, compoundFrequency) - 1;

  return {
    finalBalance: balance,
    totalContributions,
    totalInterest,
    effectiveRate: effectiveRate * 100,
    schedule,
  };
}

export default function CompoundInterestCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [compoundFreq, setCompoundFreq] = useState(12);
  const [monthlyContribution, setMonthlyContribution] = useState(500);

  const result = useMemo(
    () => calculateCompoundInterest(principal, rate, years, compoundFreq, monthlyContribution),
    [principal, rate, years, compoundFreq, monthlyContribution]
  );

  const chartData = useMemo(
    () => result.schedule.map(s => ({
      year: s.year,
      balance: Math.round(s.endBalance),
      contributions: Math.round(s.startBalance + s.contributions),
      interest: Math.round(s.interestEarned),
    })),
    [result]
  );

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

  // 翻译
  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Compound Interest Calculator', zh: '复利计算器' },
      subtitle: { en: 'Visualize the power of compound interest over time', zh: '见证复利的力量，看您的财富如何随时间增长' },
      principal: { en: 'Initial Principal', zh: '初始本金' },
      rate: { en: 'Annual Interest Rate (%)', zh: '年利率 (%)' },
      term: { en: 'Investment Term', zh: '投资期限' },
      compound: { en: 'Compound Frequency', zh: '复利频率' },
      monthly: { en: 'Monthly Contribution', zh: '每月追加' },
      annually: { en: 'Annually', zh: '每年' },
      semiannually: { en: 'Semi-annually', zh: '半年' },
      quarterly: { en: 'Quarterly', zh: '每季度' },
      monthlyFreq: { en: 'Monthly', zh: '每月' },
      daily: { en: 'Daily', zh: '每天' },
      years: { en: 'years', zh: '年' },
      finalBalance: { en: 'Final Balance', zh: '最终余额' },
      totalContributions: { en: 'Total Contributions', zh: '累计投入' },
      totalInterest: { en: 'Total Interest Earned', zh: '累计收益' },
      effectiveRate: { en: 'Effective Annual Rate', zh: '有效年利率' },
      returnPercent: { en: 'return', zh: '回报率' },
      chartTitle: { en: 'Growth Over Time', zh: '财富增长曲线' },
      contributionsChart: { en: 'Contributions', zh: '投入' },
      interestChart: { en: 'Interest', zh: '收益' },
      balanceChart: { en: 'Balance', zh: '余额' },
      knowledgeTitle: { en: 'The Power of Compound Interest', zh: '复利的力量' },
      rule72: { en: 'Rule of 72', zh: '72法则' },
      rule72Desc: { en: 'Divide 72 by your interest rate to estimate years to double. At 8% interest, your money doubles in approximately 9 years.', zh: '用72除以年利率，即可估算翻倍所需年数。年利率8%时，约9年翻倍。' },
      frequencyTitle: { en: 'Compound Frequency Matters', zh: '复利频率的影响' },
      frequencyDesc: { en: 'More frequent compounding means more growth. Daily compounding yields slightly more than monthly.', zh: '复利频率越高，收益越多。日复利比月复利略高，但在常规利率下差距不大。' },
      startTitle: { en: 'Start Early', zh: '尽早开始' },
      startDesc: { en: 'Time is your greatest ally. Starting 10 years earlier can mean 2-3x more wealth at retirement.', zh: '时间是最强大的杠杆。提前10年开始，退休时财富可能翻2-3倍，即使投入更少。' },
    };
    return texts[key]?.[locale] || key;
  };

  const frequencyOptions = [
    { value: 1, label: t('annually') },
    { value: 2, label: t('semiannually') },
    { value: 4, label: t('quarterly') },
    { value: 12, label: t('monthlyFreq') },
    { value: 365, label: t('daily') },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 输入 */}
        <div className="lg:col-span-1">
          <div className="card space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('principal')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full pl-8" />
              </div>
              <div className="flex gap-2 mt-2">
                {[1000, 5000, 10000, 50000].map((v) => (
                  <button key={v} onClick={() => setPrincipal(v)} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                    ${formatMoneyShort(v)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('rate')}</label>
              <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} step={0.5} className="w-full" />
              <div className="flex gap-2 mt-2">
                {[3, 5, 7, 10, 12].map((r) => (
                  <button key={r} onClick={() => setRate(r)} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">{r}%</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('term')}</label>
              <select value={years} onChange={(e) => setYears(Number(e.target.value))}>
                {[5, 10, 15, 20, 25, 30, 40].map((y) => (
                  <option key={y} value={y}>{y} {t('years')}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('compound')}</label>
              <select value={compoundFreq} onChange={(e) => setCompoundFreq(Number(e.target.value))}>
                {frequencyOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('monthly')}</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full pl-8" />
              </div>
              <div className="flex gap-2 mt-2">
                {[0, 100, 500, 1000].map((v) => (
                  <button key={v} onClick={() => setMonthlyContribution(v)} className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">
                    ${v}/mo
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 结果 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('finalBalance')}</div>
                <div className="text-2xl font-bold text-primary-600">{formatMoney(result.finalBalance)}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('totalContributions')}</div>
                <div className="text-2xl font-bold text-blue-600">{formatMoney(result.totalContributions)}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('totalInterest')}</div>
                <div className="text-2xl font-bold text-green-600">{formatMoney(result.totalInterest)}</div>
                <div className="text-xs text-gray-500 mt-1">{Math.round((result.totalInterest / result.totalContributions) * 100)}% {t('returnPercent')}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{t('effectiveRate')}</div>
                <div className="text-2xl font-bold text-purple-600">{result.effectiveRate.toFixed(2)}%</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">{t('chartTitle')}</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tickFormatter={(v) => `${locale === 'en' ? 'Year' : '年'} ${v}`} />
                  <YAxis tickFormatter={(v) => `$${formatMoneyShort(v)}`} />
                  <Tooltip formatter={(value: number) => formatMoney(value)} labelFormatter={(label) => `${locale === 'en' ? 'Year' : '年'} ${label}`} />
                  <Legend />
                  <Area type="monotone" dataKey="contributions" name={t('contributionsChart')} fill="#3b82f6" fillOpacity={0.3} stroke="#3b82f6" />
                  <Bar dataKey="interest" name={t('interestChart')} fill="#10b981" fillOpacity={0.6} />
                  <Line type="monotone" dataKey="balance" name={t('balanceChart')} stroke="#f59e0b" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">{t('knowledgeTitle')}</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('rule72')}</h3>
                <p>{t('rule72Desc')}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('frequencyTitle')}</h3>
                <p>{t('frequencyDesc')}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{t('startTitle')}</h3>
                <p>{t('startDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}