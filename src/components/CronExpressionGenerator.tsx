'use client'

import { useState } from 'react';

export default function CronExpressionGenerator() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');

  const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const descriptions: Record<string, string> = {
    '*': 'Every',
    '0': 'At start',
    '15': 'At 15',
    '30': 'At 30',
    '45': 'At 45',
    '*/5': 'Every 5',
    '*/10': 'Every 10',
    '*/15': 'Every 15',
    '*/30': 'Every 30',
    '*/60': 'Every hour',
  };

  const presets = [
    { cron: '0 * * * *', desc: 'Every hour', label: 'Hourly' },
    { cron: '*/5 * * * *', desc: 'Every 5 minutes', label: 'Every 5min' },
    { cron: '0 0 * * *', desc: 'Every day at midnight', label: 'Daily' },
    { cron: '0 9 * * 1-5', desc: 'Weekdays at 9am', label: 'Weekdays 9am' },
    { cron: '0 0 1 * *', desc: 'Monthly on 1st', label: 'Monthly' },
    { cron: '0 0 * * 0', desc: 'Every Sunday midnight', label: 'Weekly' },
    { cron: '*/30 9-17 * * 1-5', desc: 'Every 30min during business hours', label: 'Business' },
    { cron: '0 12 1 1 *', desc: 'January 1st at noon', label: 'Yearly' },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronExpression);
  };

  const applyPreset = (cron: string) => {
    const parts = cron.split(' ');
    setMinute(parts[0]);
    setHour(parts[1]);
    setDayOfMonth(parts[2]);
    setMonth(parts[3]);
    setDayOfWeek(parts[4]);
  };

  const parseDescription = () => {
    const parts = [];
    const minDesc = minute === '*' ? 'every minute' : minute.startsWith('*/') ? `every ${minute.slice(2)} minutes` : `at minute ${minute}`;
    const hourDesc = hour === '*' ? 'every hour' : hour.startsWith('*/') ? `every ${hour.slice(2)} hours` : `at hour ${hour}`;
    const domDesc = dayOfMonth === '*' ? 'every day' : `on day ${dayOfMonth} of month`;
    const monthDesc = month === '*' ? 'every month' : `in month ${month}`;
    const dowDesc = dayOfWeek === '*' ? 'every weekday' : dayOfWeek.includes('-') ? `on ${dayOfWeek}` : `on day ${dayOfWeek} of week`;

    if (minute !== '*' && hour !== '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
      return `At ${hour}:${minute.padStart(2, '0')} every day`;
    }
    if (minute === '0' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
      return `Every hour at minute 0`;
    }
    if (minute.startsWith('*/') && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
      return `Every ${minute.slice(2)} minutes`;
    }

    return `${minDesc}, ${hourDesc}, ${domDesc}`;
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Cron Expression Generator</h1>
      <p className="text-zinc-600">Generate cron expressions for scheduling jobs. Visual builder for Linux/Unix task scheduling. Copy expressions for crontab, Kubernetes, AWS, and more.</p>

      <div className="card bg-blue-50 p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Generated Cron Expression</h3>
          <button onClick={copyToClipboard} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
        </div>
        <div className="bg-white rounded p-3 font-mono text-lg text-center text-blue-600">{cronExpression}</div>
        <div className="text-sm text-zinc-600 mt-2 text-center">{parseDescription()}</div>
      </div>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Minute (0-59)</label>
          <div className="flex gap-2">
            {['*', '0', '15', '30', '45', '*/5', '*/10', '*/30'].map((m) => (
              <button key={m} onClick={() => setMinute(m)} className={`px-3 py-1 rounded text-xs ${minute === m ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {m}
              </button>
            ))}
            <input type="text" value={minute} onChange={e => setMinute(e.target.value)} className="w-20 px-2 py-1 text-xs" placeholder="0-59" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Hour (0-23)</label>
          <div className="flex gap-2">
            {['*', '0', '6', '9', '12', '17', '*/6'].map((h) => (
              <button key={h} onClick={() => setHour(h)} className={`px-3 py-1 rounded text-xs ${hour === h ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {h}
              </button>
            ))}
            <input type="text" value={hour} onChange={e => setHour(e.target.value)} className="w-20 px-2 py-1 text-xs" placeholder="0-23" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Day of Month (1-31)</label>
          <div className="flex gap-2">
            {['*', '1', '15', '28', '31'].map((d) => (
              <button key={d} onClick={() => setDayOfMonth(d)} className={`px-3 py-1 rounded text-xs ${dayOfMonth === d ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {d}
              </button>
            ))}
            <input type="text" value={dayOfMonth} onChange={e => setDayOfMonth(e.target.value)} className="w-20 px-2 py-1 text-xs" placeholder="1-31" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Month (1-12)</label>
          <div className="flex gap-2">
            {['*', '1', '6', '12'].map((m) => (
              <button key={m} onClick={() => setMonth(m)} className={`px-3 py-1 rounded text-xs ${month === m ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {m}
              </button>
            ))}
            <input type="text" value={month} onChange={e => setMonth(e.target.value)} className="w-20 px-2 py-1 text-xs" placeholder="1-12" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Day of Week (0-7, 0 or 7 = Sunday)</label>
          <div className="flex gap-2">
            {['*', '0', '1-5', '6', '7'].map((d) => (
              <button key={d} onClick={() => setDayOfWeek(d)} className={`px-3 py-1 rounded text-xs ${dayOfWeek === d ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {d === '1-5' ? 'Mon-Fri' : d === '0' ? 'Sun' : d === '6' ? 'Sat' : d === '7' ? 'Sun' : d}
              </button>
            ))}
            <input type="text" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} className="w-20 px-2 py-1 text-xs" placeholder="0-7" />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Presets</h3>
        <div className="grid grid-cols-4 gap-2">
          {presets.map((p, i) => (
            <button key={i} onClick={() => applyPreset(p.cron)} className="bg-white rounded p-2 hover:bg-zinc-100 text-left text-xs">
              <div className="font-mono text-blue-600">{p.cron}</div>
              <div className="text-zinc-500">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cron Expression Format</h3>
        <div className="bg-white rounded p-3 font-mono text-sm">
          <div className="flex justify-around">
            <div className="text-center"><div className="text-blue-600">{minute}</div><div className="text-xs text-zinc-500">Minute</div></div>
            <div className="text-center"><div className="text-green-600">{hour}</div><div className="text-xs text-zinc-500">Hour</div></div>
            <div className="text-center"><div className="text-purple-600">{dayOfMonth}</div><div className="text-xs text-zinc-500">Day</div></div>
            <div className="text-center"><div className="text-orange-600">{month}</div><div className="text-xs text-zinc-500">Month</div></div>
            <div className="text-center"><div className="text-pink-600">{dayOfWeek}</div><div className="text-xs text-zinc-500">Weekday</div></div>
          </div>
        </div>
        <div className="text-xs text-zinc-500 mt-2">5 fields: minute hour day-of-month month day-of-week (0-7, Sunday=0 or 7)</div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Special Characters</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="bg-white rounded p-2 space-y-1">
            <div><span className="text-blue-600">*</span> Any value</div>
            <div><span className="text-blue-600">,</span> Value list separator</div>
            <div><span className="text-blue-600">-</span> Range of values</div>
          </div>
          <div className="bg-white rounded p-2 space-y-1">
            <div><span className="text-blue-600">/</span> Step values</div>
            <div><span className="text-blue-600">*/5</span> Every 5 units</div>
            <div><span className="text-blue-600">1-5</span> Range Monday-Friday</div>
          </div>
          <div className="bg-white rounded p-2 space-y-1">
            <div><span className="text-blue-600">@yearly</span> 0 0 1 1 *</div>
            <div><span className="text-blue-600">@monthly</span> 0 0 1 * *</div>
            <div><span className="text-blue-600">@daily</span> 0 0 * * *</div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Linux:</span> crontab -e</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">K8s:</span> CronJob spec</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">AWS:</span> EventBridge</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">GCP:</span> Cloud Scheduler</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">Jenkins:</span> Build triggers</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">CI/CD:</span> Pipeline schedules</div>
          <div className="bg-white rounded p-2"><span className="text-indigo-600 font-medium">Backup:</span> Automated jobs</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Cleanup:</span> Log rotation</div>
        </div>
      </div>
    </main>
  );
}