'use client'

import { useState } from 'react';

export default function LinuxCheatSheet() {
  const [filter, setFilter] = useState('');

  const commands = [
    { category: 'Files', cmd: 'ls', desc: 'List directory contents' },
    { category: 'Files', cmd: 'ls -la', desc: 'List with details and hidden' },
    { category: 'Files', cmd: 'cd <dir>', desc: 'Change directory' },
    { category: 'Files', cmd: 'pwd', desc: 'Print working directory' },
    { category: 'Files', cmd: 'mkdir <dir>', desc: 'Create directory' },
    { category: 'Files', cmd: 'rm <file>', desc: 'Remove file' },
    { category: 'Files', cmd: 'rm -r <dir>', desc: 'Remove directory recursively' },
    { category: 'Files', cmd: 'cp <src> <dest>', desc: 'Copy file' },
    { category: 'Files', cmd: 'mv <src> <dest>', desc: 'Move or rename file' },
    { category: 'Files', cmd: 'touch <file>', desc: 'Create empty file' },
    { category: 'Files', cmd: 'cat <file>', desc: 'Display file contents' },
    { category: 'Files', cmd: 'head -n 10 <file>', desc: 'Show first 10 lines' },
    { category: 'Files', cmd: 'tail -n 10 <file>', desc: 'Show last 10 lines' },
    { category: 'Files', cmd: 'find . -name "*.txt"', desc: 'Find files by name' },
    { category: 'Search', cmd: 'grep "pattern" <file>', desc: 'Search in file' },
    { category: 'Search', cmd: 'grep -r "pattern" <dir>', desc: 'Search recursively' },
    { category: 'Search', cmd: 'grep -i "pattern"', desc: 'Case insensitive search' },
    { category: 'Search', cmd: 'sed "s/old/new/g" <file>', desc: 'Replace text' },
    { category: 'Process', cmd: 'ps', desc: 'List processes' },
    { category: 'Process', cmd: 'ps aux', desc: 'List all processes' },
    { category: 'Process', cmd: 'kill <pid>', desc: 'Kill process by PID' },
    { category: 'Process', cmd: 'kill -9 <pid>', desc: 'Force kill process' },
    { category: 'Process', cmd: 'top', desc: 'Show running processes' },
    { category: 'Process', cmd: 'htop', desc: 'Interactive process viewer' },
    { category: 'System', cmd: 'df -h', desc: 'Disk space usage' },
    { category: 'System', cmd: 'du -sh <dir>', desc: 'Directory size' },
    { category: 'System', cmd: 'free -h', desc: 'Memory usage' },
    { category: 'System', cmd: 'uptime', desc: 'System uptime' },
    { category: 'System', cmd: 'uname -a', desc: 'System information' },
    { category: 'Network', cmd: 'ping <host>', desc: 'Test connectivity' },
    { category: 'Network', cmd: 'curl <url>', desc: 'HTTP request' },
    { category: 'Network', cmd: 'wget <url>', desc: 'Download file' },
    { category: 'Network', cmd: 'netstat -tuln', desc: 'Show network ports' },
    { category: 'Network', cmd: 'ssh <user>@<host>', desc: 'Remote login' },
    { category: 'Network', cmd: 'scp <file> <user>@<host>:<path>', desc: 'Copy file remotely' },
    { category: 'Permission', cmd: 'chmod 755 <file>', desc: 'Change permissions' },
    { category: 'Permission', cmd: 'chown <user>:<group> <file>', desc: 'Change ownership' },
    { category: 'Archive', cmd: 'tar -czf <archive> <files>', desc: 'Create tar.gz archive' },
    { category: 'Archive', cmd: 'tar -xzf <archive>', desc: 'Extract tar.gz archive' },
    { category: 'Archive', cmd: 'zip <archive> <files>', desc: 'Create zip archive' },
    { category: 'Archive', cmd: 'unzip <archive>', desc: 'Extract zip archive' },
  ];

  const filtered = commands.filter(c =>
    filter === '' ||
    c.category.toLowerCase().includes(filter.toLowerCase()) ||
    c.cmd.toLowerCase().includes(filter.toLowerCase()) ||
    c.desc.toLowerCase().includes(filter.toLowerCase())
  );

  const categoryColors: Record<string, string> = {
    Files: 'bg-blue-100 text-blue-700',
    Search: 'bg-green-100 text-green-700',
    Process: 'bg-purple-100 text-purple-700',
    System: 'bg-orange-100 text-orange-700',
    Network: 'bg-teal-100 text-teal-700',
    Permission: 'bg-red-100 text-red-700',
    Archive: 'bg-pink-100 text-pink-700',
  };

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Linux Command Cheat Sheet</h1>
      <p className="text-zinc-600">Complete Linux command reference. File operations, search, process management, system info, networking, permissions, and archiving. Essential commands for Linux administration.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Search</label>
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Search commands..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Categories</label>
          <div className="flex gap-2">
            {['', 'Files', 'Search', 'Process', 'System', 'Network', 'Permission', 'Archive'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1 rounded text-sm ${filter === cat ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {cat || 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-3">Linux Commands ({filtered.length})</h3>
        <div className="space-y-2">
          {filtered.map((c, i) => (
            <div key={i} className="bg-white rounded p-3 flex items-center gap-4">
              <div className={`w-24 text-center px-2 py-1 rounded text-xs font-medium ${categoryColors[c.category]}`}>
                {c.category}
              </div>
              <div className="w-56 font-mono text-sm bg-zinc-100 rounded px-2 py-1">
                {c.cmd}
              </div>
              <div className="flex-1 text-sm text-zinc-600">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Permission Reference</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">7:</span> rwx (read, write, execute)</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">6:</span> rw (read, write)</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">5:</span> rx (read, execute)</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">4:</span> r (read only)</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">755:</span> Owner rwx, others rx</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">644:</span> Owner rw, others r</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">700:</span> Owner only</div>
          <div className="bg-white rounded p-2"><span className="text-indigo-600 font-medium">777:</span> Everyone full</div>
        </div>
      </div>
    </main>
  );
}