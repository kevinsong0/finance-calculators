import type { Metadata } from 'next';
import { Suspense } from 'react';
import MonitoringLoggingGuide from '@/components/MonitoringLoggingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should I monitor in production?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Production monitoring essentials: Infrastructure: CPU usage, memory utilization, disk space, network I/O, server count, container health. Application: Response time (p50, p95, p99), error rate, throughput (requests/sec), availability, queue depths. Business: Conversion rate, user signups, revenue, active users. Logs: Error frequency, warning patterns, unusual activity. Dependencies: Database connections, cache hit rate, external API status, third-party service health. SLIs/SLOs: Service Level Indicators, Service Level Objectives, track against targets. Golden signals (Google SRE): Latency, traffic, errors, saturation. Monitor = understand system health. Start with basics, add depth over time. Dashboard key metrics prominently."
      }
    },
    {
      "@type": "Question",
      "name": "What is structured logging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Structured logging: Logs in structured format (JSON, key-value pairs), not plain text strings. Benefits: Parseable by tools, searchable, aggregatable, consistent format, include context. Format: timestamp, level, message, request_id, user_id, service, error_details, stack_trace. Example: {\"timestamp\":\"2024-01-01T10:00:00Z\", \"level\":\"ERROR\", \"message\":\"Database connection failed\", \"request_id\":\"abc123\", \"service\":\"api\"}. Tools: ELK stack (Elasticsearch, Logstash, Kibana), Splunk, Loki, CloudWatch Logs. Implementation: Use logging libraries with structured output, include request context, add relevant metadata. Structured logging = machine-readable logs. Enables log analysis, dashboards, searches. Standardize format across services."
      }
    },
    {
      "@type": "Question",
      "name": "How do I avoid alert fatigue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Avoid alert fatigue: Alert on actionable issues only - if no action needed, don&apos;t alert. Reduce noise: Tune thresholds based on historical data, remove frequent false positives, aggregate related alerts, use alert suppression during maintenance. Meaningful thresholds: Based on SLOs, not arbitrary values, consider business impact, differentiate warning vs critical. Routing: Route to right person/team, use escalation paths, avoid everyone getting all alerts. Review process: Regular alert review (monthly), remove unused alerts, tune noisy ones, track alert resolution time. Aim: Fewer alerts that mean more. Each alert = interruption. Make every alert valuable. Alert fatigue = ignoring real issues. Quality over quantity."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between SLI, SLO, and SLA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SLI/SLO/SLA definitions: SLI (Service Level Indicator): Measurable metric of service behavior - latency, error rate, throughput, availability. What you measure. SLO (Service Level Objective): Target value for SLI - latency p99 < 200ms, error rate < 0.1%, availability > 99.9%. Goal you set. SLA (Service Level Agreement): Contractual commitment with consequences - refund if SLO not met, contractual terms. Business agreement. Relationship: SLI measures performance → SLO sets target → SLA defines consequences for missing. Example: SLI = actual latency, SLO = target latency < 200ms, SLA = refund 10% if latency exceeds 200ms for 5% of requests. Focus: Internal teams focus on SLOs (targets), SLAs for customer contracts. Track SLIs, set SLOs, define SLAs if needed. SRE approach: Start with SLIs, define SLOs, error budgets."
      }
    },
    {
      "@type": "Question",
      "name": "What is an error budget?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Error budget: Allowed amount of unreliability based on SLO. Calculation: SLO 99.9% availability = 0.1% downtime allowed = 43.8 minutes/month error budget. Purpose: Balance reliability vs feature velocity, use budget for innovation, stop new features if budget exhausted. How to use: Track budget consumption, budget available = can take risks, budget depleted = focus on reliability. Decision making: Budget positive = release new features, budget negative = focus on stability. Benefits: Quantified reliability targets, objective decision making, aligns teams, prevents over-engineering or under-engineering. Error budget = balance. Not 100% reliability (expensive), target SLO, use budget wisely. Error budget = innovation vs stability trade-off quantified."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Monitoring & Logging Guide - Types, Levels & Best Practices',
  description: 'Monitoring types, logging levels, structured logging, and alert principles.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MonitoringLoggingGuide />
    </Suspense>
  );
}