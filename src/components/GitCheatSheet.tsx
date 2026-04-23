'use client'

import { useState } from 'react';

export default function GitCheatSheet() {
  const [filter, setFilter] = useState('');

  const commands = [
    { category: 'Setup', cmd: 'git init', desc: 'Initialize new repository' },
    { category: 'Setup', cmd: 'git clone <url>', desc: 'Clone remote repository' },
    { category: 'Setup', cmd: 'git config --global user.name "name"', desc: 'Set username' },
    { category: 'Setup', cmd: 'git config --global user.email "email"', desc: 'Set email' },
    { category: 'Basic', cmd: 'git status', desc: 'Show working tree status' },
    { category: 'Basic', cmd: 'git add <file>', desc: 'Add file to staging' },
    { category: 'Basic', cmd: 'git add .', desc: 'Add all files to staging' },
    { category: 'Basic', cmd: 'git commit -m "message"', desc: 'Commit staged changes' },
    { category: 'Basic', cmd: 'git log', desc: 'Show commit history' },
    { category: 'Basic', cmd: 'git log --oneline', desc: 'Compact commit history' },
    { category: 'Branch', cmd: 'git branch', desc: 'List all branches' },
    { category: 'Branch', cmd: 'git branch <name>', desc: 'Create new branch' },
    { category: 'Branch', cmd: 'git checkout <branch>', desc: 'Switch to branch' },
    { category: 'Branch', cmd: 'git checkout -b <name>', desc: 'Create and switch branch' },
    { category: 'Branch', cmd: 'git merge <branch>', desc: 'Merge branch into current' },
    { category: 'Branch', cmd: 'git branch -d <name>', desc: 'Delete branch' },
    { category: 'Remote', cmd: 'git remote -v', desc: 'Show remote repositories' },
    { category: 'Remote', cmd: 'git remote add <name> <url>', desc: 'Add remote repository' },
    { category: 'Remote', cmd: 'git fetch <remote>', desc: 'Fetch from remote' },
    { category: 'Remote', cmd: 'git pull <remote> <branch>', desc: 'Pull and merge remote' },
    { category: 'Remote', cmd: 'git push <remote> <branch>', desc: 'Push to remote' },
    { category: 'Remote', cmd: 'git push -u origin main', desc: 'Push and set upstream' },
    { category: 'Undo', cmd: 'git reset <file>', desc: 'Unstage file' },
    { category: 'Undo', cmd: 'git reset HEAD~1', desc: 'Undo last commit, keep changes' },
    { category: 'Undo', cmd: 'git reset --hard HEAD~1', desc: 'Undo last commit, discard changes' },
    { category: 'Undo', cmd: 'git revert <commit>', desc: 'Revert commit safely' },
    { category: 'Undo', cmd: 'git stash', desc: 'Stash working changes' },
    { category: 'Undo', cmd: 'git stash pop', desc: 'Apply stashed changes' },
    { category: 'Stash', cmd: 'git stash list', desc: 'List all stashes' },
    { category: 'Stash', cmd: 'git stash clear', desc: 'Clear all stashes' },
    { category: 'Diff', cmd: 'git diff', desc: 'Show unstaged changes' },
    { category: 'Diff', cmd: 'git diff --staged', desc: 'Show staged changes' },
    { category: 'Diff', cmd: 'git diff <branch>', desc: 'Compare with branch' },
    { category: 'Tag', cmd: 'git tag', desc: 'List all tags' },
    { category: 'Tag', cmd: 'git tag <name>', desc: 'Create tag' },
    { category: 'Tag', cmd: 'git tag -a <name> -m "msg"', desc: 'Create annotated tag' },
    { category: 'Tag', cmd: 'git push --tags', desc: 'Push tags to remote' },
  ];

  const filtered = commands.filter(c =>
    filter === '' ||
    c.category.toLowerCase().includes(filter.toLowerCase()) ||
    c.cmd.toLowerCase().includes(filter.toLowerCase()) ||
    c.desc.toLowerCase().includes(filter.toLowerCase())
  );

  const categoryColors: Record<string, string> = {
    Setup: 'bg-blue-100 text-blue-700',
    Basic: 'bg-green-100 text-green-700',
    Branch: 'bg-purple-100 text-purple-700',
    Remote: 'bg-orange-100 text-orange-700',
    Undo: 'bg-red-100 text-red-700',
    Stash: 'bg-yellow-100 text-yellow-700',
    Diff: 'bg-teal-100 text-teal-700',
    Tag: 'bg-pink-100 text-pink-700',
  };

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Git Cheat Sheet</h1>
      <p className="text-zinc-600">Complete Git command reference. Setup, basic commands, branching, remote operations, undo changes, stash, diff, and tagging. Quick reference for version control workflows.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Search</label>
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Search commands..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Categories</label>
          <div className="flex gap-2">
            {['', 'Setup', 'Basic', 'Branch', 'Remote', 'Undo', 'Stash', 'Diff', 'Tag'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1 rounded text-sm ${filter === cat ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {cat || 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-3">Git Commands ({filtered.length})</h3>
        <div className="space-y-2">
          {filtered.map((c, i) => (
            <div key={i} className="bg-white rounded p-3 flex items-center gap-4">
              <div className={`w-20 text-center px-2 py-1 rounded text-xs font-medium ${categoryColors[c.category]}`}>
                {c.category}
              </div>
              <div className="w-48 font-mono text-sm bg-zinc-100 rounded px-2 py-1">
                {c.cmd}
              </div>
              <div className="flex-1 text-sm text-zinc-600">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Workflows</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">New Feature</div>
            <div className="bg-white rounded p-2 font-mono">
              git checkout -b feature<br />
              git add .<br />
              git commit -m "msg"<br />
              git push -u origin feature
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Merge Branch</div>
            <div className="bg-white rounded p-2 font-mono">
              git checkout main<br />
              git merge feature<br />
              git push<br />
              git branch -d feature
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Undo Commit</div>
            <div className="bg-white rounded p-2 font-mono">
              git log --oneline<br />
              git reset HEAD~1<br />
              git status<br />
              git add . / git checkout .
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Git Best Practices</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Commit often:</span> Small changes</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Write messages:</span> Descriptive</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Branch for features:</span> Isolate work</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Pull before push:</span> Stay synced</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">Use .gitignore:</span> Exclude files</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">Review diff:</span> Before commit</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">Tag releases:</span> Mark versions</div>
          <div className="bg-white rounded p-2"><span className="text-indigo-600 font-medium">Stash changes:</span> Save work</div>
        </div>
      </div>
    </main>
  );
}