'use client'

export default function GitCommitGuide() {
  const messageFormat = [
    { format: 'Subject Line', desc: '50 chars max, imperative mood', example: 'Add login validation' },
    { format: 'Body', desc: 'Wrap at 72 chars, explain why', example: 'Separate paragraphs with blank line' },
    { format: 'Footer', desc: 'Reference issues, breaking changes', example: 'Refs: #123, BREAKING CHANGE: api' },
  ];

  const types = [
    { type: 'feat', desc: 'New feature', color: 'green' },
    { type: 'fix', desc: 'Bug fix', color: 'red' },
    { type: 'docs', desc: 'Documentation', color: 'blue' },
    { type: 'style', desc: 'Formatting, no code change', color: 'purple' },
    { type: 'refactor', desc: 'Code restructuring', color: 'orange' },
    { type: 'test', desc: 'Adding tests', color: 'cyan' },
    { type: 'chore', desc: 'Maintenance tasks', color: 'gray' },
  ];

  const bestPractices = [
    'One logical change per commit',
    'Write subject first',
    'Use imperative mood',
    'Don\'t end subject with period',
    'Limit subject to 50 chars',
    'Separate subject from body',
    'Explain why not how',
    'Reference related issues',
  ];

  const mistakes = [
    'Vague messages',
    'Multiple changes per commit',
    'Past tense verbs',
    'Too long subjects',
    'Missing context in body',
    'No issue references',
    'Committing broken code',
    'Huge monolithic commits',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Git Commit Best Practices Guide</h1>
      <p className="text-zinc-600">Message format, commit types, and conventions.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Message Format</h3>
        <div className="space-y-1 text-xs">
          {messageFormat.map((m) => (
            <div key={m.format} className="bg-white rounded p-2">
              <strong>{m.format}</strong>
              <div className="text-zinc-500 mt-1">{m.desc}</div>
              <div className="text-green-600 mt-1">Example: {m.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Commit Types (Conventional)</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>: {t.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mistakes.map((m) => (
            <div key={m} className="bg-white rounded p-2 text-red-600">✗ {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Commit Message Examples</h3>
        <div className="text-xs text-zinc-600">
          Good: &apos;feat: Add user authentication&apos; - clear, specific. Good: &apos;fix: Resolve null pointer in payment&apos; - what fixed. Good: &apos;refactor: Simplify validation logic for readability&apos; - why. Bad: &apos;Fixed stuff&apos; - vague. Bad: &apos;WIP&apos; - not useful. Bad: &apos;Changes&apos; - no context. Commit message = communication. Future developers read this. Write for them, not just yourself. Clear, specific, explain why."
        </div>
      </div>
    </main>
  );
}