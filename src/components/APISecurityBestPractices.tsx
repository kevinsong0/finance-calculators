'use client'

export default function APISecurityBestPractices() {
  const authMethods = [
    { name: 'API Key', desc: 'Simple, identify applications', pros: 'Easy, fast', cons: 'No user context, can leak' },
    { name: 'OAuth 2.0', desc: 'User authorization, third-party', pros: 'Secure, user context', cons: 'Complex, redirect flow' },
    { name: 'JWT', desc: 'Self-contained tokens', pros: 'Stateless, scalable', cons: 'Token size, expiry handling' },
    { name: 'Basic Auth', desc: 'Username/password header', pros: 'Simple', cons: 'Not secure without TLS' },
    { name: 'Session Cookie', desc: 'Server-side session', pros: 'Simple logout', cons: 'Server storage needed' },
  ];

  const bestPractices = [
    'Always use HTTPS/TLS',
    'Never store secrets in code',
    'Use environment variables',
    'Implement rate limiting',
    'Validate all input',
    'Sanitize output',
    'Use CORS properly',
    'Log authentication attempts',
    'Implement token rotation',
    'Set appropriate expiry',
    'Use short-lived tokens',
    'Implement scopes/permissions',
  ];

  const commonVulnerabilities = [
    { vuln: 'SQL Injection', fix: 'Use parameterized queries, ORM' },
    { vuln: 'Broken Authentication', fix: 'Strong passwords, MFA, secure sessions' },
    { vuln: 'Sensitive Data Exposure', fix: 'Encrypt data, HTTPS, minimize storage' },
    { vuln: 'Rate Limiting Missing', fix: 'Implement throttling per key/user' },
    { vuln: 'Broken Access Control', fix: 'Check permissions on every request' },
    { vuln: 'Security Misconfiguration', fix: 'Hardened defaults, error handling' },
  ];

  const headers = [
    { header: 'Authorization', desc: 'Bearer token or API key' },
    { header: 'X-API-Key', desc: 'Custom API key header' },
    { header: 'X-Request-ID', desc: 'Unique request tracking' },
    { header: 'X-RateLimit-Limit', desc: 'Rate limit information' },
    { header: 'X-RateLimit-Remaining', desc: 'Remaining requests' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">API Security Best Practices</h1>
      <p className="text-zinc-600">API security guide. Authentication methods, best practices, common vulnerabilities. Secure your API endpoints.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Authentication Methods</h3>
        <div className="space-y-1 text-xs">
          {authMethods.map((m) => (
            <div key={m.name} className="bg-white rounded p-2">
              <strong>{m.name}</strong>: {m.desc}
              <div className="text-green-600 mt-1">Pros: {m.pros}</div>
              <div className="text-red-600">Cons: {m.cons}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Security Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p) => (
            <div key={p} className="bg-white rounded p-2">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Vulnerabilities & Fixes</h3>
        <div className="space-y-1 text-xs">
          {commonVulnerabilities.map((v) => (
            <div key={v.vuln} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{v.vuln}</strong>: {v.fix}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Security Headers</h3>
        <div className="space-y-1 text-xs font-mono">
          {headers.map((h) => (
            <div key={h.header} className="bg-white rounded p-2">
              {h.header}: {h.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Rate Limiting Strategy</h3>
        <div className="text-xs text-zinc-600">
          Implement rate limiting: by IP address (simple), by API key (per application), by user ID (per user). Typical limits: 100 requests/minute, 1000/hour. Response: 429 Too Many Requests, Retry-After header. Use: Redis for counters, sliding window algorithm. Protect against: DDoS, abuse, brute force.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">JWT Security Tips</h3>
        <div className="text-xs text-zinc-600">
          JWT best practices: short expiry (15-30 min), use refresh tokens, strong secret key, validate signature, check expiry, verify issuer, implement scopes, don&apos;t store sensitive data in payload, use HTTPS, rotate signing keys periodically. Never accept unsigned tokens.
        </div>
      </div>
    </main>
  );
}