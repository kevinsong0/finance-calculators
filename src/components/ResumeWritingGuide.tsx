'use client'

export default function ResumeWritingGuide() {
  const sections = [
    { section: 'Contact Info', desc: 'Name, email, phone, location (optional links)', priority: 'Required' },
    { section: 'Summary', desc: '2-3 lines highlighting value, key achievements', priority: 'Recommended' },
    { section: 'Experience', desc: 'Relevant jobs, achievements not duties', priority: 'Required' },
    { section: 'Skills', desc: 'Technical skills, tools, certifications', priority: 'Required' },
    { section: 'Education', desc: 'Degree, school, graduation year', priority: 'Required' },
    { section: 'Projects', desc: 'Relevant projects with results', priority: 'Optional' },
  ];

  const bestPractices = [
    { practice: 'Tailor to job', desc: 'Match keywords from job description' },
    { practice: 'Quantify achievements', desc: 'Use numbers, percentages, results' },
    { practice: 'Keep concise', desc: '1 page for < 10 years, 2 pages maximum' },
    { practice: 'Use action verbs', desc: 'Led, developed, improved, achieved' },
    { practice: 'Relevant only', desc: 'Include only pertinent experience' },
    { practice: 'Consistent format', desc: 'Same font, spacing, style throughout' },
  ];

  const mistakes = [
    { mistake: 'Listing duties', fix: 'Focus on achievements and impact' },
    { mistake: 'Generic resume', fix: 'Tailor for each position' },
    { mistake: 'Typos', fix: 'Proofread multiple times' },
    { mistake: 'Too long', fix: 'Cut irrelevant content, stay concise' },
    { mistake: 'No keywords', fix: 'Match job description terminology' },
    { mistake: 'Vague language', fix: 'Be specific with examples and numbers' },
  ];

  const formatTips = [
    'Clean, professional font (Arial, Calibri)',
    'Consistent heading styles',
    'Bullet points for readability',
    'Left-aligned, not justified',
    'PDF format for submission',
    'File name: FirstName_LastName_Resume.pdf',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Resume Writing Guide</h1>
      <p className="text-zinc-600">Resume sections, best practices, common mistakes, and formatting tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Resume Sections</h3>
        <div className="space-y-1 text-xs">
          {sections.map((s) => (
            <div key={s.section} className="bg-white rounded p-2">
              <strong>{s.section}</strong> ({s.priority})
              <div className="text-zinc-500 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="space-y-1 text-xs">
          {bestPractices.map((b) => (
            <div key={b.practice} className="bg-green-50 rounded p-2">
              <strong className="text-green-600">{b.practice}</strong>
              <div className="text-zinc-600 mt-1">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="space-y-1 text-xs">
          {mistakes.map((m) => (
            <div key={m.mistake} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{m.mistake}</strong>
              <div className="text-green-600 mt-1">Fix: {m.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Formatting Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {formatTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Resume Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Contact info complete. 2. Summary tailored to job. 3. Experience achievements-focused. 4. Skills match job requirements. 5. No typos or errors. 6. Appropriate length. 7. Clean formatting. 8. Keywords from job posting. 9. Quantified results. 10. PDF format. Resume = first impression, invest time to make it strong.
        </div>
      </div>
    </main>
  );
}