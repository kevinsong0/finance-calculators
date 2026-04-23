'use client'

import { useEffect, useState } from 'react';
import SavingsGoalCalculator from '@/components/SavingsGoalCalculator';

export default function Page() {
  const [locale, setLocale] = useState<'en' | 'zh'>('en');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored === 'en' || stored === 'zh') {
      setLocale(stored);
    }
    const handleStorage = () => {
      const newLocale = localStorage.getItem('locale');
      if (newLocale === 'en' || newLocale === 'zh') setLocale(newLocale);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return <SavingsGoalCalculator locale={locale} />;
}

