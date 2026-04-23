'use client'

export default function CodeReviewBestPracticesGuide() {
  const reviewChecklist = [
    'Functionality works correctly',
    'Code is readable and clear',
    'Follows style guidelines',
    'No security vulnerabilities',
    'Tests cover new code',
    'No unnecessary complexity',
    'Performance acceptable',
    'Error handling complete',
  ];

  const reviewTypes = [
    { type: 'Functionality', focus: 'Does it work as intended?' },
    { type: 'Design', focus: 'Is the approach appropriate?' },
    { type: 'Security', focus: 'Are there vulnerabilities?' },
    { type: 'Performance', focus: 'Is it efficient enough?' },
    { type: 'Readability', focus: 'Can others understand it?' },
    { type: 'Testing', focus: 'Are tests adequate?' },
  ];

  const feedbackTips = [
    'Be specific and actionable',
    'Explain the why',
    'Separate critical from nitpick',
    'Use positive feedback too',
    'Ask questions not demands',
    'Suggest alternatives',
    'Focus on code not person',
    'Respond timely',
  ];

  const authorTips = [
    'Submit small PRs',
    'Provide context in description',
    'Self-review before submitting',
    'Respond to feedback constructively',
    'Don\'t take criticism personally',
    'Ask for clarification if needed',
    'Thank reviewers',
    'Learn from patterns',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Code Review Best Practices Guide</h1>
      <p className="text-zinc-600">Review checklist, feedback tips, and reviewer/author responsibilities.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Review Checklist</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {reviewChecklist.map((c) => (
            <div key={c} className="bg-white rounded p-2">✓ {c}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Review Focus Areas</h3>
        <div className="space-y-1 text-xs">
          {reviewTypes.map((r) => (
            <div key={r.type} className="bg-white rounded p-2">
              <strong>{r.type}</strong>
              <div className="text-green-600 mt-1">{r.focus}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Reviewer Feedback Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {feedbackTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Author Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {authorTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Code Review Guidelines</h3>
        <div className="text-xs text-zinc-600">
          Reviewer responsibilities: Be timely (within 24-48 hours), be constructive, focus on important issues, don&apos;t block for nitpicks. Author responsibilities: Small focused PRs, clear description, self-review first, respond constructively. Both: Focus on code quality, not personal preferences. Use code review for learning. Discuss design decisions before implementation if complex. Code review = quality gate + learning opportunity. Review for correctness, readability, security. Give specific feedback, explain reasoning. Keep PRs small for faster review."
        </div>
      </div>
    </main>
  );
}