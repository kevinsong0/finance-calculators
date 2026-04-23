import type { Metadata } from 'next';
import { Suspense } from 'react';
import EnvGenerator from '@/components/EnvGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a .env file?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A .env file stores environment variables for your application. It contains KEY=value pairs for configuration like database URLs, API keys, secrets. The file is loaded at runtime by dotenv (Node.js) or python-dotenv. Never commit .env files to git - use .env.example with empty values as a template."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use environment variables in Node.js?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Install dotenv: npm install dotenv. Create .env file with variables. Load in code: require('dotenv').config() or import 'dotenv/config'. Access via process.env.KEY. For TypeScript, install @types/node. Modern frameworks (Next.js, Vite) auto-load .env files. Use NEXT_PUBLIC_ prefix for client-side vars."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between .env and JSON config?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": ".env is simpler: KEY=value, no quotes, one per line. Used for secrets and environment-specific config. JSON config supports nested objects, arrays, and complex structures. .env is for 12-factor apps, JSON for feature flags, complex settings. Both should be kept out of version control for secrets."
      }
    },
    {
      "@type": "Question",
      "name": "How do I set environment variables in production?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Options: 1) Platform settings (Heroku config vars, AWS environment, Vercel env). 2) Secrets managers (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault). 3) CI/CD pipeline variables. 4) Kubernetes ConfigMaps/Secrets. Never use .env files in production containers - inject via platform or secrets manager."
      }
    },
    {
      "@type": "Question",
      "name": "Why should I use .env.example files?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": ".env.example is a template showing required variables with empty or placeholder values. It documents what configuration the app needs. Commit .env.example to git so developers know what to set. Copy to .env and fill in real values. Helps new developers set up quickly without exposing secrets."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Environment Variable Generator - Create .env, JSON, YAML, Bash Configs',
  description: 'Generate environment variable files for your project. Create .env files, JSON config, YAML, and bash exports. Quick templates for Node.js, Python, React, Django.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EnvGenerator />
    </Suspense>
  );
}