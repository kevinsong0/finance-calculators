'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [locale, setLocale] = useState<'en' | 'zh'>('en');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored === 'en' || stored === 'zh') {
      setLocale(stored);
    }
  }, []);

  const t = (key: string) => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: 'Professional Financial Calculators', zh: '专业金融计算工具' },
      subtitle: { en: 'Accurate calculations for smarter financial decisions', zh: '精准计算、智能分析，助您做出更明智的财务决策' },
      cta: { en: 'Open Finance Hub', zh: '进入总入口' },
      ctaSecondary: { en: 'Mortgage Calculator', zh: '房贷计算器' },
      hubTitle: { en: 'Finance Hub', zh: '金融总入口' },
      hubDesc: { en: 'Start with tax, mortgage, investment, or budgeting hubs to reach the right tool faster', zh: '先进入税务、房贷、投资或预算总入口，更快找到对应工具' },
      mortgageTitle: { en: 'Mortgage Calculator', zh: '房贷计算器' },
      mortgageDesc: { en: 'Calculate payments, interest, and early repayment strategies', zh: '计算月供、总利息，分析提前还款策略' },
      compoundTitle: { en: 'Compound Interest', zh: '复利计算器' },
      compoundDesc: { en: 'Visualize the power of compound interest over time', zh: '见证复利的力量，看您的财富如何随时间增长' },
      currencyTitle: { en: 'Currency Converter', zh: '汇率换算' },
      currencyDesc: { en: 'Convert between 10+ currencies with live rates', zh: '10+货币实时汇率换算' },
      whyTitle: { en: 'Why Choose Our Tools?', zh: '为什么选择我们的工具？' },
      accurateTitle: { en: 'Accurate Calculation', zh: '精准计算' },
      accurateDesc: { en: 'Bank-grade algorithms, results match actual bank payment schedules', zh: '采用银行级算法，结果与银行实际还款计划一致' },
      instantTitle: { en: 'Instant Results', zh: '即时结果' },
      instantDesc: { en: 'Real-time calculation, no waiting, clear results', zh: '实时计算，无需等待，结果一目了然' },
      secureTitle: { en: 'Data Secure', zh: '数据安全' },
      secureDesc: { en: 'All calculations done locally, no data uploaded to servers', zh: '所有计算在本地完成，数据不上传服务器' },
    };
    return texts[key]?.[locale] || key;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('title')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">{t('subtitle')}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/tools/finance-hub" className="btn-primary">{t('cta')}</Link>
          <Link href="/tools/mortgage-calculator" className="rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:text-gray-900 transition">
            {t('ctaSecondary')}
          </Link>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-8 mb-16 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 mb-2">{t('hubTitle')}</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('hubDesc')}</h2>
            <p className="text-gray-600 max-w-2xl">
              Use the hubs to move through tax, mortgage, and investment decisions without getting lost in the long tail of tools.
            </p>
          </div>
          <Link href="/tools/finance-hub" className="text-primary-700 font-semibold hover:underline">
            Open the full hub →
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-4 gap-4 mb-16">
        <Link href="/tools/finance-hub" className="card hover:shadow-md">
          <div className="text-4xl mb-4">🧭</div>
          <h2 className="text-xl font-semibold mb-2">{t('hubTitle')}</h2>
          <p className="text-gray-600">{t('hubDesc')}</p>
        </Link>
        <Link href="/tools/tax-hub" className="card hover:shadow-md">
          <div className="text-4xl mb-4">🧾</div>
          <h2 className="text-xl font-semibold mb-2">Tax Hub</h2>
          <p className="text-gray-600">Crypto, IRS, capital gains, and deduction planning</p>
        </Link>
        <Link href="/tools/mortgage-hub" className="card hover:shadow-md">
          <div className="text-4xl mb-4">🏡</div>
          <h2 className="text-xl font-semibold mb-2">Mortgage Hub</h2>
          <p className="text-gray-600">Payment, refinance, HELOC, and home affordability</p>
        </Link>
        <Link href="/tools/investment-hub" className="card hover:shadow-md">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-xl font-semibold mb-2">Investment Hub</h2>
          <p className="text-gray-600">ROI, portfolio analysis, compound growth, and retirement</p>
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <Link href="/tools/mortgage-calculator" className="card hover:shadow-md">
          <div className="text-4xl mb-4">🏠</div>
          <h2 className="text-xl font-semibold mb-2">{t('mortgageTitle')}</h2>
          <p className="text-gray-600">{t('mortgageDesc')}</p>
        </Link>
        <Link href="/tools/compound-interest" className="card hover:shadow-md">
          <div className="text-4xl mb-4">📈</div>
          <h2 className="text-xl font-semibold mb-2">{t('compoundTitle')}</h2>
          <p className="text-gray-600">{t('compoundDesc')}</p>
        </Link>
        <Link href="/tools/currency-converter" className="card hover:shadow-md">
          <div className="text-4xl mb-4">💱</div>
          <h2 className="text-xl font-semibold mb-2">{t('currencyTitle')}</h2>
          <p className="text-gray-600">{t('currencyDesc')}</p>
        </Link>
      </section>

      <section className="bg-gray-50 rounded-2xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('whyTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('accurateTitle')}</h3>
            <p className="text-gray-600 text-sm">{t('accurateDesc')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('instantTitle')}</h3>
            <p className="text-gray-600 text-sm">{t('instantDesc')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('secureTitle')}</h3>
            <p className="text-gray-600 text-sm">{t('secureDesc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
