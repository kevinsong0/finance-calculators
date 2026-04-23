'use client'

export default function BusinessWorkplaceSafetyComplianceGuide() {
  const areas = [
    { area: 'Physical safety', hazards: 'Equipment, environment', controls: 'Engineering controls' },
    { area: 'Chemical safety', hazards: 'Substances, materials', controls: 'Handling procedures' },
    { area: 'Biological safety', hazards: 'Pathogens, organisms', controls: 'Exposure prevention' },
    { area: 'Ergonomic safety', hazards: 'Work positioning', controls: 'Workspace design' },
    { area: 'Psychological safety', hazards: 'Stress, harassment', controls: 'Support programs' },
    { area: 'Fire safety', hazards: 'Fire risks', controls: 'Prevention systems' },
  ];

  const requirements = [
    'Identify workplace hazards',
    'Assess risk levels',
    'Implement control measures',
    'Train employees on safety',
    'Monitor safety performance',
    'Report safety incidents',
    'Investigate safety events',
    'Correct safety deficiencies',
    'Document safety activities',
    'Review safety compliance',
  ];

  const programs = [
    { program: 'Safety training', purpose: 'Education', frequency: 'Initial and ongoing' },
    { program: 'Safety inspections', purpose: 'Monitoring', frequency: 'Regular audits' },
    { program: 'Incident reporting', purpose: 'Documentation', frequency: 'Event-based' },
    { program: 'Emergency response', purpose: 'Preparedness', frequency: 'Regular drills' },
  ];

  const metrics = [
    'Incident rate',
    'Lost time injuries',
    'Near miss reports',
    'Safety training completion',
    'Inspection compliance',
    'Hazard correction time',
    'Safety suggestion count',
    'Employee safety perception',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Workplace Safety Compliance Guide</h1>
      <p className="text-zinc-600">Areas, requirements, programs, and metrics.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Safety Areas</h3>
        <div className="space-y-1 text-xs">
          {areas.map((a) => (
            <div key={a.area} className="bg-white rounded p-2">
              <strong>{a.area}</strong>
              <div className="text-zinc-500 mt-1">Hazards: {a.hazards}</div>
              <div className="text-green-600 mt-1">Controls: {a.controls}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Compliance Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {requirements.map((r, idx) => (
            <div key={r} className="bg-white rounded p-2">{idx + 1}. {r}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Safety Programs</h3>
        <div className="space-y-1 text-xs">
          {programs.map((p) => (
            <div key={p.program} className="bg-white rounded p-2">
              <strong>{p.program}</strong>
              <div className="text-zinc-500 mt-1">Purpose: {p.purpose}</div>
              <div className="text-green-600 mt-1">Frequency: {p.frequency}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Safety Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Safety Compliance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Identify workplace hazards systematically. 2. Assess risk levels accurately. 3. Implement effective control measures. 4. Train employees on safety thoroughly. 5. Monitor safety performance continuously. 6. Report safety incidents promptly. 7. Investigate safety events thoroughly. 8. Correct safety deficiencies quickly. 9. Document safety activities properly. 10. Review safety compliance regularly. Safety compliance = employee protection. Hazards identified. Risks assessed. Controls implemented. Training provided. Performance monitored. Incidents reported. Events investigated. Deficiencies corrected. Activities documented. Compliance reviewed.
        </div>
      </div>
    </main>
  );
}