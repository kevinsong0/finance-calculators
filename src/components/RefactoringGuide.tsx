'use client'

export default function RefactoringGuide() {
  const types = [
    { type: 'Extract Method', desc: 'Break into smaller methods', when: 'Long methods, duplicate code' },
    { type: 'Extract Class', desc: 'Move to new class', when: 'Too many responsibilities' },
    { type: 'Rename', desc: 'Better names', when: 'Unclear purpose' },
    { type: 'Replace Magic Number', desc: 'Named constants', when: 'Hardcoded values' },
    { type: 'Decompose Conditional', desc: 'Break complex if', when: 'Nested conditions' },
    { type: 'Introduce Parameter', desc: 'Pass instead of global', when: 'Dependencies unclear' },
  ];

  const signs = [
    'Long methods (over 20 lines)',
    'Duplicate code blocks',
    'Large classes (too many methods)',
    'Unclear names',
    'Deep nesting',
    'Too many parameters',
    'Magic numbers/strings',
    'Dead code',
  ];

  const steps = [
    'Identify problem code',
    'Understand current behavior',
    'Write tests if missing',
    'Make small changes',
    'Run tests after each change',
    'Commit frequently',
    'Document changes',
    'Review with team',
  ];

  const principles = [
    'Small incremental changes',
    'Tests before refactoring',
    'Don&apos;t change behavior',
    'One refactoring at a time',
    'Commit after each step',
    'Code review changes',
    'Document intent',
    'Know when to stop',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Code Refactoring Guide</h1>
      <p className="text-zinc-600">Refactoring types, signs, steps, and principles.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Refactoring Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">When: {t.when}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Signs to Refactor</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {signs.map((s) => (
            <div key={s} className="bg-white rounded p-2 text-red-600">⚠️ {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Refactoring Steps</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {steps.map((s, i) => (
            <div key={s} className="bg-white rounded p-2">{i + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Principles</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {principles.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Refactoring Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Have tests covering current behavior. 2. Identify specific problem to address. 3. Plan refactoring approach. 4. Make smallest possible change. 5. Run tests immediately. 6. Continue if tests pass. 7. Commit after each successful change. 8. Review changes with team. 9. Document reasoning in commit. 10. Know when refactoring complete. Refactoring = improve structure without changing behavior. Tests are prerequisite. Small steps, test frequently. Don&apos;t refactor without tests. Don&apos;t change behavior during refactoring."
        </div>
      </div>
    </main>
  );
}