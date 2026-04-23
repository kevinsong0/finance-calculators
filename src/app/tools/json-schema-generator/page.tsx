import type { Metadata } from 'next';
import { Suspense } from 'react';
import JSONSchemaGenerator from '@/components/JSONSchemaGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is JSON Schema?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON Schema is a specification for defining structure and validation rules for JSON data. Describes expected types, required fields, formats, constraints. Used for API validation, configuration validation, documentation. Standard format: {\"type\": \"object\", \"properties\": {...}, \"required\": [...]}. Validates JSON against schema rules."
      }
    },
    {
      "@type": "Question",
      "name": "How do I generate JSON Schema from JSON?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste JSON into generator tool. Tool analyzes JSON structure. Infers types from values: string, number, integer, boolean, array, object. Detects formats: email, URI, date-time from patterns. Outputs JSON Schema definition. Copy schema for use in APIs, validation. Manual: define types and properties matching your data."
      }
    },
    {
      "@type": "Question",
      "name": "How do I validate JSON against a schema?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use JSON Schema validators: Ajv (JavaScript), jsonschema (Python), JSON.NET (C#). Install library. Load schema and data. Call validate function. Returns true if valid, errors if invalid. Browser: use Ajv in frontend. Server: validate API requests before processing. CLI tools: ajv-cli for batch validation."
      }
    },
    {
      "@type": "Question",
      "name": "What JSON Schema types are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Primitive types: string, number, integer, boolean, null. Compound types: array (items schema), object (properties schema). String formats: email, uri, date-time, uuid. Number constraints: minimum, maximum, multipleOf. Array constraints: minItems, maxItems, uniqueItems. Object constraints: required, additionalProperties."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use JSON Schema in OpenAPI/Swagger?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OpenAPI uses JSON Schema for request/response bodies. Define schema in components/schemas section. Reference with $ref: '#/components/schemas/SchemaName'. Use in paths for requestBody and responses. OpenAPI extends JSON Schema with nullable, discriminator. Generate schemas from sample data. Validate API payloads against schemas."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'JSON Schema Generator - Generate Schema from JSON Data',
  description: 'Generate JSON Schema definitions from JSON data. Auto-detect types, formats, and structure. Create API validation schemas instantly.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <JSONSchemaGenerator />
    </Suspense>
  );
}