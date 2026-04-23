import type { Metadata } from 'next';
import { Suspense } from 'react';
import SoftwareArchitectureGuide from '@/components/SoftwareArchitectureGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I choose an architecture pattern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Architecture pattern selection: Consider: Team size and skill, scale requirements, performance needs, budget constraints, operational complexity tolerance. Monolith: Small teams, simple domains, fast development, lower operational overhead. Microservices: Large teams, complex domains, independent scaling, organizational alignment. Layered: Traditional enterprise apps, clear separation needed. Event-driven: Real-time systems, async processing, decoupled components. Serverless: Variable workloads, cost optimization, rapid prototyping. Start simple: Begin with monolith, decompose when needed. Over-engineering early = waste. Conway&apos;s Law: architecture mirrors organization. Pattern = tool, not religion. Match to problem."
      }
    },
    {
      "@type": "Question",
      "name": "What is separation of concerns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Separation of concerns: Divide system into distinct sections, each addresses separate concern. Benefits: Easier maintenance (change one without affecting others), better testability, clearer understanding, parallel development, reduced complexity. Implementation: Layers (presentation, business, data), modules (feature-based separation), services (in microservices). Examples: UI code vs business logic, database access vs business rules, authentication vs core features. Anti-pattern: Mixing concerns (UI logic in database layer). Principles: Each section has single purpose, minimal dependencies, clear interfaces. Separation = manageability. Complexity is inevitable, manage it through separation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I design for failure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Design for failure: Accept failures happen, design to handle gracefully. Strategies: Redundancy - multiple instances, failover capability. Health checks - monitor service health, route to healthy instances. Circuit breakers - stop cascading failures, fail gracefully. Retry with backoff - transient failures, retry with increasing delay. Bulkheads - isolate components, prevent cascade. Fallbacks - degraded functionality when service fails. Graceful degradation - partial service vs complete failure. Timeouts - don&apos;t wait forever, set limits. Chaos engineering - test failure scenarios (inject failures). Monitoring - detect failures quickly. Design for failure = resilient systems. Assume components fail. Handle gracefully. Users experience partial functionality vs complete outage."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between sync and async architecture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Synchronous vs asynchronous: Sync: Call waits for response before continuing, simpler to understand, immediate feedback, blocking. Use: User-facing requests, simple operations, real-time needs. Async: Call triggers action, response comes later, non-blocking, higher throughput. Use: Background processing, high-volume operations, decoupled systems. Trade-offs: Sync = simpler but blocking, limits throughput. Async = complex but higher throughput, resilience. Implementation: Async via message queues, events, callbacks. Choose: User experience needs sync, background work async. Mix both: sync for immediate needs, async for processing. Hybrid: sync request triggers async processing, poll or callback for result. Async = better for scale. Sync = better for simplicity. Match to use case."
      }
    },
    {
      "@type": "Question",
      "name": "What architectural decisions should I document?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Document architecture decisions (ADR - Architecture Decision Records): What: Decision made (e.g., use PostgreSQL for primary database). Why: Context, problem, reasoning for choice. Alternatives: Options considered, why rejected. Consequences: Trade-offs, implications, follow-up actions. When to document: Significant decisions affecting multiple components, decisions others might question, decisions with long-term impact, decisions that constrain future choices. Template: Title, Status (proposed/accepted/superseded), Context, Decision, Consequences. Benefits: Future developers understand reasoning, prevent revisiting settled decisions, track evolution, onboarding resource. ADRs = institutional memory. Decisions change over time, document reasoning. Update when superseded."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Software Architecture Guide - Patterns, Principles & Decisions',
  description: 'Architecture patterns, design principles, key decisions, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SoftwareArchitectureGuide />
    </Suspense>
  );
}