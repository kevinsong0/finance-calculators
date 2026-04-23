import type { Metadata } from 'next';
import { Suspense } from 'react';
import DatabasePerformanceGuide from '@/components/DatabasePerformanceGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I optimize slow database queries?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Slow query optimization: Identify slow queries: Query logging enabled, slow query threshold set, monitoring tools (pg_stat_statements, MySQL slow query log), identify top offenders. Analyze with EXPLAIN: Run EXPLAIN (or EXPLAIN ANALYZE), understand execution plan, identify bottlenecks (scans, sorts, joins). Common issues: Missing index - table scan instead of index seek. Wrong index - index exists but not used. Large scans - too many rows examined. Inefficient joins - wrong join order. Fix approaches: Add appropriate index (WHERE, JOIN, ORDER BY columns). Rewrite query (select fewer columns, avoid subqueries). Break complex queries into simpler ones. Use query hints if needed (last resort). Optimize = identify + analyze + fix. Enable logging, use EXPLAIN, add indexes, rewrite queries."
      }
    },
    {
      "@type": "Question",
      "name": "How do I design database indexes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Index design strategy: Index columns to index: WHERE clause filters. JOIN columns. ORDER BY/GROUP BY columns. Frequently queried columns. Index types: Single-column index - one column. Composite index - multiple columns, order matters (most selective first). Covering index - includes all columns needed, avoids table lookup. Unique index - enforces uniqueness, good for lookups. Partial index - subset of rows, smaller size. Design principles: Composite for common query patterns. Covering for frequent reads. Don&apos;t over-index - writes slower, storage cost. Remove unused indexes - check usage stats. Consider index order - leftmost prefix rule. Index maintenance: Rebuild fragmented indexes. Update statistics. Monitor index usage. Remove unused indexes. Right indexes = fast queries. Too many = slow writes. Index what&apos;s queried, not everything. Composite covering common patterns."
      }
    },
    {
      "@type": "Question",
      "name": "How do I configure database connection pools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Connection pool configuration: Pool sizing: Minimum connections - base load handling (5-10 typical). Maximum connections - peak load ceiling, consider database limits. Formula guide: connections = (core_count * 2) + effective_spindle_count as starting point. Adjust based on monitoring. Timeout settings: Connection timeout - how long to wait for connection (seconds). Idle timeout - when to close unused connections (minutes). Max lifetime - prevent stale connections (hours). Pool behavior: Wait vs fail when pool exhausted. Validation query for connection health. Connection recycling for long-lived connections. Monitoring: Active connections count. Idle connections. Wait time for connection. Connection errors. Pool overflow events. Pool = efficient connection reuse. No pool = connection overhead. Size based on load, monitor usage, adjust over time."
      }
    },
    {
      "@type": "Question",
      "name": "What database metrics should I monitor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Database monitoring metrics: Performance metrics: Query latency - average and slow query times. Query throughput - queries per second. Connection count - active, idle, waiting. Cache hit ratio - buffer cache effectiveness. Lock wait time - blocking duration. Resource metrics: CPU usage - database process load. Memory usage - buffer allocation. Disk I/O - read/write operations. Storage size - table and index sizes. Error metrics: Failed queries. Connection errors. Deadlocks. Timeout errors. Health metrics: Replication lag (if applicable). Backup status. Table bloat. Index fragmentation. Monitoring tools: Database built-in (pg_stat_statements, performance_schema). APM tools (Datadog, New Relic). Custom dashboards. Alert thresholds: Query latency above threshold. Connection pool exhausted. Cache hit ratio below threshold. Deadlocks detected. Monitor = visibility. No monitoring = blind operation. Track latency, connections, resources, errors."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use caching to improve database performance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Database caching strategies: Cache layers: Application cache - in-memory (Redis, Memcached). Query cache - database level (MySQL query cache, deprecated). Object cache - ORM level (Hibernate second-level cache). CDN cache - static content, reduces origin hits. What to cache: Frequently read data. Computed/expensive results. Static or rarely changing data. Session data. What not to cache: Frequently changing data. Transactional data. User-specific dynamic data. Large datasets that don&apos;t fit. Cache patterns: Cache-aside - application manages cache. Read-through - cache reads from DB on miss. Write-through - cache updates DB on write. Write-behind - cache updates DB asynchronously. Cache invalidation: TTL-based - expire after time. Event-based - invalidate on change. Version-based - cache key includes version. Considerations: Cache hit ratio target (90%+). Memory size limits. Eviction policy (LRU typical). Cache warming for startup. Cache = reduce database load. Right caching = faster reads. Cache frequent reads, invalidate properly, monitor hit rate."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Database Performance Optimization Guide - Queries, Indexes & Monitoring',
  description: 'Query optimization, index design, connection pools, and performance monitoring.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DatabasePerformanceGuide />
    </Suspense>
  );
}