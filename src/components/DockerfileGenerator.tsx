'use client'

import { useState } from 'react';

export default function DockerfileGenerator() {
  const [baseImage, setBaseImage] = useState('node:18-alpine');
  const [appName, setAppName] = useState('myapp');
  const [port, setPort] = useState('3000');
  const [installCmd, setInstallCmd] = useState('npm ci');
  const [buildCmd, setBuildCmd] = useState('npm run build');
  const [startCmd, setStartCmd] = useState('npm start');
  const [hasHealthcheck, setHasHealthcheck] = useState(false);
  const [hasEnvVars, setHasEnvVars] = useState(false);
  const [multiStage, setMultiStage] = useState(false);

  const templates = [
    { name: 'Node.js', base: 'node:18-alpine', port: '3000', install: 'npm ci', build: 'npm run build', start: 'npm start' },
    { name: 'Python Flask', base: 'python:3.11-slim', port: '5000', install: 'pip install -r requirements.txt', build: '', start: 'flask run --host=0.0.0.0' },
    { name: 'Python Django', base: 'python:3.11-slim', port: '8000', install: 'pip install -r requirements.txt', build: '', start: 'python manage.py runserver 0.0.0.0:8000' },
    { name: 'Go', base: 'golang:1.21-alpine', port: '8080', install: 'go mod download', build: 'go build -o main .', start: './main' },
    { name: 'React', base: 'node:18-alpine', port: '3000', install: 'npm ci', build: 'npm run build', start: 'npm start' },
    { name: 'Next.js', base: 'node:18-alpine', port: '3000', install: 'npm ci', build: 'npm run build', start: 'npm start' },
    { name: 'Rust', base: 'rust:1.70-slim', port: '8080', install: 'cargo build --release', build: '', start: './target/release/myapp' },
    { name: 'Java Spring', base: 'eclipse-temurin:17-jdk-alpine', port: '8080', install: 'mvn install', build: 'mvn package', start: 'java -jar target/*.jar' },
  ];

  const loadTemplate = (t: typeof templates[0]) => {
    setBaseImage(t.base);
    setPort(t.port);
    setInstallCmd(t.install);
    setBuildCmd(t.build);
    setStartCmd(t.start);
  };

  const generateDockerfile = () => {
    const lines: string[] = [];

    if (multiStage) {
      lines.push('# Build stage');
      lines.push(`FROM ${baseImage} AS builder`);
      lines.push(`WORKDIR /app`);
      if (installCmd) lines.push(`RUN ${installCmd}`);
      if (buildCmd) lines.push(`RUN ${buildCmd}`);
      lines.push('');
      lines.push('# Production stage');
      lines.push(`FROM ${baseImage}`);
      lines.push(`WORKDIR /app`);
      lines.push(`COPY --from=builder /app .`);
    } else {
      lines.push(`FROM ${baseImage}`);
      lines.push(`WORKDIR /app`);
      if (installCmd) lines.push(`RUN ${installCmd}`);
      if (buildCmd) lines.push(`RUN ${buildCmd}`);
    }

    if (hasEnvVars) {
      lines.push('ENV NODE_ENV=production');
    }

    lines.push(`EXPOSE ${port}`);

    if (hasHealthcheck) {
      lines.push(`HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:${port}/ || exit 1`);
    }

    lines.push(`CMD ["${startCmd.split(' ')[0]}", "${startCmd.split(' ').slice(1).join('" "')}""]`.replace(', ""]', ']'));

    return lines.join('\n');
  };

  const copyDockerfile = () => {
    navigator.clipboard.writeText(generateDockerfile());
  };

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Dockerfile Generator</h1>
      <p className="text-zinc-600">Generate Dockerfiles for Node.js, Python, Go, React, Next.js, Rust, Java applications. Customize base image, ports, build commands, healthchecks.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Quick Templates</label>
          <div className="flex gap-2 flex-wrap">
            {templates.map((t) => (
              <button key={t.name} onClick={() => loadTemplate(t)} className="px-3 py-1 bg-zinc-100 rounded hover:bg-zinc-200 text-sm">
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Base Image</label>
            <input type="text" value={baseImage} onChange={e => setBaseImage(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">App Name</label>
            <input type="text" value={appName} onChange={e => setAppName(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Port</label>
            <input type="text" value={port} onChange={e => setPort(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Install Command</label>
            <input type="text" value={installCmd} onChange={e => setInstallCmd(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Build Command</label>
            <input type="text" value={buildCmd} onChange={e => setBuildCmd(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Optional" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Start Command</label>
            <input type="text" value={startCmd} onChange={e => setStartCmd(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={hasHealthcheck} onChange={e => setHasHealthcheck(e.target.checked)} />
            <span className="text-sm">Add Healthcheck</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={hasEnvVars} onChange={e => setHasEnvVars(e.target.checked)} />
            <span className="text-sm">Add ENV Variables</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={multiStage} onChange={e => setMultiStage(e.target.checked)} />
            <span className="text-sm">Multi-stage Build</span>
          </label>
        </div>
      </div>

      <div className="card bg-blue-50 p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Generated Dockerfile</h3>
          <button onClick={copyDockerfile} className="px-3 py-1 text-sm bg-white rounded hover:bg-zinc-100">Copy</button>
        </div>
        <pre className="bg-white rounded p-3 font-mono text-sm overflow-auto max-h-48 whitespace-pre-wrap">{generateDockerfile()}</pre>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Dockerfile Instructions</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">FROM:</span> Base image</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">WORKDIR:</span> Working directory</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">RUN:</span> Execute command</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">COPY:</span> Copy files</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">EXPOSE:</span> Port mapping</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">ENV:</span> Environment vars</div>
          <div className="bg-white rounded p-2"><span className="text-red-600 font-medium">CMD:</span> Start command</div>
          <div className="bg-white rounded p-2"><span className="text-indigo-600 font-medium">HEALTHCHECK:</span> Health monitoring</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Alpine images:</span> Smaller size</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Multi-stage:</span> Smaller final image</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Cache layers:</span> Order matters</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Healthcheck:</span> Container monitoring</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">.dockerignore:</span> Exclude files</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">Non-root user:</span> Security</div>
        </div>
      </div>
    </main>
  );
}