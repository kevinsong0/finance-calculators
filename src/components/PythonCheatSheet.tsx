'use client'

import { useState } from 'react';

export default function PythonCheatSheet() {
  const [filter, setFilter] = useState('');

  const commands = [
    { category: 'Basics', cmd: 'python --version', desc: 'Check Python version' },
    { category: 'Basics', cmd: 'python script.py', desc: 'Run Python script' },
    { category: 'Basics', cmd: 'python -m module', desc: 'Run module as script' },
    { category: 'Basics', cmd: 'python -c "code"', desc: 'Run code from string' },
    { category: 'Pip', cmd: 'pip install package', desc: 'Install package' },
    { category: 'Pip', cmd: 'pip install package==1.2.3', desc: 'Install specific version' },
    { category: 'Pip', cmd: 'pip install -r requirements.txt', desc: 'Install from file' },
    { category: 'Pip', cmd: 'pip uninstall package', desc: 'Remove package' },
    { category: 'Pip', cmd: 'pip list', desc: 'List installed packages' },
    { category: 'Pip', cmd: 'pip freeze', desc: 'Output installed packages' },
    { category: 'Pip', cmd: 'pip show package', desc: 'Show package info' },
    { category: 'Pip', cmd: 'pip update package', desc: 'Update package' },
    { category: 'Venv', cmd: 'python -m venv venv', desc: 'Create virtual environment' },
    { category: 'Venv', cmd: 'source venv/bin/activate', desc: 'Activate (Linux/Mac)' },
    { category: 'Venv', cmd: 'venv\\Scripts\\activate', desc: 'Activate (Windows)' },
    { category: 'Venv', cmd: 'deactivate', desc: 'Exit virtual environment' },
    { category: 'Venv', cmd: 'pip freeze > requirements.txt', desc: 'Save dependencies' },
    { category: 'Testing', cmd: 'python -m pytest', desc: 'Run pytest tests' },
    { category: 'Testing', cmd: 'python -m unittest', desc: 'Run unittest tests' },
    { category: 'Testing', cmd: 'pytest -v', desc: 'Verbose test output' },
    { category: 'Testing', cmd: 'pytest --cov', desc: 'Run with coverage' },
    { category: 'Format', cmd: 'python -m black file.py', desc: 'Format with Black' },
    { category: 'Format', cmd: 'python -m autopep8 file.py', desc: 'Format with autopep8' },
    { category: 'Lint', cmd: 'python -m flake8 file.py', desc: 'Lint with flake8' },
    { category: 'Lint', cmd: 'python -m pylint file.py', desc: 'Lint with pylint' },
    { category: 'Package', cmd: 'python -m build', desc: 'Build package' },
    { category: 'Package', cmd: 'pip install build', desc: 'Install build tool' },
    { category: 'Package', cmd: 'twine upload dist/*', desc: 'Upload to PyPI' },
    { category: 'Help', cmd: 'python -h', desc: 'Show Python help' },
    { category: 'Help', cmd: 'pip -h', desc: 'Show pip help' },
    { category: 'Help', cmd: 'help(function)', desc: 'Show function docs (in Python)' },
  ];

  const filtered = commands.filter(c =>
    filter === '' ||
    c.category.toLowerCase().includes(filter.toLowerCase()) ||
    c.cmd.toLowerCase().includes(filter.toLowerCase()) ||
    c.desc.toLowerCase().includes(filter.toLowerCase())
  );

  const categoryColors: Record<string, string> = {
    Basics: 'bg-blue-100 text-blue-700',
    Pip: 'bg-green-100 text-green-700',
    Venv: 'bg-purple-100 text-purple-700',
    Testing: 'bg-orange-100 text-orange-700',
    Format: 'bg-teal-100 text-teal-700',
    Lint: 'bg-red-100 text-red-700',
    Package: 'bg-pink-100 text-pink-700',
    Help: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Python Command Cheat Sheet</h1>
      <p className="text-zinc-600">Complete Python command reference. Run scripts, pip install, virtual environments, testing, formatting, linting, and packaging. Essential for Python development workflows.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Search</label>
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Search commands..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Categories</label>
          <div className="flex gap-2">
            {['', 'Basics', 'Pip', 'Venv', 'Testing', 'Format', 'Lint', 'Package', 'Help'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1 rounded text-sm ${filter === cat ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {cat || 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-3">Python Commands ({filtered.length})</h3>
        <div className="space-y-2">
          {filtered.map((c, i) => (
            <div key={i} className="bg-white rounded p-3 flex items-center gap-4">
              <div className={`w-24 text-center px-2 py-1 rounded text-xs font-medium ${categoryColors[c.category]}`}>
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
        <h3 className="font-medium mb-2">Virtual Environment Workflow</h3>
        <div className="bg-white rounded p-3 font-mono text-sm">
          python -m venv venv<br />
          source venv/bin/activate<br />
          pip install -r requirements.txt<br />
          pip freeze &gt; requirements.txt<br />
          deactivate
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pip vs Conda vs Poetry</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <div className="font-medium mb-1">Pip</div>
            <div className="bg-white rounded p-2 font-mono">
              pip install pkg<br />
              pip freeze<br />
              requirements.txt
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Conda</div>
            <div className="bg-white rounded p-2 font-mono">
              conda install pkg<br />
              conda env export<br />
              environment.yml
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Poetry</div>
            <div className="bg-white rounded p-2 font-mono">
              poetry add pkg<br />
              poetry install<br />
              pyproject.toml
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}