import type { Metadata } from 'next';
import { Suspense } from 'react';
import EmojiReference from '@/components/EmojiReference';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I use emojis in git commit messages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gitmoji standard: ✨ new feature, 🐛 bug fix, 📝 documentation, 🔧 config/tooling, ♻️ refactor, 🚀 performance, 🔒 security, ⬆️ dependencies. Format: emoji + message. Example: ✨ Add user authentication. Makes commit history visual and searchable. Install gitmoji CLI: npm install -g gitmoji. Use gitmoji -c for interactive commit."
      }
    },
    {
      "@type": "Question",
      "name": "How do I copy an emoji?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Click emoji on this page to copy. Copy from emoji picker: Windows Win+. or Win+;, Mac Ctrl+Cmd+Space, Linux Ctrl+Shift+E. Copy from websites like Emojipedia. Use emoji Unicode in code: string literal or HTML entity. Emoji are Unicode characters - copy works everywhere. Some terminals support emoji, others may show boxes."
      }
    },
    {
      "@type": "Question",
      "name": "What emojis represent status states?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Status emojis: ✅ success/complete, ❌ failed/error, ⚠️ warning, ℹ️ info, 🔄 in progress/loading, ⏳ pending/waiting, 🚫 blocked/stopped, ❓ unknown/question. Use in: build status, CI pipelines, dashboards, status pages, Slack notifications. Combine with text: ✅ Tests passed, ❌ Build failed, ⚠️ Deprecation warning."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use emojis in documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentation emojis: 💡 tips, ⚠️ warnings, ℹ️ notes, 🔧 configuration, 📝 examples, 🎯 goals, ✨ highlights, 🚀 performance, 🐛 known issues. Markdown supports emoji directly. Use in README badges, API docs, tutorials, changelogs. Visual markers improve readability. Don't overuse - emoji should enhance, not distract."
      }
    },
    {
      "@type": "Question",
      "name": "Do emojis work in all browsers and terminals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Modern browsers: full emoji support. Windows 10/11: built-in emoji font. macOS: full support. Linux: depends on font (Noto Color Emoji, Emoji One). Older browsers may show boxes or monochrome. Terminal support varies: iTerm2 (Mac), Windows Terminal, VS Code terminal support emoji. Old terminals show boxes. Test before relying on emoji in CLI."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Emoji Reference for Developers - Quick Copy Emoji Guide',
  description: 'Quick emoji reference for developers. Common emojis for documentation, commit messages, status updates, and UI design. Copy emoji with one click.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EmojiReference />
    </Suspense>
  );
}