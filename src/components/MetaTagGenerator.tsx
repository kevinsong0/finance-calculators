'use client'

import { useState } from 'react';

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDesc, setOgDesc] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [ogUrl, setOgUrl] = useState('');
  const [twitterCard, setTwitterCard] = useState<'summary' | 'summary_large_image'>('summary_large_image');
  const [output, setOutput] = useState('');

  const generateMeta = () => {
    const tags: string[] = [];

    // Basic meta
    if (title) tags.push(`<title>${title}</title>`);
    if (description) tags.push(`<meta name="description" content="${description}">`);
    if (keywords) tags.push(`<meta name="keywords" content="${keywords}">`);
    if (author) tags.push(`<meta name="author" content="${author}">`);

    // Open Graph
    const ogTitleVal = ogTitle || title;
    const ogDescVal = ogDesc || description;
    if (ogTitleVal) tags.push(`<meta property="og:title" content="${ogTitleVal}">`);
    if (ogDescVal) tags.push(`<meta property="og:description" content="${ogDescVal}">`);
    if (ogImage) tags.push(`<meta property="og:image" content="${ogImage}">`);
    if (ogUrl) tags.push(`<meta property="og:url" content="${ogUrl}">`);
    tags.push(`<meta property="og:type" content="website">`);

    // Twitter Card
    tags.push(`<meta name="twitter:card" content="${twitterCard}">`);
    if (ogTitleVal) tags.push(`<meta name="twitter:title" content="${ogTitleVal}">`);
    if (ogDescVal) tags.push(`<meta name="twitter:description" content="${ogDescVal}">`);
    if (ogImage) tags.push(`<meta name="twitter:image" content="${ogImage}">`);

    setOutput(tags.join('\n'));
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Meta Tag Generator</h1>
      <p className="text-zinc-600">Generate SEO meta tags, Open Graph, and Twitter Card tags. Optimize for search engines and social media sharing.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Basic SEO Meta Tags</h3>
        <div className="space-y-2">
          <div>
            <label className="text-sm text-zinc-600">Title (50-60 chars)</label>
            <input type="text" className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Page Title" maxLength={60} />
            <span className="text-xs text-zinc-400">{title.length}/60</span>
          </div>
          <div>
            <label className="text-sm text-zinc-600">Description (150-160 chars)</label>
            <textarea className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Page description for search results" maxLength={160} />
            <span className="text-xs text-zinc-400">{description.length}/160</span>
          </div>
          <div>
            <label className="text-sm text-zinc-600">Keywords (comma separated)</label>
            <input type="text" className="w-full p-2 border rounded" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="keyword1, keyword2, keyword3" />
          </div>
          <div>
            <label className="text-sm text-zinc-600">Author</label>
            <input type="text" className="w-full p-2 border rounded" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name" />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Open Graph (Facebook, LinkedIn)</h3>
        <div className="space-y-2">
          <div>
            <label className="text-sm text-zinc-600">OG Title (optional, uses title)</label>
            <input type="text" className="w-full p-2 border rounded" value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} placeholder="Social share title" />
          </div>
          <div>
            <label className="text-sm text-zinc-600">OG Description (optional)</label>
            <textarea className="w-full p-2 border rounded" value={ogDesc} onChange={(e) => setOgDesc(e.target.value)} placeholder="Social share description" />
          </div>
          <div>
            <label className="text-sm text-zinc-600">OG Image URL</label>
            <input type="text" className="w-full p-2 border rounded" value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://example.com/image.jpg" />
          </div>
          <div>
            <label className="text-sm text-zinc-600">OG URL</label>
            <input type="text" className="w-full p-2 border rounded" value={ogUrl} onChange={(e) => setOgUrl(e.target.value)} placeholder="https://example.com/page" />
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Twitter Card</h3>
        <div className="flex gap-2">
          <button onClick={() => setTwitterCard('summary')} className={twitterCard === 'summary' ? 'btn-primary' : 'btn-secondary'}>Summary</button>
          <button onClick={() => setTwitterCard('summary_large_image')} className={twitterCard === 'summary_large_image' ? 'btn-primary' : 'btn-secondary'}>Large Image</button>
        </div>
      </div>

      <button onClick={generateMeta} className="btn-primary w-full">Generate Meta Tags</button>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Generated Meta Tags</h3>
        <textarea className="w-full h-40 p-3 border rounded font-mono text-sm bg-white" value={output} readOnly />
        <button onClick={copyOutput} className="btn-secondary mt-2">Copy Meta Tags</button>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Meta Tag Tips</h3>
        <div className="text-xs text-zinc-600">
          Title: 50-60 characters for best display. Description: 150-160 characters to avoid truncation. OG Image: 1200x630 pixels for Facebook. Keywords: modern SEO de-emphasizes, but still useful. Place tags in &lt;head&gt; section. Test with Facebook Sharing Debugger and Twitter Card Validator.
        </div>
      </div>
    </main>
  );
}