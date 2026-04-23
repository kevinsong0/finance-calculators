import type { Metadata } from 'next';
import { Suspense } from 'react';
import UnitTestingGuide from '@/components/UnitTestingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is unit testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unit testing: testing individual functions/components in isolation. Purpose: verify each unit works correctly before integration. Characteristics: fast execution, isolated (mock dependencies), automated, repeatable. Benefits: catch bugs early, safe refactoring, documentation of behavior, confidence in changes. Write tests for: logic functions, utility functions, components, edge cases. Use frameworks: Jest (JS), pytest (Python), JUnit (Java). Unit tests = foundation of testing pyramid."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write good unit tests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good unit tests: Test behavior, not implementation (what it does, not how). One assertion per test (clear pass/fail). Descriptive names (describe what is tested). Arrange-Act-Assert pattern (setup, execute, verify). Test edge cases (boundary, errors, empty). Keep tests fast (quick feedback). Independent tests (no shared state). Mock external dependencies (isolate unit). Avoid: testing private methods, over-mocking, flaky tests, giant test files. Refactor tests when refactoring code."
      }
    },
    {
      "@type": "Question",
      "name": "What is test coverage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Test coverage: percentage of code executed by tests. Types: line coverage (lines run), branch coverage (if/else branches tested), function coverage (functions called), statement coverage. Target: 80%+ for critical code, less for non-critical. Tools: Jest coverage, pytest-cov, JaCoCo. Note: coverage != quality - tests must be meaningful, not just hitting lines. High coverage with poor tests = false confidence. Focus coverage on critical paths, business logic, edge cases. Track coverage in CI, fail below threshold."
      }
    },
    {
      "@type": "Question",
      "name": "What is the testing pyramid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Testing pyramid: Unit tests (base, most tests) - fast, isolated, many. Integration tests (middle) - test component interactions, moderate speed. End-to-End tests (top, few) - test full flows, slow, expensive. Ratio: ~70% unit, ~20% integration, ~10% E2E. Reason: unit tests cheap/fast, catch most bugs. E2E tests slow/flaky, test complete system. Anti-pattern: inverted pyramid (many E2E, few unit) = slow CI, fragile tests. Balance: comprehensive coverage with reasonable runtime."
      }
    },
    {
      "@type": "Question",
      "name": "What is mocking in unit testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mocking: replacing real dependencies with fake implementations. Purpose: isolate unit, control behavior, avoid external calls. Mock types: Mock (replace entire object), Stub (provide canned responses), Spy (wrap real object, record calls), Fake (simplified working implementation). Mock what: external APIs, database calls, file system, network, time-dependent code. Don&apos;t mock: simple utilities, internal logic, domain objects. Over-mocking = tests don&apos;t test real behavior. Tools: Jest mocks, unittest.mock (Python), Mockito (Java)."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Unit Testing Guide - Concepts, Frameworks & Best Practices',
  description: 'Testing concepts, frameworks, best practices, and anti-patterns.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <UnitTestingGuide />
    </Suspense>
  );
}