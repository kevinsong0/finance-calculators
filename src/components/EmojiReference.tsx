'use client'

export default function EmojiReference() {
  const emojis = [
    { emoji: '😀', name: 'Grinning Face', category: 'Faces' },
    { emoji: '😎', name: 'Cool', category: 'Faces' },
    { emoji: '🥳', name: 'Party', category: 'Faces' },
    { emoji: '👍', name: 'Thumbs Up', category: 'Hands' },
    { emoji: '👎', name: 'Thumbs Down', category: 'Hands' },
    { emoji: '🎉', name: 'Celebration', category: 'Events' },
    { emoji: '🚀', name: 'Rocket', category: 'Tech' },
    { emoji: '💻', name: 'Computer', category: 'Tech' },
    { emoji: '📱', name: 'Mobile', category: 'Tech' },
    { emoji: '🔥', name: 'Fire', category: 'Nature' },
    { emoji: '✨', name: 'Sparkles', category: 'Nature' },
    { emoji: '💡', name: 'Idea', category: 'Objects' },
    { emoji: '🔧', name: 'Tool', category: 'Objects' },
    { emoji: '📦', name: 'Package', category: 'Objects' },
    { emoji: '📝', name: 'Note', category: 'Objects' },
    { emoji: '🎯', name: 'Target', category: 'Objects' },
    { emoji: '🏆', name: 'Win', category: 'Events' },
    { emoji: '💰', name: 'Money', category: 'Objects' },
    { emoji: '📈', name: 'Chart Up', category: 'Tech' },
    { emoji: '📉', name: 'Chart Down', category: 'Tech' },
    { emoji: '⚡', name: 'Fast', category: 'Nature' },
    { emoji: '🔒', name: 'Secure', category: 'Objects' },
    { emoji: '🔑', name: 'Key', category: 'Objects' },
    { emoji: '🌐', name: 'Globe', category: 'Nature' },
    { emoji: '📊', name: 'Chart', category: 'Tech' },
    { emoji: '🧪', name: 'Test', category: 'Tech' },
    { emoji: '🐛', name: 'Bug', category: 'Tech' },
    { emoji: '✅', name: 'Done', category: 'Symbols' },
    { emoji: '❌', name: 'Error', category: 'Symbols' },
    { emoji: '⚠️', name: 'Warning', category: 'Symbols' },
    { emoji: 'ℹ️', name: 'Info', category: 'Symbols' },
    { emoji: '❓', name: 'Question', category: 'Symbols' },
    { emoji: '💬', name: 'Chat', category: 'Objects' },
    { emoji: '📧', name: 'Email', category: 'Objects' },
    { emoji: '🔗', name: 'Link', category: 'Objects' },
  ];

  const categories = Array.from(new Set(emojis.map(e => e.category)));

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Emoji Reference for Developers</h1>
      <p className="text-zinc-600">Quick emoji reference for developers. Common emojis for documentation, commit messages, status updates, and UI design. Copy emoji with one click.</p>

      {categories.map((cat) => (
        <div key={cat} className="card bg-zinc-50">
          <h3 className="font-medium mb-2">{cat}</h3>
          <div className="grid grid-cols-6 gap-2">
            {emojis.filter(e => e.category === cat).map((e, i) => (
              <div key={i} className="bg-white rounded p-2 text-center cursor-pointer hover:bg-blue-50" onClick={() => navigator.clipboard.writeText(e.emoji)}>
                <div className="text-2xl">{e.emoji}</div>
                <div className="text-xs text-zinc-500">{e.name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Git Commit Message Emojis</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-2xl">✨</span> New feature</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">🐛</span> Bug fix</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">📝</span> Documentation</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">🔧</span> Config/tool</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">♻️</span> Refactor</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">🚀</span> Performance</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">🔒</span> Security</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">⬆️</span> Dependencies</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Status Indicators</h3>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <div className="bg-white rounded p-2"><span className="text-2xl">✅</span> Success</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">❌</span> Failed</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">⚠️</span> Warning</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">ℹ️</span> Info</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">🔄</span> In progress</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">⏳</span> Pending</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">🚫</span> Blocked</div>
          <div className="bg-white rounded p-2"><span className="text-2xl">❓</span> Unknown</div>
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">How to Use</h3>
        <div className="text-xs text-zinc-600">
          Click any emoji to copy. Use in: GitHub commit messages, README files, documentation, status updates, Slack/Discord, UI design. Common patterns: gitmoji for commits, status emojis for dashboards, category emojis for navigation. Copy emoji Unicode character directly.
        </div>
      </div>
    </main>
  );
}