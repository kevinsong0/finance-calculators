'use client'

import { useState, useMemo } from 'react';

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [mode, setMode] = useState<'timestamp' | 'date'>('timestamp');
  const [dateInput, setDateInput] = useState('');

  const convertedDate = useMemo(() => {
    if (mode === 'timestamp') {
      const ts = parseInt(timestamp, 10);
      if (isNaN(ts)) return null;

      let date: Date;
      if (ts > 1e12) {
        date = new Date(ts); // milliseconds
      } else {
        date = new Date(ts * 1000); // seconds
      }

      if (date.toString() === 'Invalid Date') return null;

      return {
        date,
        iso: date.toISOString(),
        utc: date.toUTCString(),
        local: date.toLocaleString(),
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: ts > 1e12 ? ts : ts * 1000,
        unixSeconds: ts > 1e12 ? Math.floor(ts / 1000) : ts,
        unixMs: ts > 1e12 ? ts : ts * 1000,
      };
    }

    if (!dateInput) return null;

    const date = new Date(dateInput);
    if (date.toString() === 'Invalid Date') return null;

    const unixSeconds = Math.floor(date.getTime() / 1000);
    const unixMs = date.getTime();

    return {
      date,
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      milliseconds: unixMs,
      unixSeconds,
      unixMs,
    };
  }, [timestamp, mode, dateInput]);

  const nowTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
  };

  const presetTimestamps = [
    { ts: 0, label: 'Unix Epoch (1970-01-01)' },
    { ts: 1609459200, label: '2021-01-01' },
    { ts: 1640995200, label: '2022-01-01' },
    { ts: 1672531200, label: '2023-01-01' },
    { ts: 1704067200, label: '2024-01-01' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Unix Timestamp Converter</h1>
      <p className="text-zinc-600">Convert Unix timestamps to human-readable dates. Timestamps in seconds or milliseconds. Essential for API debugging, database work, and log analysis.</p>

      <div className="card space-y-4">
        {/* Mode */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Conversion Mode</label>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('timestamp')}
              className={`px-4 py-2 rounded ${mode === 'timestamp' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              Timestamp to Date
            </button>
            <button
              onClick={() => setMode('date')}
              className={`px-4 py-2 rounded ${mode === 'date' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              Date to Timestamp
            </button>
          </div>
        </div>

        {mode === 'timestamp' ? (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Unix Timestamp</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={timestamp}
                onChange={e => setTimestamp(e.target.value)}
                className="flex-1"
                placeholder="Enter Unix timestamp..."
              />
              <button onClick={nowTimestamp} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Now
              </button>
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              Current: {Math.floor(Date.now() / 1000)} (seconds) or {Date.now()} (milliseconds)
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Date Input</label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={e => setDateInput(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Results */}
      {convertedDate && (
        <div className="card bg-blue-50 p-4">
          <h3 className="font-medium mb-3">Conversion Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500 mb-1">Unix Timestamp (seconds)</div>
              <div className="font-bold font-mono text-lg text-blue-600">{convertedDate.unixSeconds}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500 mb-1">Unix Timestamp (milliseconds)</div>
              <div className="font-bold font-mono text-lg">{convertedDate.unixMs}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500 mb-1">ISO 8601</div>
              <div className="font-mono text-sm">{convertedDate.iso}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500 mb-1">UTC</div>
              <div className="font-mono text-sm">{convertedDate.utc}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500 mb-1">Local Time</div>
              <div className="font-mono text-sm">{convertedDate.local}</div>
            </div>
            <div className="bg-white rounded p-3">
              <div className="text-xs text-zinc-500 mb-1">Date Components</div>
              <div className="font-mono text-sm">
                {convertedDate.year}-{convertedDate.month.toString().padStart(2, '0')}-{convertedDate.day.toString().padStart(2, '0')}
                {' '}
                {convertedDate.hours.toString().padStart(2, '0')}:{convertedDate.minutes.toString().padStart(2, '0')}:{convertedDate.seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preset Timestamps */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Timestamps</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          {presetTimestamps.map((preset) => (
            <button
              key={preset.ts}
              onClick={() => { setMode('timestamp'); setTimestamp(preset.ts.toString()); }}
              className="bg-white rounded p-2 hover:bg-zinc-100"
            >
              <div className="font-mono text-blue-600">{preset.ts}</div>
              <div className="text-zinc-500 truncate">{preset.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Unix Timestamp Reference</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">What is Unix Timestamp?</div>
            <div className="bg-white rounded p-2">
              <div>Seconds since Jan 1, 1970 00:00:00 UTC (Unix Epoch). Integer number that increases every second. Timezone-independent. Used in databases, APIs, logs, file systems.</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Seconds vs Milliseconds</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">Seconds</span> 10-digit (1234567890)</div>
              <div><span className="text-blue-600">Milliseconds</span> 13-digit (1234567890000)</div>
              <div><span className="text-blue-600">JavaScript</span> uses milliseconds</div>
              <div><span className="text-blue-600">Unix/PHP</span> typically seconds</div>
              <div>Tool auto-detects from length</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Common Uses</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Database DATETIME fields</div>
              <div>API responses and requests</div>
              <div>Log file timestamps</div>
              <div>File modification times</div>
              <div>Cache expiration TTL</div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Developer Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">API Debug:</span> Decode timestamp fields in JSON responses
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Logs:</span> Parse log timestamps to human-readable
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Database:</span> Convert SQL DATETIME to Unix
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">JWT:</span> Decode exp/iat token fields
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">Cron:</span> Schedule jobs at specific timestamps
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">Files:</span> Convert mtime to readable date
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-indigo-600 font-medium">Cache:</span> Calculate TTL expiration times
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-red-600 font-medium">Testing:</span> Generate timestamps for test data
          </div>
        </div>
      </div>
    </main>
  );
}