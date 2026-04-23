import type { Metadata } from 'next';
import { Suspense } from 'react';
import GitCommitGuide from '@/components/GitCommitGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I write a good git commit message?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good commit message structure: Subject line (required): 50 characters max, imperative mood (&apos;Add&apos; not &apos;Added&apos;), no period at end, summarize change. Body (optional): Wrap at 72 characters, separate from subject with blank line, explain why change made (not how), use bullet points for multiple items. Footer (optional): Reference issues (&apos;Refs: #123&apos;), note breaking changes (&apos;BREAKING CHANGE: ...&apos;). Example: &apos;feat: Add user authentication&apos; + blank line + &apos;Implement JWT-based auth to secure API endpoints. Users can now log in and receive tokens for subsequent requests.&apos; + &apos;Refs: #45&apos;. Write for future reader. Future you or colleagues will read this. Explain why, be specific. Good message = clear history. Bad message = mystery commits."
      }
    },
    {
      "@type": "Question",
      "name": "What is conventional commits format?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conventional commits format: Structure: &lt;type&gt;[optional scope]: &lt;description&gt;. Types: feat - new feature for user. fix - bug fix for user. docs - documentation changes. style - formatting, no code change (spaces, formatting). refactor - code change neither fixes bug nor adds feature. test - adding or correcting tests. chore - maintenance (build, config, dependencies). Scope: Optional context like (auth), (api), (ui). Examples: &apos;feat(auth): Add OAuth login&apos;, &apos;fix(api): Resolve timeout issue&apos;, &apos;docs: Update README installation steps&apos;. Benefits: Auto-generated changelogs, clear history, easy to filter commits, standardized format. Conventional = structured format. Ad hoc = inconsistent history. Adopt convention for team consistency."
      }
    },
    {
      "@type": "Question",
      "name": "What makes a bad commit message?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bad commit message examples: Vague messages: &apos;Fixed stuff&apos;, &apos;Changes&apos;, &apos;Update&apos;, &apos;WIP&apos;. Why bad: No information about what changed, why, or impact. Future readers can&apos;t understand. Multiple changes: &apos;Add feature and fix bug and refactor&apos;. Why bad: Hard to review, hard to revert partially, conflates unrelated changes. Wrong tense: &apos;Added feature&apos; (past) instead of &apos;Add feature&apos; (imperative). Why bad: Doesn&apos;t match convention, reads awkwardly in history. Too long: Subject line over 50 chars. Why bad: Hard to scan in history, breaks formatting. Missing context: Just the change, not why it was needed. Why bad: Future readers don&apos;t understand motivation. Bad message = confusing history. Good message = clear communication. Write specific, explain why, one change per commit."
      }
    },
    {
      "@type": "Question",
      "name": "How do I split changes into multiple commits?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Commit splitting strategy: One logical change per commit: Each commit should be one coherent change, easy to review, easy to revert if needed. Grouping rules: Feature addition = separate commit. Bug fix = separate commit. Refactoring = separate commit. Documentation = separate commit. Test addition = separate commit (could combine with feature). Style/formatting = separate commit. Configuration = separate commit. Git add strategically: &apos;git add -p&apos; for interactive staging, stage specific files, stage portions of files. Order of commits: Logical order - refactor before feature, tests with or after feature, docs last. Split commits = clean history. Monolithic commits = messy history. Use interactive staging, commit logical units separately."
      }
    },
    {
      "@type": "Question",
      "name": "Should I reference issues in commit messages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Issue reference in commits: When to reference: Any commit related to an issue/ticket, bug fix, feature implementation, change requested in ticket. Format: Footer: &apos;Refs: #123&apos; or &apos;Closes: #123&apos; or &apos;Fixes: #123&apos;. &apos;Refs&apos; - references but doesn&apos;t close. &apos;Closes&apos;/&apos;Fixes&apos; - will auto-close issue on merge (if platform supports). Placement: In footer section after body, separated by blank line. Benefits: Traceability from code to requirements, easy to find related commits, automated linking in GitHub/GitLab. When not needed: Small fixes not from tickets, minor refactors, documentation updates without issue. Reference = traceability. No reference = lost context. Link commits to their source tickets."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Git Commit Best Practices Guide - Messages, Types & Conventions',
  description: 'Commit message format, conventional types, best practices, and examples.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GitCommitGuide />
    </Suspense>
  );
}