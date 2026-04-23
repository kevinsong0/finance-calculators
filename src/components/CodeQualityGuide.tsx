'use client'

export default function CodeQualityGuide() {
  const metrics = [
    { metric: 'Code Coverage', desc: 'Percentage of code tested', target: '>80% for critical paths' },
    { metric: 'Cyclomatic Complexity', desc: 'Number of decision paths', target: '<10 per function' },
    { metric: 'Lines of Code', desc: 'Code size measure', target: 'Keep functions small' },
    { metric: 'Technical Debt Ratio', desc: 'Remediation / Development time', target: '<5%' },
    { metric: 'Maintainability Index', desc: 'Ease of maintenance', target: '>20 (scale 0-100)' },
  ];

  const principles = [
    { principle: 'Clean Code', desc: 'Readable, simple, well-named' },
    { principle: 'SOLID', desc: 'Single responsibility, open/closed, etc.' },
    { principle: 'DRY', desc: 'Don&apos;t repeat yourself' },
    { principle: 'KISS', desc: 'Keep it simple, stupid' },
    { principle: 'YAGNI', desc: 'You aren&apos;t gonna need it' },
  ];

  const practices = [
    'Consistent naming conventions',
    'Small, focused functions',
    'Clear comments for complex logic',
    'Regular code reviews',
    'Automated testing',
    'Refactor regularly',
    'Static analysis tools',
    'Format code consistently',
  ];

  const tools = [
    { tool: 'SonarQube', use: 'Quality analysis, metrics' },
    { tool: 'ESLint', use: 'JS/TS linting' },
    { tool: 'Prettier', use: 'Code formatting' },
    { tool: 'Pylint', use: 'Python linting' },
    { tool: 'ESLint + Jest', use: 'Test coverage' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Code Quality Guide</h1>
      <p className="text-zinc-600">Metrics, principles, practices, and tools for quality code.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quality Metrics</h3>
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
        <h3 className="font-medium mb-2">Quality Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {practices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quality Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.tool} className="bg-white rounded p-2">
              <strong>{t.tool}</strong>
              <div className="text-zinc-500 mt-1">{t.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Code Quality Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set quality metrics thresholds. 2. Automate linting/formatting. 3. Write meaningful tests. 4. Review code thoroughly. 5. Refactor regularly. 6. Document complex logic. 7. Follow naming conventions. 8. Keep functions small. 9. Measure coverage. 10. Track technical debt. Quality = maintainability + reliability + readability.
        </div>
      </div>
    </main>
  );
}