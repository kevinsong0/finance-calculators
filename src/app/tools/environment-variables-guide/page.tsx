import type { Metadata } from 'next';
import { Suspense } from 'react';
import EnvironmentVariablesGuide from '@/components/EnvironmentVariablesGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I use environment variables?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Environment variables: create .env file in project root, add KEY=value pairs, load with dotenv package (Node.js), access with process.env.KEY. Add .env to .gitignore to prevent commits. Use .env.example for documentation. Platforms: Vercel (dashboard), Docker (-e flag), Kubernetes (ConfigMaps). Validate required vars at startup."
      }
    },
    {
      "@type": "Question",
      "name": "What environment variables should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common env vars: DATABASE_URL (connection string), API_KEY (external services), SECRET_KEY (encryption), PORT (server port), NODE_ENV (development/production), JWT_SECRET (auth), REDIS_URL (cache), LOG_LEVEL (verbosity), DEBUG (debug mode). Separate secrets from config. Different values per environment."
      }
    },
    {
      "@type": "Question",
      "name": "How do I secure environment variables?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Secure env vars: never commit to git (.gitignore), use secret managers (Vault, AWS Secrets Manager), encrypt secrets in production, rotate regularly, don&apos;t log secrets, use different keys per environment, minimal access privilege, audit access. CI/CD: use GitHub secrets, don&apos;t expose in logs. Validate before use."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use .env files in production?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": ".env in production: not recommended for secrets. Better: use platform secret management (Vercel env vars, AWS Secrets Manager, Kubernetes Secrets, Docker secrets). .env okay for non-secret config. Secrets: use encrypted secret managers, not plaintext files. Production secrets should be injected, not stored in repo."
      }
    },
    {
      "@type": "Question",
      "name": "How do I validate environment variables?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Validate env vars: check at startup, fail fast if missing. Node.js: dotenv-safe, envalid, convict libraries. Check required vars exist, validate format, type coercion, defaults. Log missing vars clearly. Example: if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL required'). Prevent silent failures."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Environment Variables Guide - Best Practices for Config Management',
  description: 'Environment variables guide. Common patterns, platforms, security best practices. Manage config across development, staging, production.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EnvironmentVariablesGuide />
    </Suspense>
  );
}