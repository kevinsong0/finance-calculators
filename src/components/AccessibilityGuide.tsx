'use client'

export default function AccessibilityGuide() {
  const principles = [
    { principle: 'Perceivable', desc: 'Information presentable in ways users can perceive', examples: 'Alt text, captions, contrast' },
    { principle: 'Operable', desc: 'Interface components operable by all users', examples: 'Keyboard nav, no time limits' },
    { principle: 'Understandable', desc: 'Information and UI understandable', examples: 'Clear language, consistent nav' },
    { principle: 'Robust', desc: 'Content compatible with various tools', examples: 'Valid HTML, ARIA labels' },
  ];

  const commonIssues = [
    { issue: 'Missing alt text', impact: 'Screen readers can&apos;t describe images', fix: 'Add descriptive alt="..." for meaningful images' },
    { issue: 'Low contrast', impact: 'Text hard to read for visually impaired', fix: 'WCAG AA: 4.5:1 for normal text, 3:1 for large' },
    { issue: 'Keyboard trap', impact: 'Users can&apos;t navigate away', fix: 'All interactive elements keyboard accessible' },
    { issue: 'No captions', impact: 'Deaf users can&apos;t access video', fix: 'Add captions, transcripts for audio/video' },
    { issue: 'Missing form labels', impact: 'Screen readers can&apos;t identify inputs', fix: 'Add <label> for each input' },
    { issue: 'Time limits', impact: 'Users can&apos;t complete tasks', fix: 'Allow extending or disabling limits' },
  ];

  const testingTools = [
    { name: 'axe DevTools', desc: 'Browser extension for automated testing' },
    { name: 'WAVE', desc: 'Web accessibility evaluation tool' },
    { name: 'Lighthouse', desc: 'Chrome DevTools accessibility audit' },
    { name: 'NVDA', desc: 'Free screen reader for testing' },
    { name: 'VoiceOver', desc: 'Mac/iOS screen reader' },
    { name: 'Pa11y', desc: 'CLI accessibility testing' },
  ];

  const checklist = [
    'Alt text for images',
    'Keyboard navigation works',
    'Color contrast sufficient',
    'Form labels present',
    'Headings structured (H1-H6)',
    'Links have clear purpose',
    'Videos have captions',
    'No keyboard traps',
    'Focus visible on all elements',
    'Skip to content link',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Web Accessibility Guide</h1>
      <p className="text-zinc-600">WCAG principles, common issues, testing tools, and checklist.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">WCAG Principles (POUR)</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Examples: {p.examples}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Accessibility Issues</h3>
        <div className="space-y-1 text-xs">
          {commonIssues.map((c) => (
            <div key={c.issue} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{c.issue}</strong>
              <div className="text-zinc-600 mt-1">{c.impact}</div>
              <div className="text-green-600 mt-1">Fix: {c.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {testingTools.map((t) => (
            <div key={t.name} className="bg-white rounded p-2">
              <strong>{t.name}</strong>: {t.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Accessibility Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {checklist.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Why Accessibility Matters</h3>
        <div className="text-xs text-zinc-600">
          15% of world population has disabilities. Legal requirement in many jurisdictions (ADA, Section 508). SEO benefit (structured content, alt text). Better UX for all users. Inclusive design = ethical + practical. Accessibility not extra feature - should be default. Test with real users, not just tools. Fix issues early, not retroactive.
        </div>
      </div>
    </main>
  );
}