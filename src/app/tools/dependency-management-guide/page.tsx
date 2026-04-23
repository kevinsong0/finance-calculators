import type { Metadata } from 'next';
import { Suspense } from 'react';
import DependencyManagementGuide from '@/components/DependencyManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are dependency types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dependency categories: Direct dependencies: Explicitly declared in manifest, intentional inclusion, version specified, directly used, controlled selection, primary packages. Transitive dependencies: Indirectly required packages, pulled by direct deps, hidden from manifest, automatic inclusion, version determined upstream, potential conflicts. Development dependencies: Development-only packages, build tools, testing frameworks, linting tools, not in production, separate installation, dev environment. Peer dependencies: Require compatible versions, version range specified, shared with consumer, flexibility expected, coordination needed, compatibility focus. Optional dependencies: Enhancement features, conditionally used, graceful fallback, optional functionality, fail gracefully, feature extensions. Types = understand categories. Direct controlled. Transitive monitored. Dev separated. Peer coordinated. Optional graceful. Different management for each."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage dependency versions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Version management: Pinning: Exact version specified, predictable behavior, reproduction guaranteed, stability focus, no automatic updates, explicit control, production safety. Range: Version range declared, automatic minor updates, flexibility allowed, patch updates automatic, semantic versioning, balance stability and updates. Lock files: Lock file essential, exact versions locked, reproducible builds, team consistency, CI consistency, deployment consistency, prevent drift. Updating: Regular update schedule, security updates prompt, minor version updates, major version planned, testing before update, change documentation, rollback plan. Breaking changes: Plan for breaking changes, major version review, migration preparation, testing extensive, documentation update, team communication, phased rollout. Version = deliberate control. Pinning for stability. Range for flexibility. Lock files required. Regular updates. Breaking change planning. Testing mandatory. Documentation aligned."
      }
    },
    {
      "@type": "Question",
      "name": "How do I check dependency security?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Security checking: Scanning: Security vulnerability scanning, automated tools, regular checks, known CVE detection, severity rating, affected versions identified, continuous monitoring. Tools: npm audit for Node.js, pip-audit for Python, OWASP Dependency-Check, Snyk scanning, GitHub Dependabot, automated alerts, CI integration. Response: Immediate response critical, patch promptly, update affected packages, replace if unmaintained, temporary mitigation, documentation update, communication to team. Prevention: Choose well-maintained packages, check maintainer activity, review security history, minimal dependencies, trusted sources, reputation check, avoid abandoned packages. Monitoring: Continuous monitoring, automated alerts, regular audits, dependency tracking, vulnerability feeds, security news, proactive approach. Security = proactive protection. Regular scanning. Automated tools. Prompt response. Careful selection. Continuous monitoring. Minimal dependencies. Team awareness."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage dependency licenses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "License management: Checking: License identification, automated checking, license scanning tools, SPDX identification, compatibility check, obligation review, documentation. Compatibility: License compatibility review, permissive vs restrictive, GPL implications, commercial use allowed, modification rights, distribution requirements, patent rights. Obligations: Understand license obligations, attribution requirements, source disclosure, modification documentation, commercial restrictions, distribution terms, patent grants. Tools: License checkers available, license-scanner packages, automated identification, compliance reporting, obligation tracking, legal review support, documentation generation. Policy: Define license policy, approved licenses list, restricted licenses, review process, approval workflow, documentation required, legal consultation. Licenses = legal compliance. Identification required. Compatibility checked. Obligations understood. Tools available. Policy defined. Legal review. Documentation maintained."
      }
    },
    {
      "@type": "Question",
      "name": "How do I minimize dependency risks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Risk minimization: Selection: Choose carefully, well-maintained packages, active development, good reputation, community size, documentation quality, security history, responsive maintainers. Minimization: Minimal dependencies preferred, reduce attack surface, smaller bundle size, fewer conflicts, easier maintenance, lower complexity, better performance. Monitoring: Regular dependency audit, version tracking, security monitoring, maintenance status, deprecation warnings, update needs, replacement planning. Replacement: Replace abandoned packages, find alternatives, migrate actively, document changes, test thoroughly, communicate changes, smooth transition. Documentation: Document decisions, dependency rationale, version choices, known issues, upgrade plans, replacement notes, team knowledge. Risks = proactive management. Careful selection. Minimal dependencies. Regular monitoring. Timely replacement. Clear documentation. Team communication. Security focus."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Dependency Management Guide - Types, Strategies & Tools',
  description: 'Dependency types, version management, security, and risk minimization.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DependencyManagementGuide />
    </Suspense>
  );
}