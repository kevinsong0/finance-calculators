'use client'

import { useState, useMemo } from 'react';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and *italic* text.\n\n## Features\n\n- List item 1\n- List item 2\n- List item 3\n\n### Code Example\n\n```javascript\nconst greeting = "Hello";\nconsole.log(greeting);\n```\n\n### Links\n\nVisit [example.com](https://example.com) for more.\n\n### Blockquote\n\n> This is a quoted text block.\n\n---\n\nMade with Markdown');
  const [viewMode, setViewMode] = useState<'split' | 'preview' | 'source'>('split');

  const htmlPreview = useMemo(() => {
    if (!markdown) return '';

    let html = markdown
      // Headers
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      // Bold and italic
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      // Blockquotes
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      // Horizontal rule
      .replace(/^---$/gm, '<hr/>')
      // Lists
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p>')
      .replace(/^\n/, '<p>')
      .replace(/\n$/, '</p>');

    return html;
  }, [markdown]);

  const stats = useMemo(() => {
    const lines = markdown.split('\n').length;
    const words = markdown.split(/\s+/).filter(w => w.length > 0).length;
    const chars = markdown.length;
    const headers = (markdown.match(/^#+ /gm) || []).length;
    const links = (markdown.match(/\[.*?\]\(.*?\)/g) || []).length;
    const codeBlocks = (markdown.match(/```/g) || []).length / 2;

    return { lines, words, chars, headers, links, codeBlocks };
  }, [markdown]);

  const copyHtml = () => {
    navigator.clipboard.writeText(htmlPreview);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
  };

  const examples = [
    { md: '# Heading 1\n## Heading 2\n### Heading 3', desc: 'Headers' },
    { md: '**Bold** and *italic* and `code`', desc: 'Formatting' },
    { md: '- Item 1\n- Item 2\n- Item 3', desc: 'Bullet list' },
    { md: '1. First\n2. Second\n3. Third', desc: 'Numbered list' },
    { md: '[Link text](https://example.com)', desc: 'Links' },
  ];

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Markdown Editor</h1>
      <p className="text-zinc-600">Write and preview Markdown in real-time. See rendered HTML output. Perfect for documentation, README files, blog posts, and technical writing.</p>

      <div className="card space-y-4">
        {/* View Mode */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">View Mode</label>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-2 rounded ${viewMode === 'split' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-2 rounded ${viewMode === 'preview' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode('source')}
              className={`px-3 py-2 rounded ${viewMode === 'source' ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
            >
              Source
            </button>
          </div>
        </div>

        {/* Editor/Preview */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Markdown Input</label>
              <textarea
                value={markdown}
                onChange={e => setMarkdown(e.target.value)}
                className="w-full h-64 p-3 border rounded-lg font-mono text-sm resize-none"
                placeholder="Enter Markdown..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Preview</label>
              <div className="w-full h-64 p-3 border rounded-lg overflow-auto bg-white prose prose-sm">
                <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
              </div>
            </div>
          </div>
        )}

        {viewMode === 'preview' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Preview</label>
            <div className="w-full h-96 p-4 border rounded-lg overflow-auto bg-white prose">
              <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
            </div>
          </div>
        )}

        {viewMode === 'source' && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Markdown Source</label>
            <textarea
              value={markdown}
              onChange={e => setMarkdown(e.target.value)}
              className="w-full h-96 p-3 border rounded-lg font-mono text-sm resize-none"
              placeholder="Enter Markdown..."
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={copyMarkdown} className="px-4 py-2 bg-zinc-100 rounded hover:bg-zinc-200">
            Copy Markdown
          </button>
          <button onClick={copyHtml} className="px-4 py-2 bg-zinc-100 rounded hover:bg-zinc-200">
            Copy HTML
          </button>
          <button onClick={() => setMarkdown('')} className="px-4 py-2 bg-zinc-100 rounded hover:bg-zinc-200">
            Clear
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats.chars > 0 && (
        <div className="card bg-blue-50 p-4">
          <h3 className="font-medium mb-2">Document Statistics</h3>
          <div className="grid grid-cols-6 gap-2 text-xs">
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Lines</div>
              <div className="font-bold">{stats.lines}</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Words</div>
              <div className="font-bold">{stats.words}</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Chars</div>
              <div className="font-bold">{stats.chars}</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Headers</div>
              <div className="font-bold">{stats.headers}</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Links</div>
              <div className="font-bold">{stats.links}</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-zinc-500">Code Blocks</div>
              <div className="font-bold">{stats.codeBlocks}</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Examples */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quick Examples</h3>
        <div className="grid grid-cols-5 gap-2 text-xs">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setMarkdown(ex.md)}
              className="bg-white rounded p-2 hover:bg-zinc-100 text-left"
            >
              <div className="font-mono text-blue-600 truncate">{ex.md}</div>
              <div className="text-zinc-500">{ex.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Markdown Reference */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Markdown Syntax Reference</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Headers</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">#</span> Heading 1</div>
              <div><span className="text-blue-600">##</span> Heading 2</div>
              <div><span className="text-blue-600">###</span> Heading 3</div>
              <div><span className="text-blue-600">####</span> Heading 4</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Formatting</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">**bold**</span> Bold text</div>
              <div><span className="text-blue-600">*italic*</span> Italic text</div>
              <div><span className="text-blue-600">`code`</span> Inline code</div>
              <div><span className="text-blue-600">~~strikethrough~~</span> Strikethrough</div>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Structure</div>
            <div className="bg-white rounded p-2 space-y-1">
              <div><span className="text-blue-600">-</span> Bullet list</div>
              <div><span className="text-blue-600">1.</span> Numbered list</div>
              <div><span className="text-blue-600">&gt;</span> Blockquote</div>
              <div><span className="text-blue-600">---</span> Horizontal rule</div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Developer Use Cases</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2">
            <span className="text-blue-600 font-medium">README:</span> Project documentation
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-green-600 font-medium">Docs:</span> Technical guides
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-purple-600 font-medium">Blogs:</span> Blog posts, articles
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-orange-600 font-medium">API Docs:</span> Endpoint descriptions
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-pink-600 font-medium">Issues:</span> GitHub issues/PRs
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-teal-600 font-medium">Changelog:</span> Release notes
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-indigo-600 font-medium">Wiki:</span> Team knowledge base
          </div>
          <div className="bg-white rounded p-2">
            <span className="text-red-600 font-medium">Comments:</span> Code comments
          </div>
        </div>
      </div>
    </main>
  );
}