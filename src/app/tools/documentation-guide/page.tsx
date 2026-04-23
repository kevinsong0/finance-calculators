import type { Metadata } from 'next';
import { Suspense } from 'react';
import DocumentationGuide from '@/components/DocumentationGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes good documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good documentation qualities: Clear language: Simple words, avoid jargon, explain technical terms, understandable by audience. Structure: Logical organization, consistent format, easy navigation, searchable content. Accuracy: Current information, tested procedures, verified facts, version-controlled updates. Completeness: Covers necessary topics, includes examples, explains edge cases, provides context. Accessibility: Multiple formats available, screen-reader compatible, clear headings, appropriate contrast. Examples: Code samples, screenshots, step-by-step guides, real scenarios. Good documentation = serves audience. Clear and accurate. Well-organized. Examples included. Maintain current. Test with users."
      }
    },
    {
      "@type": "Question",
      "name": "What documentation types exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentation types: API documentation: Reference format, endpoint descriptions, parameters, responses, code examples, for developers. User guides: Step-by-step instructions, how to use features, troubleshooting, screenshots, for end users. Technical documentation: Specifications, architecture, design decisions, for engineers. Requirements documentation: User stories, functional specs, acceptance criteria, for product teams. Architecture documentation: System design, component relationships, data flow, for technical team. Release notes: Change summary, new features, fixes, deprecations, for all users. Types = match to audience. API docs for developers. User guides for users. Technical docs for engineers. Choose format appropriately. Keep audience-focused."
      }
    },
    {
      "@type": "Question",
      "name": "How do I maintain documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentation maintenance: Version control: Track changes, revert capability, history visible, branch for drafts. Update process: Review regularly, update with code changes, remove obsolete info, add new features. Review schedule: Quarterly reviews minimum, after major releases, when errors reported, user feedback incorporated. Ownership: Assign documentation owners, responsibility for updates, accountability for accuracy. Automation: Generate docs from code where possible, sync with API changes, automate deployment. Feedback loop: User feedback mechanism, error reports tracked, improvement suggestions collected. Maintenance = ongoing effort. Version control. Regular reviews. Update with changes. Assign ownership. Automate where possible. Collect feedback."
      }
    },
    {
      "@type": "Question",
      "name": "What tools help create documentation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentation tools: Markdown: Simple formatting, widely supported, version control friendly, portable format. Docusaurus: Documentation websites, React-based, versioned docs, search built-in, open-source. Swagger/OpenAPI: API documentation, auto-generated from spec, interactive try-out, standard format. Confluence: Team wikis, collaborative editing, enterprise use, integration with Jira. Notion: Collaborative docs, flexible format, team workspace, modern interface. GitBook: Technical documentation, markdown-based, git integration, professional output. Selection criteria: Audience needs, automation level, collaboration needs, integration requirements, cost considerations. Tools = match to needs. Markdown for simplicity. Swagger for APIs. Docusaurus for sites. Consider team workflow. Automate where beneficial."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write documentation effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective documentation writing: Planning: Identify audience, understand needs, outline structure, gather information. Writing: Start with overview, explain concepts first, then details, use consistent terminology. Style: Active voice preferred, concise sentences, bullet points for lists, clear headings. Examples: Include code samples, show step-by-step, demonstrate usage, explain results. Testing: Verify procedures work, test with users, fix unclear sections, improve based on feedback. Formatting: Use headings for structure, bold for emphasis, code blocks for code, links for references. Effective writing = clear for audience. Plan before writing. Active voice. Include examples. Test with users. Use formatting well. Keep concise."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Documentation Best Practices Guide - Types, Tools & Writing',
  description: 'Documentation types, best practices, tools, and writing tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DocumentationGuide />
    </Suspense>
  );
}