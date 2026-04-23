'use client'

export default function GitWorkflowGuide() {
  const workflows = [
    { workflow: 'Feature Branch', desc: 'Each feature in separate branch, merge to main', use: 'Small teams, simple projects' },
    { workflow: 'GitFlow', desc: 'Main, develop, feature, release, hotfix branches', use: 'Structured releases, enterprise' },
    { workflow: 'Trunk Based', desc: 'All work on main, short-lived branches', use: 'CI/CD, continuous delivery' },
    { workflow: 'GitHub Flow', desc: 'Main + feature branches, PR before merge', use: 'GitHub projects, teams' },
    { workflow: 'Forking', desc: 'Fork repo, changes in fork, submit PR', use: 'Open source, public projects' },
  ];

  const commands = [
    { cmd: 'git checkout -b feature', desc: 'Create and switch to branch' },
    { cmd: 'git merge main', desc: 'Merge main into current branch' },
    { cmd: 'git rebase main', desc: 'Rebase commits onto main' },
    { cmd: 'git cherry-pick', desc: 'Apply specific commit' },
    { cmd: 'git stash', desc: 'Save changes temporarily' },
    { cmd: 'git reset --soft', desc: 'Undo commit, keep changes' },
  ];

  const bestPractices = [
    { practice: 'Commit often', desc: 'Small, logical commits' },
    { practice: 'Write good messages', desc: 'Clear, descriptive commit messages' },
    { practice: 'Pull before push', desc: 'Sync with remote before pushing' },
    { practice: 'Use branches', desc: 'Never work directly on main' },
    { practice: 'Review before merge', desc: 'Code review via PR' },
    { practice: 'Keep branches short', desc: 'Merge/delete feature branches' },
  ];

  const commitMessage = [
    'Prefix with type: feat, fix, docs, style, refactor, test, chore',
    'Brief summary (50 chars max)',
    'Body explains why (wrap at 72 chars)',
    'Reference issues: Fixes #123',
    'Example: feat: Add user authentication',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Git Workflow Guide</h1>
      <p className="text-zinc-600">Workflow types, commands, best practices, and commit messages.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Workflow Types</h3>
        <div className="space-y-1 text-xs">
          {workflows.map((w) => (
            <div key={w.workflow} className="bg-white rounded p-2">
              <strong>{w.workflow}</strong>
              <div className="text-zinc-500 mt-1">{w.desc}</div>
              <div className="text-green-600 mt-1">Use: {w.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Commands</h3>
        <div className="space-y-1 text-xs font-mono">
          {commands.map((c) => (
            <div key={c.cmd} className="bg-white rounded p-2">
              <strong>{c.cmd}</strong>
              <div className="text-zinc-600 mt-1">{c.desc}</div>
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
        <h3 className="font-medium mb-2">Commit Message Format</h3>
        <div className="space-y-1 text-xs">
          {commitMessage.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Workflow Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose workflow (feature branch, GitFlow, trunk-based). 2. Create branch for changes. 3. Make small commits with good messages. 4. Push branch regularly. 5. Pull changes from main/base. 6. Resolve conflicts early. 7. Open pull request. 8. Get code review. 9. Address feedback. 10. Merge when approved. 11. Delete feature branch. Consistent workflow = team productivity.
        </div>
      </div>
    </main>
  );
}