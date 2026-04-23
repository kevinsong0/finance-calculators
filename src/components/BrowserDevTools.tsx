'use client'

export default function BrowserDevTools() {
  const shortcuts = [
    { browser: 'Chrome/Edge', open: 'F12 or Ctrl+Shift+I (Cmd+Opt+I Mac)', console: 'Ctrl+Shift+J (Cmd+Opt+J Mac)', elements: 'Ctrl+Shift+C (Cmd+Opt+C Mac)' },
    { browser: 'Firefox', open: 'F12 or Ctrl+Shift+I (Cmd+Opt+I Mac)', console: 'Ctrl+Shift+K (Cmd+Opt+K Mac)', inspector: 'Ctrl+Shift+C (Cmd+Opt+C Mac)' },
    { browser: 'Safari', open: 'Cmd+Opt+I (Enable Develop menu first)', console: 'Cmd+Opt+C', elements: 'Cmd+Opt+I then select' },
  ];

  const panels = [
    { name: 'Elements', desc: 'Inspect HTML, edit CSS live, debug layout', icon: '🔍' },
    { name: 'Console', desc: 'Run JavaScript, view logs, debug errors', icon: '📜' },
    { name: 'Sources', desc: 'Debug JS with breakpoints, step through code', icon: '📁' },
    { name: 'Network', desc: 'Monitor requests, check response times, debug API', icon: '🌐' },
    { name: 'Performance', desc: 'Profile page load, find bottlenecks', icon: '⚡' },
    { name: 'Memory', desc: 'Find memory leaks, analyze heap snapshots', icon: '💾' },
    { name: 'Application', desc: 'Inspect storage: cookies, localStorage, IndexedDB', icon: '📦' },
    { name: 'Security', desc: 'Check HTTPS, certificates, security issues', icon: '🔒' },
  ];

  const tips = [
    '$() - document.querySelector shortcut',
    '$$() - document.querySelectorAll shortcut',
    'console.log() - log messages',
    'console.table() - display data as table',
    'console.dir() - show object properties',
    'console.clear() - clear console',
    'debug(function) - break when function called',
    'monitor(function) - log when function called',
    'getEventListeners(element) - show event listeners',
    'copy(object) - copy to clipboard',
  ];

  const networkTips = [
    'Filter by type: JS, CSS, Img, Media, Doc',
    'Disable cache: right-click reload icon',
    'Throttle network: Slow 3G preset',
    'Block requests: right-click Block request URL',
    'Export HAR: right-click Save all as HAR',
    'Check timing: click request for waterfall',
    'Copy as cURL: right-click Copy as cURL',
    'View headers: click request Headers tab',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Browser DevTools Reference</h1>
      <p className="text-zinc-600">Complete guide to browser DevTools. Shortcuts, panels, console commands, and debugging tips for Chrome, Firefox, Safari.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Open DevTools</h3>
        <div className="grid grid-cols-1 gap-2 text-xs">
          {shortcuts.map((s, i) => (
            <div key={i} className="bg-white rounded p-2 grid grid-cols-4">
              <div className="font-medium">{s.browser}</div>
              <div>{s.open}</div>
              <div>{s.console}</div>
              <div>{s.elements || s.inspector}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">DevTools Panels</h3>
        <div className="grid grid-cols-2 gap-2">
          {panels.map((p, i) => (
            <div key={i} className="bg-white rounded p-2 text-xs">
              <span className="text-lg mr-2">{p.icon}</span>
              <strong>{p.name}</strong>: {p.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Console Shortcuts</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t, i) => (
            <div key={i} className="bg-white rounded p-2 font-mono">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Network Panel Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {networkTips.map((t, i) => (
            <div key={i} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Elements Panel Tips</h3>
        <div className="text-xs text-zinc-600">
          Edit CSS live: click style values to modify. Force element state: :hover, :focus, :active. Hide element: right-click Hide element. Break on subtree modifications: right-click Break on. Compute styles: Computed tab. Box model visualization: visual box diagram.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Sources Panel Debugging</h3>
        <div className="text-xs text-zinc-600">
          Set breakpoint: click line number. Conditional breakpoint: right-click line number. Step over: F10. Step into: F11. Step out: Shift+F11. Resume: F8. Watch expressions: add variables to watch. Call stack: see function execution path. Scope: view local and global variables.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Profiling</h3>
        <div className="text-xs text-zinc-600">
          Record: click Record, interact with page, stop. FPS meter: check frame rate. Main thread activity: see JS execution. Layout shifts: find rendering issues. Network timeline: see request timing. Analyze bottlenecks: long tasks highlighted red. Save profile: export for comparison.
        </div>
      </div>
    </main>
  );
}