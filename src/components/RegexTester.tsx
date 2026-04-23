'use client'

import { useState, useMemo } from 'react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('[a-zA-Z]+');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('Hello World 123 test@example.com');

  const results = useMemo(() => {
    if (!pattern || !testString) return null;

    try {
      const regex = new RegExp(pattern, flags);
      const matches = [];

      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.groups,
          });
          if (match[0].length === 0) regex.lastIndex++;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.groups,
          });
        }
      }

      return { matches, regex: regex.toString(), valid: true };
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Unknown error', valid: false };
    }
  }, [pattern, flags, testString]);

  const highlightedText = useMemo(() => {
    if (!results || !results.valid || !results.matches || results.matches.length === 0) return testString;

    const positions = results.matches.map(m => [m.index, m.index + m.match.length]);
    let result = '';
    let lastIndex = 0;

    const sortedPositions = positions.sort((a, b) => a[0] - b[0]);
    for (const pos of sortedPositions) {
      const start = pos[0];
      const end = pos[1];
      if (start > lastIndex) {
        result += testString.slice(lastIndex, start);
      }
      result += `<span style="background-color:#fef08a;padding:0 2px;border-radius:2px">${testString.slice(start, end)}</span>`;
      lastIndex = end;
    }
    result += testString.slice(lastIndex);

    return result;
  }, [results, testString]);

  const examples = [
    { pattern: '\\d+', desc: 'Match all numbers', flags: 'g' },
    { pattern: '[A-Z][a-z]+', desc: 'Match capitalized words', flags: 'g' },
    { pattern: '\\b\\w+@\\w+\\.\\w+\\b', desc: 'Match email addresses', flags: 'g' },
    { pattern: '(https?:\\/\\/)?[\\w.-]+\\.[a-z]{2,}', desc: 'Match URLs', flags: 'g' },
    { pattern: '^\\d{3}-\\d{2}-\\d{4}$', desc: 'Match SSN format', flags: '' },
    { pattern: '(\\d{3})-(\\d{3})-(\\d{4})', desc: 'Match phone with groups', flags: 'g' },
  ];

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Regex Tester</h1>
      <p className="text-zinc-600">Test regular expressions with live highlighting. Debug patterns, view capture groups, and learn regex syntax.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Regular Expression Pattern</label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">/</span>
              <input
                type="text"
                value={pattern}
                onChange={e => setPattern(e.target.value)}
                className="w-full pl-7 pr-7"
                placeholder="[a-zA-Z]+"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">/</span>
            </div>
            <input
              type="text"
              value={flags}
              onChange={e => setFlags(e.target.value)}
              className="w-20"
              placeholder="gi"
            />
          </div>
          {results && !results.valid && (
            <div className="text-red-600 text-sm mt-1">{results.error}</div>
          )}
          {results && results.valid && (
            <div className="text-green-600 text-sm mt-1">Valid: {results.regex}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Flags</label>
          <div className="flex gap-2">
            {['g', 'i', 'm', 's', 'u'].map(f => (
              <button
                key={f}
                onClick={() => setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f)}
                className={`px-3 py-1 rounded text-sm ${flags.includes(f) ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Test String</label>
          <textarea
            value={testString}
            onChange={e => setTestString(e.target.value)}
            className="w-full h-24 p-3 border rounded-lg font-mono text-sm"
            placeholder="Enter text to test..."
          />
        </div>
      </div>

      {results && results.valid && results.matches && results.matches.length > 0 && (
        <div className="card bg-blue-50 p-4">
          <h3 className="font-medium mb-3">Match Results ({results.matches.length} found)</h3>
          <div className="bg-white rounded p-3 font-mono text-sm break-all" dangerouslySetInnerHTML={{ __html: highlightedText }} />
          <div className="mt-3 space-y-1 font-mono text-sm">
            {results.matches.map((m, i) => (
              <div key={i} className="bg-white rounded p-2">
                Match {i + 1}: "{m.match}" at index {m.index}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quick Examples</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => { setPattern(ex.pattern); setFlags(ex.flags); }}
              className="bg-white rounded p-2 hover:bg-zinc-100 text-left"
            >
              <div className="font-mono text-blue-600">{ex.pattern}</div>
              <div className="text-zinc-500">{ex.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Regex Reference</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Character Classes</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>. Any char</div>
              <div>\d Digit</div>
              <div>\w Word char</div>
              <div>\s Whitespace</div>
              <div>[abc] Set</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Quantifiers</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>* 0 or more</div>
              <div>+ 1 or more</div>
              <div>? 0 or 1</div>
              <div>&#123;n&#125; Exactly n</div>
              <div>&#123;n,m&#125; Range</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Anchors</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>^ Start</div>
              <div>$ End</div>
              <div>\b Boundary</div>
              <div>() Group</div>
              <div>\ Escape</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}