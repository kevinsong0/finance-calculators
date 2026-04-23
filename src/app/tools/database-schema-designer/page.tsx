import type { Metadata } from 'next';
import { Suspense } from 'react';
import DatabaseSchemaDesigner from '@/components/DatabaseSchemaDesigner';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I design a database schema?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Design database schema: identify entities (users, products), define attributes/columns, establish relationships, choose primary keys (UUID or INT), add foreign keys, add timestamps (created_at, updated_at), normalize to reduce redundancy, add indexes on foreign keys and search columns. Use schema designer tools. Generate CREATE TABLE SQL statements."
      }
    },
    {
      "@type": "Question",
      "name": "What are common database schema patterns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schema patterns: User system (users, sessions, roles). Blog/CMS (users, posts, comments, categories). Ecommerce (users, products, orders, cart, payments). Social (users, posts, likes, follows, messages). SaaS (users, subscriptions, plans, usage, invoices). Choose pattern matching your application type. Customize as needed."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use UUID or auto-increment for primary keys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UUID vs auto-increment: UUID for: distributed systems, security (no enumeration), merging data, future flexibility. Auto-increment for: simple systems, smaller storage, easier debugging, better performance for joins. UUID: 36 chars, globally unique. Auto-increment: INT, sequential. Most new apps: UUID for flexibility. Legacy: auto-increment."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle many-to-many relationships?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Many-to-many: create join/middle table. Example: users ↔ roles → user_roles table with user_id, role_id. Join table: two foreign keys, optionally additional data (assigned_at). Primary key: composite of both FKs or separate ID. Query with JOIN through middle table. Don&apos;t store arrays in single column."
      }
    },
    {
      "@type": "Question",
      "name": "What columns should every table have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every table should have: primary key (id), created_at timestamp, updated_at timestamp. Optional: deleted_at for soft deletes, version for optimistic locking, created_by/updated_by user references. Timestamps enable: auditing, sorting, synchronization. Soft delete preserves data. Naming: lowercase with underscores (snake_case)."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Database Schema Designer - Generate SQL CREATE TABLE',
  description: 'Design database schemas. Generate SQL CREATE TABLE statements. Common patterns: user system, blog, ecommerce, SaaS. Schema best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DatabaseSchemaDesigner />
    </Suspense>
  );
}