import type { Metadata } from 'next';
import { Suspense } from 'react';
import VSCodeKeybindings from '@/components/VSCodeKeybindings';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I open the Command Palette in VS Code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open Command Palette: Windows/Linux Ctrl+Shift+P, Mac Cmd+Shift+P. Command Palette shows all available commands. Type to search. Execute any VS Code command. Most powerful VS Code feature for accessing settings, extensions, tasks. Also use for: changing themes, installing extensions, running tasks, configuring settings."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use multi-cursor editing in VS Code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multi-cursor methods: Alt+Click (Option+Click Mac) to add cursor at position. Ctrl+Alt+Up/Down (Cmd+Option+Up/Down Mac) to add cursor above/below. Ctrl+D (Cmd+D Mac) to select next occurrence of current word. Ctrl+Shift+L (Cmd+Shift+L Mac) to select all occurrences. Edit all cursors simultaneously. Great for renaming variables or editing repeated text."
      }
    },
    {
      "@type": "Question",
      "name": "How do I open the terminal in VS Code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Toggle terminal: Ctrl+` (Cmd+` on Mac). New terminal: Ctrl+Shift+` (Cmd+Shift+`). Terminal opens at bottom panel. Supports multiple terminals. Split terminal view. Run commands directly in VS Code. Select shell: Command Palette > Terminal: Select Default Shell. Configure terminal in settings: terminal.integrated.defaultProfile."
      }
    },
    {
      "@type": "Question",
      "name": "How do I quickly open a file in VS Code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quick open: Ctrl+P (Cmd+P Mac). Type filename to search. Shows recent files first. Arrow keys to navigate. Enter to open. Supports fuzzy search - type parts of filename. Open recent: Ctrl+R (Cmd+R Mac). Quick open is fastest way to navigate between files. Also shows symbols with @ prefix."
      }
    },
    {
      "@type": "Question",
      "name": "How do I customize VS Code keyboard shortcuts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open keyboard shortcuts: Ctrl+K Ctrl+S or Command Palette > Preferences: Open Keyboard Shortcuts. Search shortcuts by name or key. Click to edit keybinding. Record keybinding by pressing keys. Remove shortcut: right-click > Remove. Export/import keybindings.json file. Install keybinding extensions for Vim, Sublime, IntelliJ styles."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'VS Code Keyboard Shortcuts - Complete Keybindings Reference',
  description: 'Complete VS Code keybindings reference. File operations, editing, navigation, multi-cursor, terminal, view, and debug shortcuts for Windows, Mac, and Linux.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VSCodeKeybindings />
    </Suspense>
  );
}