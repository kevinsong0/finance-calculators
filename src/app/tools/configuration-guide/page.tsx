import type { Metadata } from 'next';
import { Suspense } from 'react';
import ConfigurationGuide from '@/components/ConfigurationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is configuration management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Configuration management definition: Purpose: Externalize settings from code, enable environment differences, change without code modification, maintain consistency, secure sensitive values. Types: Environment config - settings per environment (dev/staging/prod), Application config - app-level settings and options, Feature flags - toggle features without deployment, Infrastructure config - server/cloud configuration, Logging config - log levels and destinations, Security config - security-related settings. Importance: Flexibility, security, environment management, audit capability, separation of concerns. Configuration management = settings external to code. Environment-specific. Secure sensitive data. Change without deployment. Document and audit."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage environment configuration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Environment configuration management: Separation: Separate configs per environment, development/staging/production differences, clear naming convention, avoid environment mixing. Files: .env files for local, config files per environment, environment variables for secrets, consistent format. Validation: Validate config at startup, check required values, validate formats and types, fail fast if invalid. Secrets: Never hardcode secrets, use secret management services, encrypt sensitive values, rotate secrets regularly. Deployment: Configs with deployment, environment variables injection, config service integration, verify correct environment. Management = environment separation. Validate at startup. Secure secrets. Never hardcode. Verify deployment. Document all values."
      }
    },
    {
      "@type": "Question",
      "name": "What are configuration best practices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Configuration best practices: Externalize: Settings separate from code, config files or services, no hardcoded values, easier updates. Validate: Check configuration at startup, required fields verified, format validation, meaningful error messages. Document: Explain each setting, default values, valid options, impact of changes. Secure: Encrypt secrets, use secret management, limit access, audit changes. Version control: Track config changes, revert capability, change history, coordinated updates. Minimal: Only necessary configuration, avoid config proliferation, reasonable defaults, clear purpose. Best practices = externalize, validate, document, secure. Version control changes. Keep minimal. Reasonable defaults. Audit capability."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle secrets in configuration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Secret configuration handling: Never hardcode: Secrets not in source code, not in config files committed, not in logs, not in error messages. Secret management: Use dedicated services (Vault, AWS Secrets Manager), encrypted storage, access control, rotation capability. Environment variables: Secrets via env vars, not in files, injected at runtime, cleared after use. Rotation: Regular secret rotation, automated where possible, update without code change, track rotation history. Access control: Limit who can access, audit access logs, minimal permissions, time-limited where appropriate. Secrets = highest security. Never hardcode. Use secret services. Rotate regularly. Limit access. Audit everything."
      }
    },
    {
      "@type": "Question",
      "name": "What configuration pitfalls should I avoid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Configuration pitfalls: Hardcoded configuration: Values in code, difficult to change, environment issues, requires code deployment to update. Unencrypted secrets: Secrets in plain text, in config files, in source code, security vulnerability. Missing validation: No startup checks, silent failures, invalid configs accepted, runtime issues later. Undocumented settings: Unknown purpose, unclear options, unexpected behavior, difficult maintenance. Config in code: Business logic mixed with config, testing difficulty, environment challenges. Manual updates: Manual config changes, no audit trail, error-prone, inconsistent state. Pitfalls = avoid these patterns. Never hardcode. Encrypt secrets. Validate always. Document everything. Automate updates. Version control."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Configuration Management Guide - Types, Best Practices & Security',
  description: 'Configuration types, environment management, best practices, and pitfalls.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ConfigurationGuide />
    </Suspense>
  );
}