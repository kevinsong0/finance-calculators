import type { Metadata } from 'next';
import { Suspense } from 'react';
import CodeDocumentationGuide from '@/components/CodeDocumentationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What documentation types exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentation types: API documentation: External developer guides, endpoint descriptions, request/response formats, authentication details, examples provided, error codes explained, integration guides. Inline comments: Code-level documentation, function descriptions, parameter explanations, return values, edge cases, assumptions documented, complex logic explained. README files: Project introduction, setup instructions, usage examples, prerequisites listed, installation steps, configuration guide, basic troubleshooting. Architecture docs: System design overview, component relationships, data flow, technical decisions, patterns used, scalability considerations, performance design. User guides: End-user documentation, feature explanations, step-by-step instructions, screenshots included, FAQs addressed, troubleshooting guide. Types = comprehensive coverage. API essential. Comments standard. README required. Architecture important. User guides helpful. Change logs needed. Audience appropriate."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write good documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentation writing: Audience: Identify audience first, appropriate language, right detail level, match technical level, consider use case, beginner or advanced, context matters. Structure: Logical organization, clear hierarchy, easy navigation, table of contents, consistent structure, predictable layout, searchable content. Content: Accurate information, current version, verified examples, working code snippets, complete coverage, essential topics, helpful details. Style: Clear language, concise writing, avoid jargon, simple sentences, active voice, specific examples, consistent terminology. Examples: Include working examples, code snippets, common use cases, edge cases shown, error handling, expected output, practical application. Maintenance: Update regularly, version aligned, accurate content, remove outdated, reflect changes, review periodically, feedback incorporated. Writing = quality focus. Audience identified. Structure logical. Content accurate. Style clear. Examples included. Regular maintenance."
      }
    },
    {
      "@type": "Question",
      "name": "What documentation tools should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentation tools: API documentation: Swagger/OpenAPI for REST APIs, RESTful documentation, endpoint visualization, interactive testing, schema definition, client generation. Code documentation: Javadoc for Java, JSDoc for JavaScript, Sphinx for Python, Doxygen for C/C++, language-specific tools, automatic generation. Project documentation: Markdown for READMEs, simple formatting, version control integration, easy maintenance, platform support, portable format. Publishing platforms: Confluence for wikis, GitBook for books, ReadTheDocs for projects, platform hosting, version support, navigation features. Tools = choose appropriately. OpenAPI for APIs. Language-specific tools. Markdown simple. Platforms for hosting. Version control integration. Search capability. Automatic generation where possible."
      }
    },
    {
      "@type": "Question",
      "name": "How do I maintain documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentation maintenance: Updates: Update with code changes, reflect new features, remove deprecated info, version alignment, change tracking, timely updates, accuracy maintained. Review: Regular review schedule, accuracy verification, example testing, link checking, completeness audit, feedback review, improvement identification. Process: Documentation in workflow, code review includes docs, PR templates include docs, change process includes docs, update responsibility assigned, quality gates. Automation: Auto-generate where possible, API docs from code, structure generation, version tracking, link verification, build integration. Feedback: User feedback collected, accuracy reports, missing info identification, improvement suggestions, regular surveys, issue tracking. Maintenance = ongoing effort. Updates with changes. Regular review. Process integration. Automation used. Feedback collected. Quality focus."
      }
    },
    {
      "@type": "Question",
      "name": "What are documentation standards?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentation standards: Format: Consistent formatting, standardized templates, predictable structure, clear headings, appropriate hierarchy, readable layout, professional appearance. Language: Clear writing style, defined terminology, consistent vocabulary, simple sentences, active voice, audience-appropriate, jargon defined. Content: Required sections defined, minimum coverage, accuracy standards, completeness criteria, example requirements, version information, update dates. Quality: Accuracy verification, example testing, grammar check, link validation, accessibility compliance, readability score, completeness check. Version: Version documentation aligned, change history tracked, deprecated info marked, migration guides, version-specific content, compatibility notes. Standards = consistent approach. Format consistent. Language clear. Content defined. Quality verified. Version aligned. Templates used. Review required."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Code Documentation Guide - Types, Standards & Tools',
  description: 'Documentation types, writing standards, tools, and maintenance practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CodeDocumentationGuide />
    </Suspense>
  );
}