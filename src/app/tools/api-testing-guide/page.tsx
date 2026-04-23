import type { Metadata } from 'next';
import { Suspense } from 'react';
import ApiTestingGuide from '@/components/ApiTestingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I test an API?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API testing approach: Setup: Test environment separate from production, test data prepared, authentication credentials for testing. Test types: Unit tests - each endpoint individually. Integration tests - endpoints working together. Load tests - performance under stress. Security tests - vulnerability check. Test cases: Valid requests with expected responses. Invalid requests with proper error handling. Edge cases (empty, null, max values). Authentication and authorization. Rate limiting behavior. Response schema validation. Tools: Postman for manual testing, Newman for automated Postman runs, Jest/Mocha for code-level tests, k6/Artillery for load testing, OWASP ZAP for security. Process: Document endpoints first, create test suite, automate in CI/CD, run before each release, monitor in production. API testing = comprehensive coverage. Manual only = missed issues. Automate, run frequently, cover all paths."
      }
    },
    {
      "@type": "Question",
      "name": "What should I test in API endpoints?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API endpoint test coverage: Response validation: Correct status codes (200, 400, 401, 404, 500). Response body structure matches schema. Response headers correct. Response time acceptable. Request handling: Valid input accepted. Invalid input rejected with error. Missing required fields handled. Boundary values tested (empty, max, null). Authentication: Valid credentials accepted. Invalid credentials rejected. Token expiration handled. Authorization: Authorized users can access. Unauthorized users blocked. Role-based access works. Error handling: Proper error messages. Error codes consistent. No sensitive data in errors. Rate limiting: Limits enforced. Proper headers returned. Retry guidance provided. Test all scenarios. Happy path + error paths. Edge cases + security."
      }
    },
    {
      "@type": "Question",
      "name": "What tools are used for API testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API testing tools: Manual testing: Postman - GUI for endpoint testing, collections for test suites, environment variables, easy sharing. Insomnia - similar to Postman, clean interface. curl - command-line testing, quick checks. Automated testing: Newman - Postman collections in CI/CD, command-line runner. Jest/Mocha - JavaScript test frameworks, code-level API tests. Pytest - Python API testing, fixtures support. REST Assured - Java API testing. Load testing: k6 - modern load testing, JavaScript scripts. Artillery - Node.js load testing, YAML config. JMeter - classic load testing, GUI-based. Security testing: OWASP ZAP - automated security scan, free. Burp Suite - professional security testing. Contract testing: Pact - consumer-driven contracts. Spring Cloud Contract - Java contract testing. Choose based on needs. Manual for exploration, automated for CI/CD, load for performance, security for safety."
      }
    },
    {
      "@type": "Question",
      "name": "How do I automate API testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API test automation: Test suite creation: Document all endpoints, create test collection (Postman) or test files (Jest), parameterize test data, set up test environment. Automation approach: Newman - run Postman collections in CI/CD, Jest/Mocha - write test code in project, Pytest - Python-based automation, shell scripts - simple curl tests. CI/CD integration: Run tests on every commit, run before deployment, block deployment if tests fail, generate test reports. Test data management: Separate test database, reset state between tests, use fixtures/factories, mock external services. Best practices: Tests independent of each other, clean up after tests, use realistic data, version test suites, document test cases. Automation = consistent testing. Manual = inconsistent. Automate in CI/CD, run frequently, block failures."
      }
    },
    {
      "@type": "Question",
      "name": "How do I test API security?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "API security testing: Authentication tests: Valid credentials work, invalid credentials blocked, expired tokens rejected, token refresh works, brute-force protection. Authorization tests: Role-based access correct, unauthorized endpoints blocked, privilege escalation prevented, resource ownership verified. Input validation: Injection attacks prevented (SQL, XSS), malformed input handled, oversized payloads rejected, special characters handled. OWASP API Security Top 10: Broken object level authorization. Broken authentication. Excessive data exposure. Lack of resources/rate limiting. Broken function level authorization. Mass assignment. Security misconfiguration. Injection. Improper assets management. Insufficient logging/monitoring. Tools: OWASP ZAP for automated scans, Burp Suite for manual testing, custom scripts for auth tests. Security tests = protection verification. Skip security = vulnerabilities. Test auth, authorization, input, OWASP top 10."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'API Testing Guide - Types, Tools & Best Practices',
  description: 'API test types, testing tools, checklist, and security testing.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ApiTestingGuide />
    </Suspense>
  );
}