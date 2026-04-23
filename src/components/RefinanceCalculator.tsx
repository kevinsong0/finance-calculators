'use client'

import { useEffect, useMemo, useRef, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function calcPayment(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

export default function RefinanceCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [currentBalance, setCurrentBalance] = useState(320000);
  const [currentRate, setCurrentRate] = useState(7.1);
  const [remainingMonths, setRemainingMonths] = useState(300);
  const [newRate, setNewRate] = useState(5.9);
  const [newTermMonths, setNewTermMonths] = useState(240);
  const [closingCosts, setClosingCosts] = useState(5500);
  const [cashOut, setCashOut] = useState(0);

  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  const currentPayment = useMemo(
    () => calcPayment(currentBalance, currentRate, remainingMonths),
    [currentBalance, currentRate, remainingMonths]
  );

  const newPrincipal = useMemo(
    () => Math.max(currentBalance + closingCosts + cashOut, 0),
    [currentBalance, closingCosts, cashOut]
  );

  const newPayment = useMemo(
    () => calcPayment(newPrincipal, newRate, newTermMonths),
    [newPrincipal, newRate, newTermMonths]
  );

  const currentRemainingInterest = useMemo(
    () => Math.max(currentPayment * remainingMonths - currentBalance, 0),
    [currentPayment, remainingMonths, currentBalance]
  );

  const newTotalInterest = useMemo(
    () => Math.max(newPayment * newTermMonths - newPrincipal, 0),
    [newPayment, newTermMonths, newPrincipal]
  );

  const monthlyDelta = currentPayment - newPayment;
  const totalSavings = currentRemainingInterest - newTotalInterest;
  const breakEvenMonths = monthlyDelta > 0 ? Math.ceil(closingCosts / monthlyDelta) : null;

  const markInteraction = () => {
    hasInteractionRef.current = true;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hasInteractionRef.current) return;
    if (currentBalance <= 0 || currentRate < 0 || newRate < 0 || remainingMonths <= 0 || newTermMonths <= 0) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [
        currentBalance,
        currentRate,
        remainingMonths,
        newRate,
        newTermMonths,
        closingCosts,
        cashOut,
      ].join('|');
      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'refinance_calculator',
        lead_type: 'calculation',
        current_balance: Number(currentBalance.toFixed(2)),
        current_rate: currentRate,
        new_rate: newRate,
        remaining_months: remainingMonths,
        new_term_months: newTermMonths,
        monthly_payment_delta: Number(monthlyDelta.toFixed(2)),
        page_path: window.location.pathname,
      });
    }, 450);

    return () => {
      if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    };
  }, [currentBalance, currentRate, remainingMonths, newRate, newTermMonths, closingCosts, cashOut, monthlyDelta]);

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Refinance Calculator', zh: '再融资计算器' },
      subtitle: { en: 'Compare current loan vs refinance option with break-even analysis', zh: '对比当前贷款与再融资方案，并计算回本周期' },
      currentBalance: { en: 'Current loan balance', zh: '当前贷款余额' },
      currentRate: { en: 'Current interest rate (%)', zh: '当前利率 (%)' },
      remainingTerm: { en: 'Remaining term (months)', zh: '剩余期限（月）' },
      newRate: { en: 'New interest rate (%)', zh: '新利率 (%)' },
      newTerm: { en: 'New term (months)', zh: '新期限（月）' },
      closingCosts: { en: 'Closing costs', zh: '过户/手续费' },
      cashOut: { en: 'Cash-out amount', zh: '套现金额' },
      currentPayment: { en: 'Current monthly payment', zh: '当前月供' },
      newPayment: { en: 'New monthly payment', zh: '新月供' },
      monthlyDelta: { en: 'Monthly payment change', zh: '月供变化' },
      lifetimeSavings: { en: 'Estimated interest savings', zh: '预计利息节省' },
      breakEven: { en: 'Break-even months', zh: '回本月数' },
      note: { en: 'Estimate only. Final refinance terms depend on lender pricing, fees, and credit profile.', zh: '仅供估算，最终再融资方案取决于机构报价、费用和信用情况。' },
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
            {t('currentBalance')}
            <input type="number" value={currentBalance} onChange={(e) => { markInteraction(); setCurrentBalance(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('currentRate')}
            <input type="number" step={0.01} value={currentRate} onChange={(e) => { markInteraction(); setCurrentRate(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('remainingTerm')}
            <input type="number" value={remainingMonths} onChange={(e) => { markInteraction(); setRemainingMonths(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('newRate')}
            <input type="number" step={0.01} value={newRate} onChange={(e) => { markInteraction(); setNewRate(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('newTerm')}
            <select value={newTermMonths} onChange={(e) => { markInteraction(); setNewTermMonths(Number(e.target.value)); }} className="w-full mt-1">
              {[120, 180, 240, 300, 360].map((m) => (
                <option key={m} value={m}>{m} {locale === 'zh' ? '个月' : 'months'}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('closingCosts')}
            <input type="number" value={closingCosts} onChange={(e) => { markInteraction(); setClosingCosts(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('cashOut')}
            <input type="number" value={cashOut} onChange={(e) => { markInteraction(); setCashOut(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
        </section>

        <section className="card">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('currentPayment')}</div>
              <div className="text-2xl font-bold text-zinc-700">{formatMoney(currentPayment)}</div>
            </div>
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('newPayment')}</div>
              <div className="text-2xl font-bold text-primary-600">{formatMoney(newPayment)}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('monthlyDelta')}</div>
              <div className={`text-2xl font-bold ${monthlyDelta >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {monthlyDelta >= 0 ? '-' : '+'}{formatMoney(Math.abs(monthlyDelta))}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('lifetimeSavings')}</div>
              <div className={`text-2xl font-bold ${totalSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatMoney(totalSavings)}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">{t('breakEven')}</div>
            <div className="text-xl font-semibold text-gray-900 mt-1">
              {breakEvenMonths ? `${breakEvenMonths} ${locale === 'zh' ? '个月' : 'months'}` : '—'}
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">{t('note')}</p>
        </section>
      </div>
    </div>
  );
}

