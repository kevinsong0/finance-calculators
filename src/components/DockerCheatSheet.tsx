'use client'

import { useState } from 'react';

export default function DockerCheatSheet() {
  const [filter, setFilter] = useState('');

  const commands = [
    { category: 'Images', cmd: 'docker images', desc: 'List all images' },
    { category: 'Images', cmd: 'docker pull image', desc: 'Pull image from registry' },
    { category: 'Images', cmd: 'docker build -t name .', desc: 'Build image from Dockerfile' },
    { category: 'Images', cmd: 'docker rmi image', desc: 'Remove image' },
    { category: 'Images', cmd: 'docker tag img tag', desc: 'Tag image' },
    { category: 'Images', cmd: 'docker push image', desc: 'Push image to registry' },
    { category: 'Containers', cmd: 'docker ps', desc: 'List running containers' },
    { category: 'Containers', cmd: 'docker ps -a', desc: 'List all containers' },
    { category: 'Containers', cmd: 'docker run image', desc: 'Run container from image' },
    { category: 'Containers', cmd: 'docker run -d image', desc: 'Run in background' },
    { category: 'Containers', cmd: 'docker run -p 80:80 img', desc: 'Run with port mapping' },
    { category: 'Containers', cmd: 'docker stop container', desc: 'Stop container' },
    { category: 'Containers', cmd: 'docker start container', desc: 'Start stopped container' },
    { category: 'Containers', cmd: 'docker rm container', desc: 'Remove container' },
    { category: 'Containers', cmd: 'docker kill container', desc: 'Force stop container' },
    { category: 'Exec', cmd: 'docker exec -it ctr cmd', desc: 'Run command in container' },
    { category: 'Exec', cmd: 'docker exec -it ctr bash', desc: 'Open shell in container' },
    { category: 'Exec', cmd: 'docker logs container', desc: 'View container logs' },
    { category: 'Exec', cmd: 'docker logs -f ctr', desc: 'Follow container logs' },
    { category: 'Compose', cmd: 'docker-compose up', desc: 'Start compose services' },
    { category: 'Compose', cmd: 'docker-compose up -d', desc: 'Start in background' },
    { category: 'Compose', cmd: 'docker-compose down', desc: 'Stop compose services' },
    { category: 'Compose', cmd: 'docker-compose ps', desc: 'List compose services' },
    { category: 'Compose', cmd: 'docker-compose logs', desc: 'View compose logs' },
    { category: 'Compose', cmd: 'docker-compose build', desc: 'Build compose services' },
    { category: 'System', cmd: 'docker info', desc: 'Show Docker info' },
    { category: 'System', cmd: 'docker version', desc: 'Show Docker version' },
    { category: 'System', cmd: 'docker system prune', desc: 'Clean unused resources' },
    { category: 'System', cmd: 'docker stats', desc: 'Show container stats' },
    { category: 'Network', cmd: 'docker network ls', desc: 'List networks' },
    { category: 'Network', cmd: 'docker network create net', desc: 'Create network' },
    { category: 'Volume', cmd: 'docker volume ls', desc: 'List volumes' },
    { category: 'Volume', cmd: 'docker volume create vol', desc: 'Create volume' },
  ];

  const filtered = commands.filter(c =>
    filter === '' ||
    c.category.toLowerCase().includes(filter.toLowerCase()) ||
    c.cmd.toLowerCase().includes(filter.toLowerCase()) ||
    c.desc.toLowerCase().includes(filter.toLowerCase())
  );

  const categoryColors: Record<string, string> = {
    Images: 'bg-blue-100 text-blue-700',
    Containers: 'bg-green-100 text-green-700',
    Exec: 'bg-purple-100 text-purple-700',
    Compose: 'bg-orange-100 text-orange-700',
    System: 'bg-teal-100 text-teal-700',
    Network: 'bg-pink-100 text-pink-700',
    Volume: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <main className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Docker Cheat Sheet</h1>
      <p className="text-zinc-600">Complete Docker command reference. Images, containers, compose, networks, volumes. Essential commands for containerized development and deployment workflows.</p>

      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Search</label>
          <input type="text" value={filter} onChange={e => setFilter(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Search commands..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Categories</label>
          <div className="flex gap-2">
            {['', 'Images', 'Containers', 'Exec', 'Compose', 'System', 'Network', 'Volume'].map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1 rounded text-sm ${filter === cat ? 'bg-blue-500 text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}>
                {cat || 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-3">Docker Commands ({filtered.length})</h3>
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
        <h3 className="font-medium mb-2">Docker Compose Template</h3>
        <div className="bg-white rounded p-3 font-mono text-xs">
          version: '3'<br />
          services:<br />
          {'  '}web:<br />
          {'    '}image: nginx<br />
          {'    '}ports: - "80:80"<br />
          {'  '}db:<br />
          {'    '}image: postgres<br />
          {'    '}environment: POSTGRES_PASSWORD=secret
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Workflows</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-blue-600 font-medium">Build:</span> docker build -t app .</div>
          <div className="bg-white rounded p-2"><span className="text-green-600 font-medium">Run:</span> docker run -d -p 80:80 app</div>
          <div className="bg-white rounded p-2"><span className="text-purple-600 font-medium">Debug:</span> docker exec -it ctr bash</div>
          <div className="bg-white rounded p-2"><span className="text-orange-600 font-medium">Logs:</span> docker logs -f container</div>
          <div className="bg-white rounded p-2"><span className="text-teal-600 font-medium">Clean:</span> docker system prune -a</div>
          <div className="bg-white rounded p-2"><span className="text-pink-600 font-medium">Stop:</span> docker stop container</div>
        </div>
      </div>
    </main>
  );
}