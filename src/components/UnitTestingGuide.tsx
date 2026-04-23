'use client'

export default function UnitTestingGuide() {
  const concepts = [
    { concept: 'Unit Test', desc: 'Test single function/component in isolation' },
    { concept: 'Integration Test', desc: 'Test multiple components together' },
    { concept: 'End-to-End Test', desc: 'Test full user workflow' },
    { concept: 'Mock', desc: 'Fake dependency for isolated testing' },
    { concept: 'Assertion', desc: 'Verify expected outcome' },
    { concept: 'Coverage', desc: 'Percentage of code tested' },
  ];

  const frameworks = [
    { lang: 'JavaScript', tools: 'Jest, Vitest, Mocha, Jasmine' },
    { lang: 'Python', tools: 'pytest, unittest, nose' },
    { lang: 'Java', tools: 'JUnit, TestNG' },
    { lang: 'Go', tools: 'testing package, testify' },
    { lang: 'Ruby', tools: 'RSpec, Minitest' },
    { lang: 'C#', tools: 'NUnit, xUnit, MSTest' },
  ];

  const bestPractices = [
    { practice: 'Test behavior, not implementation', desc: 'Focus on what it does, not how' },
    { practice: 'One assertion per test', desc: 'Clear pass/fail, easy debugging' },
    { practice: 'Descriptive test names', desc: 'Names describe what is tested' },
    { practice: 'Arrange-Act-Assert pattern', desc: 'Clear test structure' },
    { practice: 'Test edge cases', desc: 'Boundary conditions, errors, empty inputs' },
    { practice: 'Keep tests fast', desc: 'Quick feedback loop for developers' },
  ];

  const antiPatterns = [
    { anti: 'Testing private methods', fix: 'Test public behavior that uses them' },
    { anti: 'Over-mocking', fix: 'Mock only external dependencies' },
    { anti: 'Flaky tests', fix: 'Fix or remove unreliable tests' },
    { anti: 'Giant test files', fix: 'Split by functionality' },
    { anti: 'No cleanup', fix: 'Reset state between tests' },
    { anti: 'Testing framework bugs', fix: 'Focus on your code' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Unit Testing Guide</h1>
      <p className="text-zinc-600">Testing concepts, frameworks, best practices, and anti-patterns.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Concepts</h3>
        <div className="space-y-1 text-xs">
          {concepts.map((c) => (
            <div key={c.concept} className="bg-white rounded p-2">
              <strong>{c.concept}</strong>
              <div className="text-zinc-500 mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Frameworks</h3>
        <div className="space-y-1 text-xs">
          {frameworks.map((f) => (
            <div key={f.lang} className="bg-white rounded p-2">
              <strong>{f.lang}</strong>
              <div className="text-zinc-600 mt-1">{f.tools}</div>
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
        <h3 className="font-medium mb-2">Anti-Patterns to Avoid</h3>
        <div className="space-y-1 text-xs">
          {antiPatterns.map((a) => (
            <div key={a.anti} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{a.anti}</strong>
              <div className="text-green-600 mt-1">Fix: {a.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Testing Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Write test before/alongside code (TDD). 2. Test happy path + edge cases. 3. Mock external dependencies. 4. Keep tests independent. 5. Run tests frequently (CI). 6. Maintain coverage (80%+ critical). 7. Refactor tests when refactoring code. 8. Fix flaky tests immediately. Tests = confidence in code changes. Invest in testing infrastructure.
        </div>
      </div>
    </main>
  );
}