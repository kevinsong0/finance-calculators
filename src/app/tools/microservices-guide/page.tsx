import type { Metadata } from 'next';
import { Suspense } from 'react';
import MicroservicesGuide from '@/components/MicroservicesGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When should I use microservices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use microservices when: Multiple teams working independently, need independent deployment, different scaling needs per service, technology diversity required, clear business domain boundaries. Don&apos;t use when: Small team/project, not yet hit monolith limits, don&apos;t have operational maturity, unclear boundaries. Start with monolith. Decompose when: deployment friction, scaling bottlenecks, team coordination issues. Microservices add complexity. Benefit = scale teams. Cost = distributed systems problems. Adopt when benefit > cost. Premature decomposition = unnecessary complexity."
      }
    },
    {
      "@type": "Question",
      "name": "How do I split services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Service splitting strategies: By business domain (Bounded contexts from DDD) - best approach, aligned with org structure. By subdomain - finer grain within domain. By capability - technical separation. Avoid: By technical layer (UI/API/DB), too many services (nano-services), unclear ownership. Principles: Single responsibility, high cohesion, low coupling, autonomous teams. Each service = independent lifecycle. Rule: service should be small enough for one team, large enough to be meaningful. Conway&apos;s Law: structure follows team structure."
      }
    },
    {
      "@type": "Question",
      "name": "How do microservices communicate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Microservices communication: Synchronous: REST APIs (HTTP), gRPC (high performance), GraphQL (flexible queries). Asynchronous: Message queues (RabbitMQ, SQS), Event streaming (Kafka), Event bus patterns. Choose: Sync for queries, real-time needs. Async for decoupling, resilience, high throughput. Patterns: Request/response, event-driven, pub/sub, saga. Trade-offs: Sync = simple but coupled, latency. Async = resilient but complex, eventual consistency. Mix both. Use API gateway for external clients. Services communicate internally based on needs."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle data in microservices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Microservices data strategy: Database per service (own data, no direct access to other DBs). Shared database (avoid - coupling). Events for data sync (pub/sub pattern). Saga pattern (distributed transactions). API for data access (service owns data, exposes API). Patterns: Event sourcing, CQRS (Command Query Responsibility Segregation). Challenges: Data consistency (eventual), joins across services, reporting. Solutions: Data aggregation service, event-driven sync, API composition. Each service owns its data. Share via API/events, not direct DB access."
      }
    },
    {
      "@type": "Question",
      "name": "How do I test microservices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Microservices testing pyramid: Unit tests (service internal, fast, isolated). Integration tests (service + dependencies, DB, APIs). Contract tests (Pact, ensure API compatibility). End-to-end tests (full system, slow, few). Component tests (service in isolation with mocks). Service-level testing: Mock external services or use test containers. Contract testing: Verify API expectations between services. Important: Service independence in tests. Test failure scenarios (network, timeouts). CI per service. Integration tests in shared environment. Contract tests prevent breaking changes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Microservices Architecture Guide - Patterns & Best Practices',
  description: 'Microservices patterns, pros/cons, communication, and data strategies.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MicroservicesGuide />
    </Suspense>
  );
}