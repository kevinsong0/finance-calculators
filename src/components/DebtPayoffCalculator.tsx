'use client'

import { useEffect, useMemo, useRef, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type PayoffResult = {
  months: number;
  interest: number;
  totalPaid: number;
};

function calculatePayoff(balance: number, annualRate: number, monthlyPayment: number): PayoffResult | null {
  if (balance <= 0 || monthlyPayment <= 0) return null;

  const monthlyRate = annualRate / 100 / 12;
  let remaining = balance;
  let totalInterest = 0;
  let months = 0;

  while (remaining > 0 && months < 1200) {
    const interest = remaining * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    if (principalPayment <= 0) return null;

    totalInterest += interest;
    remaining = Math.max(remaining + interest - monthlyPayment, 0);
    months += 1;
  }

  if (remaining > 0) return null;
  return {
    months,
    interest: totalInterest,
    totalPaid: balance + totalInterest,
  };
}

export default function DebtPayoffCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [balance, setBalance] = useState(25000);
  const [apr, setApr] = useState(18.9);
  const [monthlyPayment, setMonthlyPayment] = useState(700);
  const [extraPayment, setExtraPayment] = useState(150);

  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  const base = useMemo(
    () => calculatePayoff(balance, apr, monthlyPayment),
    [balance, apr, monthlyPayment]
  );

  const acceleratedPayment = Math.max(monthlyPayment + extraPayment, 0);
  const accelerated = useMemo(
    () => calculatePayoff(balance, apr, acceleratedPayment),
    [balance, apr, acceleratedPayment]
  );

  const markInteraction = () => {
    hasInteractionRef.current = true;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hasInteractionRef.current) return;
    if (balance <= 0 || apr < 0 || monthlyPayment <= 0) return;
    if (!accelerated) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [balance, apr, monthlyPayment, extraPayment].join('|');
      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'debt_payoff_calculator',
        lead_type: 'calculation',
        debt_balance: Number(balance.toFixed(2)),
        apr_percent: Number(apr.toFixed(2)),
        monthly_payment: Number(monthlyPayment.toFixed(2)),
        extra_payment: Number(extraPayment.toFixed(2)),
        projected_payoff_months: accelerated.months,
        page_path: window.location.pathname,
      });
    }, 450);

    return () => {
      if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    };
  }, [balance, apr, monthlyPayment, extraPayment, accelerated]);

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Debt Payoff Calculator', zh: '债务清偿计算器' },
      subtitle: { en: 'Estimate payoff timeline and interest savings with extra monthly payments', zh: '估算还清时间，以及额外还款带来的利息节省' },
      debtBalance: { en: 'Total debt balance', zh: '债务总余额' },
      apr: { en: 'Average APR (%)', zh: '平均年化利率 (%)' },
      monthlyPayment: { en: 'Current monthly payment', zh: '当前每月还款' },
      extraPayment: { en: 'Extra monthly payment', zh: '额外每月还款' },
      baseline: { en: 'Current plan', zh: '当前方案' },
      accelerated: { en: 'With extra payment', zh: '加入额外还款后' },
      payoffMonths: { en: 'Payoff time', zh: '还清时间' },
      totalInterest: { en: 'Total interest', zh: '总利息' },
      totalPaid: { en: 'Total paid', zh: '总还款' },
      months: { en: 'months', zh: '个月' },
      timeSaved: { en: 'Time saved', zh: '节省时间' },
      interestSaved: { en: 'Interest saved', zh: '节省利息' },
      invalid: { en: 'Payment is too low to cover monthly interest.', zh: '当前还款额不足以覆盖当月利息。' },
      note: { en: 'Estimate only. Real payoff schedule can vary by lender fees and compounding rules.', zh: '仅供估算，实际清偿进度会受机构费用和计息规则影响。' },
    };
    return texts[key]?.[locale] || key;
  };

  const formatMoney = (n: number) =>
    new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: locale === 'zh' ? 'CNY' : 'USD',
      maximumFractionDigits: 0,
    }).format(n);

  const monthsSaved = base && accelerated ? Math.max(base.months - accelerated.months, 0) : 0;
  const interestSaved = base && accelerated ? Math.max(base.interest - accelerated.interest, 0) : 0;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="card space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            {t('debtBalance')}
            <input type="number" value={balance} onChange={(e) => { markInteraction(); setBalance(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            {t('apr')}
            <input type="number" step={0.01} value={apr} onChange={(e) => { markInteraction(); setApr(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            {t('monthlyPayment')}
            <input type="number" value={monthlyPayment} onChange={(e) => { markInteraction(); setMonthlyPayment(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            {t('extraPayment')}
            <input type="number" value={extraPayment} onChange={(e) => { markInteraction(); setExtraPayment(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
        </section>

        <section className="card space-y-4">
          {base && accelerated ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">{t('baseline')}</div>
                  <div className="text-lg font-semibold text-zinc-700">
                    {base.months} {t('months')}
                  </div>
                </div>
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">{t('accelerated')}</div>
                  <div className="text-lg font-semibold text-primary-600">
                    {accelerated.months} {t('months')}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">{t('timeSaved')}</div>
                  <div className="text-xl font-bold text-blue-600">{monthsSaved} {t('months')}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">{t('interestSaved')}</div>
                  <div className="text-xl font-bold text-green-600">{formatMoney(interestSaved)}</div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 text-sm space-y-2">
                <p><b>{t('totalInterest')}:</b> {formatMoney(base.interest)} → {formatMoney(accelerated.interest)}</p>
                <p><b>{t('totalPaid')}:</b> {formatMoney(base.totalPaid)} → {formatMoney(accelerated.totalPaid)}</p>
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              {t('invalid')}
            </div>
          )}

          <p className="text-sm text-gray-500">{t('note')}</p>
        </section>
      </div>
    </div>
  );
}
