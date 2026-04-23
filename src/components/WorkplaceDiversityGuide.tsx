'use client'

export default function WorkplaceDiversityGuide() {
  const dimensions = [
    { dimension: 'Race/Ethnicity', importance: 'Core', initiative: 'Hiring practices' },
    { dimension: 'Gender', importance: 'Essential', initiative: 'Equal opportunity' },
    { dimension: 'Age', importance: 'Important', initiative: 'Multi-generational' },
    { dimension: 'Disability', importance: 'Required', initiative: 'Accessibility' },
    { dimension: 'Sexual orientation', importance: 'Protected', initiative: 'Inclusion' },
    { dimension: 'Veteran status', importance: 'Recognized', initiative: 'Support programs' },
  ];

  const benefits = [
    { benefit: 'Innovation', impact: 'Diverse perspectives', evidence: 'Better solutions' },
    { benefit: 'Engagement', impact: 'Inclusive culture', evidence: 'Higher morale' },
    { benefit: 'Retention', impact: 'Belonging culture', evidence: 'Lower turnover' },
    { benefit: 'Talent pool', impact: 'Broader hiring', evidence: 'Better candidates' },
    { benefit: 'Market insight', impact: 'Customer understanding', evidence: 'Better products' },
  ];

  const initiatives = [
    'Diverse hiring practices',
    'Inclusive culture building',
    'Unconscious bias training',
    'Mentorship programs',
    'Employee resource groups',
    'Leadership diversity goals',
    'Supplier diversity',
    'Accessibility improvements',
  ];

  const metrics = [
    'Demographic representation',
    'Hiring diversity rates',
    'Promotion equity metrics',
    'Retention by group',
    'Engagement by group',
    'Pay equity analysis',
    'Training participation',
    'Program effectiveness',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Workplace Diversity Guide</h1>
      <p className="text-zinc-600">Dimensions, benefits, initiatives, and measurement.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Diversity Dimensions</h3>
        <div className="space-y-1 text-xs">
          {dimensions.map((d) => (
            <div key={d.dimension} className="bg-white rounded p-2">
              <strong>{d.dimension}</strong>
              <div className="text-zinc-500 mt-1">Importance: {d.importance}</div>
              <div className="text-green-600 mt-1">Initiative: {d.initiative}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Benefits of Diversity</h3>
        <div className="space-y-1 text-xs">
          {benefits.map((b) => (
            <div key={b.benefit} className="bg-white rounded p-2">
              <strong>{b.benefit}</strong>
              <div className="text-zinc-500 mt-1">Impact: {b.impact}</div>
              <div className="text-green-600 mt-1">Evidence: {b.evidence}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Diversity Initiatives</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {initiatives.map((i, idx) => (
            <div key={i} className="bg-white rounded p-2">{idx + 1}. {i}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Measurement Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {metrics.map((m, idx) => (
            <div key={m} className="bg-white rounded p-2">{idx + 1}. {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Diversity Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Assess current diversity state. 2. Set diversity goals. 3. Review hiring practices. 4. Implement bias training. 5. Create mentorship programs. 6. Establish ERGs. 7. Review promotion equity. 8. Analyze pay equity. 9. Build inclusive culture. 10. Track metrics regularly. 11. Report progress. 12. Adjust initiatives. Diversity = intentional effort. Multiple dimensions. Clear benefits. Specific initiatives. Regular measurement. Culture inclusion. Continuous improvement. Leadership commitment.
        </div>
      </div>
    </main>
  );
}