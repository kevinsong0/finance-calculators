'use client'

export default function CodeMetricsCalculator() {
  const metrics = [
    { name: 'Cyclomatic Complexity', desc: 'Number of independent paths', good: '< 10', bad: '> 20' },
    { name: 'Lines of Code (LOC)', desc: 'Source code size', good: 'Modular', bad: 'Monolithic' },
    { name: 'Code Coverage', desc: 'Test coverage percentage', good: '> 80%', bad: '< 50%' },
    { name: 'Maintainability Index', desc: 'Ease of maintenance', good: '> 70', bad: '< 20' },
    { name: 'Coupling', desc: 'Dependency between modules', good: 'Low', bad: 'High' },
    { name: 'Cohesion', desc: 'Relatedness in module', good: 'High', bad: 'Low' },
  ];

  const tools = [
    { name: 'SonarQube', desc: 'Code quality platform', type: 'Enterprise' },
    { name: 'ESLint', desc: 'JS/TS linting', type: 'Free' },
    { name: 'Prettier', desc: 'Code formatting', type: 'Free' },
    { name: 'Complexity Report', desc: 'JS complexity', type: 'CLI' },
    { name: 'Code Climate', desc: 'Quality metrics', type: 'SaaS' },
    { name: 'Understand', desc: 'C/C++ metrics', type: 'Commercial' },
  ];

  const complexityGuide = [
    { level: '1-5', desc: 'Simple, easy to test', action: 'No action needed' },
    { level: '6-10', desc: 'Moderate, acceptable', action: 'Consider simplification' },
    { level: '11-20', desc: 'Complex, needs attention', action: 'Refactor recommended' },
    { level: '21-50', desc: 'Very complex, risky', action: 'Refactor required' },
    { level: '>50', desc: 'Untestable, dangerous', action: 'Rewrite module' },
  ];

  const improvements = [
    { issue: 'High complexity', fix: 'Extract functions, reduce branches' },
    { issue: 'Low coverage', fix: 'Add unit tests, test edge cases' },
    { issue: 'High coupling', fix: 'Use interfaces, dependency injection' },
    { issue: 'Low cohesion', fix: 'Split unrelated functions' },
    { issue: 'Large functions', fix: 'Break into smaller functions' },
    { issue: 'Deep nesting', fix: 'Early returns, guard clauses' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Code Metrics Calculator</h1>
      <p className="text-zinc-600">Understand code quality metrics, thresholds, and improvement strategies.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.map((m) => (
            <div key={m.name} className="bg-white rounded p-2">
              <strong>{m.name}</strong>: {m.desc}
              <div className="flex gap-4 mt-1">
                <span className="text-green-600">Good: {m.good}</span>
                <span className="text-red-600">Bad: {m.bad}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Complexity Thresholds</h3>
        <div className="space-y-1 text-xs">
          {complexityGuide.map((c) => (
            <div key={c.level} className="bg-white rounded p-2">
              <strong>Level {c.level}</strong>: {c.desc}
              <div className="text-zinc-500 mt-1">{c.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t) => (
            <div key={t.name} className="bg-white rounded p-2">
              <strong>{t.name}</strong>: {t.desc}
              <div className="text-zinc-500 mt-1">{t.type}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Improvement Strategies</h3>
        <div className="space-y-1 text-xs">
          {improvements.map((i) => (
            <div key={i.issue} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{i.issue}</strong>
              <div className="text-green-600 mt-1">Fix: {i.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Metrics Best Practices</h3>
        <div className="text-xs text-zinc-600">
          Measure regularly (CI/CD integration). Set thresholds for alerts. Track trends over time. Focus on high-impact areas. Don&apos;t optimize metrics blindly - balance with functionality. Good code = readable + maintainable + testable. Metrics help identify problems, not solve them. Human judgment still essential.
        </div>
      </div>
    </main>
  );
}