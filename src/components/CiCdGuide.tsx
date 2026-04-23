'use client'

export default function CiCdGuide() {
  const stages = [
    { stage: 'Code', desc: 'Push to repository, trigger pipeline', tool: 'Git, GitHub, GitLab' },
    { stage: 'Build', desc: 'Compile, bundle, create artifacts', tool: 'Webpack, Maven, Gradle' },
    { stage: 'Test', desc: 'Unit, integration, coverage checks', tool: 'Jest, pytest, Selenium' },
    { stage: 'Analyze', desc: 'Lint, security scan, quality gates', tool: 'SonarQube, ESLint, Snyk' },
    { stage: 'Deploy Staging', desc: 'Deploy to test environment', tool: 'Docker, Kubernetes, Helm' },
    { stage: 'Test Staging', desc: 'Smoke, regression, performance', tool: 'Newman, k6, Cypress' },
    { stage: 'Deploy Prod', desc: 'Production deployment', tool: 'Blue-green, canary, rolling' },
    { stage: 'Monitor', desc: 'Health checks, metrics, alerts', tool: 'Prometheus, Grafana' },
  ];

  const strategies = [
    { strategy: 'Blue-Green', desc: 'Two envs, switch instantly', pros: 'Zero downtime, easy rollback' },
    { strategy: 'Canary', desc: 'Gradual rollout to subset', pros: 'Test with real users, limit blast' },
    { strategy: 'Rolling', desc: 'Incremental replace instances', pros: 'Gradual, resource efficient' },
    { strategy: 'Feature Flags', desc: 'Deploy code, enable later', pros: 'Separate deploy from release' },
  ];

  const bestPractices = [
    'Automate everything',
    'Fast feedback loops',
    'Quality gates',
    'Small batches',
    'Fail fast, fix fast',
    'Immutable artifacts',
    'Version everything',
    'Monitor deployments',
  ];

  const tools = [
    { tool: 'GitHub Actions', use: 'CI/CD platform, workflows' },
    { tool: 'Jenkins', use: 'Traditional CI server, plugins' },
    { tool: 'GitLab CI', use: 'Built-in CI/CD, Docker' },
    { tool: 'CircleCI', use: 'Cloud CI, fast builds' },
    { tool: 'ArgoCD', use: 'GitOps deployment, K8s' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">CI/CD Pipeline Guide</h1>
      <p className="text-zinc-600">Pipeline stages, deployment strategies, best practices, and tools.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pipeline Stages</h3>
        <div className="space-y-1 text-xs">
          {stages.map((s) => (
            <div key={s.stage} className="bg-white rounded p-2">
              <strong>{s.stage}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Tools: {s.tool}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Deployment Strategies</h3>
        <div className="space-y-1 text-xs">
          {strategies.map((s) => (
            <div key={s.strategy} className="bg-white rounded p-2">
              <strong>{s.strategy}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Pros: {s.pros}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">CI/CD Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.tool} className="bg-white rounded p-2">
              <strong>{t.tool}</strong>
              <div className="text-zinc-500 mt-1">{t.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">CI/CD Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Version control all code. 2. Automate build process. 3. Run tests on every push. 4. Add quality gates. 5. Build artifacts once. 6. Deploy to staging first. 7. Run smoke tests. 8. Use deployment strategy. 9. Monitor production. 10. Automate rollback. CI = build + test. CD = deploy + release. Automate everything, manual approvals for prod.
        </div>
      </div>
    </main>
  );
}