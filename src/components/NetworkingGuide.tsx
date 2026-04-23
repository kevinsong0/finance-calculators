'use client'

export default function NetworkingGuide() {
  const types = [
    { type: 'Professional Events', desc: 'Conferences, meetups', action: 'Attend, introduce, follow up' },
    { type: 'Online Networking', desc: 'LinkedIn, Twitter, communities', action: 'Engage, share, connect' },
    { type: 'Internal Networking', desc: 'Company colleagues', action: 'Coffee chats, cross-team work' },
    { type: 'Mentorship', desc: 'Mentors, mentees', action: 'Seek mentors, offer guidance' },
    { type: 'Alumni Networks', desc: 'School, past company alumni', action: 'Reconnect, share updates' },
  ];

  const tips = [
    'Be genuinely interested',
    'Offer value first',
    'Follow up promptly',
    'Keep notes on contacts',
    'Be consistent (not one-time)',
    'Quality over quantity',
    'Give before asking',
    'Maintain relationships',
  ];

  const approaches = [
    { approach: 'Cold Outreach', desc: 'Reach to strangers', tips: 'Personalize, be specific, offer value' },
    { approach: 'Warm Introductions', desc: 'Through mutual connections', tips: 'Ask for referrals, easier path' },
    { approach: 'Content Creation', desc: 'Attract through expertise', tips: 'Blog, posts, talks - inbound leads' },
    { approach: 'Volunteer Work', desc: 'Events, organizations', tips: 'Build relationships through contribution' },
  ];

  const mistakes = [
    'Only asking for favors',
    'Being transactional',
    'Not following up',
    'Ignoring existing network',
    'Being pushy',
    'Not reciprocating',
    'Forgetting details',
    'Ghosting after success',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Networking Guide</h1>
      <p className="text-zinc-600">Networking types, approaches, tips, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Networking Types</h3>
        <div className="space-y-1 text-xs">
          {types.map((t) => (
            <div key={t.type} className="bg-white rounded p-2">
              <strong>{t.type}</strong>
              <div className="text-zinc-500 mt-1">{t.desc}</div>
              <div className="text-green-600 mt-1">Action: {t.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Networking Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {tips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Approaches</h3>
        <div className="space-y-1 text-xs">
          {approaches.map((a) => (
            <div key={a.approach} className="bg-white rounded p-2">
              <strong>{a.approach}</strong>
              <div className="text-zinc-500 mt-1">{a.desc}</div>
              <div className="text-green-600 mt-1">Tips: {a.tips}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Common Mistakes</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {mistakes.map((m) => (
            <div key={m} className="bg-white rounded p-2 text-red-600">✗ {m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Networking Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Set networking goals. 2. Identify target contacts. 3. Attend relevant events. 4. Engage on platforms. 5. Schedule coffee chats. 6. Offer help first. 7. Follow up within 48h. 8. Keep contact notes. 9. Check in quarterly. 10. Seek introductions. 11. Give referrals. 12. Express gratitude. Network = net worth. Build before you need. Authentic relationships = career success.
        </div>
      </div>
    </main>
  );
}