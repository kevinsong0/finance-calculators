import type { Metadata } from 'next';
import { Suspense } from 'react';
import ErrorHandlingGuide from '@/components/ErrorHandlingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are error handling best practices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Error handling best practices: General principles: Fail gracefully, don&apos;t crash the application, provide useful feedback to users, log errors for debugging, handle errors at appropriate level. Strategies: Validation - catch input errors early, Graceful degradation - provide fallback behavior, Retry - for transient/network errors, Fallback - alternative values or paths, Centralize - common error handling logic. User experience: Clear error messages, don&apos;t expose internals, suggest recovery actions, maintain application state, don&apos;t leave user stranded. Development: Use try-catch appropriately, handle promise rejections, implement error boundaries, test error scenarios. Best practices = graceful failure, user feedback, logging, appropriate handling level. Don&apos;t crash, don&apos;t expose internals. Test unhappy paths."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle different error types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Error type handling: Input errors: Validate before processing, provide clear validation messages, prevent invalid data entry, early rejection. Business errors: Graceful degradation, alternative outcomes, user notification, business logic handling. System errors: Fallback mechanisms, retry logic, logging and alerting, graceful shutdown. Network errors: Retry with backoff, timeout handling, offline fallback, connection recovery. Database errors: Transaction rollback, data integrity protection, retry for transient, alternative data source. Security errors: Block and log, audit trail, notify security team, user session handling. Error types = different handling approaches. Input errors are preventable. System errors need fallbacks. Network errors retry. Security errors escalate. Match handling to type."
      }
    },
    {
      "@type": "Question",
      "name": "How do I provide good error messages to users?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "User error message best practices: Content: Clear, non-technical language, describe what happened, explain what to do, avoid jargon and code, never expose internals. Example good: &apos;We couldn&apos;t save your changes. Please try again or contact support.&apos; Example bad: &apos;Error 500: NullPointerException in line 42&apos;. Timing: Immediate feedback, don&apos;t delay, show where relevant. Presentation: Visible but not alarming, dismissable where appropriate, contextual placement. Recovery: Suggest action to fix, provide retry option, offer alternatives, link to help. Accessibility: Screen reader compatible, high contrast, sufficient time to read. Good messages = clear, actionable, user-focused. Technical details for logs, not users. Suggest recovery. Be helpful, not alarming."
      }
    },
    {
      "@type": "Question",
      "name": "What error handling patterns should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Error handling patterns: Try-catch blocks: Wrap risky operations, catch specific exceptions first, handle appropriately, don&apos;t catch too broadly. Error boundaries (React): Catch component errors, display fallback UI, log and report, maintain app stability. Global error handler: Catch unhandled errors, prevent crashes, log and report, graceful app-level response. Promise rejection handling: Always catch promise rejections, use .catch() or try-catch with async, don&apos;t let rejections go unhandled. Error wrapping: Wrap low-level errors with context, preserve original error information, add relevant context, classify error types. Patterns = structured approach. Try-catch for operations. Error boundaries for UI. Global for unhandled. Always catch promises. Add context through wrapping."
      }
    },
    {
      "@type": "Question",
      "name": "How do I test error handling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Error handling testing: Test scenarios: Invalid inputs, network failures, timeouts, server errors, permission failures, data corruption, concurrent access issues. Testing methods: Unit tests for error conditions, integration tests for error flows, mock error responses, simulate failure conditions, stress testing for edge cases. Coverage: All error paths exercised, error messages verified, fallback behavior tested, recovery mechanisms tested, logging verified. Tools: Mocking frameworks, error simulation libraries, chaos engineering tools. Documentation: Error codes documented, handling procedures documented, known issues tracked. Testing errors = critical for robustness. Test unhappy paths. Simulate failures. Verify fallbacks. Check logging. Don&apos;t just test success cases."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Error Handling Best Practices Guide - Types, Strategies & Patterns',
  description: 'Error types, handling strategies, user messages, and testing.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ErrorHandlingGuide />
    </Suspense>
  );
}