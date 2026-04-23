import type { Metadata } from 'next';
import { Suspense } from 'react';
import YAMLFormatter from '@/components/YAMLFormatter';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is YAML format?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YAML (YAML Ain't Markup Language) is a human-readable data serialization format. Uses indentation for structure, key: value pairs for data, and - for lists. Common for config files (Kubernetes, Docker Compose, Ansible, GitHub Actions). More readable than JSON but requires careful indentation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I fix YAML indentation errors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YAML indentation rules: Use spaces only (never tabs), consistent indent size (2 or 4), nested items must be indented relative to parent. Common errors: mixing tabs and spaces, inconsistent indent levels, missing indentation for nested items. Most YAML parsers show line number for indentation errors."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between YAML and JSON?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YAML: Human-readable, uses indentation, supports comments (#), less verbose, harder to parse, good for config files. JSON: Machine-readable, uses braces/brackets, no comments, strict syntax, easy to parse, good for APIs and data transfer. YAML is superset of JSON - valid JSON is valid YAML."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write YAML lists?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YAML lists use hyphen + space: - item. Each item on new line at same indentation level. Inline list: [item1, item2]. Nested objects in list: - key: value. List items can be strings, numbers, objects, or nested lists. Example: items: - apple - banana - orange"
      }
    },
    {
      "@type": "Question",
      "name": "Why is YAML used for Kubernetes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kubernetes uses YAML for manifest files because: 1) Human-readable - easier to write and review. 2) Supports comments - documentation inline. 3) Less verbose - cleaner than JSON. 4) Standard format - kubectl apply -f manifest.yaml. Kubernetes YAML defines pods, services, deployments, configmaps, and all resources."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'YAML Formatter & Validator - Format Kubernetes, Docker Compose Configs',
  description: 'Validate and format YAML configuration files. Check indentation and syntax for Kubernetes, Docker Compose, Ansible, GitHub Actions configs. Fix YAML errors.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <YAMLFormatter />
    </Suspense>
  );
}