import type { Metadata } from 'next';
import { Suspense } from 'react';
import PerformanceTestingGuide from '@/components/PerformanceTestingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is performance testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance testing definition: Purpose: Verify application performance under load, ensure meets performance requirements, find bottlenecks before production, validate scalability. Types: Load testing - test under expected load conditions, Stress testing - test beyond normal capacity to find breaking points, Spike testing - test sudden load increases, Endurance testing - sustained load over time, Volume testing - large data amounts, Scalability testing - incremental load increases. Goals: Response time within limits, throughput meets requirements, no errors under load, resource usage acceptable, stable under sustained load. Performance testing = verify speed, capacity, stability. Different types for different goals. Test before production. Find bottlenecks early. Validate requirements."
      }
    },
    {
      "@type": "Question",
      "name": "What metrics should I track in performance testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance testing metrics: Response time: Time to complete request, user-facing latency, target typically under threshold (e.g., 2-3 seconds), measure average and maximum. Throughput: Requests per second, transactions per second, measures capacity, target based on expected demand. Error rate: Percentage of failed requests, should be very low under expected load, indicates reliability problems. Resource usage: CPU utilization, memory consumption, network bandwidth, disk I/O, database connections, identify resource limits. Concurrent users: Maximum users supported, number of simultaneous sessions, measures capacity. Latency distribution: Percentile response times (p50, p90, p99), identify outlier slow responses. Metrics = comprehensive view. Response time for UX. Throughput for capacity. Error rate for reliability. Resources for efficiency. Set targets before testing."
      }
    },
    {
      "@type": "Question",
      "name": "How do I design performance tests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance test design: Requirements: Define performance goals (response time, throughput), identify critical scenarios, determine expected load levels, define acceptance criteria. Scenarios: Identify key user journeys, prioritize critical paths, cover different user types, include peak usage scenarios. Load profiles: Normal load - expected daily usage, Peak load - maximum expected traffic, Stress load - beyond maximum to find limits, Spike load - sudden traffic increases. Test data: Realistic data volumes, representative user data, sufficient variation. Environment: Production-like environment, similar hardware/resources, realistic network conditions, isolated for accurate measurement. Design = goals first. Identify scenarios. Define load profiles. Realistic data. Proper environment. Clear acceptance criteria."
      }
    },
    {
      "@type": "Question",
      "name": "What tools are used for performance testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance testing tools: JMeter: Java-based, comprehensive features, scripting support, distributed testing, widely used, free/open-source. Gatling: Scala-based, high performance, code-based scenarios, good for web applications, detailed reports. Locust: Python-based, distributed testing, simple scripting, good for custom scenarios, open-source. k6: JavaScript/Grafana ecosystem, modern interface, cloud and local options, developer-friendly. LoadRunner: Enterprise tool, comprehensive features, multiple protocols, commercial, suited for large organizations. Apache Benchmark (ab): Simple CLI tool, quick tests, basic HTTP testing, useful for quick checks. Tool selection: Match to technology stack, consider team expertise, budget constraints, required features, integration needs. Tools = enable testing. Choose based on needs. Free tools sufficient for many cases. Enterprise tools for complex needs. Learn tool thoroughly."
      }
    },
    {
      "@type": "Question",
      "name": "How do I analyze performance test results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance test analysis: Review metrics: Response times vs targets, throughput achieved vs required, error rates, resource utilization, compare to requirements. Identify bottlenecks: Slow response times - investigate cause, high resource usage - optimization needed, error patterns - root cause analysis, database queries, external calls, resource contention. Root causes: Database queries slow - optimize queries, add indexes, Network latency - reduce calls, cache locally, CPU bottlenecks - optimize code, algorithms, Memory issues - fix leaks, reduce usage. Recommendations: Optimization priorities, expected improvements, implementation approach, retest after changes. Documentation: Test conditions, results summary, bottlenecks identified, recommendations, action items. Analysis = systematic review. Compare to goals. Find bottlenecks. Identify root causes. Prioritize fixes. Retest after changes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Performance Testing Guide - Types, Metrics & Tools',
  description: 'Performance testing types, metrics, tools, and analysis.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PerformanceTestingGuide />
    </Suspense>
  );
}