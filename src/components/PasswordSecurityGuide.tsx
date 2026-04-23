'use client'

export default function PasswordSecurityGuide() {
  const strengthLevels = [
    { level: 'Weak', criteria: 'Common words, short, predictable', score: '0-40' },
    { level: 'Fair', criteria: '8+ chars, mixed types, some variety', score: '40-60' },
    { level: 'Good', criteria: '12+ chars, mixed case, numbers, symbols', score: '60-80' },
    { level: 'Strong', criteria: '16+ chars, all types, unique, random', score: '80-100' },
  ];

  const bestPractices = [
    { practice: 'Length matters', desc: '12+ characters minimum, longer is better' },
    { practice: 'Mix character types', desc: 'Upper, lower, numbers, symbols' },
    { practice: 'Avoid common patterns', desc: 'No dictionary words, sequences, personal info' },
    { practice: 'Unique per account', desc: 'Never reuse passwords across sites' },
    { practice: 'Use password manager', desc: 'Generate and store complex passwords' },
    { practice: 'Enable 2FA', desc: 'Two-factor authentication adds protection' },
  ];

  const commonMistakes = [
    { mistake: 'Password reuse', consequence: 'One breach compromises all accounts' },
    { mistake: 'Short passwords', consequence: 'Brute force attack succeeds faster' },
    { mistake: 'Personal info', consequence: 'Social engineering targets' },
    { mistake: 'Dictionary words', consequence: 'Dictionary attacks work' },
    { mistake: 'No 2FA', consequence: 'Password alone is single point of failure' },
    { mistake: 'Storing in plain text', consequence: 'If stolen, immediately usable' },
  ];

  const generationTips = [
    'Use password manager to generate',
    'Random characters, not words',
    'Avoid keyboard patterns (qwerty)',
    'Don\'t substitute numbers (p@ssw0rd)',
    'Length over complexity',
    'Change if breached, not regularly',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Password Security Guide</h1>
      <p className="text-zinc-600">Strength levels, best practices, common mistakes, and generation tips.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Password Strength Levels</h3>
        <div className="space-y-1 text-xs">
          {strengthLevels.map((s) => (
            <div key={s.level} className="bg-white rounded p-2">
              <strong>{s.level}</strong> ({s.score})
              <div className="text-zinc-500 mt-1">{s.criteria}</div>
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
          {commonMistakes.map((c) => (
            <div key={c.mistake} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{c.mistake}</strong>
              <div className="text-zinc-600 mt-1">{c.consequence}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Generation Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {generationTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Password Security Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Use password manager (Bitwarden, 1Password). 2. Generate random passwords. 3. Minimum 12 characters. 4. Unique for each account. 5. Enable 2FA on all accounts. 6. Check for breaches (haveibeenpwned.com). 7. Change passwords if compromised. 8. Never share passwords. 9. Use secure recovery methods. 10. Avoid phishing attempts. Strong passwords = foundation of security.
        </div>
      </div>
    </main>
  );
}