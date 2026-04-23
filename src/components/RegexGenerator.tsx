'use client'

import { useState } from 'react';

export default function RegexGenerator() {
  const [patternType, setPatternType] = useState('email');
  const [customRegex, setCustomRegex] = useState('');

  const patterns: Record<string, { name: string; regex: string; desc: string; example: string }> = {
    email: { name: 'Email', regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', desc: 'Matches standard email addresses', example: 'user@example.com' },
    phone: { name: 'Phone (US)', regex: '\\d{3}-\\d{3}-\\d{4}', desc: 'Matches US phone format: 123-456-7890', example: '123-456-7890' },
    phoneIntl: { name: 'Phone (Intl)', regex: '\\+?\\d{1,3}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}', desc: 'Matches international phone numbers', example: '+1-234-567-8900' },
    url: { name: 'URL', regex: 'https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\/\\w\\-.,@?^=%&:~+#]*', desc: 'Matches HTTP/HTTPS URLs', example: 'https://example.com/path' },
    ip: { name: 'IPv4', regex: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', desc: 'Matches IPv4 addresses', example: '192.168.1.1' },
    date: { name: 'Date (YYYY-MM-DD)', regex: '\\d{4}-\\d{2}-\\d{2}', desc: 'Matches ISO date format', example: '2024-01-15' },
    time: { name: 'Time (HH:MM)', regex: '\\d{2}:\\d{2}', desc: 'Matches 24-hour time', example: '14:30' },
    hex: { name: 'Hex Color', regex: '#[0-9a-fA-F]{6}', desc: 'Matches 6-digit hex colors', example: '#ff0000' },
    slug: { name: 'URL Slug', regex: '[a-z0-9]+(?:-[a-z0-9]+)*', desc: 'Matches URL slugs', example: 'my-blog-post' },
    username: { name: 'Username', regex: '[a-zA-Z][a-zA-Z0-9_]{2,15}', desc: 'Alphanumeric, starts with letter, 3-16 chars', example: 'john_doe123' },
    password: { name: 'Password (Strong)', regex: '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}', desc: 'Min 8 chars, upper, lower, digit, special', example: 'Pass@123' },
    creditCard: { name: 'Credit Card', regex: '\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}', desc: 'Matches 16-digit card numbers', example: '1234-5678-9012-3456' },
    ssn: { name: 'SSN (US)', regex: '\\d{3}-\\d{2}-\\d{4}', desc: 'Matches US Social Security Number', example: '123-45-6789' },
    zipcode: { name: 'Zipcode (US)', regex: '\\d{5}(-\\d{4})?', desc: 'Matches US zip codes', example: '12345 or 12345-6789' },
    htmlTag: { name: 'HTML Tag', regex: '<([a-z]+)[^>]*>.*?<\\/\\1>', desc: 'Matches HTML tags with content', example: '<div>content</div>' },
    jsonStr: { name: 'JSON String', regex: '"[^"\\\\]*(\\\\.[^"\\\\]*)*"', desc: 'Matches JSON string values', example: '"value"' },
  };

  const getCurrentPattern = () => {
    if (patternType === 'custom' && customRegex) {
      return { name: 'Custom', regex: customRegex, desc: 'Custom regex pattern', example: 'test input' };
    }
    return patterns[patternType] || patterns.email;
  };

  const copyRegex = () => {
    navigator.clipboard.writeText(getCurrentPattern().regex);
  };

  const generateCode = (lang: string) => {
    const regex = getCurrentPattern().regex;
    const name = getCurrentPattern().name;

    if (lang === 'js') {
      return `const ${name.toLowerCase().replace(/[^a-z]/g, '')}Regex = /${regex}/g;\nconst isValid = ${name.toLowerCase().replace(/[^a-z]/g, '')}Regex.test(input);`;
    } else if (lang === 'python') {
      return `import re\n${name.toLowerCase().replace(/[^a-z]/g, '')}_regex = re.compile(r'${regex}')\nis_valid = ${name.toLowerCase().replace(/[^a-z]/g, '')}_regex.match(input)`;
    } else if (lang === 'php') {
      return `$regex = '/${regex}/';\n$isValid = preg_match($regex, $input);`;
    }
    return '';
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Regex Pattern Generator</h1>
      <p className="text-zinc-600">Generate common regex patterns for email, phone, URL, IP, date, credit card, and more. Get ready-to-use regex with code examples for JavaScript, Python, and PHP.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Pattern Type</label>
          <div className="grid grid-cols-6 gap-2">
            {Object.entries(patterns).map(([key, p]) => (
              <button key={key} onClick={() => setPatternType(key)} className={`px-2 py-1 rounded text-xs ${patternType === key ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {p.name}
              </button>
            ))}
            <button onClick={() => setPatternType('custom')} className={`px-2 py-1 rounded text-xs ${patternType === 'custom' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
              Custom
            </button>
          </div>
        </div>

        {patternType === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Custom Regex</label>
            <input type="text" value={customRegex} onChange={e => setCustomRegex(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Enter your regex pattern" />
          </div>
        )}
      </div>

      <div className="card bg-blue-50 p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{getCurrentPattern().name} Pattern</h3>
          <button onClick={copyRegex} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
        </div>
        <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto">{getCurrentPattern().regex}</pre>
        <div className="text-sm text-zinc-600 mt-2">{getCurrentPattern().desc}</div>
        <div className="text-xs text-zinc-500 mt-1">Example: {getCurrentPattern().example}</div>
      </div>

      <div className="card bg-zinc-50 p-4">
        <h3 className="font-medium mb-2">JavaScript</h3>
        <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto">{generateCode('js')}</pre>
      </div>

      <div className="card bg-zinc-50 p-4">
        <h3 className="font-medium mb-2">Python</h3>
        <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto">{generateCode('python')}</pre>
      </div>

      <div className="card bg-zinc-50 p-4">
        <h3 className="font-medium mb-2">PHP</h3>
        <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto">{generateCode('php')}</pre>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Regex Syntax Reference</h3>
        <div className="grid grid-cols-6 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">\\d</span> Digit 0-9</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">\\w</span> Word char</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">\\s</span> Whitespace</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">.</span> Any char</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">+</span> 1 or more</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">*</span> 0 or more</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">?</span> 0 or 1</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">&#123;n&#125;</span> Exactly n</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">[abc]</span> Set</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">[^abc]</span> Not in set</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">^</span> Start</div>
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">$</span> End</div>
        </div>
      </div>
    </main>
  );
}