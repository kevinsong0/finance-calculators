import type { Metadata } from 'next';
import { Suspense } from 'react';
import ErrorHandlingPatterns from '@/components/ErrorHandlingPatterns';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I handle errors in JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JavaScript error handling: try-catch for synchronous code, .catch() for promises, try-catch with async/await, Error Boundary in React for render errors, window.onerror for global unhandled errors, process.on('uncaughtException') in Node.js. Best practice: handle locally when possible, global as backup. Always log errors with context. Show user-friendly messages, not raw errors."
      }
    },
    {
      "@type": "Question",
      "name": "What is an Error Boundary in React?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Error Boundary: React component that catches errors in child components during rendering. Create class component with componentDidCatch() and getDerivedStateFromError(). Wraps components to show fallback UI on error. Example: <ErrorBoundary fallback={<ErrorPage />}><App /></ErrorBoundary>. Catches render errors, lifecycle errors, constructor errors. Does NOT catch event handlers, async code, server-side rendering."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle async/await errors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Async/await error handling: wrap in try-catch block. Example: try { const data = await fetch(url); } catch (error) { console.error(error); showFallback(); }. Can also use .catch() on the promise: await fetch(url).catch(handleError). For multiple async calls, use Promise.all with try-catch, or Promise.allSettle to handle individual errors. Always handle async errors - unhandled promise rejections crash Node.js."
      }
    },
    {
      "@type": "Question",
      "name": "What are common error types in programming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common error types: Syntax Error (code parsing fails, fix syntax), Runtime Error (execution fails like null access, fix with checks), Type Error (wrong type operation, use TypeScript), Network Error (API fails, add retry), Logic Error (wrong algorithm, use tests), Resource Error (OOM/stack overflow, optimize). Most errors from: assumptions, edge cases, recent changes. Use linting, TypeScript, tests to prevent."
      }
    },
    {
      "@type": "Question",
      "name": "Should I create custom error types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Custom error types: Yes for domain-specific errors. Create class extending Error: class ValidationError extends Error { constructor(msg) { super(msg); this.name = 'ValidationError'; } }. Benefits: catch specific errors (try { op() } catch(e) { if (e instanceof ValidationError) handleValidation() }), clear error categorization, includes domain context. Use for: validation, auth, network, database errors. Standard Error for generic cases."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Error Handling Patterns - Robust Code Best Practices',
  description: 'Common patterns, error types, best practices, and monitoring tools.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ErrorHandlingPatterns />
    </Suspense>
  );
}