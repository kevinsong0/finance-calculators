'use client'

export default function ConfigurationGuide() {
  const types = [
    { type: 'Environment Config', desc: 'Environment-specific settings', location: '.env files' },
    { type: 'Application Config', desc: 'App-level settings', location: 'config files' },
    { type: 'Feature Flags', desc: 'Toggle features', location: 'Feature flag service' },
    { type: 'Infrastructure Config', desc: 'Server/cloud settings', location: 'Terraform/cloud' },
    { type: 'Logging Config', desc: 'Log settings', location: 'Logging config' },
    { type: 'Security Config', desc: 'Security settings', location: 'Security files' },
  ];

  const management = [
    'Version control config files',
    'Separate by environment',
    'Use config validation',
    'Document all settings',
    'Avoid hardcoded values',
    'Encrypt sensitive values',
    'Use config services',
    'Audit config changes',
  ];

  const bestPractices = [
    { practice: 'Externalize', reason: 'Separate from code' },
    { practice: 'Validate', reason: 'Catch errors early' },
    { practice: 'Document', reason: 'Understand settings' },
    { practice: 'Secure', reason: 'Protect sensitive data' },
  ];

  const pitfalls = [
    'Hardcoded configuration',
    'Unencrypted secrets',
    'Missing validation',
    'Undocumented settings',
    'Config in code',
    'Manual updates',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Configuration Management Guide</h1>
      <p className="text-zinc-600">Config types, management, best practices, and pitfalls.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Configuration Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Location: {t.location}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {management.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="space-y-1 text-xs">
          {bestPractices.map((b) => (
            <div key={b.practice} className="bg-white rounded p-2">
              <strong>{b.practice}</strong>
              <div className="text-green-600 mt-1">Reason: {b.reason}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Pitfalls to Avoid</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {pitfalls.map((p) => (
            <div key={p} className="bg-white rounded p-2 text-red-600">{p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Configuration Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Externalize all configuration. 2. Separate by environment (dev/staging/prod). 3. Use version control for configs. 4. Validate configuration at startup. 5. Document all settings clearly. 6. Encrypt sensitive values. 7. Use config management tools. 8. Audit changes regularly. 9. Test config changes. 10. Have rollback plan. 11. Monitor config usage. 12. Keep configs minimal. Configuration = flexibility without code change. Externalize from code. Validate and secure. Document everything. Version control. Audit changes."
        </div>
      </div>
    </main>
  );
}