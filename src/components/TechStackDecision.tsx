'use client'

export default function TechStackDecision() {
  const stacks = [
    { name: 'Next.js + TypeScript', desc: 'Full-stack React, SSR, API routes', pros: 'SEO-friendly, TypeScript, Vercel deploy', cons: 'Learning curve, Node.js required', use: 'Web apps, SaaS, ecommerce' },
    { name: 'Vue + Vite', desc: 'Lightweight, fast dev experience', pros: 'Easy learning, fast HMR, flexible', cons: 'Smaller ecosystem than React', use: 'SPAs, dashboards, prototypes' },
    { name: 'Django + Python', desc: 'Full-stack Python, ORM, admin', pros: ' batteries included, rapid dev, secure', cons: 'Slower than Node, monolithic', use: 'Data apps, CMS, enterprise' },
    { name: 'Rails + Ruby', desc: 'Full-stack Ruby, conventions', pros: 'Rapid dev, conventions, ActiveRecord', cons: 'Ruby niche, performance concerns', use: 'MVPs, startups, CRUD apps' },
    { name: 'Go + Gin', desc: 'Backend API, fast, compiled', pros: 'Fast, simple, strong typing', cons: 'No frontend, Go learning curve', use: 'APIs, microservices, high traffic' },
    { name: 'Spring Boot + Java', desc: 'Enterprise Java, mature', pros: 'Enterprise ready, mature ecosystem', cons: 'Verbose, heavy, complex', use: 'Enterprise, banking, large systems' },
  ];

  const factors = [
    { name: 'Team expertise', desc: 'Use stack team already knows' },
    { name: 'Project type', desc: 'Web app vs API vs mobile' },
    { name: 'Scale requirements', desc: 'Startup MVP vs enterprise scale' },
    { name: 'Time constraints', desc: 'Rapid MVP vs long-term investment' },
    { name: 'Budget', desc: 'Free/open source vs commercial' },
    { name: 'Hiring', desc: 'Easy to find developers for stack' },
    { name: 'Performance', desc: 'High traffic vs low traffic' },
    { name: 'Security', desc: 'Financial/healthcare needs stronger' },
  ];

  const questions = [
    'What is your team\'s current expertise?',
    'Is this a MVP or production system?',
    'Do you need SSR for SEO?',
    'What\'s your expected traffic scale?',
    'Do you need real-time features?',
    'What\'s your deployment preference?',
    'How important is development speed?',
    'Do you need mobile app support?',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Tech Stack Decision Guide</h1>
      <p className="text-zinc-600">Guide to choosing technology stack. Compare popular stacks, factors to consider, questions for decision. Choose right stack for your project.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Popular Tech Stacks</h3>
        <div className="space-y-1 text-xs">
          {stacks.map((s) => (
            <div key={s.name} className="bg-white rounded p-2">
              <strong className="font-mono">{s.name}</strong>: {s.desc}
              <div className="text-green-600 mt-1">Pros: {s.pros}</div>
              <div className="text-red-600">Cons: {s.cons}</div>
              <div className="text-zinc-500">Best for: {s.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Decision Factors</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {factors.map((f) => (
            <div key={f.name} className="bg-white rounded p-2">
              <strong>{f.name}</strong>: {f.desc}
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Questions to Ask</h3>
        <div className="space-y-1 text-xs">
          {questions.map((q, i) => (
            <div key={i} className="bg-white rounded p-2">{i + 1}. {q}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Quick Recommendations</h3>
        <div className="text-xs text-zinc-600">
          MVP/startup: Next.js or Rails. Enterprise: Spring Boot or Django. High-performance API: Go or Node.js. SEO-critical: Next.js or Astro. Data-heavy: Django or Python. Mobile + web: React Native + Next.js. Simple CRUD: Rails or Django. Real-time: Node.js + Socket.io.
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white rounded p-2">Choosing unfamiliar stack</div>
          <div className="bg-white rounded p-2">Over-engineering early</div>
          <div className="bg-white rounded p-2">Ignoring hiring market</div>
          <div className="bg-white rounded p-2">Following trends blindly</div>
        </div>
      </div>
    </main>
  );
}