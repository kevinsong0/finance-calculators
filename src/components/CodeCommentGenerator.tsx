'use client'

import { useState } from 'react';

export default function CodeCommentGenerator() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [commentStyle, setCommentStyle] = useState<'inline' | 'block' | 'jsdoc'>('jsdoc');
  const [output, setOutput] = useState('');

  const generateComments = () => {
    const lines = code.split('\n');
    const commented: string[] = [];

    if (language === 'javascript' || language === 'typescript') {
      if (commentStyle === 'jsdoc') {
        // Add JSDoc header
        commented.push('/**');
        commented.push(' * Function description');
        commented.push(' * @param {type} paramName - Parameter description');
        commented.push(' * @returns {type} Return value description');
        commented.push(' */');
        lines.forEach(line => {
          if (line.trim().startsWith('function') || line.includes('=>')) {
            commented.push(line + ' // Main function logic');
          } else if (line.includes('return')) {
            commented.push(line + ' // Return result');
          } else if (line.includes('if')) {
            commented.push(line + ' // Conditional check');
          } else if (line.includes('for') || line.includes('while')) {
            commented.push(line + ' // Loop iteration');
          } else {
            commented.push(line);
          }
        });
      } else {
        lines.forEach(line => {
          if (line.trim() && !line.trim().startsWith('//')) {
            commented.push('// ' + getCommentForLine(line, language));
            commented.push(line);
          } else {
            commented.push(line);
          }
        });
      }
    } else if (language === 'python') {
      lines.forEach(line => {
        if (line.trim() && !line.trim().startsWith('#')) {
          commented.push('# ' + getCommentForLine(line, language));
          commented.push(line);
        } else {
          commented.push(line);
        }
      });
    } else if (language === 'css') {
      lines.forEach(line => {
        if (line.includes('{')) {
          commented.push('/* Section: ' + line.split('{')[0].trim() + ' */');
          commented.push(line);
        } else {
          commented.push(line);
        }
      });
    } else if (language === 'html') {
      lines.forEach(line => {
        if (line.includes('<div') || line.includes('<section')) {
          commented.push('<!-- Container/Section -->');
          commented.push(line);
        } else if (line.includes('<h1') || line.includes('<h2')) {
          commented.push('<!-- Heading -->');
          commented.push(line);
        } else {
          commented.push(line);
        }
      });
    } else {
      lines.forEach(line => {
        if (line.trim()) {
          commented.push(getCommentSyntax(language) + ' ' + getCommentForLine(line, language));
          commented.push(line);
        } else {
          commented.push(line);
        }
      });
    }

    setOutput(commented.join('\n'));
  };

  const getCommentForLine = (line: string, lang: string): string => {
    const trimmed = line.trim();
    if (trimmed.includes('function') || trimmed.includes('def ')) return 'Function definition';
    if (trimmed.includes('return')) return 'Return value';
    if (trimmed.includes('if')) return 'Conditional statement';
    if (trimmed.includes('else')) return 'Alternative branch';
    if (trimmed.includes('for') || trimmed.includes('while')) return 'Loop iteration';
    if (trimmed.includes('import') || trimmed.includes('require')) return 'Module import';
    if (trimmed.includes('const') || trimmed.includes('let') || trimmed.includes('var')) return 'Variable declaration';
    if (trimmed.includes('class')) return 'Class definition';
    if (trimmed.includes('print') || trimmed.includes('console')) return 'Output statement';
    return 'Code logic';
  };

  const getCommentSyntax = (lang: string): string => {
    const syntaxes: Record<string, string> = {
      javascript: '//',
      typescript: '//',
      python: '#',
      java: '//',
      c: '//',
      cpp: '//',
      go: '//',
      rust: '//',
      ruby: '#',
      php: '//',
      css: '/* ... */',
      html: '<!-- ... -->',
      sql: '--',
    };
    return syntaxes[lang] || '//';
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const examples: Record<string, string> = {
    javascript: 'function calculateTotal(items) {\n  let total = 0;\n  for (let item of items) {\n    total += item.price;\n  }\n  return total;\n}',
    python: 'def calculate_total(items):\n    total = 0\n    for item in items:\n        total += item["price"]\n    return total',
    css: '.container {\n  display: flex;\n  justify-content: center;\n}\n.button {\n  padding: 10px 20px;\n}',
    html: '<div class="container">\n  <h1>Welcome</h1>\n  <button>Click me</button>\n</div>',
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Code Comment Generator</h1>
      <p className="text-zinc-600">Auto-generate comments for your code. Supports JavaScript, Python, CSS, HTML, and more. Add documentation comments instantly.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Language & Style</h3>
        <div className="flex gap-2 mb-2">
          <select className="p-2 border rounded" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="sql">SQL</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
          <select className="p-2 border rounded" value={commentStyle} onChange={(e) => setCommentStyle(e.target.value as 'inline' | 'block' | 'jsdoc')}>
            <option value="inline">Inline comments</option>
            <option value="block">Block comments</option>
            <option value="jsdoc">JSDoc/Docstring</option>
          </select>
        </div>
        <button onClick={() => setCode(examples[language] || examples.javascript)} className="btn-secondary text-xs">Load Example</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Input Code</h3>
        <textarea
          className="w-full h-40 p-3 border rounded font-mono text-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
        />
        <button onClick={generateComments} className="btn-primary mt-2">Generate Comments</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Commented Code</h3>
        <textarea
          className="w-full h-40 p-3 border rounded font-mono text-sm bg-white"
          value={output}
          readOnly
        />
        <button onClick={copyOutput} className="btn-secondary mt-2">Copy Code</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Comment Styles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2"><code>// comment</code> - JS, TS, Java, C, C++, Go, Rust</div>
          <div className="bg-white rounded p-2"><code># comment</code> - Python, Ruby, Shell</div>
          <div className="bg-white rounded p-2"><code>/* comment */</code> - CSS, C, C++, PHP</div>
          <div className="bg-white rounded p-2"><code>&lt;!-- comment --&gt;</code> - HTML, XML</div>
          <div className="bg-white rounded p-2"><code>-- comment</code> - SQL, Lua</div>
          <div className="bg-white rounded p-2"><code>/** JSDoc */</code> - JavaScript documentation</div>
        </div>
      </div>
    </main>
  );
}