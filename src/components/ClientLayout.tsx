'use client'

import { useState, useEffect, ReactNode } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const enMessages = {
  nav: { home: 'Finance Calculators', mortgage: 'Mortgage', compound: 'Compound', currency: 'Currency' },
  footer: { copyright: '© 2024 Finance Calculators. For educational use only.' },
};

const zhMessages = {
  nav: { home: '金融计算器', mortgage: '房贷', compound: '复利', currency: '汇率' },
  footer: { copyright: '© 2024 金融计算器. 仅供学习参考使用.' },
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'zh'>('en');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored === 'en' || stored === 'zh') {
      setLocale(stored);
    }
  }, []);

  // Initialize AdSense ads after script loads
  useEffect(() => {
    const initAds = () => {
      try {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
          window.adsbygoogle.push({});
        }
      } catch (e) {
        // AdSense not loaded yet or blocked
      }
    };
    // Delay to ensure script is loaded
    const timer = setTimeout(initAds, 1000);
    return () => clearTimeout(timer);
  }, []);

  const switchLocale = (newLocale: 'en' | 'zh') => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string) => {
    const messages = locale === 'en' ? enMessages : zhMessages;
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <>
      {/* Google AdSense Script */}
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="font-semibold text-gray-900">{t('nav.home')}</a>
            <div className="flex items-center gap-6">
              <a href="/tools/mortgage-calculator" className="text-gray-600 hover:text-gray-900">{t('nav.mortgage')}</a>
              <a href="/tools/compound-interest" className="text-gray-600 hover:text-gray-900">{t('nav.compound')}</a>
              <a href="/tools/currency-converter" className="text-gray-600 hover:text-gray-900">{t('nav.currency')}</a>
              <div className="flex items-center gap-2 border-l pl-4">
                <button onClick={() => switchLocale('en')} className={`px-2 py-1 rounded text-sm ${locale === 'en' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}>EN</button>
                <button onClick={() => switchLocale('zh')} className={`px-2 py-1 rounded text-sm ${locale === 'zh' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}>中文</button>
              </div>
            </div>
          </nav>
        </header>

        {/* Top Banner Ad */}
        <div className="bg-gray-50 py-2 text-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="TOP_BANNER_SLOT"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>

        {/* Main */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Bottom Banner Ad */}
        <div className="bg-gray-50 py-3 text-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="BOTTOM_BANNER_SLOT"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 border-t py-4 text-center text-sm text-gray-500">
          {t('footer.copyright')}
        </footer>
      </div>
    </>
  );
}