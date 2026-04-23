import type { Metadata } from 'next';
import { Suspense } from 'react';
import GitMergeConflict from '@/components/GitMergeConflict';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I resolve git merge conflicts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resolve conflicts: identify conflict files (git status), open file with conflict markers (&lt;&lt;&lt;&lt;&lt;&lt;&lt;, =======, &gt;&gt;&gt;&gt;&gt;&gt;&gt;), choose resolution strategy (keep yours, keep theirs, combine), remove markers, save file, git add filename, git merge --continue. Use VS Code or merge tools for easier resolution. Test after resolving."
      }
    },
    {
      "@type": "Question",
      "name": "What do git conflict markers mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Git conflict markers: &lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD marks your current branch changes. ======= separates the two versions. &gt;&gt;&gt;&gt;&gt;&gt;&gt; branch-name marks incoming branch changes. Everything between HEAD and ======= is yours. Everything between ======= and &gt;&gt;&gt;&gt;&gt;&gt;&gt; is theirs. Remove all markers when resolving."
      }
    },
    {
      "@type": "Question",
      "name": "How do I accept all incoming changes in git merge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accept all incoming: git checkout --theirs . (for all files) or git checkout --theirs filename (for specific file). This keeps incoming branch changes, discards yours. Then git add . and git merge --continue. Warning: your changes are lost. Use carefully. Better to review each conflict manually."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use git mergetool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "git mergetool: configure tool with git config --global merge.tool meld. Run git mergetool when conflicts exist. Opens visual diff tool showing three versions: base, yours, theirs. Edit to resolve. Save and tool marks as resolved. Repeat for each conflicting file. Popular tools: VS Code, Meld, IntelliJ, vimdiff."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prevent git merge conflicts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prevent conflicts: pull latest before starting work, small frequent commits, communicate with team, use branches properly, review changes before merging, avoid editing same files as others, use feature branches instead of direct main edits. Code reviews catch potential conflicts early. Git rebase can help linearize history."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Git Merge Conflict Resolution - Fix Merge Conflicts Guide',
  description: 'Guide to resolving git merge conflicts. Conflict markers, resolution strategies, merge tools, step-by-step process. Fix conflicts quickly.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GitMergeConflict />
    </Suspense>
  );
}