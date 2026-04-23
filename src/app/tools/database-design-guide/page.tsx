import type { Metadata } from 'next';
import { Suspense } from 'react';
import DatabaseDesignGuide from '@/components/DatabaseDesignGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are database design principles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Database design principles: Normalization (eliminate redundancy, 1NF-3NF levels). ACID Compliance (Atomicity - all or nothing, Consistency - valid state, Isolation - concurrent safe, Durability - survive failures). Indexing (optimize queries on frequently accessed columns). Relationship Design (foreign keys, referential integrity). Data Types (appropriate types for efficiency). Constraints (CHECK, UNIQUE, NOT NULL for validation). Good design = performance, integrity, maintainability. Balance normalization vs performance for read-heavy systems."
      }
    },
    {
      "@type": "Question",
      "name": "When should I use SQL vs NoSQL databases?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SQL vs NoSQL: SQL (PostgreSQL, MySQL) - structured data, complex relationships, transactions needed, ACID requirements, consistent schema, joins frequently. NoSQL (MongoDB, DynamoDB) - flexible schema, nested documents, high scale, simple queries, eventual consistency OK, rapid development. Choose SQL: financial, e-commerce, traditional apps. Choose NoSQL: content management, IoT data, user profiles, real-time analytics. Many apps use both (SQL for transactions, NoSQL for flexible data). Consider: data structure, scale, consistency needs."
      }
    },
    {
      "@type": "Question",
      "name": "What are database relationship types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Database relationships: One-to-One (1:1) - each entity relates to exactly one other (user profile, passport-country). One-to-Many (1:N) - one entity relates to many others (user-orders, category-products). Many-to-Many (N:M) - entities relate to many on both sides (students-courses, orders-products) - requires junction/intermediate table. Implementation: foreign keys for 1:N, junction table with two foreign keys for N:M. 1:1 rarely needed - consider merging tables. Design relationships based on business logic."
      }
    },
    {
      "@type": "Question",
      "name": "How do I optimize database queries?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Query optimization: Index frequently queried columns (WHERE, JOIN, ORDER BY). Avoid SELECT * (query only needed columns). Use appropriate JOINs (INNER vs LEFT). Limit results (LIMIT, pagination). Avoid N+1 queries (batch fetch related data). Use query caching (application or database level). Analyze slow queries (EXPLAIN/EXPLAIN ANALYZE). Normalize appropriately (don&apos;t over-normalize read-heavy). Consider read replicas for heavy read loads. Optimize = faster response, less resource usage. Profile before optimizing."
      }
    },
    {
      "@type": "Question",
      "name": "What is database normalization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Normalization: organizing data to reduce redundancy. Levels: 1NF (atomic values, no repeating groups). 2NF (1NF + no partial dependencies). 3NF (2NF + no transitive dependencies). Higher (BCNF, 4NF, 5NF) rarely needed. Benefits: reduce redundancy, prevent anomalies (insert, update, delete), ensure integrity. Trade-off: many tables = more JOINs = potentially slower reads. Practical: normalize to 3NF for OLTP, denormalize for read-heavy/reporting. Balance integrity vs performance based on use case."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Database Design Guide - Principles, Types & Best Practices',
  description: 'Design principles, relationship types, database types, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DatabaseDesignGuide />
    </Suspense>
  );
}