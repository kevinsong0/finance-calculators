'use client'

import { useEffect, useMemo, useRef, useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function calcMonthlyPayment(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

function simulatePayoff(principal: number, annualRate: number, basePayment: number, extraPayment: number, months: number) {
  const monthlyRate = annualRate / 100 / 12;
  let remaining = principal;
  let totalInterest = 0;
  let paidMonths = 0;
  const payment = Math.max(basePayment + extraPayment, 0);

  if (payment <= 0 || principal <= 0 || months <= 0) {
    return { payoffMonths: 0, totalInterest: 0, totalPayment: 0 };
  }

  while (remaining > 0.01 && paidMonths < 1200) {
    const interest = remaining * monthlyRate;
    const principalPaid = Math.min(remaining, payment - interest);
    if (principalPaid <= 0) break;
    remaining -= principalPaid;
    totalInterest += interest;
    paidMonths += 1;
  }

  if (paidMonths === 0) {
    return { payoffMonths: 0, totalInterest: 0, totalPayment: 0 };
  }

  return {
    payoffMonths: Math.min(paidMonths, 1200),
    totalInterest,
    totalPayment: principal + totalInterest,
  };
}

export default function AutoLoanCalculator({ locale }: { locale: 'en' | 'zh' }) {
  const [vehiclePrice, setVehiclePrice] = useState(38000);
  const [downPayment, setDownPayment] = useState(6000);
  const [tradeInValue, setTradeInValue] = useState(2000);
  const [apr, setApr] = useState(6.9);
  const [termMonths, setTermMonths] = useState(60);
  const [salesTaxRate, setSalesTaxRate] = useState(7.5);
  const [fees, setFees] = useState(650);
  const [extraPayment, setExtraPayment] = useState(0);

  const hasInteractionRef = useRef(false);
  const leadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLeadSignatureRef = useRef('');

  const markInteraction = () => {
    hasInteractionRef.current = true;
  };

  const amountFinanced = useMemo(() => {
    const taxAmount = vehiclePrice * (salesTaxRate / 100);
    return Math.max(vehiclePrice + taxAmount + fees - downPayment - tradeInValue, 0);
  }, [vehiclePrice, salesTaxRate, fees, downPayment, tradeInValue]);

  const basePayment = useMemo(() => calcMonthlyPayment(amountFinanced, apr, termMonths), [amountFinanced, apr, termMonths]);
  const payoff = useMemo(
    () => simulatePayoff(amountFinanced, apr, basePayment, extraPayment, termMonths),
    [amountFinanced, apr, basePayment, extraPayment, termMonths]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hasInteractionRef.current) return;
    if (amountFinanced <= 0 || apr < 0 || termMonths <= 0) return;

    if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    leadTimerRef.current = setTimeout(() => {
      const signature = [vehiclePrice, downPayment, tradeInValue, apr, termMonths, salesTaxRate, fees, extraPayment].join('|');
      if (signature === lastLeadSignatureRef.current) return;
      lastLeadSignatureRef.current = signature;

      window.gtag?.('event', 'generate_lead_signal', {
        source_site: 'finance',
        tool_name: 'auto_loan_calculator',
        lead_type: 'calculation',
        amount_financed: Number(amountFinanced.toFixed(2)),
        apr,
        term_months: termMonths,
        monthly_payment: Number((basePayment + extraPayment).toFixed(2)),
        page_path: window.location.pathname,
      });
    }, 450);

    return () => {
      if (leadTimerRef.current) clearTimeout(leadTimerRef.current);
    };
  }, [vehiclePrice, downPayment, tradeInValue, apr, termMonths, salesTaxRate, fees, extraPayment, amountFinanced, basePayment]);

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Auto Loan Calculator', zh: '车贷计算器' },
      subtitle: { en: 'Estimate monthly payment, total interest, and payoff timeline', zh: '估算月供、总利息与还款周期' },
      vehiclePrice: { en: 'Vehicle price', zh: '车辆价格' },
      downPayment: { en: 'Down payment', zh: '首付' },
      tradeIn: { en: 'Trade-in value', zh: '置换抵扣' },
      apr: { en: 'APR (%)', zh: '年化利率 (%)' },
      term: { en: 'Loan term', zh: '贷款期限' },
      salesTax: { en: 'Sales tax (%)', zh: '销售税 (%)' },
      fees: { en: 'Fees', zh: '手续费' },
      extra: { en: 'Extra monthly payment', zh: '每月额外还款' },
      financed: { en: 'Amount financed', zh: '贷款本金' },
      monthly: { en: 'Estimated monthly payment', zh: '预计月供' },
      interest: { en: 'Estimated total interest', zh: '预计总利息' },
      total: { en: 'Estimated total paid', zh: '预计总还款' },
      payoffMonths: { en: 'Estimated payoff months', zh: '预计还清月数' },
      note: { en: 'Estimate only. Final loan offer depends on lender terms, credit profile, and dealer fees.', zh: '仅供估算，最终贷款方案取决于贷款机构、信用情况和经销商费用。' },
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
            {t('vehiclePrice')}
            <input type="number" value={vehiclePrice} onChange={(e) => { markInteraction(); setVehiclePrice(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('downPayment')}
            <input type="number" value={downPayment} onChange={(e) => { markInteraction(); setDownPayment(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('tradeIn')}
            <input type="number" value={tradeInValue} onChange={(e) => { markInteraction(); setTradeInValue(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('apr')}
            <input type="number" step={0.1} value={apr} onChange={(e) => { markInteraction(); setApr(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('term')}
            <select value={termMonths} onChange={(e) => { markInteraction(); setTermMonths(Number(e.target.value)); }} className="w-full mt-1">
              {[36, 48, 60, 72, 84].map((m) => (
                <option key={m} value={m}>{m} {locale === 'zh' ? '个月' : 'months'}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('salesTax')}
            <input type="number" step={0.1} value={salesTaxRate} onChange={(e) => { markInteraction(); setSalesTaxRate(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('fees')}
            <input type="number" value={fees} onChange={(e) => { markInteraction(); setFees(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            {t('extra')}
            <input type="number" value={extraPayment} onChange={(e) => { markInteraction(); setExtraPayment(Number(e.target.value) || 0); }} className="w-full mt-1" />
          </label>
        </section>

        <section className="card">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('financed')}</div>
              <div className="text-2xl font-bold text-primary-600">{formatMoney(amountFinanced)}</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('monthly')}</div>
              <div className="text-2xl font-bold text-blue-600">{formatMoney(basePayment + extraPayment)}</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('interest')}</div>
              <div className="text-2xl font-bold text-orange-600">{formatMoney(payoff.totalInterest)}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">{t('total')}</div>
              <div className="text-2xl font-bold text-green-600">{formatMoney(payoff.totalPayment)}</div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-600">{t('payoffMonths')}</div>
            <div className="text-xl font-semibold text-gray-900 mt-1">
              {payoff.payoffMonths > 0 ? `${payoff.payoffMonths} ${locale === 'zh' ? '个月' : 'months'}` : '—'}
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">{t('note')}</p>
        </section>
      </div>
    </div>
  );
}

