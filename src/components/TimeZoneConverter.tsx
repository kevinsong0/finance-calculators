'use client'

import { useState, useMemo, useEffect } from 'react';

export default function TimeZoneConverter() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sourceTime, setSourceTime] = useState('');
  const [sourceZone, setSourceZone] = useState('UTC');
  const [targetZone, setTargetZone] = useState('America/New_York');

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeZones = [
    { id: 'UTC', name: 'UTC', offset: 0, city: 'Coordinated Universal Time' },
    { id: 'America/New_York', name: 'EST/EDT', offset: -5, city: 'New York' },
    { id: 'America/Los_Angeles', name: 'PST/PDT', offset: -8, city: 'Los Angeles' },
    { id: 'America/Chicago', name: 'CST/CDT', offset: -6, city: 'Chicago' },
    { id: 'America/Denver', name: 'MST/MDT', offset: -7, city: 'Denver' },
    { id: 'America/Toronto', name: 'EST/EDT', offset: -5, city: 'Toronto' },
    { id: 'America/Vancouver', name: 'PST/PDT', offset: -8, city: 'Vancouver' },
    { id: 'Europe/London', name: 'GMT/BST', offset: 0, city: 'London' },
    { id: 'Europe/Paris', name: 'CET/CEST', offset: 1, city: 'Paris' },
    { id: 'Europe/Berlin', name: 'CET/CEST', offset: 1, city: 'Berlin' },
    { id: 'Europe/Moscow', name: 'MSK', offset: 3, city: 'Moscow' },
    { id: 'Asia/Tokyo', name: 'JST', offset: 9, city: 'Tokyo' },
    { id: 'Asia/Shanghai', name: 'CST', offset: 8, city: 'Shanghai' },
    { id: 'Asia/Hong_Kong', name: 'HKT', offset: 8, city: 'Hong Kong' },
    { id: 'Asia/Singapore', name: 'SGT', offset: 8, city: 'Singapore' },
    { id: 'Asia/Dubai', name: 'GST', offset: 4, city: 'Dubai' },
    { id: 'Asia/Kolkata', name: 'IST', offset: 5.5, city: 'Mumbai' },
    { id: 'Asia/Jakarta', name: 'WIB', offset: 7, city: 'Jakarta' },
    { id: 'Australia/Sydney', name: 'AEST/AEDT', offset: 10, city: 'Sydney' },
    { id: 'Australia/Melbourne', name: 'AEST/AEDT', offset: 10, city: 'Melbourne' },
    { id: 'Pacific/Auckland', name: 'NZST/NZDT', offset: 12, city: 'Auckland' },
    { id: 'Pacific/Honolulu', name: 'HST', offset: -10, city: 'Honolulu' },
    { id: 'Brazil/Sao_Paulo', name: 'BRT', offset: -3, city: 'Sao Paulo' },
    { id: 'Africa/Lagos', name: 'WAT', offset: 1, city: 'Lagos' },
  ];

  const currentTimes = useMemo(() => {
    return timeZones.map((tz) => {
      const offsetMs = tz.offset * 60 * 60 * 1000;
      const utcTime = currentTime.getTime() + currentTime.getTimezoneOffset() * 60 * 1000;
      const localTime = new Date(utcTime + offsetMs);
      return {
        ...tz,
        time: localTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        date: localTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        hour: localTime.getHours(),
      };
    });
  }, [currentTime]);

  const convertedTime = useMemo(() => {
    if (!sourceTime) return null;

    const [hours, minutes] = sourceTime.split(':').map(Number);
    const sourceOffset = timeZones.find((tz) => tz.id === sourceZone)?.offset ?? 0;
    const targetOffset = timeZones.find((tz) => tz.id === targetZone)?.offset ?? 0;

    // Convert source time to UTC minutes
    const sourceMinutes = hours * 60 + minutes - sourceOffset * 60;
    // Convert UTC to target
    const targetMinutes = sourceMinutes + targetOffset * 60;
    const targetHours = Math.floor(targetMinutes / 60) % 24;
    const targetMins = ((targetMinutes % 60) + 60) % 60;

    const targetDate = new Date();
    targetDate.setHours(targetHours, targetMins, 0);

    return {
      time: targetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      hour: targetHours,
      date: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      difference: targetOffset - sourceOffset,
    };
  }, [sourceTime, sourceZone, targetZone]);

  const formatOffset = (offset: number) => {
    const sign = offset >= 0 ? '+' : '-';
    const hours = Math.abs(Math.floor(offset));
    const mins = Math.abs((offset % 1) * 60);
    return `UTC${sign}${hours}${mins > 0 ? `:${mins.toString().padStart(2, '0')}` : ''}`;
  };

  const groupedZones = useMemo(() => {
    return {
      americas: timeZones.filter((tz) => tz.id.startsWith('America') || tz.id.startsWith('Brazil') || tz.id.startsWith('Pacific/Honolulu')),
      europe: timeZones.filter((tz) => tz.id.startsWith('Europe') || tz.id.startsWith('Africa')),
      asiaPacific: timeZones.filter((tz) => tz.id.startsWith('Asia') || tz.id.startsWith('Australia') || tz.id.startsWith('Pacific/Auckland')),
    };
  }, []);

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Time Zone Converter</h1>
      <p className="text-zinc-600">Convert time between different time zones and see current time around the world.</p>

      {/* Current Time Display */}
      <div className="card bg-zinc-900 text-white text-center p-6">
        <div className="text-sm text-zinc-400 mb-2">Current UTC Time</div>
        <div className="text-4xl font-bold">{currentTime.toISOString().slice(11, 19)}</div>
        <div className="text-sm text-zinc-400 mt-2">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
      </div>

      {/* Conversion Section */}
      <div className="card space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Source Time</label>
            <input
              type="time"
              value={sourceTime}
              onChange={(e) => setSourceTime(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Source Zone</label>
            <select value={sourceZone} onChange={(e) => setSourceZone(e.target.value)} className="w-full">
              <option value="UTC">UTC - Coordinated Universal Time</option>
              <optgroup label="Americas">
                {groupedZones.americas.map((tz) => (
                  <option key={tz.id} value={tz.id}>{tz.city} ({formatOffset(tz.offset)})</option>
                ))}
              </optgroup>
              <optgroup label="Europe & Africa">
                {groupedZones.europe.map((tz) => (
                  <option key={tz.id} value={tz.id}>{tz.city} ({formatOffset(tz.offset)})</option>
                ))}
              </optgroup>
              <optgroup label="Asia & Pacific">
                {groupedZones.asiaPacific.map((tz) => (
                  <option key={tz.id} value={tz.id}>{tz.city} ({formatOffset(tz.offset)})</option>
                ))}
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Target Zone</label>
            <select value={targetZone} onChange={(e) => setTargetZone(e.target.value)} className="w-full">
              <option value="UTC">UTC - Coordinated Universal Time</option>
              <optgroup label="Americas">
                {groupedZones.americas.map((tz) => (
                  <option key={tz.id} value={tz.id}>{tz.city} ({formatOffset(tz.offset)})</option>
                ))}
              </optgroup>
              <optgroup label="Europe & Africa">
                {groupedZones.europe.map((tz) => (
                  <option key={tz.id} value={tz.id}>{tz.city} ({formatOffset(tz.offset)})</option>
                ))}
              </optgroup>
              <optgroup label="Asia & Pacific">
                {groupedZones.asiaPacific.map((tz) => (
                  <option key={tz.id} value={tz.id}>{tz.city} ({formatOffset(tz.offset)})</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* Conversion Result */}
      {convertedTime && (
        <div className="card bg-blue-50 text-center p-6">
          <div className="text-sm text-zinc-500 mb-2">
            {timeZones.find((tz) => tz.id === sourceZone)?.city} → {timeZones.find((tz) => tz.id === targetZone)?.city}
          </div>
          <div className="text-4xl font-bold text-blue-600">{convertedTime.time}</div>
          <div className="text-sm text-zinc-600 mt-2">
            {convertedTime.difference >= 0 ? '+' : ''}{convertedTime.difference} hours difference
          </div>
        </div>
      )}

      {/* World Clock Grid */}
      <div className="card">
        <h3 className="font-medium mb-3">World Clock - Current Time</h3>
        <div className="grid grid-cols-6 gap-2">
          {currentTimes.slice(0, 12).map((tz) => (
            <div key={tz.id} className={`rounded p-3 text-center ${tz.hour >= 6 && tz.hour < 18 ? 'bg-yellow-50' : 'bg-blue-50'}`}>
              <div className="text-xs text-zinc-500">{tz.city}</div>
              <div className="font-bold text-lg">{tz.time}</div>
              <div className="text-xs text-zinc-600">{tz.date}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-2 mt-2">
          {currentTimes.slice(12).map((tz) => (
            <div key={tz.id} className={`rounded p-3 text-center ${tz.hour >= 6 && tz.hour < 18 ? 'bg-yellow-50' : 'bg-blue-50'}`}>
              <div className="text-xs text-zinc-500">{tz.city}</div>
              <div className="font-bold text-lg">{tz.time}</div>
              <div className="text-xs text-zinc-600">{tz.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Time Zone Quick Reference</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">US Eastern</div>
            <div className="text-zinc-600">UTC-5/-4</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">US Pacific</div>
            <div className="text-zinc-600">UTC-8/-7</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Europe</div>
            <div className="text-zinc-600">UTC+0/+1</div>
          </div>
          <div className="bg-white rounded p-2 text-center">
            <div className="font-medium">Asia</div>
            <div className="text-zinc-600">UTC+7 to +9</div>
          </div>
        </div>
      </div>

      {/* Meeting Planner Tips */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Meeting Planning Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">US-Europe overlap:</span> 9 AM EST = 2 PM London = 3 PM Berlin
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">US-Asia overlap:</span> 9 AM PST = 1 AM Tokyo (next day)
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Europe-Asia overlap:</span> 9 AM London = 5 PM Singapore
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">Global overlap:</span> 7-10 AM UTC works for most regions
          </div>
        </div>
      </div>
    </main>
  );
}