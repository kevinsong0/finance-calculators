'use client'

export default function GitBranchNaming() {
  const conventions = [
    { type: 'feature', pattern: 'feature/', example: 'feature/user-authentication', desc: 'New feature development' },
    { type: 'bugfix', pattern: 'bugfix/', example: 'bugfix/login-error', desc: 'Bug fixes' },
    { type: 'hotfix', pattern: 'hotfix/', example: 'hotfix/security-patch', desc: 'Urgent production fixes' },
    { type: 'release', pattern: 'release/', example: 'release/v1.2.0', desc: 'Release preparation' },
    { type: 'docs', pattern: 'docs/', example: 'docs/api-reference', desc: 'Documentation changes' },
    { type: 'refactor', pattern: 'refactor/', example: 'refactor/simplify-logic', desc: 'Code refactoring' },
    { type: 'test', pattern: 'test/', example: 'test/unit-tests', desc: 'Test additions/changes' },
    { type: 'chore', pattern: 'chore/', example: 'chore/update-dependencies', desc: 'Maintenance tasks' },
    { type: 'wip', pattern: 'wip/', example: 'wip/new-dashboard', desc: 'Work in progress' },
    { type: 'experiment', pattern: 'experiment/', example: 'experiment/new-algorithm', desc: 'Experimental features' },
  ];

  const bestPractices = [
    'Use lowercase letters',
    'Separate words with hyphens',
    'Include issue/ticket number',
    'Keep names short and descriptive',
    'Avoid special characters',
    'Use consistent team conventions',
    'Delete merged branches',
    'Use slash for category separation',
  ];

  const namingTips = [
    'feature/issue-123-add-login',
    'bugfix/issue-456-fix-crash',
    'hotfix/critical-security-fix',
    'release/v2.1.0',
    'docs/readme-update',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Git Branch Naming Convention</h1>
      <p className="text-zinc-600">Standard git branch naming conventions for teams. Clear patterns for features, bugfixes, releases, and more. Follow best practices for clean repository.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Branch Type Patterns</h3>
        <div className="space-y-1 text-xs">
          {conventions.map((c, i) => (
            <div key={i} className="bg-white rounded p-2">
              <strong className="font-mono">{c.pattern}</strong> - {c.desc}
              <div className="text-zinc-400 mt-1">Example: <code>{c.example}</code></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Naming Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p, i) => (
            <div key={i} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Examples with Issue Numbers</h3>
        <div className="space-y-1 text-xs font-mono">
          {namingTips.map((n, i) => (
            <div key={i} className="bg-white rounded p-2">{n}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Workflow Integration</h3>
        <div className="text-xs text-zinc-600">
          Create branch: git checkout -b feature/issue-123-new-feature. Work on branch, commit changes. Push: git push -u origin feature/issue-123-new-feature. Create PR/MR. Merge to main. Delete branch: git branch -d feature/issue-123-new-feature. Keep main/master clean, always branch.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Team Conventions</h3>
        <div className="text-xs text-zinc-600">
          Document conventions in README. Use branch protection on main. Require PR reviews before merge. Auto-delete merged branches. Enforce naming with branch naming rules. CI/CD triggered by branch patterns. Consistency improves collaboration.
        </div>
      </div>
    </main>
  );
}