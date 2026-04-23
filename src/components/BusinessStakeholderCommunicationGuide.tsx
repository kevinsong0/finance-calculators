'use client'

export default function BusinessStakeholderCommunicationGuide() {
  const stakeholders = [
    { stakeholder: 'Investors', needs: 'Financial updates', frequency: 'Quarterly' },
    { stakeholder: 'Customers', needs: 'Product information', frequency: 'Regular' },
    { stakeholder: 'Employees', needs: 'Company news', frequency: 'Weekly' },
    { stakeholder: 'Suppliers', needs: 'Order updates', frequency: 'Transaction-based' },
    { stakeholder: 'Regulators', needs: 'Compliance reports', frequency: 'Per requirements' },
    { stakeholder: 'Community', needs: 'CSR activities', frequency: 'Annual' },
  ];

  const strategies = [
    'Map stakeholder needs',
    'Define communication objectives',
    'Develop tailored messages',
    'Select appropriate channels',
    'Schedule communications',
    'Execute communication plans',
    'Monitor stakeholder response',
    'Address stakeholder concerns',
    'Evaluate communication effectiveness',
    'Improve communication approach',
  ];

  const approaches = [
    { approach: 'Proactive', timing: 'Before events', benefit: 'Preparation' },
    { approach: 'Reactive', timing: 'After events', benefit: 'Response' },
    { approach: 'Interactive', timing: 'Continuous', benefit: 'Engagement' },
    { approach: 'Informative', timing: 'Periodic', benefit: 'Education' },
  ];

  const metrics = [
    'Stakeholder satisfaction',
    'Message comprehension',
    'Response rate',
    'Engagement level',
    'Concern resolution',
    'Communication reach',
    'Feedback quality',
    'Relationship strength',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Stakeholder Communication Guide</h1>
      <p className="text-zinc-600">Stakeholders, strategies, approaches, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Stakeholder Types</h3>
        <div className="space-y-1 text-xs">
          {stakeholders.map((s) => (
            <div key={s.stakeholder} className="bg-white rounded p-2">
              <strong>{s.stakeholder}</strong>
              <div className="text-zinc-500 mt-1">Needs: {s.needs}</div>
              <div className="text-green-600 mt-1">Frequency: {s.frequency}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Communication Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {strategies.map((s, idx) => (
            <div key={s} className="bg-white rounded p-2">{idx + 1}. {s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Communication Approaches</h3>
        <div className="space-y-1 text-xs">
          {approaches.map((a) => (
            <div key={a.approach} className="bg-white rounded p-2">
              <strong>{a.approach}</strong>
              <div className="text-zinc-500 mt-1">Timing: {a.timing}</div>
              <div className="text-green-600 mt-1">Benefit: {a.benefit}</div>
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
        <h3 className="font-medium mb-2">Stakeholder Communication Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Map stakeholder needs accurately. 2. Define communication objectives clearly. 3. Develop tailored messages effectively. 4. Select appropriate channels wisely. 5. Schedule communications properly. 6. Execute communication plans consistently. 7. Monitor stakeholder response regularly. 8. Address stakeholder concerns promptly. 9. Evaluate communication effectiveness honestly. 10. Improve communication approach continuously. Stakeholder communication = relationship building. Needs mapped. Objectives defined. Messages developed. Channels selected. Communications scheduled. Plans executed. Response monitored. Concerns addressed. Effectiveness evaluated. Approach improved.
        </div>
      </div>
    </main>
  );
}