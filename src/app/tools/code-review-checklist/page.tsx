import type { Metadata } from 'next';
import { Suspense } from 'react';
import CodeReviewChecklist from '@/components/CodeReviewChecklist';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should I check in a code review?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Code review checklist: Code quality - naming, complexity, DRY. Security - injection, XSS, validation. Performance - loops, queries, caching. Error handling - exceptions, edge cases. Testing - unit tests, coverage. Documentation - comments, API docs. Architecture - patterns, dependencies. Use comprehensive checklist for consistent reviews."
      }
    },
    {
      "@type": "Question",
      "name": "How do I give constructive code review feedback?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Constructive feedback: Ask questions (What if...?), suggest alternatives (Consider using...), explain reasoning. Avoid demands (Change this). Focus on code, not author. Balance criticism with praise. Be specific about issues. Explain impact of problems. Use consistent review process. Approve when concerns addressed. Respect author&apos;s expertise."
      }
    },
    {
      "@type": "Question",
      "name": "How long should a code review take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Code review time: 400 lines max per review (too many reduces effectiveness). Small PRs review in 15-30 minutes. Large PRs: break into multiple reviews. Don&apos;t rush - thoroughness matters. Balance speed and quality. Use automated tools for style/formatting. Focus brainpower on logic and architecture. Quick turnaround improves team velocity."
      }
    },
    {
      "@type": "Question",
      "name": "What are common code review mistakes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common mistakes: Focusing on style (use linter instead), being too critical/negative, reviewing too much code at once, missing security issues, demanding changes without explanation, not asking questions, skipping tests review, approving without checking. Use checklist to avoid. Automate what can be automated. Focus on what matters."
      }
    },
    {
      "@type": "Question",
      "name": "How do I review security in code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Security review: Check input validation/sanitization, look for SQL injection (raw queries), XSS (unsanitized output), authentication bypasses, authorization checks, hardcoded secrets, sensitive data exposure, HTTPS enforcement, proper error handling (no stack traces). Use security scanner tools. OWASP top 10 focus. Zero trust approach."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Code Review Checklist - Comprehensive Developer Review Guide',
  description: 'Complete code review checklist. Quality, security, performance, testing, documentation. Ensure high-quality code before merge.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CodeReviewChecklist />
    </Suspense>
  );
}