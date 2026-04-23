import type { Metadata } from 'next';
import { Suspense } from 'react';
import KnowledgeManagementGuide from '@/components/KnowledgeManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is knowledge management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Knowledge management definition: Purpose: Capture organizational knowledge, share expertise, improve decisions, support learning, retain critical information. Knowledge types: Explicit knowledge - documented, codified, in systems, Tacit knowledge - personal experience, in people, Embedded knowledge - in processes, culture, organization. Process: Capture - collect knowledge, Organize - structure for access, Store - preserve in systems, Share - distribute to users, Apply - use in practice, Update - maintain current. Importance: Faster problem solving, reduced duplication, better decisions, training efficiency, innovation support, competitive advantage. Knowledge management = organizational learning. Capture what&apos;s known. Make it accessible. Encourage sharing. Keep current. Measure value."
      }
    },
    {
      "@type": "Question",
      "name": "How do I capture organizational knowledge?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Knowledge capture methods: Documentation: Write procedures and guides, record processes, document decisions, capture lessons learned. Recording: Video/audio capture, presentations, interviews with experts, record meetings. Systematic capture: After project completion, post-incident review, exit interviews, regular updates. Expertise capture: Interview subject matter experts, shadowing sessions, knowledge transfer sessions, mentoring documentation. Tacit capture: Training programs, storytelling, communities of practice, mentoring relationships. Automation: Capture from workflows, system logs, communication archives, automated categorization. Capture = multiple methods. Document processes. Record expert knowledge. Systematic capture triggers. Use multiple approaches. Don&apos;t rely on single method."
      }
    },
    {
      "@type": "Question",
      "name": "What tools help with knowledge management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Knowledge management tools: Knowledge base: Document repository, searchable content, categorized information, version control, self-service access. Wiki: Collaborative documentation, team editing, linking content, version tracking, flexible structure. Learning management system: Training delivery, course management, progress tracking, certification, skill development. Collaboration tools: Team communication, knowledge sharing, discussion forums, instant messaging, file sharing. Search systems: Knowledge retrieval, findability improvement, content indexing, relevance ranking. Expert networks: Identify experts, connect seekers with experts, expert directory, skill matching. Tools = match to needs. Knowledge base for documents. Wiki for collaboration. LMS for training. Search for retrieval. Choose based on organization."
      }
    },
    {
      "@type": "Question",
      "name": "How do I share knowledge effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Knowledge sharing methods: Training: Formal training programs, workshops, seminars, online courses, certifications. Documentation: Accessible documentation, clear procedures, searchable knowledge base, regularly updated. Collaboration: Team discussions, knowledge sharing sessions, communities of practice, peer learning. Mentoring: Expert-to-novice relationships, apprenticeship, shadowing, knowledge transfer programs. Communication: Regular updates, newsletters, tips sharing, success stories, lessons learned distribution. Technology: Intranet portals, wikis, forums, chat channels, knowledge repositories. Sharing = multiple channels. Formal training. Accessible docs. Collaboration forums. Mentoring programs. Technology support. Regular updates."
      }
    },
    {
      "@type": "Question",
      "name": "How do I maintain knowledge currency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Knowledge maintenance: Review schedule: Periodic review of content, quarterly for critical, annual for standard, trigger-based updates after changes. Update process: Identify outdated content, assign updates, review changes, approve updates, publish revised content. Archival: Retire obsolete knowledge, archive historical content, maintain access to archives, clear obsolete from active. Ownership: Assign content owners, responsibility for currency, accountability for updates, expertise requirement. Feedback: User feedback mechanism, report errors, suggest improvements, track usage patterns. Automation: Automated updates where possible, integration with systems, scheduled reminders, workflow triggers. Maintenance = ongoing effort. Regular reviews. Clear ownership. Archive obsolete. Collect feedback. Automate where possible. Keep current."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Knowledge Management Guide - Types, Processes & Tools',
  description: 'Knowledge types, capture methods, tools, and sharing practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <KnowledgeManagementGuide />
    </Suspense>
  );
}