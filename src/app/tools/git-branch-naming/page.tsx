import type { Metadata } from 'next';
import { Suspense } from 'react';
import GitBranchNaming from '@/components/GitBranchNaming';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the standard git branch naming convention?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard conventions: feature/ for new features, bugfix/ for bug fixes, hotfix/ for urgent fixes, release/ for releases, docs/ for documentation, refactor/ for refactoring, test/ for tests, chore/ for maintenance. Format: type/description or type/issue-number-description. Use lowercase, hyphens, keep short. Examples: feature/login, bugfix/issue-42-crash."
      }
    },
    {
      "@type": "Question",
      "name": "How do I name a feature branch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Feature branch naming: feature/description or feature/issue-number-description. Use lowercase, hyphens between words. Examples: feature/user-authentication, feature/issue-123-payment-flow. Keep descriptive but short. Include ticket number for traceability. Create: git checkout -b feature/new-feature. Delete after merge."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between hotfix and bugfix?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bugfix: non-urgent bug fixes in development, merged to main via PR. Hotfix: urgent production fixes, branched from release tag, merged to production and main. Hotfix needs fast deployment. Bugfix follows normal workflow. Hotfix: critical security, crashes, data loss. Bugfix: UI glitches, minor errors. Different urgency levels."
      }
    },
    {
      "@type": "Question",
      "name": "Should I include issue numbers in branch names?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, include issue numbers: links branch to ticket, helps tracking, auto-link in GitHub/GitLab PRs. Format: feature/issue-123-description. Benefits: traceability, searchability, context. Team requirement often. Alternative: use PR description for linking. Issue numbers improve workflow efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "How do I enforce branch naming conventions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enforce conventions: GitLab branch name regex rules, GitHub branch naming policies, pre-commit hooks checking names, CI/CD rejecting invalid branches, documentation and training, automated branch creation tools. GitLab: Settings > Repository > Branch name regex. GitHub: branch rulesets. Hooks: validate before push. Automate where possible."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Git Branch Naming Convention - Standard Patterns for Teams',
  description: 'Git branch naming conventions for teams. Feature, bugfix, hotfix, release patterns. Best practices for clean repository naming.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GitBranchNaming />
    </Suspense>
  );
}