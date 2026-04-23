'use client'

export default function DatabaseDesignGuide() {
  const principles = [
    { principle: 'Normalization', desc: 'Eliminate redundancy, ensure integrity' },
    { principle: 'ACID Compliance', desc: 'Atomicity, Consistency, Isolation, Durability' },
    { principle: 'Indexing', desc: 'Optimize query performance on frequently accessed columns' },
    { principle: 'Relationship Design', desc: 'Define foreign keys, enforce referential integrity' },
    { principle: 'Data Types', desc: 'Choose appropriate types for storage efficiency' },
    { principle: 'Constraints', desc: 'Enforce rules via CHECK, UNIQUE, NOT NULL' },
  ];

  const relationships = [
    { type: 'One-to-One', desc: 'User profile, passport-country', diagram: '1 --- 1' },
    { type: 'One-to-Many', desc: 'User-orders, category-products', diagram: '1 --- *' },
    { type: 'Many-to-Many', desc: 'Students-courses, orders-products', diagram: '* --- * (via junction table)' },
  ];

  const dbTypes = [
    { type: 'Relational (SQL)', examples: 'PostgreSQL, MySQL, SQLite, Oracle', use: 'Structured data, transactions' },
    { type: 'Document (NoSQL)', examples: 'MongoDB, CouchDB, DynamoDB', use: 'Flexible schema, nested data' },
    { type: 'Key-Value', examples: 'Redis, Memcached', use: 'Caching, sessions, fast lookups' },
    { type: 'Graph', examples: 'Neo4j, ArangoDB', use: 'Relationships, social networks' },
    { type: 'Column', examples: 'Cassandra, HBase', use: 'Large scale, time-series' },
    { type: 'Search', examples: 'Elasticsearch, Solr', use: 'Full-text search, analytics' },
  ];

  const bestPractices = [
    { practice: 'Use meaningful names', desc: 'Tables/columns clearly named' },
    { practice: 'Primary keys', desc: 'Every table has unique identifier' },
    { practice: 'Foreign keys', desc: 'Enforce relationships explicitly' },
    { practice: 'Index strategically', desc: 'Index frequently queried columns' },
    { practice: 'Avoid SELECT *', desc: 'Query only needed columns' },
    { practice: 'Backup regularly', desc: 'Automated backup strategy' },
  ];

  return (
    <main className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Database Design Guide</h1>
      <p className="text-zinc-600">Design principles, relationship types, database types, and best practices.</p>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Design Principles</h3>
        <div className="space-y-1 text-xs">
          {principles.map((p) => (
            <div key={p.principle} className="bg-white rounded p-2">
              <strong>{p.principle}</strong>
              <div className="text-zinc-500 mt-1">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Relationship Types</h3>
        <div className="space-y-1 text-xs">
          {relationships.map((r) => (
            <div key={r.type} className="bg-white rounded p-2">
              <strong>{r.type}</strong>
              <div className="text-zinc-500 mt-1">{r.desc}</div>
              <div className="font-mono text-green-600 mt-1">{r.diagram}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Database Types</h3>
        <div className="space-y-1 text-xs">
          {dbTypes.map((d) => (
            <div key={d.type} className="bg-white rounded p-2">
              <strong>{d.type}</strong>
              <div className="text-zinc-600 mt-1">{d.examples}</div>
              <div className="text-green-600 mt-1">Use: {d.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Best Practices</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {bestPractices.map((b) => (
            <div key={b.practice} className="bg-white rounded p-2">
              <strong>{b.practice}</strong>
              <div className="text-zinc-500 mt-1">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card bg-zinc-50">
        <h3 className="font-medium mb-2">Design Checklist</h3>
        <div className="text-xs text-zinc-600">
          1. Analyze requirements (entities, attributes, relationships). 2. Choose database type (SQL vs NoSQL). 3. Define schema (tables/collections, columns/fields). 4. Set primary keys (unique identifiers). 5. Define relationships (foreign keys). 6. Add indexes (query optimization). 7. Set constraints (validation rules). 8. Plan for scale (partitioning, replication). 9. Document schema. 10. Test with realistic data. Good design = performance + maintainability.
        </div>
      </div>
    </main>
  );
}