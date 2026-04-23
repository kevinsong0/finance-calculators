import type { Metadata } from 'next';
import { Suspense } from 'react';
import GitWorkflowGuide from '@/components/GitWorkflowGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What Git workflow should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Git workflows: Feature Branch (small teams, simple - each feature separate branch, PR to main). GitFlow (enterprise, structured releases - main, develop, feature, release, hotfix branches). Trunk Based (CI/CD teams - work on main, short branches, continuous integration). GitHub Flow (GitHub projects - main + feature branches, PR required). Forking (open source - fork repo, changes in fork, submit PR upstream). Choose based on: team size, release frequency, project complexity. Small team: feature branch. Large org: GitFlow. CI/CD: trunk-based."
      }
    },
    {
      "@type": "Question",
      "name": "When should I use git merge vs rebase?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Merge vs rebase: Merge - preserves history, creates merge commit, good for shared branches. Use for: integrating feature branches, team collaboration, preserving timeline. Rebase - linear history, moves commits onto target, cleaner log. Use for: updating local branch, cleaning up feature branch before merge. Avoid rebase on shared/public branches (changes history, breaks others). General rule: merge shared branches, rebase local/feature branches. Rebase for cleaner history, merge for collaboration safety."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write good commit messages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good commit messages: Format: type: brief summary (50 chars max). Types: feat (feature), fix (bug), docs, style, refactor, test, chore. Body: explain why (not how), wrap at 72 chars. Reference issues: Fixes #123, Related to #456. Example: feat: Add user authentication. Bad: Fixed stuff, Updated code, changes. Good: fix: Handle null input in validateEmail function. Template: <type>: <summary> [optional body] [optional footer]. Consistent messages = readable history, easier debugging, better collaboration."
      }
    },
    {
      "@type": "Question",
      "name": "How do I resolve Git merge conflicts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resolve conflicts: 1. git status (see conflicted files). 2. Open file (look for <<<<<<< HEAD ===== >>>>>>> branch markers). 3. Edit file (choose correct code, remove markers). 4. git add file (mark as resolved). 5. git commit (complete merge). Tools: VS Code merge editor, git mergetool. Tips: pull changes before starting work, commit often, communicate with team. Prevent conflicts: work on separate features, pull regularly, small commits. Conflicts normal in collaboration - don&apos;t panic, resolve carefully, commit result."
      }
    },
    {
      "@type": "Question",
      "name": "What is a pull request?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pull request (PR): request to merge branch into main/target. Components: source branch, target branch, changes, description, reviewers, comments. Benefits: code review before merge, discussion of changes, CI checks run, documented history. Process: push branch, open PR, reviewers comment, address feedback, CI passes, merge when approved. Good PR: small changes, clear description, test coverage, screenshots if UI. Use PRs for: all changes to protected branches, team review, quality gate. GitHub/GitLab/Bitbucket all support PR workflow."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Git Workflow Guide - Workflows, Commands & Best Practices',
  description: 'Workflow types, key commands, best practices, and commit message format.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GitWorkflowGuide />
    </Suspense>
  );
}