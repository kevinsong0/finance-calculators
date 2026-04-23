'use client'

export default function SoftwareLicenseComparison() {
  const licenses = [
    {
      name: 'MIT',
      type: 'Permissive',
      canModify: true,
      canDistribute: true,
      canCommercial: true,
      canSublicense: true,
      mustIncludeLicense: true,
      mustStateChanges: false,
      patentGrant: false,
      desc: 'Most permissive, minimal restrictions',
      use: 'Libraries, open source projects',
    },
    {
      name: 'Apache 2.0',
      type: 'Permissive',
      canModify: true,
      canDistribute: true,
      canCommercial: true,
      canSublicense: true,
      mustIncludeLicense: true,
      mustStateChanges: true,
      patentGrant: true,
      desc: 'Permissive with patent protection',
      use: 'Enterprise, corporate projects',
    },
    {
      name: 'GPL v3',
      type: 'Copyleft',
      canModify: true,
      canDistribute: true,
      canCommercial: true,
      canSublicense: false,
      mustIncludeLicense: true,
      mustStateChanges: true,
      patentGrant: true,
      desc: 'Strong copyleft, derivatives must be GPL',
      use: 'Open source projects wanting freedom',
    },
    {
      name: 'LGPL',
      type: 'Weak Copyleft',
      canModify: true,
      canDistribute: true,
      canCommercial: true,
      canSublicense: false,
      mustIncludeLicense: true,
      mustStateChanges: true,
      patentGrant: false,
      desc: 'Linking allowed without derivative license',
      use: 'Libraries that can be used commercially',
    },
    {
      name: 'BSD 3-Clause',
      type: 'Permissive',
      canModify: true,
      canDistribute: true,
      canCommercial: true,
      canSublicense: true,
      mustIncludeLicense: true,
      mustStateChanges: false,
      patentGrant: false,
      desc: 'Permissive, no endorsement clause',
      use: 'Academic, research projects',
    },
    {
      name: 'ISC',
      type: 'Permissive',
      canModify: true,
      canDistribute: true,
      canCommercial: true,
      canSublicense: true,
      mustIncludeLicense: true,
      mustStateChanges: false,
      patentGrant: false,
      desc: 'Simplified MIT-like license',
      use: 'npm packages, Node.js projects',
    },
    {
      name: 'MPL 2.0',
      type: 'Weak Copyleft',
      canModify: true,
      canDistribute: true,
      canCommercial: true,
      canSublicense: false,
      mustIncludeLicense: true,
      mustStateChanges: true,
      patentGrant: true,
      desc: 'File-level copyleft',
      use: 'Mozilla projects, mixed code',
    },
    {
      name: 'Proprietary',
      type: 'Closed',
      canModify: false,
      canDistribute: false,
      canCommercial: true,
      canSublicense: false,
      mustIncludeLicense: true,
      mustStateChanges: false,
      patentGrant: false,
      desc: 'Fully closed, no modification rights',
      use: 'Commercial software, SaaS',
    },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Software License Comparison</h1>
      <p className="text-zinc-600">Compare open source software licenses. MIT, Apache, GPL, BSD, LGPL. Understand permissions, conditions, limitations. Choose right license for your project.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">License Types</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-green-100 rounded p-2 text-center"><strong>Permissive</strong>: Minimal restrictions</div>
          <div className="bg-blue-100 rounded p-2 text-center"><strong>Copyleft</strong>: Derivatives must share</div>
          <div className="bg-red-100 rounded p-2 text-center"><strong>Proprietary</strong>: Closed source</div>
        </div>
      </div>

      <div className="card bg-zinc-50 overflow-x-auto">
        <h3 className="font-medium mb-2">License Comparison Table</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-white">
              <th className="p-2 border">License</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Modify</th>
              <th className="p-2 border">Distribute</th>
              <th className="p-2 border">Commercial</th>
              <th className="p-2 border">Patent</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((l) => (
              <tr key={l.name} className="bg-white">
                <td className="p-2 border font-mono">{l.name}</td>
                <td className="p-2 border">{l.type}</td>
                <td className="p-2 border">{l.canModify ? '✓' : '✗'}</td>
                <td className="p-2 border">{l.canDistribute ? '✓' : '✗'}</td>
                <td className="p-2 border">{l.canCommercial ? '✓' : '✗'}</td>
                <td className="p-2 border">{l.patentGrant ? '✓' : '✗'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Popular Licenses Explained</h3>
        <div className="space-y-1 text-xs">
          {licenses.slice(0, 6).map((l) => (
            <div key={l.name} className="bg-white rounded p-2">
              <strong className="font-mono">{l.name}</strong> ({l.type}): {l.desc}
              <div className="text-zinc-500 mt-1">Best for: {l.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Choosing a License</h3>
        <div className="text-xs text-zinc-600">
          Want maximum freedom? Use MIT or ISC. Want patent protection? Use Apache 2.0. Want derivatives open? Use GPL v3. Library that others can link? Use LGPL. Academic project? Use BSD. Commercial product? Proprietary. Consider: community, enterprise use, legal needs, contribution expectations.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">License Requirements</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2"><strong>Include License</strong>: Copy in distribution</div>
          <div className="bg-white rounded p-2"><strong>State Changes</strong>: Note modifications</div>
          <div className="bg-white rounded p-2"><strong>Same License</strong>: Derivatives same license</div>
          <div className="bg-white rounded p-2"><strong>Attribution</strong>: Credit original author</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Important Notes</h3>
        <div className="text-xs text-zinc-600">
          Consult legal counsel for commercial decisions. This is informational only. License compatibility matters for combined projects. GPL derivatives must remain GPL. Apache/BSD/MIT code can be made proprietary. Check dependencies&apos; licenses. Many projects use multiple licenses.
        </div>
      </div>
    </main>
  );
}