'use client'

import { useState, useMemo } from 'react';

export default function XMLFormatter() {
  const [xml, setXML] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const formatted = useMemo(() => {
    if (!xml.trim()) return { output: '', valid: true };

    try {
      // Basic XML formatting
      let result = xml.trim();

      // Remove existing whitespace between tags
      result = result.replace(/>\s+</g, '><');

      // Add newlines after closing tags and before opening tags
      result = result.replace(/</g, '\n<');

      // Split into lines and apply indentation
      const lines = result.split('\n').filter(line => line.trim());
      let indentLevel = 0;
      const formattedLines = lines.map(line => {
        const trimmed = line.trim();

        // Decrease indent for closing tags and self-closing
        if (trimmed.startsWith('</') || trimmed.endsWith('/>')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        // Apply current indentation
        const indentedLine = ' '.repeat(indentLevel * indentSize) + trimmed;

        // Increase indent for opening tags (not self-closing)
        if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
          indentLevel++;
        }

        return indentedLine;
      });

      // Validate basic XML structure
      const errors: string[] = [];
      const tagStack: string[] = [];

      lines.forEach((line, i) => {
        const trimmed = line.trim();
        const selfClosing = trimmed.endsWith('/>');
        const closingTag = trimmed.match(/^<\/(\w+)/);
        const openingTag = trimmed.match(/^<(\w+)/);

        if (selfClosing) return;

        if (closingTag) {
          const tagName = closingTag[1];
          if (tagStack.length === 0) {
            errors.push(`Line ${i + 1}: Unexpected closing tag </${tagName}>`);
          } else if (tagStack[tagStack.length - 1] !== tagName) {
            errors.push(`Line ${i + 1}: Mismatched tags, expected </${tagStack[tagStack.length - 1]}>`);
          } else {
            tagStack.pop();
          }
        } else if (openingTag) {
          tagStack.push(openingTag[1]);
        }
      });

      if (tagStack.length > 0) {
        errors.push(`Unclosed tags: ${tagStack.map(t => `<${t}>`).join(', ')}`);
      }

      return {
        output: formattedLines.join('\n'),
        valid: errors.length === 0,
        errors
      };
    } catch {
      return { output: '', valid: false, errors: ['Parse error'] };
    }
  }, [xml, indentSize]);

  const copyXML = () => {
    navigator.clipboard.writeText(formatted.output);
  };

  const minifyXML = () => {
    if (!xml.trim()) return;
    const minified = xml
      .replace(/>\s+</g, '><')
      .replace(/\s+/g, ' ')
      .trim();
    navigator.clipboard.writeText(minified);
  };

  const examples = {
    simple: `<root><person><name>John</name><age>30</age></person><person><name>Jane</name><age>25</age></person></root>`,
    pom: `<project><modelVersion>4.0.0</modelVersion><groupId>com.example</groupId><artifactId>myapp</artifactId><version>1.0.0</version><dependencies><dependency><groupId>junit</groupId><artifactId>junit</artifactId><version>4.12</version></dependency></dependencies></project>`,
    config: `<configuration><setting name="timeout" value="30"/><setting name="retry" value="3"/><database><host>localhost</host><port>5432</port></database></configuration>`,
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">XML Formatter & Validator</h1>
      <p className="text-zinc-600">Format and validate XML documents. Beautify XML with proper indentation. Check tag matching and structure. Support for Maven POM, config files, and data XML.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Examples</label>
          <div className="flex gap-2">
            {Object.entries(examples).map(([key]) => (
              <button key={key} onClick={() => setXML(examples[key as keyof typeof examples])} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm capitalize">
                {key === 'pom' ? 'Maven POM' : key}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Indent Size</label>
          <div className="flex gap-2">
            {[2, 4].map((size) => (
              <button key={size} onClick={() => setIndentSize(size)} className={`px-3 py-1 rounded ${indentSize === size ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {size} spaces
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Input XML</label>
          <textarea
            value={xml}
            onChange={e => setXML(e.target.value)}
            className="w-full h-40 p-3 border rounded-lg font-mono text-sm resize-none"
            placeholder="Paste XML here..."
          />
        </div>

        <div className="flex gap-2">
          <button onClick={() => setXML('')} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">Clear</button>
        </div>
      </div>

      {formatted.output && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Formatted XML</h3>
            <div className="flex gap-2">
              <button onClick={copyXML} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
              <button onClick={minifyXML} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy Minified</button>
            </div>
          </div>
          <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto max-h-48 whitespace-pre-wrap">{formatted.output}</pre>
          <div className="text-xs text-zinc-500 mt-2">
            {formatted.output.split('\n').length} lines, {formatted.output.length} characters
          </div>
        </div>
      )}

      {formatted.errors && formatted.errors.length > 0 && (
        <div className="card bg-red-50 p-4">
          <h3 className="font-medium text-red-700 mb-2">Validation Errors</h3>
          <div className="space-y-1 text-sm text-red-600">
            {formatted.errors.map((e, i) => <div key={i}>{e}</div>)}
          </div>
        </div>
      )}

      {formatted.valid && xml.trim() && (
        <div className="card bg-green-50 p-4">
          <div className="text-green-700 font-medium">Valid XML structure</div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">XML Syntax Rules</h3>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Tags</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>&lt;tag&gt;content&lt;/tag&gt;</div>
              <div>Every tag must close</div>
              <div>Self-closing: &lt;tag/&gt;</div>
              <div>Tags case-sensitive</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Attributes</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>&lt;tag attr="value"&gt;</div>
              <div>Quotes required</div>
              <div>Single or double quotes</div>
              <div>No duplicate attrs</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Structure</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>Single root element</div>
              <div>Proper nesting</div>
              <div>No overlapping tags</div>
              <div>Hierarchy matters</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Prolog</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div>&lt;?xml version="1.0"?&gt;</div>
              <div>Optional but common</div>
              <div>Encoding declaration</div>
              <div>First line only</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common XML Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Maven:</span> pom.xml</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Ant:</span> build.xml</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Spring:</span> configs</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">SOAP:</span> API messages</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">RSS:</span> feeds</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">SVG:</span> graphics</div>
          <div className="bg-white rounded p-2"><span className="text-indigo-600 font-medium">XHTML:</span> web pages</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Config:</span> app settings</div>
        </div>
      </div>
    </main>
  );
}