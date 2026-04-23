'use client'

export default function BusinessRiskManagementGuide() {
  const types = [
    { type: 'Operational risk', source: 'Process failures', mitigation: 'Controls, procedures' },
    { type: 'Financial risk', source: 'Market, credit', mitigation: 'Hedging, diversification' },
    { type: 'Strategic risk', source: 'Business decisions', mitigation: 'Planning, analysis' },
    { type: 'Compliance risk', source: 'Regulatory violations', mitigation: 'Monitoring, training' },
    { type: 'Reputational risk', source: 'Public perception', mitigation: 'Communication, ethics' },
    { type: 'Cyber risk', source: 'Security threats', mitigation: 'Protection, response' },
  ];

  const process = [
    'Identify risks',
    'Assess impact',
    'Evaluate probability',
    'Prioritize risks',
    'Develop mitigation',
    'Implement controls',
    'Monitor effectiveness',
    'Review regularly',
    'Update assessments',
    'Report to leadership',
  ];

  const frameworks = [
    { framework: 'ISO 31000', focus: 'Risk management', approach: 'Standard process' },
    { framework: 'COSO ERM', focus: 'Enterprise risk', approach: 'Integrated model' },
    { framework: 'NIST CSF', focus: 'Cybersecurity', approach: 'Tiered approach' },
    { framework: 'ISO 27001', focus: 'Information security', approach: 'Management system' },
  ];

  const tools = [
    'Risk registers',
    'Heat maps',
    'Probability matrices',
    'Impact assessments',
    'Control testing',
    'Scenario analysis',
    'Key risk indicators',
    'Reporting dashboards',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Risk Management Guide</h1>
      <p className="text-zinc-600">Types, process, frameworks, and tools.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Source: {t.source}</div>
              <div className="text-green-600 mt-1">Mitigation: {t.mitigation}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Management Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk Frameworks</h3>
        <div className="space-y-1 text-xs">
          {frameworks.map((f) => (
            <div key={f.framework} className="bg-white rounded p-2">
              <strong>{f.framework}</strong>
              <div className="text-zinc-500 mt-1">Focus: {f.focus}</div>
              <div className="text-green-600 mt-1">Approach: {f.approach}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t, idx) => (
            <div key={t} className="bg-white rounded p-2">{idx + 1}. {t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Risk Management Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify all risk types. 2. Assess impact severity. 3. Evaluate probability levels. 4. Prioritize by urgency. 5. Develop mitigation strategies. 6. Implement control measures. 7. Monitor effectiveness continuously. 8. Review assessments regularly. 9. Update for changes. 10. Report to leadership. Risk management = proactive protection. Risks identified. Impact assessed. Probability evaluated. Priorities set. Mitigation developed. Controls implemented. Effectiveness monitored. Reviews conducted. Updates applied. Reports delivered.
        </div>
      </div>
    </main>
  );
}