'use client'

export default function DebuggingTips() {
  const debuggingMethods = [
    { name: 'Print Debugging', desc: 'console.log, print statements', when: 'Quick, simple debugging' },
    { name: 'Debugger', desc: 'Breakpoints, step through code', when: 'Complex logic, variables' },
    { name: 'Logging', desc: 'Structured logs, levels', when: 'Production, monitoring' },
    { name: 'Unit Tests', desc: 'Isolated function testing', when: 'Prevent bugs, verify fix' },
    { name: 'Rubber Duck', desc: 'Explain code step by step', when: 'Logic errors, fresh perspective' },
    { name: 'Code Review', desc: 'Fresh eyes on problem', when: 'Hidden bugs, overlooked issues' },
  ];

  const commonErrors = [
    { error: 'Null reference', cause: 'Undefined/null value', fix: 'Check before access, use optional chaining' },
    { error: 'Type mismatch', cause: 'Wrong type passed', fix: 'Type checking, TypeScript' },
    { error: 'Off-by-one', cause: 'Index/loop bounds', fix: 'Check boundaries, test edge cases' },
    { error: 'Race condition', cause: 'Async timing', fix: 'Await, locks, proper sequencing' },
    { error: 'Memory leak', cause: 'Unreleased resources', fix: 'Clean up listeners, references' },
    { error: 'Infinite loop', cause: 'Wrong condition', fix: 'Check loop logic, add limits' },
  ];

  const breakpoints = [
    { type: 'Line', desc: 'Pause at specific line' },
    { type: 'Conditional', desc: 'Pause when condition true' },
    { type: 'Exception', desc: 'Pause on error/throw' },
    { type: 'Function', desc: 'Pause when function called' },
    { type: 'Logpoint', desc: 'Log without pausing' },
  ];

  const tools = [
    { name: 'VS Code Debugger', desc: 'Built-in, F5 to start' },
    { name: 'Chrome DevTools', desc: 'Browser JS debugging' },
    { name: 'Node.js Debugger', desc: 'node --inspect flag' },
    { name: 'Python pdb', desc: 'import pdb, pdb.set_trace()' },
    { name: 'GDB', desc: 'C/C++ debugging' },
    { name: 'Xdebug', desc: 'PHP debugging' },
  ];

  const tips = [
    'Reproduce bug first',
    'Isolate the problem',
    'Check recent changes',
    'Read error messages',
    'Check stack trace',
    'Verify assumptions',
    'Test edge cases',
    'Use version control',
    'Take breaks',
    'Ask for help',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Debugging Tips</h1>
      <p className="text-zinc-600">Debugging methods, common errors, breakpoint types, tools. Fix bugs faster with systematic approach.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Debugging Methods</h3>
        <div className="space-y-1 text-xs">
          {debuggingMethods.map((m) => (
            <div key={m.name} className="bg-white rounded p-2">
              <strong>{m.name}</strong>: {m.desc}
              <div className="text-zinc-500 mt-1">When: {m.when}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Errors & Fixes</h3>
        <div className="space-y-1 text-xs">
          {commonErrors.map((e) => (
            <div key={e.error} className="bg-red-50 rounded p-2">
              <strong className="text-red-600">{e.error}</strong>: {e.cause}
              <div className="text-green-600 mt-1">Fix: {e.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Breakpoint Types</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {breakpoints.map((b) => (
            <div key={b.type} className="bg-white rounded p-2">
              <strong>{b.type}</strong>: {b.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Debugging Tools</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tools.map((t) => (
            <div key={t.name} className="bg-white rounded p-2">
              <strong>{t.name}</strong>: {t.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Debugging Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">VS Code Debugging Shortcuts</h3>
        <div className="text-xs font-mono bg-white rounded p-2">
          F5: Start debugging<br/>
          F9: Toggle breakpoint<br/>
          F10: Step over<br/>
          F11: Step into<br/>
          Shift+F11: Step out<br/>
          Ctrl+Shift+F5: Restart
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Systematic Approach</h3>
        <div className="text-xs text-zinc-600">
          1. Understand problem (what, when, where). 2. Reproduce reliably. 3. Isolate component. 4. Hypothesize cause. 5. Test hypothesis. 6. Fix root cause (not symptom). 7. Verify fix. 8. Add test to prevent recurrence. 9. Document for future. Don&apos;t rush - systematic faster than random.
        </div>
      </div>
    </main>
  );
}