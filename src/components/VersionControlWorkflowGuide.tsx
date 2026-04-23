'use client'

export default function VersionControlWorkflowGuide() {
  const workflows = [
    { workflow: 'GitFlow', branches: 'Multiple long-lived', use: 'Large projects' },
    { workflow: 'GitHub Flow', branches: 'Feature + main', use: 'Continuous deployment' },
    { workflow: 'Trunk-based', branches: 'Main only', use: 'Fast iteration' },
    { workflow: 'Release Flow', branches: 'Release branches', use: 'Scheduled releases' },
  ];

  const branching = [
    'Feature branches',
    'Release branches',
    'Hotfix branches',
    'Main/master branch',
    'Develop branch',
    'Staging branch',
    'Production branch',
    'Personal branches',
  ];

  const operations = [
    'Clone repository',
    'Create branch',
    'Make commits',
    'Push changes',
    'Pull updates',
    'Merge branches',
    'Resolve conflicts',
    'Create pull request',
    'Review changes',
    'Merge to main',
    'Tag release',
    'Cherry-pick commits',
  ];

  const bestPractices = [
    'Commit frequently',
    'Write clear messages',
    'Pull before push',
    'Review before merge',
    'Delete merged branches',
    'Use meaningful names',
    'Avoid large commits',
    'Test before merge',
    'Keep branches short-lived',
    'Communicate with team',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Version Control Workflow Guide</h1>
      <p className="text-zinc-600">Workflows, branching, operations, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Workflow Types</h3>
        <div className="space-y-1 text-xs">
          {workflows.map((w) => (
            <div key={w.workflow} className="bg-white rounded p-2">
              <strong>{w.workflow}</strong>
              <div className="text-zinc-500 mt-1">Branches: {w.branches}</div>
              <div className="text-green-600 mt-1">Best for: {w.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Branch Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {branching.map((b, idx) => (
            <div key={b} className="bg-white rounded p-2">{idx + 1}. {b}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Operations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {operations.map((o, idx) => (
            <div key={o} className="bg-white rounded p-2">{idx + 1}. {o}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Workflow Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Choose appropriate workflow. 2. Define branching strategy. 3. Set naming conventions. 4. Create branch protection rules. 5. Require code review. 6. Automate testing. 7. Write clear commit messages. 8. Keep branches short-lived. 9. Clean up merged branches. 10. Use pull requests. 11. Document workflow. 12. Train team members. Version control = organized collaboration. Workflow chosen. Branching strategy. Naming conventions. Protection rules. Code review. Clear commits. Clean branches. Team training.
        </div>
      </div>
    </main>
  );
}