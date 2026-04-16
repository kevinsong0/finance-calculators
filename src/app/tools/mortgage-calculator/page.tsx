'use client'

import { useState, useEffect } from 'react';
import MortgageCalculator from '@/components/MortgageCalculator';

export default function Page() {
  const [locale, setLocale] = useState<'en' | 'zh'>('en');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored === 'en' || stored === 'zh') {
      setLocale(stored);
    }

    // Check periodically for changes
    const interval = setInterval(() => {
      const current = localStorage.getItem('locale');
      if (current && current !== locale) {
        setLocale(current as 'en' | 'zh');
      }
    }, 500);

    return () => clearInterval(interval);
  }, [locale]);

  return <MortgageCalculator locale={locale} />;
}

// Metadata would be in a separate layout file for client components
// For SEO, consider creating a layout.tsx in this folder with metadata