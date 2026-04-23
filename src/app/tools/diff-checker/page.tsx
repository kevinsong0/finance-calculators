import type { Metadata } from 'next';
import { Suspense } from 'react';
import DiffChecker from '@/components/DiffChecker';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a diff checker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diff checker compares two texts line-by-line to highlight differences: additions (new content), deletions (removed content), and modifications (changed content). Color coding shows changes: green for added, red for removed, yellow for modified. Used for code review, document comparison, and change tracking."
      }
    },
    {
      "@type": "Question",
      "name": "How do I compare two code files?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste original code in left textarea, modified code in right. Diff checker highlights differences. Use git diff for version control: 'git diff file1 file2' or 'git diff HEAD~1 HEAD'. Online diff tools work for quick comparisons without git. IDEs like VS Code have built-in diff view."
      }
    },
    {
      "@type": "Question",
      "name": "What is unified diff format?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unified diff format: header with file names and timestamps, then chunks starting with @@ line numbers @@. Lines prefixed with - (removed), + (added), or space (unchanged). Example: -old line, +new line. Git uses unified diff by default. Patch files use this format."
      }
    },
    {
      "@type": "Question",
      "name": "Why use diff for code review?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diff view focuses attention on changes rather than entire file. Reviewers see exactly what changed: new features, bug fixes, refactoring. Faster review than reading whole file. Git pull requests show diffs. Side-by-side diff makes spotting errors easier. Essential for catching bugs before merge."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create a git diff?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Git diff commands: 'git diff' shows unstaged changes, 'git diff --staged' shows staged changes, 'git diff HEAD' shows all uncommitted changes, 'git diff commit1 commit2' compares commits, 'git diff branch1 branch2' compares branches. Output in unified format. Use 'git diff --color-words' for word-level changes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Text Diff Checker - Compare Two Texts Side by Side',
  description: 'Free online diff checker for comparing text. Highlight additions, deletions, and modifications. Code review, document comparison, git diff preview tool for developers.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DiffChecker />
    </Suspense>
  );
}