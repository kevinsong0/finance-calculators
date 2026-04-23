'use client'

export default function SEOBestPractices() {
  const onPageSEO = [
    { factor: 'Title Tag', desc: 'Include keyword, 50-60 chars', importance: 'High' },
    { factor: 'Meta Description', desc: 'Compelling, 150-160 chars, keyword', importance: 'High' },
    { factor: 'H1 Heading', desc: 'One H1 per page, include keyword', importance: 'High' },
    { factor: 'URL Structure', desc: 'Short, descriptive, hyphens', importance: 'Medium' },
    { factor: 'Internal Links', desc: 'Link to related pages', importance: 'Medium' },
    { factor: 'Image Alt Text', desc: 'Descriptive, include keyword', importance: 'Medium' },
  ];

  const technicalSEO = [
    { factor: 'Site Speed', desc: 'Core Web Vitals pass', importance: 'High' },
    { factor: 'Mobile-Friendly', desc: 'Responsive, usable on mobile', importance: 'High' },
    { factor: 'HTTPS', desc: 'SSL certificate required', importance: 'High' },
    { factor: 'Sitemap', desc: 'XML sitemap submitted', importance: 'Medium' },
    { factor: 'Robots.txt', desc: 'Allow important pages', importance: 'Medium' },
    { factor: 'Structured Data', desc: 'Schema markup for rich results', importance: 'Medium' },
  ];

  const contentSEO = [
    { practice: 'Keyword Research', desc: 'Target relevant, achievable keywords' },
    { practice: 'Quality Content', desc: 'Original, valuable, comprehensive' },
    { practice: 'Content Length', desc: 'Sufficient depth (1000+ words for guides)' },
    { practice: 'Keyword Placement', desc: 'Natural, not over-optimized' },
    { practice: 'Regular Updates', desc: 'Fresh, updated content' },
    { practice: 'Multimedia', desc: 'Images, videos, infographics' },
  ];

  const tools = [
    { name: 'Google Search Console', desc: 'Index status, performance' },
    { name: 'Ahrefs', desc: 'Keyword research, backlinks' },
    { name: 'SEMrush', desc: 'Competitive analysis' },
    { name: 'Screaming Frog', desc: 'Technical SEO crawler' },
    { name: 'PageSpeed Insights', desc: 'Performance analysis' },
    { name: 'Schema Validator', desc: 'Test structured data' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">SEO Best Practices Guide</h1>
      <p className="text-zinc-600">On-page, technical, content SEO factors and tools.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">On-Page SEO Factors</h3>
        <div className="space-y-1 text-xs">
          {onPageSEO.map((o) => (
            <div key={o.factor} className="bg-white rounded p-2">
              <strong>{o.factor}</strong>
              <div className="text-zinc-500 mt-1">{o.desc}</div>
              <div className="text-green-600 mt-1">Importance: {o.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Technical SEO</h3>
        <div className="space-y-1 text-xs">
          {technicalSEO.map((t) => (
            <div key={t.factor} className="bg-white rounded p-2">
              <strong>{t.factor}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Importance: {t.importance}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Content SEO Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {contentSEO.map((c) => (
            <div key={c.practice} className="bg-white rounded p-2">
              <strong>{c.practice}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SEO Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t) => (
            <div key={t.name} className="bg-white rounded p-2">
              <strong>{t.name}</strong>: {t.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SEO Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Keyword research (what users search). 2. On-page optimization (title, meta, headings). 3. Quality content (original, valuable). 4. Technical SEO (speed, mobile, HTTPS). 5. Internal linking (connect pages). 6. External links (quality references). 7. Structured data (rich results). 8. Submit to Search Console. 9. Monitor rankings. 10. Update regularly. SEO = long-term investment, results take months.
        </div>
      </div>
    </main>
  );
}