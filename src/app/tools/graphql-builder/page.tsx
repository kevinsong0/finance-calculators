import type { Metadata } from 'next';
import { Suspense } from 'react';
import GraphQLBuilder from '@/components/GraphQLBuilder';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is GraphQL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GraphQL is a query language for APIs developed by Facebook. Clients specify exactly what data they need in a single request. No over-fetching or under-fetching. Single endpoint for all operations. Types and schema define available data. Used by GitHub, Shopify, Stripe, and many modern APIs."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between GraphQL query and mutation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Query: fetch data (read operations), like GET in REST. Mutation: modify data (create, update, delete), like POST/PUT/DELETE in REST. Both return selected fields. Queries can run in parallel. Mutations run sequentially. Best practice: use query for reads, mutation for writes."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use variables in GraphQL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GraphQL variables allow dynamic values without modifying query. Syntax: query GetUser($id: ID!) { user(id: $id) { name } }. Pass variables separately in JSON: { query: '...', variables: { id: '123' } }. Types: ID, String, Int, Float, Boolean, custom types. Variables make queries reusable and cacheable."
      }
    },
    {
      "@type": "Question",
      "name": "How do I send a GraphQL request?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GraphQL uses POST requests to single endpoint (/graphql). Body contains query string and optional variables. Headers: Content-Type: application/json. Response: JSON with data or errors. Use fetch, Apollo Client, or urql libraries. Example: fetch('/graphql', { method: 'POST', body: JSON.stringify({ query: '...' }) })."
      }
    },
    {
      "@type": "Question",
      "name": "What are the advantages of GraphQL over REST?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GraphQL advantages: 1) Single request gets all needed data (no N+1 queries). 2) Client specifies fields (no over-fetching). 3) Single endpoint (easier to manage). 4) Schema and types (self-documenting). 5) Real-time with subscriptions. REST advantages: simpler, better caching, more tooling. Choose based on use case."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'GraphQL Query Builder - Generate Queries and Mutations',
  description: 'Build GraphQL queries and mutations with variables and nested fields. Generate ready-to-use GraphQL code and fetch JavaScript for API integration. Templates for common GraphQL operations.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GraphQLBuilder />
    </Suspense>
  );
}