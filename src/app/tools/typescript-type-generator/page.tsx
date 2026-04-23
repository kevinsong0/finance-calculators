import type { Metadata } from 'next';
import { Suspense } from 'react';
import TypeScriptTypeGenerator from '@/components/TypeScriptTypeGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I convert JSON to TypeScript type?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste JSON into generator. Tool analyzes structure. Infers TypeScript types from values: string, number, boolean, arrays, nested objects. Generates interface definitions. Copy TypeScript code to your project. Use for API responses, config files, database models. Manual: define interface matching JSON structure."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between interface and type in TypeScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Interface: defines object shape, can be extended/merged, preferred for objects. Type: defines any type including primitives, unions, intersections, more flexible. Use interface for object definitions. Use type for unions, primitives, computed types. Both work for objects - choose based on project convention. Interface can be declaration-merged."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle nested JSON objects in TypeScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generator creates nested interfaces for nested objects. Each nested object gets its own interface with capitalized key name. Top-level interface references nested interfaces. Example: {user: {profile: {...}}} generates User interface and Profile interface. Keep interfaces flat or nest based on preference. Use dot notation for deep access."
      }
    },
    {
      "@type": "Question",
      "name": "How do I type arrays in TypeScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Array syntax: Type[] or Array&lt;Type&gt;. Example: string[] for string arrays. Mixed arrays: (string | number)[] union. Array of objects: MyObject[] where MyObject is interface. Tuple: [string, number] fixed length and types. Readonly arrays: readonly Type[]. Generator infers array types from first element or unions from mixed elements."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use TypeScript types for API responses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Generate type from sample API response. Copy interface to your project. Use fetch/axios with typed response: fetch(url).then(res =&gt; res.json() as MyResponse). Or use generic: axios.get&lt;MyResponse&gt;(url). TypeScript validates response shape. Catch type errors at compile time. Document API types with generated definitions."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'TypeScript Type Generator - Generate Types from JSON',
  description: 'Generate TypeScript interfaces and types from JSON data. Auto-detect nested structures and array types. Create type definitions for API responses.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TypeScriptTypeGenerator />
    </Suspense>
  );
}