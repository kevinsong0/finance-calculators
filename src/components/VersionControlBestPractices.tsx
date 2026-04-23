'use client'

export default function VersionControlBestPractices() {
  const practices = [
    { practice: 'Commit Often', desc: 'Small, frequent commits easier to review', benefit: 'Easier rollback, clear history' },
    { practice: 'Meaningful Messages', desc: 'Clear description of what and why', benefit: 'Understandable history' },
    { practice: 'Pull Before Push', desc: 'Sync with remote before pushing', benefit: 'Avoid conflicts' },
    { practice: 'Use Branches', desc: 'Feature branches for all changes', benefit: 'Isolated development' },
    { practice: 'Review Before Merge', desc: 'Code review via pull request', benefit: 'Quality, knowledge sharing' },
    { practice: 'Delete Old Branches', desc: 'Clean up after merge', benefit: 'Reduce clutter' },
  ];

  const commitFormat = [
    { type: 'feat', desc: 'New feature' },
    { type: 'fix', desc: 'Bug fix' },
    { type: 'docs', desc: 'Documentation changes' },
    { type: 'style', desc: 'Formatting, no code change' },
    { type: 'refactor', desc: 'Code restructuring' },
    { type: 'test', desc: 'Adding tests' },
    { type: 'chore', desc: 'Maintenance, dependencies' },
  ];

  const branchStrategies = [
    { strategy: 'feature/', desc: 'New features', example: 'feature/user-auth' },
    { strategy: 'bugfix/', desc: 'Bug fixes', example: 'bugfix/login-error' },
    { strategy: 'hotfix/', desc: 'Urgent production fixes', example: 'hotfix/security-patch' },
    { strategy: 'release/', desc: 'Release preparation', example: 'release/v2.0' },
  ];

  const tips = [
    'Never commit to main directly',
    'Use .gitignore properly',
    'Don\'t commit secrets/credentials',
    'Resolve conflicts carefully',
    'Tag releases',
    'Use git stash for temp changes',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Version Control Best Practices</h1>
      <p className="text-zinc-600">Git practices, commit format, branch strategies, and tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="space-y-1 text-xs">
          {practices.map((p) => (
            <div key={p.practice} className="bg-white rounded p-2">
              <strong>{p.practice}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
              <div className="text-green-600 mt-1">Benefit: {p.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Commit Message Format</h3>
        <div className="space-y-1 text-xs font-mono">
          {commitFormat.map((c) => (
            <div key={c.type} className="bg-white rounded p-2">
              <strong>{c.type}</strong>: {c.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Branch Naming Strategies</h3>
        <div className="space-y-1 text-xs">
          {branchStrategies.map((b) => (
            <div key={b.strategy} className="bg-white rounded p-2">
              <strong>{b.strategy}</strong>: {b.desc}
              <div className="font-mono text-green-600 mt-1">{b.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Git Workflow Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Create feature branch. 2. Make small commits. 3. Write clear messages. 4. Push regularly. 5. Pull updates. 6. Resolve conflicts. 7. Open pull request. 8. Get review. 9. Address feedback. 10. Merge and cleanup. Version control = collaboration foundation. Follow practices consistently.
        </div>
      </div>
    </main>
  );
}