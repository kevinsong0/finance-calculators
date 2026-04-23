import type { Metadata } from 'next';
import { Suspense } from 'react';
import CodeQualityGuide from '@/components/CodeQualityGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is code quality?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Code quality: measure of how maintainable, reliable, and readable code is. Dimensions: Maintainability - easy to modify, extend, fix. Reliability - works correctly, handles errors. Readability - clear, understandable. Efficiency - performs well. Security - no vulnerabilities. Testability - easy to test. Quality code = lower bugs, faster changes, easier onboarding, reduced costs. Measure with: coverage, complexity, duplication, technical debt. Improve with: standards, reviews, testing, refactoring. Quality pays long-term dividends."
      }
    },
    {
      "@type": "Question",
      "name": "What is SOLID principles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SOLID principles (OOP design): S - Single Responsibility (one reason to change). O - Open/Closed (open for extension, closed for modification). L - Liskov Substitution (subtypes replaceable for base types). I - Interface Segregation (specific interfaces over general). D - Dependency Inversion (depend on abstractions, not concretions). Benefits: flexible, maintainable, testable code. Apply gradually - not all at once. Most important: Single Responsibility. SOLID = guidelines, not rules. Context matters. Over-engineering = anti-pattern."
      }
    },
    {
      "@type": "Question",
      "name": "How do I reduce code complexity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduce complexity: Break large functions into smaller ones (<50 lines, <10 cyclomatic). Reduce nesting (max 3 levels, early returns). Extract helper functions. Use clear naming (self-documenting). Remove dead code. Simplify conditionals (guard clauses, ternaries). Avoid deep inheritance (composition over inheritance). Limit parameters (max 4, use objects). Use constants for magic numbers. Apply KISS (keep it simple). Complexity = bugs, hard to understand, hard to test. Measure with cyclomatic complexity. Low complexity = maintainable code."
      }
    },
    {
      "@type": "Question",
      "name": "What is technical debt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technical debt: shortcuts taken now that cost more later. Types: Deliberate (conscious trade-off for speed). inadvertent (lack of knowledge, poor design). Examples: Copy-paste code, missing tests, poor architecture, hardcoded values, missing documentation. Cost: bugs, slow changes, hard onboarding, developer frustration. Manage: Track debt (tickets, backlog), allocate time to pay down, prioritize high-impact debt, prevent new debt (standards, reviews). Not all debt bad - sometimes deliberate for speed. Key: pay back regularly, don&apos;t let it accumulate."
      }
    },
    {
      "@type": "Question",
      "name": "How important is code coverage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Code coverage: percentage of code executed by tests. Importance: Indicator of test thoroughness. NOT guarantee of quality. Good coverage = higher confidence, easier refactoring. Target: >80% for critical paths. Don&apos;t chase 100% - diminishing returns. Focus on meaningful tests, not just coverage. High coverage + bad tests = false confidence. Low coverage + good tests = limited scope. Use coverage as guide, not goal. Types: line, branch, function coverage. Branch coverage more meaningful. Coverage tool + review = better testing strategy."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Code Quality Guide - Metrics, Principles & Best Practices',
  description: 'Code quality metrics, SOLID principles, complexity reduction, and tools.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CodeQualityGuide />
    </Suspense>
  );
}