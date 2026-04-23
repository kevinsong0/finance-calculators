import type { Metadata } from 'next';
import { Suspense } from 'react';
import VersionControlBestPractices from '@/components/VersionControlBestPractices';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I write good commit messages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good commit messages: Format: type: brief summary (50 chars max). Types: feat (feature), fix (bug), docs, style, refactor, test, chore. Body: explain why (not how), wrap at 72 chars. Example: feat: Add user authentication. Bad: Fixed stuff, Updated code, changes. Good: fix: Handle null input in validateEmail function. Template: <type>: <summary> [optional body] [optional footer]. Reference issues: Fixes #123. Consistent messages = readable history, easier debugging, better collaboration."
      }
    },
    {
      "@type": "Question",
      "name": "Should I commit directly to main branch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never commit directly to main: Use feature branches for all changes. Reasons: Allows review before merge. Isolated development (doesn't break main). Easy to abandon bad changes. Clear history of what changed. Enables pull request workflow. Exceptions: Minor documentation fixes, urgent hotfixes (still prefer hotfix/ branch). Best practice: Protect main branch (settings require PR for merge). Branch per feature/fix, merge via PR after review. Direct commits = unreviewed code = bugs in production."
      }
    },
    {
      "@type": "Question",
      "name": "How do I name Git branches?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Branch naming conventions: feature/<description> - new features (feature/user-auth, feature/payment-flow). bugfix/<description> - bug fixes (bugfix/login-error). hotfix/<description> - urgent production fixes (hotfix/security-patch). release/<version> - release prep (release/v2.0). Rules: Use lowercase, hyphens for spaces. Brief but descriptive. Include issue number if applicable (feature/user-auth-123). Avoid: generic names (my-branch, test), too long (>50 chars), special characters. Consistent naming = organized repo, easier to understand purpose."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I commit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Commit frequency: Commit often (every logical change). Ideal: one commit per logical unit (not per line, not per day). Good: fix specific bug = one commit, add feature component = one commit. Bad: huge commits with many unrelated changes, commits with incomplete work. Benefits: Easier review (smaller changes), easier rollback (granular), cleaner history, easier debugging (find exact change). Balance: meaningful commits, not micro-commits. Commit when: logical unit complete, tests pass, not mid-experiment. Frequency = several commits per hour during active work."
      }
    },
    {
      "@type": "Question",
      "name": "What should I not commit to Git?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never commit: Secrets/credentials (API keys, passwords, tokens - use .env, secret management). Large binary files (images, videos - use Git LFS or external storage). Generated files (build outputs, node_modules, dist - use .gitignore). IDE config (personal settings - .vscode, .idea individual). Dependencies (package files OK, installed packages NO). Temporary files (logs, cache, temp). Database files (.db, .sqlite). Committing secrets = security breach (keys in history forever). Use .gitignore to exclude properly. Review files before commit."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Version Control Best Practices - Git Practices & Branch Strategy',
  description: 'Git best practices, commit format, branch naming, and tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VersionControlBestPractices />
    </Suspense>
  );
}