'use client'

export default function EnvironmentVariablesGuide() {
  const environments = [
    { name: 'Development', desc: 'Local testing, debug enabled', example: 'DEBUG=true, LOG_LEVEL=debug' },
    { name: 'Staging', desc: 'Pre-production testing', example: 'API_URL=https://staging.api.com' },
    { name: 'Production', desc: 'Live environment', example: 'DEBUG=false, LOG_LEVEL=error' },
    { name: 'Testing', desc: 'CI/CD tests', example: 'MOCK_API=true' },
  ];

  const commonVars = [
    { key: 'DATABASE_URL', desc: 'Database connection string' },
    { key: 'API_KEY', desc: 'External API authentication' },
    { key: 'SECRET_KEY', desc: 'App secret for encryption' },
    { key: 'PORT', desc: 'Server port number' },
    { key: 'NODE_ENV', desc: 'Node environment mode' },
    { key: 'LOG_LEVEL', desc: 'Logging verbosity' },
    { key: 'JWT_SECRET', desc: 'JWT signing secret' },
    { key: 'REDIS_URL', desc: 'Redis connection' },
  ];

  const platforms = [
    { name: '.env file', desc: 'dotenv package, local development', load: 'require("dotenv").config()' },
    { name: 'Vercel', desc: 'Environment variables in dashboard', load: 'Auto-loaded, accessible' },
    { name: 'Docker', desc: 'docker-compose.yml or -e flag', load: 'environment: - KEY=value' },
    { name: 'Kubernetes', desc: 'ConfigMaps and Secrets', load: 'envFrom: configMapRef' },
    { name: 'AWS', desc: 'Parameter Store, Secrets Manager', load: 'AWS SDK retrieval' },
    { name: 'GitHub Actions', desc: 'Repository secrets', load: 'env: KEY: ${{ secrets.KEY }}' },
  ];

  const bestPractices = [
    'Never commit .env to git',
    'Add .env to .gitignore',
    'Use .env.example for documentation',
    'Different values per environment',
    'Encrypt secrets in production',
    'Rotate secrets regularly',
    'Use secret management tools',
    'Validate required variables',
    'Use typed configuration',
    'Don\'t expose secrets in logs',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Environment Variables Guide</h1>
      <p className="text-zinc-600">Environment variables best practices. Common patterns, platforms, security. Manage config across environments.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Environment Types</h3>
        <div className="space-y-1 text-xs">
          {environments.map((e) => (
            <div key={e.name} className="bg-white rounded p-2">
              <strong>{e.name}</strong>: {e.desc}
              <div className="text-zinc-500 font-mono mt-1">{e.example}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Variables</h3>
        <div className="space-y-1 text-xs font-mono">
          {commonVars.map((v) => (
            <div key={v.key} className="bg-white rounded p-2">
              <strong>{v.key}</strong>: {v.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Platform-Specific Loading</h3>
        <div className="space-y-1 text-xs">
          {platforms.map((p) => (
            <div key={p.name} className="bg-white rounded p-2">
              <strong>{p.name}</strong>: {p.desc}
              <div className="text-zinc-500 font-mono mt-1">{p.load}</div>
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
        <h3 className="font-medium mb-2">.env Example</h3>
        <div className="text-xs font-mono bg-white rounded p-2">
          # Database<br/>
          DATABASE_URL=postgresql://user:pass@host:5432/db<br/>
          <br/>
          # API Keys<br/>
          API_KEY=your_api_key_here<br/>
          SECRET_KEY=your_secret_here<br/>
          <br/>
          # App Config<br/>
          PORT=3000<br/>
          NODE_ENV=development<br/>
          LOG_LEVEL=debug
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Security Tips</h3>
        <div className="text-xs text-zinc-600">
          Never log secrets. Use different keys per environment. Encrypt in transit. Use secret managers (Vault, AWS Secrets Manager). Audit secret access. Rotate on schedule. Don&apos;t embed in code. Use CI/CD secrets. Separate config from secrets. Minimum privilege access.
        </div>
      </div>
    </main>
  );
}