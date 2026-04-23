import type { Metadata } from 'next';
import { Suspense } from 'react';
import ApiVersioningGuide from '@/components/ApiVersioningGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which API versioning strategy is best?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API versioning strategy comparison: URL versioning (/v1/resource) - Most common, clear visibility, easy testing, good caching. Recommended for public APIs. Header versioning - Clean URLs, more RESTful, but less visible to developers. Use when URLs matter. Query parameter - Simple but optional, can confuse. Not recommended for production. Recommendation: Start with URL versioning (simple, visible, widely understood). Consider header versioning for advanced use. Be consistent. Public APIs: URL versioning better (developer experience). Internal APIs: any works, consistency important. Strategy = trade-offs. Choose based on audience, visibility needs, REST principles tolerance."
      }
    },
    {
      "@type": "Question",
      "name": "When should I create a new API version?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "New API version when: Breaking changes - remove endpoint, change response structure, rename fields, different error codes, change authentication. Backward incompatible changes - clients break without modification. Not new version when: Add new endpoint (backward compatible), add new optional field, add new response field, bug fixes, performance improvements, add new optional parameter. Rule: Breaking change = new version. Non-breaking = same version. SemVer for APIs: Major version for breaking, minor for features, patch for fixes. Examples of breaking: rename /users to /accounts, change user object structure, remove fields from response, change error format. Create new version, support both during transition, deprecate old."
      }
    },
    {
      "@type": "Question",
      "name": "How do I deprecate an API version?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deprecate API version: Announce: 6-12 months before removal, announce deprecation clearly, document reasons. Communicate: Email users, blog post, API docs, warning headers in responses. Support: Continue supporting deprecated version during transition period, return Sunset header with removal date, Link header to migration guide. Migration: Provide clear migration guide, example code, highlight changes needed, offer support channel. Monitor: Track usage of deprecated version, log deprecated API calls, identify high-usage clients. Sunset: Remove version after sunset date, return 410 Gone for removed endpoints, maintain docs for reference. Deprecation = process, not single action. Give time, communicate clearly, help migrate."
      }
    },
    {
      "@type": "Question",
      "name": "How long should I support old API versions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Old version support duration: Minimum: 6 months after deprecation announcement. Recommended: 12 months for public APIs with many clients. Enterprise: 18-24 months for enterprise clients with slow adoption. Factors: Number of clients using old version, client migration speed, API criticality, business impact, resource constraints. Monitor usage: If usage drops to minimal, sunset earlier. If significant usage remains, extend support. Sunset headers: Include removal date in responses. Communication: Regular reminders as sunset approaches. Balance: Support long enough for migration, not forever (cost, complexity). Support = cost. Deprecate = move forward. Find balance based on usage."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle API breaking changes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Handle breaking changes: Plan: Identify breaking change, assess impact, plan migration path. Announce: Communicate early (6+ months before), explain what breaks, provide timeline. New version: Create new version with change, old version unchanged. Migration guide: Document changes needed, provide examples, highlight differences. Support: Both versions during transition, help clients migrate, support channels. Sunset: Remove old version after sunset date. Breaking change types: Endpoint removal/renaming, response structure change, authentication change, required parameter addition, field type change. Mitigation: If possible, design to be backward compatible (additive changes, optional fields). Breaking = major version increment. Handle carefully, communicate clearly, support transition."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'API Versioning Guide - Strategies, Deprecation & Best Practices',
  description: 'API versioning strategies, version types, deprecation process, and migration.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ApiVersioningGuide />
    </Suspense>
  );
}