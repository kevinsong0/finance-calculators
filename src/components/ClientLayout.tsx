'use client'

import { useState, useEffect, ReactNode } from 'react';
import Script from 'next/script';
import AdBanner from '@/components/AdBanner';
import { ADSENSE_CLIENT, ADSENSE_SLOTS } from '@/lib/adsense';
import { buildNetworkUrl } from '@/lib/site';

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

const enMessages = {
  nav: { home: 'Finance Calculators', hub: 'Hub', mortgage: 'Mortgage', compound: 'Compound', currency: 'Currency', autoLoan: 'Auto Loan', refinance: 'Refinance', debtPayoff: 'Debt Payoff', savingsGoal: 'Savings Goal', network: 'Network' },
  footer: {
    copyright: '© 2026 Finance Calculators. For educational use only.',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    disclaimer: 'Disclaimer',
    network: 'Tool Network',
  },
};

const zhMessages = {
  nav: { home: '金融计算器', hub: '总入口', mortgage: '房贷', compound: '复利', currency: '汇率', autoLoan: '车贷', refinance: '再融资', debtPayoff: '债务清偿', savingsGoal: '储蓄目标', network: '工具网络' },
  footer: {
    copyright: '© 2026 金融计算器. 仅供学习参考使用.',
    about: '关于',
    contact: '联系',
    privacy: '隐私政策',
    disclaimer: '免责声明',
    network: '工具网络',
  },
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<'en' | 'zh'>('en');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored === 'en' || stored === 'zh') {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('utm_source') !== 'network') return;
    (window as GtagWindow).gtag?.('event', 'network_landing_view', {
      source_site: params.get('utm_source_site') || 'unknown',
      destination_site: 'finance',
      campaign: params.get('utm_campaign') || 'tool-network',
      placement: params.get('utm_content') || 'unknown',
    });
  }, []);

  useEffect(() => {
    const handleClick = (mouseEvent: MouseEvent) => {
      const target = mouseEvent.target as HTMLElement | null;
      const link = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!link) return;

      let parsed: URL;
      try {
        parsed = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      if (parsed.origin === window.location.origin) return;
      if (parsed.searchParams.get('utm_source') === 'network') return;

      (window as GtagWindow).gtag?.('event', 'outbound_click', {
        source_site: 'finance',
        link_url: parsed.href,
        link_host: parsed.host,
        link_text: (link.textContent || '').trim().slice(0, 100),
        page_path: window.location.pathname,
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const fired = new Set<number>();

    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const maxScrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const percent = Math.min(100, Math.round((scrollTop / maxScrollable) * 100));

      for (const milestone of milestones) {
        if (percent < milestone || fired.has(milestone)) continue;
        fired.add(milestone);
        (window as GtagWindow).gtag?.('event', 'scroll_depth', {
          source_site: 'finance',
          percent_scrolled: milestone,
          page_path: window.location.pathname,
        });
      }

      if (fired.size === milestones.length) {
        window.removeEventListener('scroll', handleScroll);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: 'en' | 'zh') => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const trackEvent = (action: string, params: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;
    (window as GtagWindow).gtag?.('event', action, {
      ...params,
      page_path: window.location.pathname,
    });
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
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="font-semibold text-gray-900">{t('nav.home')}</a>
            <div className="flex items-center gap-6">
              <a href="/tools/finance-hub" className="text-gray-600 hover:text-gray-900">{t('nav.hub')}</a>
              <a href="/tools/mortgage-calculator" className="text-gray-600 hover:text-gray-900">{t('nav.mortgage')}</a>
              <a href="/tools/compound-interest" className="text-gray-600 hover:text-gray-900">{t('nav.compound')}</a>
              <a href="/tools/currency-converter" className="text-gray-600 hover:text-gray-900">{t('nav.currency')}</a>
              <a href="/tools/auto-loan-calculator" className="text-gray-600 hover:text-gray-900">{t('nav.autoLoan')}</a>
              <a href="/tools/refinance-calculator" className="text-gray-600 hover:text-gray-900">{t('nav.refinance')}</a>
              <a href="/tools/debt-payoff-calculator" className="text-gray-600 hover:text-gray-900">{t('nav.debtPayoff')}</a>
              <a href="/tools/savings-goal-calculator" className="text-gray-600 hover:text-gray-900">{t('nav.savingsGoal')}</a>
              <div className="hidden xl:flex items-center gap-3 border-l pl-4 text-sm">
                <span className="text-gray-400">{t('nav.network')}</span>
                <a
                  href={buildNetworkUrl('repair', 'header_nav_estimator', '/auto-repair-cost-estimator.html')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => trackEvent('network_nav_click', { source_site: 'finance', destination_site: 'repair', placement: 'header' })}
                >
                  Repair Estimator
                </a>
                <a
                  href={buildNetworkUrl('repair', 'header_nav_repair_vs_replace', '/repair-vs-replace-car-calculator.html')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => trackEvent('network_nav_click', { source_site: 'finance', destination_site: 'repair', placement: 'header_secondary' })}
                >
                  Repair vs Replace
                </a>
                <a
                  href={buildNetworkUrl('ai', 'header_nav_llm_cost', '/llm-cost-calculator')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => trackEvent('network_nav_click', { source_site: 'finance', destination_site: 'ai', placement: 'header' })}
                >
                  AI
                </a>
              </div>
              <div className="flex items-center gap-2 border-l pl-4">
                <button onClick={() => switchLocale('en')} className={`px-2 py-1 rounded text-sm ${locale === 'en' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}>EN</button>
                <button onClick={() => switchLocale('zh')} className={`px-2 py-1 rounded text-sm ${locale === 'zh' ? 'bg-primary-100 text-primary-700' : 'text-gray-500'}`}>中文</button>
              </div>
            </div>
          </nav>
        </header>

        {/* Top Banner Ad */}
        <div className="bg-gray-50 py-2 text-center">
          <AdBanner adSlot={ADSENSE_SLOTS.topBanner} placement="top_banner" className="mx-auto max-w-6xl" />
        </div>

        {/* Main */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Bottom Banner Ad */}
        <div className="bg-gray-50 py-3 text-center">
          <AdBanner adSlot={ADSENSE_SLOTS.bottomBanner} placement="bottom_banner" className="mx-auto max-w-6xl" />
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 border-t py-4 text-center text-sm text-gray-500 space-y-2">
          <div className="flex justify-center gap-4">
            <a href="/about" className="hover:text-gray-700">{t('footer.about')}</a>
            <a href="/contact" className="hover:text-gray-700">{t('footer.contact')}</a>
            <a href="/privacy-policy" className="hover:text-gray-700">{t('footer.privacy')}</a>
            <a href="/disclaimer" className="hover:text-gray-700">{t('footer.disclaimer')}</a>
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <span className="text-gray-400">{t('footer.network')}</span>
            <a
              href={buildNetworkUrl('repair', 'footer_nav_repair_vs_replace', '/repair-vs-replace-car-calculator.html')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700"
              onClick={() => trackEvent('network_nav_click', { source_site: 'finance', destination_site: 'repair', placement: 'footer' })}
            >
              Repair Cost Lab
            </a>
            <a
              href={buildNetworkUrl('ai', 'footer_nav_budget', '/ai-budget-guardrails-calculator')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700"
              onClick={() => trackEvent('network_nav_click', { source_site: 'finance', destination_site: 'ai', placement: 'footer' })}
            >
              AI Cost Tools
            </a>
          </div>
          <div>{t('footer.copyright')}</div>
        </footer>
      </div>
    </>
  );
}
