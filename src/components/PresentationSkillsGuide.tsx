'use client'

export default function PresentationSkillsGuide() {
  const structure = [
    { part: 'Opening Hook', desc: 'Grab attention, state purpose', tip: 'Story, question, surprising fact' },
    { part: 'Key Points (3-5)', desc: 'Main message organized clearly', tip: 'Limit to memorable amount' },
    { part: 'Supporting Evidence', desc: 'Data, examples, visuals', tip: 'Concrete, relevant, credible' },
    { part: 'Engagement', desc: 'Questions, interaction, stories', tip: 'Keep audience involved' },
    { part: 'Call to Action', desc: 'What audience should do', tip: 'Clear, specific, achievable' },
    { part: 'Closing', desc: 'Summarize, reinforce message', tip: 'Strong ending, memorable' },
  ];

  const techniques = [
    { technique: 'Tell Stories', desc: 'Narratives connect, memorable' },
    { technique: 'Use Visuals', desc: 'Images, slides support message' },
    { technique: 'Practice', desc: 'Rehearse until natural' },
    { technique: 'Eye Contact', desc: 'Connect with audience' },
    { technique: 'Pause Effectively', desc: 'Let points land, show confidence' },
    { technique: 'Move Purposefully', desc: 'Body language reinforces' },
  ];

  const mistakes = [
    { mistake: 'Too many slides', fix: 'Limit slides, focus on message' },
    { mistake: 'Reading slides', fix: 'Know content, present not read' },
    { mistake: 'No preparation', fix: 'Practice multiple times' },
    { mistake: 'Going overtime', fix: 'Time rehearsal, trim content' },
    { mistake: 'Ignoring audience', fix: 'Look at people, read reactions' },
    { mistake: 'Weak ending', fix: 'Plan strong close, call to action' },
  ];

  const tips = [
    'Start strong (hook audience)',
    'One main message per slide',
    'Speak slower than normal',
    'Pause after key points',
    'Engage with questions',
    'End with clear takeaway',
    'Practice timing',
    'Prepare for questions',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Presentation Skills Guide</h1>
      <p className="text-zinc-600">Structure, techniques, common mistakes, and presentation tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Presentation Structure</h3>
        <div className="space-y-1 text-xs">
          {structure.map((s) => (
            <div key={s.part} className="bg-white rounded p-2">
              <strong>{s.part}</strong>
              <div className="text-zinc-500 mt-1">{s.desc}</div>
              <div className="text-green-600 mt-1">Tip: {s.tip}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Presentation Techniques</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {techniques.map((t) => (
            <div key={t.technique} className="bg-white rounded p-2">
              <strong>{t.technique}</strong>
              <div className="text-zinc-600 mt-1">{t.desc}</div>
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
        <h3 className="font-medium mb-2">Presentation Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Presentation Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Define purpose and audience. 2. Craft clear message (3-5 points). 3. Create structure (hook, body, close). 4. Design minimal slides. 5. Practice multiple times. 6. Time the presentation. 7. Prepare for questions. 8. Check equipment. 9. Arrive early. 10. Start strong, end stronger. Great presentation = preparation + practice + delivery.
        </div>
      </div>
    </main>
  );
}