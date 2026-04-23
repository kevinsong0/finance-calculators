'use client'

export default function UXDesignPrinciplesGuide() {
  const principles = [
    { principle: 'User-Centered Design', desc: 'Design for user needs, not assumptions', example: 'User research, personas, testing' },
    { principle: 'Consistency', desc: 'Same patterns throughout interface', example: 'Same button style, navigation' },
    { principle: 'Feedback', desc: 'System responds to user actions', example: 'Button hover, loading states' },
    { principle: 'Simplicity', desc: 'Remove unnecessary complexity', example: 'Clear hierarchy, minimal steps' },
    { principle: 'Accessibility', desc: 'Usable by all abilities', example: 'Screen reader friendly, contrast' },
    { principle: 'Visibility', desc: 'Important elements clearly visible', example: 'Primary action prominent' },
  ];

  const heuristics = [
    { heuristic: 'Visibility of System Status', desc: 'Keep users informed about what\'s happening' },
    { heuristic: 'Match Real World', desc: 'Use familiar concepts, natural language' },
    { heuristic: 'User Control', desc: 'Give users control, allow undo/reverse' },
    { heuristic: 'Consistency & Standards', desc: 'Follow platform conventions' },
    { heuristic: 'Error Prevention', desc: 'Design to prevent errors before they occur' },
    { heuristic: 'Recognition over Recall', desc: 'Minimize memory load, make options visible' },
  ];

  const methods = [
    { method: 'User Interviews', desc: 'Understand needs, motivations directly' },
    { method: 'Surveys', desc: 'Quantitative feedback from many users' },
    { method: 'Usability Testing', desc: 'Test interface with real users' },
    { method: 'A/B Testing', desc: 'Compare design alternatives' },
    { method: 'Personas', desc: 'Representative user profiles' },
    { method: 'Wireframing', desc: 'Low-fidelity layout sketches' },
  ];

  const checklist = [
    'Clear visual hierarchy',
    'Consistent patterns',
    'Accessible to all users',
    'Feedback on interactions',
    'Error prevention/recovery',
    'Mobile-responsive',
    'Fast loading',
    'User tested',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">UX Design Principles Guide</h1>
      <p className="text-zinc-600">Core principles, Nielsen heuristics, methods, and design checklist.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Core Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Example: {p.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Nielsen Heuristics</h3>
        <div className="space-y-1 text-xs">
          {heuristics.map((h) => (
            <div key={h.heuristic} className="bg-white rounded p-2">
              <strong>{h.heuristic}</strong>
              <div className="text-zinc-600 mt-1">{h.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">UX Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {methods.map((m) => (
            <div key={m.method} className="bg-white rounded p-2">
              <strong>{m.method}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Design Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {checklist.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">UX Design Tips</h3>
        <div className="text-xs text-zinc-600">
          Design for users (research first). Keep it simple (remove friction). Be consistent (patterns matter). Provide feedback (show system response). Prevent errors (better than recovery). Test with real users (not assumptions). Iterate based on data. Consider accessibility (all abilities). Good UX = user achieves goal easily + enjoys experience.
        </div>
      </div>
    </main>
  );
}