import type { Metadata } from 'next';
import { Suspense } from 'react';
import CodeMetricsCalculator from '@/components/CodeMetricsCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is cyclomatic complexity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cyclomatic complexity: measures number of independent paths through code. Formula: M = E - N + 2P (edges - nodes + 2*components). Practical: count decision points (if, else, while, for, case, &&, ||). Thresholds: 1-5 simple, 6-10 moderate, 11-20 complex (refactor), 21-50 very complex (refactor required), >50 untestable. High complexity = harder to test, maintain, understand."
      }
    },
    {
      "@type": "Question",
      "name": "How do I measure code coverage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Code coverage: percentage of code executed by tests. Types: line coverage (lines run), branch coverage (branches tested), function coverage (functions called). Tools: Jest (npm test -- --coverage), Istanbul, JaCoCo, Coverage.py. Target: >80% for critical code. Note: coverage != quality - need meaningful tests, not just coverage. Focus on critical paths, edge cases, error handling."
      }
    },
    {
      "@type": "Question",
      "name": "What is coupling in software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Coupling: degree of dependency between modules. Types: content (worst - access internal data), common (shared global), control (one controls other), stamp (share data structure), data (share simple data), message (best - only communicate). Low coupling = independent modules, easier to change/test. Reduce coupling: interfaces, dependency injection, avoid globals, limit shared state, clear boundaries."
      }
    },
    {
      "@type": "Question",
      "name": "What is cohesion in software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cohesion: degree of relatedness within a module. Types: coincidental (worst - no relation), logical (similar category), temporal (same time), procedural (same sequence), communicational (same data), functional (best - single purpose). High cohesion = focused module, easier to understand/use. Improve cohesion: single responsibility, group related functions, split unrelated ones, clear purpose."
      }
    },
    {
      "@type": "Question",
      "name": "How do I reduce code complexity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduce complexity: extract functions (smaller, focused), reduce branches (early returns, guard clauses), use polymorphism (replace conditionals), decompose conditionals (break complex if), use strategy pattern (replace switch), simplify logic (merge conditions), remove dead code, limit nesting (max 3 levels). Tools: ESLint complexity rule, SonarQube. Goal: complexity < 10 per function."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Code Metrics Calculator - Understand Quality Thresholds',
  description: 'Cyclomatic complexity, code coverage, coupling, cohesion thresholds and tools.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CodeMetricsCalculator />
    </Suspense>
  );
}