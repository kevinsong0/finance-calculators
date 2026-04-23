'use client'

export default function BusinessSkillsAssessmentGuide() {
  const categories = [
    { category: 'Technical skills', focus: 'Job-specific abilities', method: 'Competency tests' },
    { category: 'Soft skills', focus: 'Interpersonal abilities', method: 'Behavioral assessment' },
    { category: 'Leadership skills', focus: 'Management capabilities', method: 'Leadership assessment' },
    { category: 'Functional skills', focus: 'Domain expertise', method: 'Knowledge tests' },
  ];

  const methods = [
    'Self-assessment surveys',
    'Manager evaluations',
    'Peer feedback',
    'Competency testing',
    'Performance review',
    'Skill inventory',
    'Behavioral observation',
    'Work samples',
    '360-degree feedback',
    'Simulation exercises',
  ];

  const frameworks = [
    { framework: 'Competency model', application: 'Role requirements', benefit: 'Clear standards' },
    { framework: 'Skill matrix', application: 'Team capabilities', benefit: 'Gap visibility' },
    { framework: 'Skill taxonomy', application: 'Skill categorization', benefit: 'Organization' },
    { framework: 'Proficiency levels', application: 'Skill measurement', benefit: 'Progress tracking' },
  ];

  const outcomes = [
    'Skill gaps identified',
    'Training needs defined',
    'Development plans created',
    'Career paths mapped',
    'Hiring criteria clarified',
    'Performance benchmarks set',
    'Team composition optimized',
    'Promotion readiness assessed',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Business Skills Assessment Guide</h1>
      <p className="text-zinc-600">Categories, methods, frameworks, and outcomes.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Skill Categories</h3>
        <div className="space-y-1 text-xs">
          {categories.map((c) => (
            <div key={c.category} className="bg-white rounded p-2">
              <strong>{c.category}</strong>
              <div className="text-zinc-500 mt-1">Focus: {c.focus}</div>
              <div className="text-green-600 mt-1">Method: {c.method}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Assessment Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {methods.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Assessment Frameworks</h3>
        <div className="space-y-1 text-xs">
          {frameworks.map((f) => (
            <div key={f.framework} className="bg-white rounded p-2">
              <strong>{f.framework}</strong>
              <div className="text-zinc-500 mt-1">Application: {f.application}</div>
              <div className="text-green-600 mt-1">Benefit: {f.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Assessment Outcomes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {outcomes.map((o, idx) => (
            <div key={o} className="bg-white rounded p-2">{idx + 1}. {o}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Skills Assessment Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define skill categories comprehensively. 2. Select appropriate assessment methods. 3. Choose suitable assessment frameworks. 4. Conduct thorough skill evaluations. 5. Analyze assessment results carefully. 6. Identify skill gaps accurately. 7. Define training needs clearly. 8. Create development plans effectively. 9. Map career paths appropriately. 10. Track skill progress regularly. Skills assessment = talent development foundation. Categories defined. Methods selected. Frameworks chosen. Evaluations conducted. Results analyzed. Gaps identified. Needs defined. Plans created. Paths mapped. Progress tracked.
        </div>
      </div>
    </main>
  );
}