'use client'

export default function SecurityTestingGuide() {
  const types = [
    { type: 'Vulnerability Scanning', desc: 'Automated scan for issues', timing: 'Regular automated' },
    { type: 'Penetration Testing', desc: 'Simulate attacks', timing: 'Annual or major changes' },
    { type: 'Code Review', desc: 'Manual code analysis', timing: 'Development phase' },
    { type: 'Security Audit', desc: 'Comprehensive review', timing: 'Periodic comprehensive' },
    { type: 'Compliance Testing', desc: 'Check regulatory compliance', timing: 'Compliance cycles' },
    { type: 'Red Team Testing', desc: 'Adversarial simulation', timing: 'Enterprise level' },
  ];

  const areas = [
    'Authentication mechanisms',
    'Authorization controls',
    'Input validation',
    'Data encryption',
    'Session management',
    'API security',
    'Infrastructure security',
    'Third-party integrations',
  ];

  const tools = [
    { tool: 'OWASP ZAP', use: 'Web app scanning' },
    { tool: 'Burp Suite', use: 'Penetration testing' },
    { tool: 'SonarQube', use: 'Code analysis' },
    { tool: 'Nessus', use: 'Vulnerability scanning' },
    { tool: 'Qualys', use: 'Cloud security' },
    { tool: 'SAST Tools', use: 'Static analysis' },
  ];

  const process = [
    'Define scope',
    'Identify test areas',
    'Select tools',
    'Execute tests',
    'Analyze results',
    'Prioritize issues',
    'Remediate findings',
    'Verify fixes',
    'Document results',
    'Report to stakeholders',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Security Testing Guide</h1>
      <p className="text-zinc-600">Testing types, areas, tools, and process.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Timing: {t.timing}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Areas</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {areas.map((a) => (
            <div key={a} className="bg-white rounded p-2">{a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.tool} className="bg-white rounded p-2">
              <strong>{t.tool}</strong>
              <div className="text-zinc-500 mt-1">Use: {t.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, i) => (
            <div key={p} className="bg-white rounded p-2">{i + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Security Testing Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define testing scope clearly. 2. Identify all test areas. 3. Select appropriate tools. 4. Execute tests regularly. 5. Analyze results thoroughly. 6. Prioritize issues by risk. 7. Remediate critical first. 8. Verify fixes work. 9. Document all findings. 10. Report to stakeholders. 11. Retest after changes. 12. Maintain testing schedule. Security testing = proactive protection. Regular automated scans. Periodic deep testing. Prioritize by risk. Remediate quickly. Verify fixes. Document everything."
        </div>
      </div>
    </main>
  );
}