import type { Metadata } from 'next';
import { Suspense } from 'react';
import DependencyVersionChecker from '@/components/DependencyVersionChecker';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between caret and tilde in npm?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Caret (^): allows minor and patch updates. ^18.2.0 → 18.x.x (18.3.0 works). Tilde (~): allows patch updates only. ~4.17.21 → 4.17.x (4.17.22 works, 4.18.0 doesn&apos;t). Caret is more flexible, common for libraries. Tilde more conservative, good for utilities. Fixed version (no prefix) locks exact version."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use fixed versions in package.json?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fixed versions: pros - reproducible builds, no unexpected updates. cons - miss bug fixes, manual updates needed. Use fixed for: critical packages, breaking changes common, production apps. Use caret for: most dependencies, libraries. Use tilde for: patch-only updates wanted. package-lock.json locks resolved versions regardless of prefix."
      }
    },
    {
      "@type": "Question",
      "name": "How do I check for outdated npm packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Check outdated: npm outdated shows current, wanted, latest versions. Current: installed. Wanted: allowed by package.json. Latest: newest available. Update: npm update (within allowed range), npm install package@latest (to latest). Review changelog before major updates. Test after updates. Use npm audit for security issues."
      }
    },
    {
      "@type": "Question",
      "name": "What is package-lock.json?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "package-lock.json: locks exact installed versions of all dependencies (including nested). Created/updated on npm install. Ensures reproducible installs across machines. Commit to git for consistency. Overrides package.json version ranges for installation. Delete and reinstall to update to newest allowed versions. Don&apos;t manually edit - use npm commands."
      }
    },
    {
      "@type": "Question",
      "name": "How do I update all dependencies safely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Update safely: npm outdated first, review changelogs for major changes. Update: npm update for patch/minor within allowed versions. Major updates: npm install package@latest manually. Use npm audit for security. Test thoroughly after updates. Consider: commit before updating, update incrementally, check breaking changes. Use tools like npm-check-updates for bulk updates."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Dependency Version Checker - Analyze package.json Versions',
  description: 'Analyze npm package.json dependency versions. Check caret, tilde, fixed versions. Understand version semantics. Improve dependency management.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DependencyVersionChecker />
    </Suspense>
  );
}