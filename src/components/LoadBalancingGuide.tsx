'use client'

export default function LoadBalancingGuide() {
  const algorithms = [
    { algorithm: 'Round Robin', desc: 'Rotate through servers equally', use: 'Equal server capacity' },
    { algorithm: 'Least Connections', desc: 'Route to fewest active', use: 'Long connections' },
    { algorithm: 'IP Hash', desc: 'Route based on client IP', use: 'Session persistence' },
    { algorithm: 'Weighted', desc: 'Distribute by server weight', use: 'Different capacities' },
    { algorithm: 'Random', desc: 'Random distribution', use: 'Simple scenarios' },
  ];

  const types = [
    { type: 'DNS Load Balancing', desc: 'DNS returns multiple IPs', level: 'Network level' },
    { type: 'Hardware Load Balancer', desc: 'Physical device', level: 'Infrastructure' },
    { type: 'Software Load Balancer', desc: 'Software solutions (Nginx, HAProxy)', level: 'Application' },
    { type: 'Cloud Load Balancer', desc: 'Managed service (AWS ALB, GCP)', level: 'Cloud' },
  ];

  const benefits = [
    'High availability',
    'Scalability',
    'Fault tolerance',
    'Traffic distribution',
    'Session persistence',
    'Health checks',
    'SSL termination',
    'Cache optimization',
  ];

  const considerations = [
    'Session persistence needs',
    'Server capacity variation',
    'Health check requirements',
    'SSL termination point',
    'Geographic distribution',
    'Cost vs features',
    'Failover strategy',
    'Monitoring needs',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Load Balancing Guide</h1>
      <p className="text-zinc-600">Algorithms, types, benefits, and implementation considerations.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Algorithms</h3>
        <div className="space-y-1 text-xs">
          {algorithms.map((a) => (
            <div key={a.algorithm} className="bg-white rounded p-2">
              <strong>{a.algorithm}</strong>
              <div className="text-zinc-500 mt-1">{a.desc}</div>
              <div className="text-green-600 mt-1">Use: {a.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Load Balancer Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Level: {t.level}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {benefits.map((b) => (
            <div key={b} className="bg-white rounded p-2">{b}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Considerations</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {considerations.map((c) => (
            <div key={c} className="bg-white rounded p-2">{c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Load Balancing Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess traffic volume and patterns. 2. Determine availability requirements. 3. Choose algorithm based on needs. 4. Select load balancer type (hardware/software/cloud). 5. Configure health checks. 6. Set session persistence if needed. 7. Plan failover strategy. 8. Configure SSL termination. 9. Implement monitoring. 10. Test under load. 11. Document configuration. Load balancing = scalability + availability. Right algorithm + right implementation = performance."
        </div>
      </div>
    </main>
  );
}