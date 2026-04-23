import type { Metadata } from 'next';
import { Suspense } from 'react';
import SQLQueryBuilder from '@/components/SQLQueryBuilder';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the basic SQL query types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Four basic SQL operations: SELECT (retrieve data), INSERT (add new rows), UPDATE (modify existing rows), DELETE (remove rows). Known as CRUD: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE). Most database operations use these four query types."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write a SELECT query with conditions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SELECT columns FROM table WHERE condition. Example: SELECT name, email FROM users WHERE status = 'active' AND age > 18 ORDER BY created_at DESC LIMIT 10. WHERE filters rows, ORDER BY sorts results, LIMIT restricts count. Use AND/OR for multiple conditions. Operators: =, !=, >, <, LIKE, IN, BETWEEN."
      }
    },
    {
      "@type": "Question",
      "name": "How do I safely run UPDATE or DELETE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Always include WHERE clause. Without WHERE, UPDATE modifies all rows, DELETE removes all rows. Safety steps: 1) Run SELECT first to verify target rows. 2) Add LIMIT to restrict affected rows. 3) Use transactions (BEGIN, COMMIT, ROLLBACK). 4) Backup before major changes. Test queries in development first."
      }
    },
    {
      "@type": "Question",
      "name": "What is SQL injection and how to prevent it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SQL injection occurs when user input contains malicious SQL. Example: input '1; DELETE FROM users' in WHERE id = input. Prevention: use prepared statements / parameterized queries, never concatenate user input into SQL, use ORM libraries (Prisma, Sequelize), validate input before using in queries."
      }
    },
    {
      "@type": "Question",
      "name": "How do I join multiple tables in SQL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JOIN combines data from multiple tables. Types: INNER JOIN (matching rows only), LEFT JOIN (all left rows + matching right), RIGHT JOIN (all right rows + matching left), FULL JOIN (all rows from both). Syntax: SELECT a.name, b.order FROM users a JOIN orders b ON a.id = b.user_id. Use aliases for readability."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'SQL Query Builder - Generate SELECT, INSERT, UPDATE, DELETE Queries',
  description: 'Generate SQL queries for SELECT, INSERT, UPDATE, DELETE operations. Build queries with WHERE conditions, ORDER BY, and LIMIT. Quick templates for common database operations.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SQLQueryBuilder />
    </Suspense>
  );
}