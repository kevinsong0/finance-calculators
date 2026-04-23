'use client'

export default function GitMergeConflict() {
  const conflictMarkers = [
    { marker: '<<<<<<< HEAD', desc: 'Start of current branch changes' },
    { marker: '=======', desc: 'Separator between branches' },
    { marker: '>>>>>>> branch-name', desc: 'End of incoming branch changes' },
  ];

  const strategies = [
    { name: 'Accept Current', desc: 'Keep your changes, discard incoming', cmd: 'git checkout --ours' },
    { name: 'Accept Incoming', desc: 'Keep incoming changes, discard yours', cmd: 'git checkout --theirs' },
    { name: 'Accept Both', desc: 'Keep both changes (combine)', cmd: 'git merge-file with -p' },
    { name: 'Manual Resolution', desc: 'Edit file to resolve conflicts', cmd: 'Edit file directly' },
  ];

  const tools = [
    { name: 'VS Code', desc: 'Click Accept Current/Incoming/Both in editor' },
    { name: 'git mergetool', desc: 'Opens visual merge tool configured' },
    { name: 'IntelliJ IDEA', desc: 'Three-way merge view in IDE' },
    { name: 'Meld', desc: 'Visual diff and merge tool (Linux)' },
  ];

  const steps = [
    '1. Identify conflict files: git status',
    '2. Open file with conflict markers',
    '3. Understand both versions (<<<<<<< vs >>>>>>>)',
    '4. Choose resolution strategy',
    '5. Remove conflict markers from file',
    '6. Save resolved file',
    '7. Stage resolved file: git add filename',
    '8. Continue merge: git merge --continue',
    '9. Commit: git commit (or auto-commit)',
  ];

  const commonConflicts = [
    'Same line modified in both branches',
    'File deleted in one branch, modified in other',
    'Binary files conflicting',
    'Renamed files causing conflicts',
    'Different whitespace/indentation',
  ];

  const tips = [
    'Pull latest before starting work',
    'Communicate with team about changes',
    'Small frequent commits reduce conflicts',
    'Review changes before merging',
    'Use branches for features, not direct main',
    'Test after resolving conflicts',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Git Merge Conflict Resolution</h1>
      <p className="text-zinc-600">Guide to resolving git merge conflicts. Conflict markers, resolution strategies, tools, step-by-step process. Fix conflicts quickly.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Conflict Markers</h3>
        <div className="space-y-1 text-xs font-mono bg-white rounded p-2">
          <div>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</div>
          <div className="ml-2 text-blue-600">Current branch changes (yours)</div>
          <div>=======</div>
          <div className="ml-2 text-green-600">Incoming branch changes (their)</div>
          <div>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-branch</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Resolution Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.name} className="bg-white rounded p-2">
              <strong>{s.name}</strong>: {s.desc}
              <div className="text-zinc-500 font-mono mt-1">{s.cmd}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Resolution Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t) => (
            <div key={t.name} className="bg-white rounded p-2">
              <strong>{t.name}</strong>: {t.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Step-by-Step Resolution</h3>
        <div className="space-y-1 text-xs">
          {steps.map((s) => (
            <div key={s} className="bg-white rounded p-2">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Conflict Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {commonConflicts.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Prevention Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Example Resolution</h3>
        <div className="text-xs text-zinc-600">
          Before: &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD&lt;br/&gt;const x = 1&lt;br/&gt;=======&lt;br/&gt;const x = 2&lt;br/&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt; branch&lt;br/&gt;After: const x = 1  // or 2, or combined value. Remove all markers and separators. Keep desired code only.
        </div>
      </div>
    </main>
  );
}