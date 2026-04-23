'use client'

export default function ContentWritingGuide() {
  const contentTypes = [
    { type: 'Blog Posts', desc: 'Educational, informative articles', length: '1000-2000 words' },
    { type: 'Product Pages', desc: 'Sales-focused, features/benefits', length: '500-1000 words' },
    { type: 'Landing Pages', desc: 'Conversion-focused, single goal', length: '300-500 words' },
    { type: 'Email Copy', desc: 'Personalized, action-oriented', length: '100-300 words' },
    { type: 'Social Media', desc: 'Engaging, shareable, concise', length: '50-280 characters' },
    { type: 'Technical Docs', desc: 'Clear, accurate, structured', length: 'Varies by topic' },
  ];

  const writingPrinciples = [
    { principle: 'Clear Headlines', desc: 'Capture attention, communicate value' },
    { principle: 'Know Audience', desc: 'Write for specific reader, not everyone' },
    { principle: 'Active Voice', desc: 'Direct, engaging, stronger impact' },
    { principle: 'Scannable Format', desc: 'Headings, bullets, short paragraphs' },
    { principle: 'Value First', desc: 'Answer questions, solve problems' },
    { principle: 'Edit Ruthlessly', desc: 'Remove fluff, tighten sentences' },
  ];

  const seoElements = [
    { element: 'Title Tag', desc: 'Include keyword, 50-60 characters' },
    { element: 'Meta Description', desc: 'Compelling summary, 150-160 characters' },
    { element: 'Headings (H1-H6)', desc: 'Structure content, include keywords' },
    { element: 'Internal Links', desc: 'Connect related content' },
    { element: 'Keywords', desc: 'Natural placement, not over-optimized' },
    { element: 'Alt Text', desc: 'Describe images for accessibility + SEO' },
  ];

  const checklist = [
    'Research topic thoroughly',
    'Define target audience',
    'Outline before writing',
    'Write clear headline',
    'Use subheadings for structure',
    'Keep paragraphs short',
    'Include examples',
    'Add relevant images',
    'Internal links',
    'Proofread multiple times',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Content Writing Guide</h1>
      <p className="text-zinc-600">Content types, writing principles, SEO elements, and checklist.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Content Types</h3>
        <div className="space-y-1 text-xs">
          {contentTypes.map((c) => (
            <div key={c.type} className="bg-white rounded p-2">
              <strong>{c.type}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Length: {c.length}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Writing Principles</h3>
        <div className="space-y-1 text-xs">
          {writingPrinciples.map((w) => (
            <div key={w.principle} className="bg-white rounded p-2">
              <strong>{w.principle}</strong>
              <div className="text-zinc-600 mt-1">{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">SEO Content Elements</h3>
        <div className="space-y-1 text-xs">
          {seoElements.map((s) => (
            <div key={s.element} className="bg-white rounded p-2">
              <strong>{s.element}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Writing Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {checklist.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Content Writing Tips</h3>
        <div className="text-xs text-zinc-600">
          Start with headline (captures attention). Write introduction (hook reader). Structure with headings (scannable). Keep paragraphs short (3-4 sentences). Use active voice (direct, engaging). Include examples (concrete, relatable). Add visuals (breaks up text). Link internally (depth, SEO). Edit for clarity (remove fluff). Proofread (typos kill credibility). Good content = valuable + readable + optimized.
        </div>
      </div>
    </main>
  );
}