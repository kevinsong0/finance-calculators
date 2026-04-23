import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoggingGuide from '@/components/LoggingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are logging best practices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Logging best practices: Log levels: ERROR - failures, exceptions, immediate attention, WARN - potential problems, monitor closely, INFO - important events, normal tracking, DEBUG - detailed diagnostics, development only, TRACE - very detailed, debugging specific issues. Structure: Use structured logging (JSON), include timestamps, include request/session ID, include relevant context, consistent message format. Content: Log errors with stack trace and context, log business events for tracking, log performance metrics for optimization, log security events for audit. Avoid: Logging sensitive data (passwords, tokens), excessive debug logging in production, unstructured messages, missing context, logging in loops. Best practices = appropriate level, structured format, context included. Don&apos;t over-log, don&apos;t log secrets. Make logs searchable and useful."
      }
    },
    {
      "@type": "Question",
      "name": "What should I log in applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "What to log in applications: Errors and exceptions: All errors with stack trace, error context (inputs, state), error severity, error timestamps. Business events: User actions (login, logout), transactions, state changes, important milestones. Performance metrics: Request processing time, resource usage, cache hits/misses, queue depths. Security events: Authentication attempts, authorization failures, suspicious activity, admin actions. Request/response: Request IDs, request parameters (sanitized), response status, response time. State changes: Configuration changes, data modifications, system events. What to log = errors, events, metrics, security. Include context for diagnosis. Balance detail with volume. Never log secrets. Make logs actionable."
      }
    },
    {
      "@type": "Question",
      "name": "How do I choose log levels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Log level selection: ERROR level: Application failures, exceptions thrown, critical errors, system crashes, immediate attention required. WARN level: Potential problems, deprecated usage, near-error conditions, resource nearing limits, unusual patterns. INFO level: Important business events, user actions, transaction completions, configuration changes, normal milestones. DEBUG level: Detailed diagnostic info, internal state, flow tracing, only during development/debugging. TRACE level: Very detailed tracing, entering/exiting methods, variable values, specific debugging sessions. Production: ERROR and WARN always, INFO for key events, DEBUG/TRACE disabled or selective. Development: DEBUG/TRACE enabled for troubleshooting. Level selection = match severity. Error for problems. Info for events. Debug for details. Adjust by environment. Don&apos;t use wrong level."
      }
    },
    {
      "@type": "Question",
      "name": "How do I avoid logging sensitive data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sensitive data logging prevention: What&apos;s sensitive: Passwords, API keys, tokens, credit card numbers, personal data (PII), authentication credentials, encryption keys, medical records. Prevention methods: Mask/replace sensitive fields before logging, use log sanitization libraries, configure exclusion filters, audit log statements for sensitive data, use placeholder values for credentials, separate audit logs for compliance needs. Implementation: Create log sanitization layer, standard field masking patterns, developer training on sensitive data, code review for log statements, automated scanning for secrets in logs. Compliance: GDPR, HIPAA, PCI-DSS requirements, log retention policies, audit trail without secrets. Prevention = conscious effort. Sanitize before logging. Review log statements. Train developers. Automated checks. Security and compliance critical."
      }
    },
    {
      "@type": "Question",
      "name": "How do I set up log aggregation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Log aggregation setup: Purpose: Centralize logs from multiple sources, enable search and analysis, provide unified view, support monitoring and alerting. Tools: ELK Stack (Elasticsearch, Logstash, Kibana), Splunk, CloudWatch Logs, Datadog, Grafana Loki, Fluentd/Fluent Bit. Setup steps: Choose aggregation platform, configure log shipping from applications, set up log parsing/format, configure indexes for search, set up dashboards, configure alerts for critical logs. Architecture: Application logs → Log shipper → Aggregation platform → Search/visualization. Considerations: Log volume and cost, retention policy, search performance, security/access control. Aggregation = centralize and analyze. Choose appropriate tool. Configure shipping. Set up dashboards. Define alerts. Manage volume and cost."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Logging Best Practices Guide - Levels, Structure & Security',
  description: 'Log levels, what to log, sensitive data handling, and aggregation.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LoggingGuide />
    </Suspense>
  );
}