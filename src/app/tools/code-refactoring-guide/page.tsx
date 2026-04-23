import type { Metadata } from 'next';
import { Suspense } from 'react';
import RefactoringGuide from '@/components/RefactoringGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is code refactoring?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Code refactoring definition: Purpose: Improve code structure without changing behavior, make code easier to understand and modify, reduce technical debt, enhance maintainability, not fixing bugs or adding features. Key principle: Behavior unchanged - same inputs produce same outputs, tests still pass after refactoring, external interfaces unchanged, only internal structure improved. When to refactor: Before adding new features (clean first), after fixing bugs (clean up), when code is hard to understand, when duplicate code found, during code review, scheduled maintenance time. Common refactorings: Extract method - break long methods into smaller pieces. Rename - better variable/method/class names. Extract class - move responsibilities to new class. Replace magic number - named constants. Decompose conditional - simplify complex if statements. Introduce parameter object - group related parameters. Benefits: Easier future changes, better readability, reduced bugs, lower technical debt, faster development later. Refactoring = structural improvement. Behavior preservation is essential. Tests verify behavior unchanged."
      }
    },
    {
      "@type": "Question",
      "name": "What are signs that code needs refactoring?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Code refactoring signs: Method-level: Long methods (over 20-30 lines), duplicate code blocks, unclear variable/method names, deep nesting (3+ levels), too many parameters (5+), magic numbers/strings (hardcoded values), dead code (unused variables/methods). Class-level: Large classes (too many methods/responsibilities), long parameter lists for constructors, feature envy (method uses another class more), inappropriate intimacy (knows too much about another class), refused bequest (subclass doesn&apos;t use inherited methods). Code smell indicators: Comments explaining complex logic (code should be clear), multiple responsibilities in one class, hard to understand flow, changing one thing breaks multiple tests, fear of touching certain code. Priority: Duplicate code highest (copy-paste development), long methods second, unclear names third, large classes fourth. Signs = refactoring opportunity. Not all at once - prioritize. Address when adding features nearby or during dedicated time."
      }
    },
    {
      "@type": "Question",
      "name": "How do I refactor code safely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Safe refactoring process: Prerequisites: Tests covering current behavior - must have tests first, green tests before starting, understand what code does, identify specific problem to address. Process: 1. Write tests if missing (or don&apos;t refactor), 2. Run tests to confirm current behavior, 3. Make smallest possible change, 4. Run tests immediately, 5. If tests pass - commit, continue, 6. If tests fail - fix or revert, 7. Repeat until refactoring complete. Safety principles: One refactoring at a time, commit after each successful step, tests verify behavior unchanged, don&apos;t mix refactoring with feature changes, use IDE refactoring tools when available, review changes with team. When to stop: Code is cleaner, tests pass, no obvious improvements, diminishing returns, time constraints. Tools: IDE refactoring support (rename, extract method), automated testing, version control for rollback. Safety = tests + small steps + commits. No tests = don&apos;t refactor. One change, test, commit, repeat."
      }
    },
    {
      "@type": "Question",
      "name": "When should I refactor code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Refactoring timing: Best times: Before adding features - clean code first makes feature easier, after fixing bugs - improve while you understand the code, during code review - address issues reviewer finds, when understanding code - if hard to read, refactor while learning it, scheduled time - dedicated refactoring sessions, when code smells obvious - duplicate code, long methods. Avoid: When adding critical features (do separately), when under tight deadline pressure, when code has no tests (add tests first), when behavior needs to change (separate concerns). Rule of three: First time - just do it, second time - notice duplication, third time - refactor. Opportunistic refactoring: Leave code better than you found it, small improvements during other work, accumulate improvements over time, don&apos;t require dedicated session always. Scheduled refactoring: Large refactorings need planning, allocate time for technical debt, team coordination if affecting many files, document intent and scope. Timing = balance opportunity vs dedicated. Opportunistic for small, scheduled for large. Tests are prerequisite for any timing."
      }
    },
    {
      "@type": "Question",
      "name": "What refactoring techniques are most useful?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most useful refactorings: Extract Method: Break long methods into smaller pieces, each method does one thing, easier to understand and test, most common refactoring. Rename: Better names for variables, methods, classes, clearer intent, no explanation needed, easiest with IDE support. Extract Class: Move responsibilities to new class, single responsibility principle, reduce large classes, clearer organization. Replace Magic Number: Named constants instead of hardcoded values, constants explain purpose, easier to change, values centralized. Decompose Conditional: Break complex conditionals into methods, condition names explain logic, easier to understand, test condition logic separately. Remove Duplication: Extract common code to shared method, single source of truth, changes apply everywhere, reduces bugs. Introduce Parameter Object: Group related parameters into object, fewer parameters, clearer interface, easier to extend. Top refactorings = extract method, rename, remove duplication. Start with understanding, then extract, then rename. IDE tools help most refactorings."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Code Refactoring Guide - Types, Signs & Safe Practices',
  description: 'Refactoring techniques, signs to refactor, safe process, and principles.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RefactoringGuide />
    </Suspense>
  );
}