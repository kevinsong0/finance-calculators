'use client'

import { useState, useMemo } from 'react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const age = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();

    // Calculate full years
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days lived
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // Next birthday
    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) {
      nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    // Zodiac sign
    const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());

    // Generation
    const generation = getGeneration(birth.getFullYear());

    // Life stage
    const lifeStage = getLifeStage(years);

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      daysUntilBirthday,
      zodiacSign,
      generation,
      lifeStage,
      birthDayOfWeek: birth.toLocaleDateString('en-US', { weekday: 'long' }),
      targetDayOfWeek: target.toLocaleDateString('en-US', { weekday: 'long' }),
    };
  }, [birthDate, targetDate]);

  function getZodiacSign(month: number, day: number): string {
    const signs = [
      { name: 'Capricorn', start: [12, 22], end: [1, 19] },
      { name: 'Aquarius', start: [1, 20], end: [2, 18] },
      { name: 'Pisces', start: [2, 19], end: [3, 20] },
      { name: 'Aries', start: [3, 21], end: [4, 19] },
      { name: 'Taurus', start: [4, 20], end: [5, 20] },
      { name: 'Gemini', start: [5, 21], end: [6, 20] },
      { name: 'Cancer', start: [6, 21], end: [7, 22] },
      { name: 'Leo', start: [7, 23], end: [8, 22] },
      { name: 'Virgo', start: [8, 23], end: [9, 22] },
      { name: 'Libra', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
    ];

    for (const sign of signs) {
      if (sign.name === 'Capricorn') {
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return sign.name;
      } else {
        if ((month === sign.start[0] && day >= sign.start[1]) || (month === sign.end[0] && day <= sign.end[1])) return sign.name;
      }
    }
    return 'Unknown';
  }

  function getGeneration(year: number): string {
    if (year >= 2013) return 'Gen Alpha';
    if (year >= 1997) return 'Gen Z';
    if (year >= 1981) return 'Millennial';
    if (year >= 1965) return 'Gen X';
    if (year >= 1946) return 'Baby Boomer';
    if (year >= 1928) return 'Silent Generation';
    return 'Greatest Generation';
  }

  function getLifeStage(years: number): string {
    if (years < 1) return 'Infant';
    if (years < 3) return 'Toddler';
    if (years < 5) return 'Preschooler';
    if (years < 12) return 'Child';
    if (years < 18) return 'Teenager';
    if (years < 25) return 'Young Adult';
    if (years < 40) return 'Adult';
    if (years < 60) return 'Middle Age';
    return 'Senior';
  }

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Age Calculator</h1>
      <p className="text-zinc-600">Calculate your exact age in years, months, days and find your zodiac sign, generation, and next birthday.</p>

      <div className="card space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full"
              max={today}
            />
            <div className="flex gap-2 mt-2">
              <button onClick={() => setBirthDate(new Date(Date.now() - 1 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])} className="px-2 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">1 year ago</button>
              <button onClick={() => setBirthDate(new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])} className="px-2 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">10 years</button>
              <button onClick={() => setBirthDate(new Date(Date.now() - 30 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])} className="px-2 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">30 years</button>
              <button onClick={() => setBirthDate(new Date(Date.now() - 50 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])} className="px-2 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">50 years</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Calculate Age At (Optional)</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full"
              min={birthDate || '1900-01-01'}
            />
            <button onClick={() => setTargetDate(today)} className="mt-2 px-3 py-1 text-xs bg-zinc-100 rounded hover:bg-zinc-200">
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Age Result */}
      {age && (
        <>
          <div className="card bg-blue-50 text-center p-6">
            <div className="text-sm text-zinc-500 mb-2">Your Age</div>
            <div className="text-4xl font-bold text-blue-600">
              {age.years} years, {age.months} months, {age.days} days
            </div>
            <div className="text-sm text-zinc-600 mt-2">
              Born on a {age.birthDayOfWeek}
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="card">
            <h3 className="font-medium mb-3">Detailed Age Breakdown</h3>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="bg-zinc-50 rounded p-3 text-center">
                <div className="text-zinc-500">Total Days</div>
                <div className="font-bold text-lg">{age.totalDays.toLocaleString()}</div>
              </div>
              <div className="bg-zinc-50 rounded p-3 text-center">
                <div className="text-zinc-500">Total Weeks</div>
                <div className="font-bold text-lg">{age.totalWeeks.toLocaleString()}</div>
              </div>
              <div className="bg-zinc-50 rounded p-3 text-center">
                <div className="text-zinc-500">Total Months</div>
                <div className="font-bold text-lg">{age.totalMonths.toLocaleString()}</div>
              </div>
              <div className="bg-zinc-50 rounded p-3 text-center">
                <div className="text-zinc-500">Total Hours</div>
                <div className="font-bold text-lg">{age.totalHours.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="card">
            <h3 className="font-medium mb-3">About You</h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-purple-50 rounded p-3 text-center">
                <div className="text-zinc-500">Zodiac Sign</div>
                <div className="font-bold text-purple-600">{age.zodiacSign}</div>
              </div>
              <div className="bg-green-50 rounded p-3 text-center">
                <div className="text-zinc-500">Generation</div>
                <div className="font-bold text-green-600">{age.generation}</div>
              </div>
              <div className="bg-orange-50 rounded p-3 text-center">
                <div className="text-zinc-500">Life Stage</div>
                <div className="font-bold text-orange-600">{age.lifeStage}</div>
              </div>
            </div>
          </div>

          {/* Next Birthday */}
          <div className="card bg-yellow-50 text-center p-6">
            <div className="text-sm text-zinc-500 mb-2">Next Birthday</div>
            <div className="text-2xl font-bold text-yellow-600">
              {age.daysUntilBirthday} days away
            </div>
            <div className="text-xs text-zinc-500 mt-2">
              You&apos;ll turn {age.years + 1} years old!
            </div>
          </div>
        </>
      )}

      {/* Fun Facts */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Age Milestones</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">10,000 days</div>
            <div className="text-zinc-600">≈ 27 years</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">20,000 days</div>
            <div className="text-zinc-600">≈ 54 years</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">1 Billion seconds</div>
            <div className="text-zinc-600">≈ 31.7 years</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Golden Birthday</div>
            <div className="text-zinc-600">Age = Birth Day</div>
          </div>
        </div>
      </div>
    </main>
  );
}