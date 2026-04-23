import type { Metadata } from 'next';
import { Suspense } from 'react';
import DebuggingTips from '@/components/DebuggingTips';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I debug code effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Debug effectively: reproduce bug first, isolate problem area, use debugger (breakpoints, step through), check error messages and stack trace, verify assumptions, test edge cases, fix root cause not symptom, add tests to prevent recurrence. Systematic approach faster than random. Tools: VS Code debugger, Chrome DevTools, console.log."
      }
    },
    {
      "@type": "Question",
      "name": "What are common programming bugs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common bugs: Null reference (undefined access), Type mismatch (wrong type), Off-by-one (array bounds), Race condition (async timing), Memory leak (unreleased resources), Infinite loop (wrong condition), Syntax error (typos), Logic error (wrong algorithm), Integration issues (API mismatch). Most bugs from: assumptions, edge cases, recent changes."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use breakpoints for debugging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use breakpoints: set breakpoint at suspicious line (F9 in VS Code), run debugger (F5), pause at breakpoint, inspect variables, step through (F10 step over, F11 step into), check call stack, modify variables on fly, continue to next breakpoint. Conditional breakpoint: pause only when condition true. Exception breakpoint: pause on error."
      }
    },
    {
      "@type": "Question",
      "name": "What is rubber duck debugging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rubber duck debugging: explain code line by line to imaginary listener (rubber duck). Forces you to articulate logic explicitly. Often reveals error while explaining. Benefits: fresh perspective, catches assumptions, slower pace reveals details. Works because brain processes differently when verbalizing. Free, simple, effective technique."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prevent bugs in code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prevent bugs: write unit tests, use type checking (TypeScript), validate inputs, handle edge cases, use linting (ESLint), code reviews, meaningful names, small functions, avoid complexity, document assumptions, defensive programming, test boundaries, use version control, automate testing. Prevention cheaper than debugging."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Debugging Tips - Fix Bugs Faster with Systematic Approach',
  description: 'Debugging methods, common errors, breakpoint types, tools. Fix bugs faster with systematic approach.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DebuggingTips />
    </Suspense>
  );
}