import type { Metadata } from 'next';
import { Suspense } from 'react';
import GitCheatSheet from '@/components/GitCheatSheet';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create a new Git branch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Create and switch to new branch: git checkout -b branch-name. Create branch without switching: git branch branch-name. Switch to existing branch: git checkout branch-name. Modern Git also supports: git switch -c branch-name (create) or git switch branch-name (switch). Push new branch to remote: git push -u origin branch-name."
      }
    },
    {
      "@type": "Question",
      "name": "How do I undo the last Git commit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Undo last commit keeping changes: git reset HEAD~1 (soft reset). Undo last commit keeping changes in working directory: git reset --soft HEAD~1. Undo last commit discarding all changes: git reset --hard HEAD~1 (dangerous). Safely undo commit creating new commit: git revert HEAD. Check history first: git log --oneline."
      }
    },
    {
      "@type": "Question",
      "name": "How do I push to a remote Git repository?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Push to remote: git push origin branch-name. Push and set upstream (first push): git push -u origin branch-name. Push all branches: git push --all origin. Push tags: git push --tags. Force push (dangerous): git push -f origin branch-name. Always pull before pushing to avoid conflicts: git pull origin branch-name then git push."
      }
    },
    {
      "@type": "Question",
      "name": "How do I merge a Git branch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Merge branch: git checkout main, git merge feature-branch. Fast-forward merge (linear history): default when no divergent commits. Three-way merge (creates merge commit): when branches diverged. Resolve conflicts: edit conflicted files, git add, git commit. Delete merged branch: git branch -d feature-branch. Abort merge: git merge --abort."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use Git stash?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Git stash saves working changes temporarily. Stash changes: git stash. Stash with message: git stash -m 'message'. List stashes: git stash list. Apply most recent stash: git stash pop. Apply specific stash: git stash apply stash@{2}. Drop stash: git stash drop stash@{0}. Clear all stashes: git stash clear. Useful before switching branches."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Git Cheat Sheet - Complete Git Command Reference',
  description: 'Complete Git command reference. Setup, basic commands, branching, remote operations, undo changes, stash, diff, and tagging. Quick reference for version control workflows.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GitCheatSheet />
    </Suspense>
  );
}