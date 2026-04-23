'use client'

export default function EmailMarketingGuide() {
  const components = [
    { component: 'Subject Line', desc: 'Clear, compelling, personalized', tips: 'A/B test, avoid spam triggers' },
    { component: 'Preheader', desc: 'Preview text after subject', tips: 'Complement subject line' },
    { component: 'Header', desc: 'Logo, branding, navigation', tips: 'Consistent with brand' },
    { component: 'Body Content', desc: 'Main message, value proposition', tips: 'Clear hierarchy, scannable' },
    { component: 'CTA Button', desc: 'Call to action, clear next step', tips: 'One primary action per email' },
    { component: 'Footer', desc: 'Contact, social, unsubscribe', tips: 'Legal compliance required' },
  ];

  const metrics = [
    { metric: 'Open Rate', desc: 'Percentage who opened', target: '20-30%' },
    { metric: 'Click Rate', desc: 'Clicked links in email', target: '2-5%' },
    { metric: 'Conversion Rate', desc: 'Completed desired action', target: 'Varies by goal' },
    { metric: 'Bounce Rate', desc: 'Failed to deliver', target: '< 2%' },
    { metric: 'Unsubscribe Rate', desc: 'Opted out after send', target: '< 0.5%' },
    { metric: 'List Growth Rate', desc: 'New subscribers vs lost', target: 'Positive trend' },
  ];

  const bestPractices = [
    { practice: 'Mobile-first design', desc: '60%+ read on mobile' },
    { practice: 'Personalization', desc: 'Use name, behavior, preferences' },
    { practice: 'Segmentation', desc: 'Send relevant content to segments' },
    { practice: 'Clear value proposition', desc: 'Why should they read?' },
    { practice: 'Single CTA', desc: 'One primary action per email' },
    { practice: 'Test everything', desc: 'A/B test subject, content, timing' },
  ];

  const spamTriggers = [
    'ALL CAPS in subject',
    'Excessive punctuation (!!!!)',
    'Spam words: FREE, BUY NOW, CLICK HERE',
    'Misleading subject lines',
    'No unsubscribe link',
    'Large attachments',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Email Marketing Guide</h1>
      <p className="text-zinc-600">Email components, metrics, best practices, and spam triggers.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Email Components</h3>
        <div className="space-y-1 text-xs">
          {components.map((c) => (
            <div key={c.component} className="bg-white rounded p-2">
              <strong>{c.component}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
              <div className="text-green-600 mt-1">Tips: {c.tips}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.map((m) => (
            <div key={m.metric} className="bg-white rounded p-2">
              <strong>{m.metric}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Target: {m.target}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((b) => (
            <div key={b.practice} className="bg-white rounded p-2">
              <strong>{b.practice}</strong>
              <div className="text-zinc-500 mt-1">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Spam Trigger Avoidance</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {spamTriggers.map((s) => (
            <div key={s} className="bg-red-50 rounded p-2 text-red-600">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Email Marketing Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Clean email list (remove inactive). 2. Segment audience. 3. Write compelling subject. 4. Design for mobile. 5. Include clear CTA. 6. Add unsubscribe link. 7. Test before sending. 8. A/B test key elements. 9. Track metrics. 10. Optimize based on results. Email = owned channel, highest ROI when done well.
        </div>
      </div>
    </main>
  );
}