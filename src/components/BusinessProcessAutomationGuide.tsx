'use client'

export default function BusinessProcessAutomationGuide() {
  const types = [
    { type: 'Workflow automation', scope: 'Process steps', benefit: 'Efficiency' },
    { type: 'Task automation', scope: 'Individual tasks', benefit: 'Productivity' },
    { type: 'Data automation', scope: 'Information handling', benefit: 'Accuracy' },
    { type: 'Decision automation', scope: 'Rule-based choices', benefit: 'Consistency' },
    { type: 'Integration automation', scope: 'System connections', benefit: 'Seamlessness' },
    { type: 'Notification automation', scope: 'Communications', benefit: 'Timeliness' },
  ];

  const process = [
    'Identify automation opportunities',
    'Assess automation feasibility',
    'Select automation tools',
    'Design automation workflows',
    'Build automation solutions',
    'Test automation processes',
    'Implement automation',
    'Monitor automation performance',
    'Maintain automation systems',
    'Optimize automation continuously',
  ];

  const tools = [
    { tool: 'RPA software', purpose: 'Task automation', use: 'Repetitive work' },
    { tool: 'Workflow platforms', purpose: 'Process automation', use: 'Multi-step flows' },
    { tool: 'Integration tools', purpose: 'System connection', use: 'Data sync' },
    { tool: 'AI automation', purpose: 'Smart automation', use: 'Decision support' },
  ];

  const metrics = [
    'Automation coverage',
    'Time saved',
    'Error reduction',
    'Cost savings',
    'Process speed',
    'Staff productivity',
    'Automation ROI',
    'Maintenance effort',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Process Automation Guide</h1>
      <p className="text-zinc-600">Types, process, tools, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Automation Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">Scope: {t.scope}</div>
              <div className="text-green-600 mt-1">Benefit: {t.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Automation Process</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {process.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Automation Tools</h3>
        <div className="space-y-1 text-xs">
          {tools.map((t) => (
            <div key={t.tool} className="bg-white rounded p-2">
              <strong>{t.tool}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {t.purpose}</div>
              <div className="text-green-600 mt-1">Use: {t.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Success Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Process Automation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify automation opportunities systematically. 2. Assess automation feasibility thoroughly. 3. Select appropriate automation tools. 4. Design efficient automation workflows. 5. Build reliable automation solutions. 6. Test automation processes carefully. 7. Implement automation effectively. 8. Monitor automation performance regularly. 9. Maintain automation systems properly. 10. Optimize automation continuously. Process automation = operational efficiency. Opportunities identified. Feasibility assessed. Tools selected. Workflows designed. Solutions built. Processes tested. Automation implemented. Performance monitored. Systems maintained. Automation optimized.
        </div>
      </div>
    </main>
  );
}