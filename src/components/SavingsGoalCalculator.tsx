'use client'

import { useEffect, useMemo, useRef, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function calcRequiredMonthly(target: number, current: number, annualReturn: number, months: number) {
  const safeMonths = Math.max(months, 1);
  const principalGap = Math.max(target - current, 0);
  if (principalGap <= 0) return 0;
  const r = annualReturn / 100 / 12;
  if (r === 0) return principalGap / safeMonths;
  const growth = Math.pow(1 + r, safeMonths);
  return principalGap * r / (growth - 1);
}

function calcFutureValue(current: number, monthly: number, annualReturn: number, months: number) {
  const safeMonths = Math.max(months, 1);
  const r = annualReturn / 100 / 12;
  if (r === 0) return current + monthly * safeMonths;
  const growth = Math.pow(1 + r, safeMonths);
  return current * growth + monthly * ((growth - 1) / r);
}

export default function SavingsGoalCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [targetAmount, setTargetAmount] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(10000);
  const [years, setYears] = useState(5);
  const [annualReturn, setAnnualReturn] = useState(4.5);
  const [plannedMonthlyContribution, setPlannedMonthlyContribution] = useState(500);

  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  const months = Math.max(Math.round(years * 12), 1);
  const requiredMonthlyContribution = useMemo(
    () => calcRequiredMonthly(targetAmount, currentSavings, annualReturn, months),
    [targetAmount, currentSavings, annualReturn, months]
  );

  const plannedFutureValue = useMemo(
    () => calcFutureValue(currentSavings, plannedMonthlyContribution, annualReturn, months),
    [currentSavings, plannedMonthlyContribution, annualReturn, months]
  );

  const goalGap = Math.max(targetAmount - plannedFutureValue, 0);

  const markInteraction = () => {
    hasInteractionRef.current = true;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hasInteractionRef.current) return;
    if (targetAmount <= 0 || currentSavings < 0 || years <= 0) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [targetAmount, currentSavings, years, annualReturn, plannedMonthlyContribution].join('|');
      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'savings_goal_calculator',
        lead_type: 'calculation',
        target_amount: Number(targetAmount.toFixed(2)),
        current_savings: Number(currentSavings.toFixed(2)),
        years_to_goal: Number(years.toFixed(2)),
        annual_return_percent: Number(annualReturn.toFixed(2)),
        required_monthly_contribution: Number(requiredMonthlyContribution.toFixed(2)),
        page_path: window.location.pathname,
      });
    }, 450);

    return () => {
      if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    };
  }, [targetAmount, currentSavings, years, annualReturn, plannedMonthlyContribution, requiredMonthlyContribution]);

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Savings Goal Calculator', zh: '储蓄目标计算器' },
      subtitle: { en: 'Estimate how much you need to save monthly to hit your target on time', zh: '估算为达成目标金额每月需要储蓄多少' },
      targetAmount: { en: 'Target amount', zh: '目标金额' },
      currentSavings: { en: 'Current savings', zh: '当前储蓄' },
      years: { en: 'Years to goal', zh: '目标期限（年）' },
      annualReturn: { en: 'Expected annual return (%)', zh: '预计年化收益率 (%)' },
      plannedMonthly: { en: 'Planned monthly contribution', zh: '计划每月储蓄' },
      requiredMonthly: { en: 'Required monthly contribution', zh: '所需每月储蓄' },
      plannedValue: { en: 'Future value with planned contribution', zh: '按计划储蓄的到期金额' },
      goalGap: { en: 'Remaining gap to target', zh: '距离目标的差额' },
      months: { en: 'months', zh: '个月' },
      note: { en: 'Estimate only. Actual returns vary based on product fees and market conditions.', zh: '仅供估算，实际收益受费用结构和市场波动影响。' },
    };
    return texts[key]?.[locale] || key;
  };

  const formatMoney = (n: number) =>
    new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: locale === 'zh' ? 'CNY' : 'USD',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="card space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('targetAmount')}
            <input type="number" value={targetAmount} onChange={(e) => { markInteraction(); setTargetAmount(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            {t('currentSavings')}
            <input type="number" value={currentSavings} onChange={(e) => { markInteraction(); setCurrentSavings(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            {t('years')}
            <input type="number" step={0.5} value={years} onChange={(e) => { markInteraction(); setYears(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            {t('annualReturn')}
            <input type="number" step={0.1} value={annualReturn} onChange={(e) => { markInteraction(); setAnnualReturn(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            {t('plannedMonthly')}
            <input type="number" value={plannedMonthlyContribution} onChange={(e) => { markInteraction(); setPlannedMonthlyContribution(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
        </section>

        <section className="card space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('requiredMonthly')}</div>
              <div className="text-2xl font-bold text-primary-700">{formatMoney(requiredMonthlyContribution)}</div>
              <div className="text-xs text-gray-500 mt-1">{months} {t('months')}</div>
            </div>

            <div className="bg-zinc-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('plannedValue')}</div>
              <div className="text-2xl font-bold text-zinc-700">{formatMoney(plannedFutureValue)}</div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('goalGap')}</div>
              <div className="text-2xl font-bold text-blue-700">{formatMoney(goalGap)}</div>
            </div>
          </div>

          <p className="text-sm text-gray-500">{t('note')}</p>
        </section>
      </div>
    </div>
  );
}

