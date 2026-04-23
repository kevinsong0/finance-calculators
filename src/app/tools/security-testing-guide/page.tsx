import type { Metadata } from 'next';
import { Suspense } from 'react';
import SecurityTestingGuide from '@/components/SecurityTestingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is security testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Security testing definition: Purpose: Identify vulnerabilities, verify security controls, meet compliance requirements, protect against attacks, maintain security posture. Types: Vulnerability scanning - automated detection of known issues, Penetration testing - simulated attacks by experts, Security code review - manual code analysis, Security audit - comprehensive assessment, Compliance testing - regulatory compliance verification, Red team testing - adversarial simulation. Importance: Prevent breaches, protect data, maintain trust, meet regulations, reduce risk. Security testing = proactive protection. Regular automated scans. Periodic expert testing. Comprehensive coverage. Prioritize findings. Remediate quickly."
      }
    },
    {
      "@type": "Question",
      "name": "What security areas should I test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Security testing areas: Authentication: Login mechanisms, password policies, session management, multi-factor auth. Authorization: Access controls, role permissions, resource access, privilege escalation. Input handling: Input validation, injection attacks, XSS prevention, CSRF protection. Data protection: Encryption at rest, encryption in transit, data masking, secure storage. APIs: API authentication, rate limiting, input validation, response filtering. Infrastructure: Network security, server configuration, patch management, access control. Third-party: Dependency vulnerabilities, integration security, supply chain risk. Areas = comprehensive coverage. Authentication and authorization. Input handling critical. Data encryption essential. API security important. Infrastructure security. Third-party risks."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I run security tests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Security testing frequency: Vulnerability scanning: Weekly automated scans, continuous monitoring possible, after code changes, before releases. Penetration testing: Annual minimum, after major changes, new applications, compliance requirements. Code review: During development, pull request reviews, security-focused reviews, automated static analysis. Security audit: Annual comprehensive, compliance-driven cycles, major architecture changes. Retesting: After vulnerability fixes, verify remediation, before production, post-incident. Frequency = risk-based approach. Automated scans frequent. Expert testing periodic. Review during development. Retest after fixes. Adjust by risk level."
      }
    },
    {
      "@type": "Question",
      "name": "What tools help with security testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Security testing tools: OWASP ZAP: Open-source web scanner, automated and manual, easy to use, good for web apps. Burp Suite: Professional pen testing, web application focus, manual and automated, advanced features. SonarQube: Code analysis, static analysis, security rules, quality gates, CI integration. Nessus: Vulnerability scanner, network and system, comprehensive coverage, commercial tool. Qualys: Cloud security, vulnerability management, continuous monitoring, enterprise scale. SAST tools: Static application security testing, code-level analysis, early detection, IDE integration. Tools = match to testing type. ZAP for web scanning. Burp for pen testing. SonarQube for code. Nessus for infrastructure. Choose based on needs. Automate regular scans."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle security testing findings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Security findings handling: Assessment: Analyze each finding, understand vulnerability, assess exploitability, determine impact. Prioritization: Critical first - immediate remediation, High - fix quickly, Medium - scheduled fix, Low - backlog. Remediation: Assign to owners, develop fixes, test solutions, verify fix works. Documentation: Record finding details, track remediation, document verification, report status. Timeline: Critical - hours to days, High - days to weeks, Medium - scheduled release, Low - backlog. Verification: Retest after fix, confirm vulnerability gone, verify no side effects, close finding. Findings = systematic handling. Assess thoroughly. Prioritize by risk. Remediate promptly. Verify fixes. Document everything. Report progress."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Security Testing Guide - Types, Areas & Tools',
  description: 'Security testing types, testing areas, tools, and process.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SecurityTestingGuide />
    </Suspense>
  );
}