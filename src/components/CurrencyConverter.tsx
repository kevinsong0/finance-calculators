'use client'

import { useState, useMemo, useEffect } from 'react';

const exchangeRates: Record<string, Record<string, number>> = {
  USD: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 154.5, CNY: 7.24, AUD: 1.52, CAD: 1.36, CHF: 0.90, INR: 83.5, KRW: 1365 },
  EUR: { USD: 1.09, EUR: 1, GBP: 0.86, JPY: 168, CNY: 7.9, AUD: 1.66, CAD: 1.48, CHF: 0.98, INR: 91, KRW: 1490 },
  GBP: { USD: 1.27, EUR: 1.16, GBP: 1, JPY: 195, CNY: 9.2, AUD: 1.93, CAD: 1.72, CHF: 1.14, INR: 106, KRW: 1730 },
  JPY: { USD: 0.0065, EUR: 0.0060, GBP: 0.0051, JPY: 1, CNY: 0.047, AUD: 0.0098, CAD: 0.0088, CHF: 0.0058, INR: 0.54, KRW: 8.9 },
  CNY: { USD: 0.14, EUR: 0.13, GBP: 0.11, JPY: 21.4, CNY: 1, AUD: 0.21, CAD: 0.19, CHF: 0.12, INR: 11.6, KRW: 189 },
  AUD: { USD: 0.66, EUR: 0.60, GBP: 0.52, JPY: 102, CNY: 4.8, AUD: 1, CAD: 0.90, CHF: 0.59, INR: 55, KRW: 900 },
  CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 113, CNY: 5.3, AUD: 1.11, CAD: 1, CHF: 0.66, INR: 62, KRW: 1000 },
  CHF: { USD: 1.11, EUR: 1.02, GBP: 0.88, JPY: 172, CNY: 8.1, AUD: 1.69, CAD: 1.51, CHF: 1, INR: 93, KRW: 1520 },
  INR: { USD: 0.012, EUR: 0.011, GBP: 0.0094, JPY: 1.86, CNY: 0.087, AUD: 0.018, CAD: 0.016, CHF: 0.011, INR: 1, KRW: 16.3 },
  KRW: { USD: 0.00073, EUR: 0.00067, GBP: 0.00058, JPY: 0.11, CNY: 0.0053, AUD: 0.0011, CAD: 0.0010, CHF: 0.00066, INR: 0.061, KRW: 1 },
};

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF', 'INR', 'KRW'];

const currencyNames: Record<string, Record<string, string>> = {
  USD: { en: 'US Dollar', zh: '美元' },
  EUR: { en: 'Euro', zh: '欧元' },
  GBP: { en: 'British Pound', zh: '英镑' },
  JPY: { en: 'Japanese Yen', zh: '日元' },
  CNY: { en: 'Chinese Yuan', zh: '人民币' },
  AUD: { en: 'Australian Dollar', zh: '澳元' },
  CAD: { en: 'Canadian Dollar', zh: '加元' },
  CHF: { en: 'Swiss Franc', zh: '瑞士法郎' },
  INR: { en: 'Indian Rupee', zh: '印度卢比' },
  KRW: { en: 'South Korean Won', zh: '韩元' },
};

export default function CurrencyConverter({ locale }: { locale: 'en' | 'zh' }) {
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const result = useMemo(() => {
    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
    return { converted: amount * rate, rate, inverseRate: 1 / rate };
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatMoney = (value: number, currency: string) => {
    return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'JPY' || currency === 'KRW' ? 0 : 2,
    }).format(value);
  };

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Currency Converter', zh: '汇率换算' },
      subtitle: { en: 'Convert between 10+ currencies with live rates', zh: '10+货币实时汇率换算' },
      amount: { en: 'Amount', zh: '金额' },
      from: { en: 'From', zh: '从' },
      to: { en: 'To', zh: '到' },
      swap: { en: 'Swap', zh: '交换' },
      rate: { en: 'Exchange Rate', zh: '汇率' },
      inverseRate: { en: 'Inverse Rate', zh: '反向汇率' },
      popular: { en: 'Popular Currencies', zh: '常用货币' },
    };
    return texts[key]?.[locale] || key;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="card mb-8">
        <div className="grid md:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('amount')}</label>
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full mb-2" />
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('from')}</label>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full">
              {currencies.map((c) => (
                <option key={c} value={c}>{c} - {currencyNames[c][locale]}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button onClick={swapCurrencies} className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('to')}</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full">
              {currencies.map((c) => (
                <option key={c} value={c}>{c} - {currencyNames[c][locale]}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 p-6 bg-primary-50 rounded-lg text-center">
          <div className="text-4xl font-bold text-primary-600 mb-4">{formatMoney(result.converted, toCurrency)}</div>
          <div className="text-gray-600 space-y-1">
            <p>{formatMoney(1, fromCurrency)} = {formatMoney(result.rate, toCurrency)}</p>
            <p>{formatMoney(1, toCurrency)} = {formatMoney(result.inverseRate, fromCurrency)}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">{t('popular')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {currencies.slice(0, 10).map((c) => (
            <button
              key={c}
              onClick={() => {
                if (fromCurrency !== c) setToCurrency(c);
              }}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-lg font-bold text-gray-900">{c}</div>
              <div className="text-sm text-gray-600">{currencyNames[c][locale]}</div>
              <div className="text-xs text-gray-500 mt-1">{formatMoney(exchangeRates[fromCurrency]?.[c] || 1, c)}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}