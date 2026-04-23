'use client'

export default function CloudComputingGuide() {
  const serviceModels = [
    { model: 'IaaS', desc: 'Infrastructure as a Service', examples: 'AWS EC2, Azure VMs, GCP Compute' },
    { model: 'PaaS', desc: 'Platform as a Service', examples: 'AWS Elastic Beanstalk, Heroku, GCP App Engine' },
    { model: 'SaaS', desc: 'Software as a Service', examples: 'Gmail, Salesforce, Slack, Dropbox' },
    { model: 'FaaS', desc: 'Function as a Service (Serverless)', examples: 'AWS Lambda, Azure Functions, GCP Cloud Functions' },
  ];

  const providers = [
    { provider: 'AWS', strength: 'Most services, mature, enterprise', market: '32% market share' },
    { provider: 'Azure', strength: 'Microsoft integration, enterprise', market: '23% market share' },
    { provider: 'Google Cloud', strength: 'Data/AI, Kubernetes expertise', market: '10% market share' },
    { provider: 'Others', strength: 'DigitalOcean (simple), Cloudflare (edge)', market: '35%' },
  ];

  const concepts = [
    { concept: 'Virtual Machines', desc: 'Virtual servers with configurable resources' },
    { concept: 'Containers', desc: 'Docker, Kubernetes for portable deployments' },
    { concept: 'Object Storage', desc: 'S3, Blob storage for files/data' },
    { concept: 'Load Balancing', desc: 'Distribute traffic across servers' },
    { concept: 'Auto-Scaling', desc: 'Automatically adjust resources' },
    { concept: 'CDN', desc: 'Content Delivery Network for global distribution' },
  ];

  const bestPractices = [
    'Design for failure (resilience)',
    'Use managed services when possible',
    'Implement auto-scaling',
    'Monitor and log everything',
    'Security by default',
    'Optimize costs (right-sizing)',
    'Backup and disaster recovery',
    'CI/CD for deployments',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Cloud Computing Guide</h1>
      <p className="text-zinc-600">Service models, providers, key concepts, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Service Models</h3>
        <div className="space-y-1 text-xs">
          {serviceModels.map((s) => (
            <div key={s.model} className="bg-white rounded p-2">
              <strong>{s.model}</strong>: {s.desc}
              <div className="text-green-600 mt-1">{s.examples}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Major Providers</h3>
        <div className="space-y-1 text-xs">
          {providers.map((p) => (
            <div key={p.provider} className="bg-white rounded p-2">
              <strong>{p.provider}</strong>
              <div className="text-zinc-500 mt-1">{p.strength}</div>
              <div className="text-green-600 mt-1">{p.market}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Key Concepts</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {concepts.map((c) => (
            <div key={c.concept} className="bg-white rounded p-2">
              <strong>{c.concept}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((b) => (
            <div key={b} className="bg-white rounded p-2">{b}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Cloud Adoption Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess current infrastructure. 2. Define cloud strategy (migrate vs refactor). 3. Choose provider based on needs. 4. Plan migration phases. 5. Set up security controls. 6. Implement monitoring. 7. Train team on cloud tools. 8. Optimize costs continuously. 9. Plan for disasters (backup, DR). 10. Review and iterate. Cloud = flexibility + scale + innovation potential.
        </div>
      </div>
    </main>
  );
}