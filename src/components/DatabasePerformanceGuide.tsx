'use client'

export default function DatabasePerformanceGuide() {
  const optimizationAreas = [
    { area: 'Query Optimization', desc: 'Slow query analysis', action: 'EXPLAIN, indexes' },
    { area: 'Index Strategy', desc: 'Right indexes for queries', action: 'Covering indexes, composite' },
    { area: 'Schema Design', desc: 'Efficient table structure', action: 'Normalization balance' },
    { area: 'Connection Pool', desc: 'Connection management', action: 'Pool sizing, timeout' },
    { area: 'Caching', desc: 'Reduce database load', action: 'Redis, query cache' },
    { area: 'Hardware', desc: 'Server resources', action: 'SSD, RAM, CPU' },
  ];

  const queryTips = [
    'Use EXPLAIN to analyze',
    'Select only needed columns',
    'Avoid SELECT *',
    'Use proper indexes',
    'Avoid N+1 queries',
    'Batch operations',
    'Use prepared statements',
    'Limit result sets',
  ];

  const indexStrategies = [
    'Index columns in WHERE',
    'Index columns in JOIN',
    'Index columns in ORDER BY',
    'Composite indexes for multiple',
    'Covering indexes for reads',
    'Avoid over-indexing',
    'Remove unused indexes',
    'Consider index order',
  ];

  const monitoringMetrics = [
    'Query latency',
    'Connection count',
    'Cache hit rate',
    'Lock wait time',
    'Table size',
    'Index usage',
    'Query frequency',
    'Deadlock count',
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Database Performance Optimization Guide</h1>
      <p className="text-zinc-600">Query optimization, indexing strategies, and monitoring.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Optimization Areas</h3>
        <div className="space-y-1 text-xs">
          {optimizationAreas.map((o) => (
            <div key={o.area} className="bg-white rounded p-2">
              <strong>{o.area}</strong>
              <div className="text-zinc-500 mt-1">{o.desc}</div>
              <div className="text-green-600 mt-1">Action: {o.action}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Query Tips</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {queryTips.map((t) => (
            <div key={t} className="bg-white rounded p-2">{t}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Index Strategies</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {indexStrategies.map((s) => (
            <div key={s} className="bg-white rounded p-2">{s}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Monitoring Metrics</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {monitoringMetrics.map((m) => (
            <div key={m} className="bg-white rounded p-2">{m}</div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Performance Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Monitor slow queries. 2. Run EXPLAIN on suspects. 3. Add appropriate indexes. 4. Review query patterns. 5. Check connection pool settings. 6. Implement caching layer. 7. Review schema design. 8. Analyze table sizes. 9. Check hardware resources. 10. Set up performance alerts. 11. Regular index maintenance. 12. Query plan reviews quarterly. Database performance = app performance. Slow queries = slow app. Monitor, analyze, optimize, maintain."
        </div>
      </div>
    </main>
  );
}