'use client'

import { useState, useMemo } from 'react';

export default function DiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showInline, setShowInline] = useState(true);

  const diff = useMemo(() => {
    if (!text1 && !text2) return null;

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');

    const result = [];
    const maxLen = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i] ?? '';
      const line2 = lines2[i] ?? '';

      if (line1 === line2) {
        result.push({ type: 'equal', line1, line2, num: i + 1 });
      } else if (line1 && !line2) {
        result.push({ type: 'removed', line1, line2: '', num: i + 1 });
      } else if (!line1 && line2) {
        result.push({ type: 'added', line1: '', line2, num: i + 1 });
      } else {
        result.push({ type: 'modified', line1, line2, num: i + 1 });
      }
    }

    const added = result.filter(r => r.type === 'added').length;
    const removed = result.filter(r => r.type === 'removed').length;
    const modified = result.filter(r => r.type === 'modified').length;
    const equal = result.filter(r => r.type === 'equal').length;

    return { lines: result, stats: { added, removed, modified, equal, total: maxLen } };
  }, [text1, text2]);

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Text Diff Checker</h1>
      <p className="text-zinc-600">Compare two texts side by side. Highlight additions, deletions, and modifications. Useful for code review, document comparison, and change tracking.</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <label className="block text-sm font-medium text-zinc-700 mb-2">Original Text</label>
          <textarea value={text1} onChange={e => setText1(e.target.value)} className="w-full h-32 p-3 border rounded-lg font-mono text-sm resize-none" placeholder="Enter original text..." />
          <div className="text-xs text-zinc-500 mt-1">{text1.split('\n').length} lines, {text1.length} chars</div>
        </div>
        <div className="card">
          <label className="block text-sm font-medium text-zinc-700 mb-2">Modified Text</label>
          <textarea value={text2} onChange={e => setText2(e.target.value)} className="w-full h-32 p-3 border rounded-lg font-mono text-sm resize-none" placeholder="Enter modified text..." />
          <div className="text-xs text-zinc-500 mt-1">{text2.split('\n').length} lines, {text2.length} chars</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setShowInline(!showInline)} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">
          {showInline ? 'Side by Side' : 'Inline View'}
        </button>
        <button onClick={() => { setText1(''); setText2(''); }} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">
          Clear
        </button>
      </div>

      {diff && (
        <div className="card bg-blue-50 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Diff Results</h3>
            <div className="flex gap-2 text-xs">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">+{diff.stats.added} added</span>
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded">-{diff.stats.removed} removed</span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">~{diff.stats.modified} modified</span>
            </div>
          </div>

          <div className="bg-white rounded p-3 font-mono text-xs overflow-auto max-h-48">
            {showInline ? (
              <div className="space-y-1">
                {diff.lines.map((line, i) => (
                  <div key={i} className={`flex gap-2 p-1 ${line.type === 'added' ? 'bg-green-50' : line.type === 'removed' ? 'bg-red-50' : line.type === 'modified' ? 'bg-yellow-50' : ''}`}>
                    <span className="text-zinc-400 w-6">{line.num}</span>
                    <span className={`w-6 ${line.type === 'added' ? 'text-green-600' : line.type === 'removed' ? 'text-red-600' : line.type === 'modified' ? 'text-yellow-600' : 'text-zinc-400'}`}>
                      {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : line.type === 'modified' ? '~' : ' '}
                    </span>
                    <span className="flex-1 truncate">{line.line1 || line.line2}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-zinc-500 mb-1">Original</div>
                  {diff.lines.map((line, i) => (
                    <div key={i} className={`p-1 ${line.type === 'removed' ? 'bg-red-100' : line.type === 'modified' ? 'bg-yellow-100' : ''}`}>
                      {line.num}: {line.line1}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-zinc-500 mb-1">Modified</div>
                  {diff.lines.map((line, i) => (
                    <div key={i} className={`p-1 ${line.type === 'added' ? 'bg-green-100' : line.type === 'modified' ? 'bg-yellow-100' : ''}`}>
                      {line.num}: {line.line2}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Code Review:</span> Compare versions</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Git Diff:</span> Preview changes</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Documents:</span> Track edits</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Configs:</span> Verify changes</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">Logs:</span> Compare outputs</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">APIs:</span> Response comparison</div>
          <div className="bg-white rounded p-2"><span className="text-indigo-600 font-medium">Files:</span> Content diff</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Debug:</span> Find differences</div>
        </div>
      </div>
    </main>
  );
}