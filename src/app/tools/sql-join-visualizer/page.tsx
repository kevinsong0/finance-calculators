import type { Metadata } from 'next';
import { Suspense } from 'react';
import SQLJoinVisualizer from '@/components/SQLJoinVisualizer';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are SQL JOIN types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SQL JOIN types: INNER JOIN - only matching rows from both tables. LEFT JOIN - all left table rows, matching right rows. RIGHT JOIN - all right table rows, matching left rows. FULL OUTER JOIN - all rows from both tables. CROSS JOIN - every combination of rows. Each type returns different sets of matched and unmatched rows."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between LEFT JOIN and INNER JOIN?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "INNER JOIN: returns only rows where match exists in both tables. LEFT JOIN: returns all rows from left table, with right table columns if match exists, NULL if no match. LEFT JOIN keeps unmatched left rows. INNER JOIN drops unmatched rows. Use INNER for strict matching, LEFT when left data is primary."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write a SQL JOIN query?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JOIN syntax: SELECT columns FROM table1 JOIN_TYPE table2 ON table1.key = table2.key. Example: SELECT * FROM employees INNER JOIN departments ON employees.dept_id = departments.id. Use table aliases: FROM employees e JOIN departments d ON e.dept_id = d.id. Specify columns: SELECT e.name, d.dept_name."
      }
    },
    {
      "@type": "Question",
      "name": "What is a CROSS JOIN?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CROSS JOIN: cartesian product - every row from table1 combined with every row from table2. No ON clause needed. Result rows = table1 rows × table2 rows. Example: 100 rows × 50 rows = 5000 result rows. Use for: generating combinations, testing, matrix creation. Caution: large tables produce huge results."
      }
    },
    {
      "@type": "Question",
      "name": "How do multiple JOINs work in SQL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chain multiple JOINs: FROM table1 JOIN table2 ON condition JOIN table3 ON condition. Each JOIN adds another table. Use aliases for clarity. Example: FROM orders o JOIN customers c ON o.customer_id = c.id JOIN products p ON o.product_id = p.id. Order matters for LEFT/RIGHT JOINs. Inner JOINs can be reordered."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'SQL Join Visualizer - Understand INNER, LEFT, RIGHT, FULL Joins',
  description: 'Visualize SQL JOIN types. Generate JOIN queries. Understand inner, left, right, full outer, cross joins with diagrams and examples.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SQLJoinVisualizer />
    </Suspense>
  );
}