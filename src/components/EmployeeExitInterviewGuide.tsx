'use client'

export default function EmployeeExitInterviewGuide() {
  const purposes = [
    { purpose: 'Feedback collection', goal: 'Employee insights', value: 'Improvement' },
    { purpose: 'Trend analysis', goal: 'Pattern identification', value: 'Strategic decisions' },
    { purpose: 'Retention insights', goal: 'Departure reasons', value: 'Prevention' },
    { purpose: 'Culture assessment', goal: 'Environment view', value: 'Culture improvement' },
    { purpose: 'Knowledge transfer', goal: 'Organizational knowledge', value: 'Retention' },
  ];

  const questions = [
    'Primary departure reason',
    'Job satisfaction level',
    'Management feedback',
    'Team dynamics',
    'Company culture views',
    'Compensation satisfaction',
    'Career growth assessment',
    'Work environment',
    'What worked well',
    'What could improve',
    'Recommendation likelihood',
    'Final thoughts',
  ];

  const bestPractices = [
    'Schedule before departure',
    'Choose appropriate interviewer',
    'Create comfortable setting',
    'Ensure confidentiality',
    'Ask open-ended questions',
    'Listen actively',
    'Avoid defensiveness',
    'Document responses',
    'Analyze patterns',
    'Share insights appropriately',
    'Implement improvements',
    'Track outcomes',
  ];

  const analysis = [
    'Aggregate responses',
    'Identify patterns',
    'Categorize themes',
    'Track trends over time',
    'Compare departments',
    'Assess management areas',
    'Evaluate culture issues',
    'Prioritize improvements',
    'Report to leadership',
    'Action on findings',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Employee Exit Interview Guide</h1>
      <p className="text-zinc-600">Purpose, questions, best practices, and analysis.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Interview Purposes</h3>
        <div className="space-y-1 text-xs">
          {purposes.map((p) => (
            <div key={p.purpose} className="bg-white rounded p-2">
              <strong>{p.purpose}</strong>
              <div className="text-zinc-500 mt-1">Goal: {p.goal}</div>
              <div className="text-green-600 mt-1">Value: {p.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Interview Questions</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {questions.map((q, idx) => (
            <div key={q} className="bg-white rounded p-2">{idx + 1}. {q}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((p, idx) => (
            <div key={p} className="bg-white rounded p-2">{idx + 1}. {p}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Analysis Methods</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {analysis.map((a, idx) => (
            <div key={a} className="bg-white rounded p-2">{idx + 1}. {a}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Exit Interview Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Schedule interview before departure date. 2. Choose appropriate interviewer. 3. Create comfortable confidential setting. 4. Prepare interview questions. 5. Use open-ended questions primarily. 6. Listen actively without defensiveness. 7. Ensure confidentiality promised. 8. Document responses accurately. 9. Thank employee for feedback. 10. Aggregate responses for analysis. 11. Identify patterns and themes. 12. Report findings to leadership. 13. Implement improvements. 14. Track outcomes over time. Exit interview = valuable feedback. Timely scheduling. Comfortable setting. Open questions. Active listening. Confidentiality. Thorough documentation. Pattern analysis. Improvement action. Outcome tracking.
        </div>
      </div>
    </main>
  );
}