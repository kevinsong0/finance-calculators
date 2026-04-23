import type { Metadata } from 'next';
import { Suspense } from 'react';
import VersionControlWorkflowGuide from '@/components/VersionControlWorkflowGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What version control workflows exist?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workflow options: GitFlow: Multiple long-lived branches, develop branch, feature branches, release branches, hotfix branches, main branch, structured approach, large projects, scheduled releases. GitHub Flow: Simple branch strategy, feature branches only, main always deployable, pull request workflow, continuous deployment, fast iteration, small teams, frequent releases. Trunk-based development: Single main branch, short-lived feature branches, direct commits, fast iteration, feature flags used, continuous integration, high automation, experienced teams. Release Flow: Release branches created, feature work on main, release preparation separate, stabilization on release branch, production deployment from release, scheduled releases. Workflows = choose appropriately. GitFlow structured. GitHub Flow simple. Trunk-based fast. Release Flow scheduled. Match to team. Match to release frequency. Match to automation level. Match to project size."
      }
    },
    {
      "@type": "Question",
      "name": "How do I manage branches effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Branch management: Strategy: Define branching strategy, choose workflow, document approach, team training, consistent application, naming conventions, protection rules. Naming: Meaningful branch names, consistent prefixes, feature/user-description, release/v-version, hotfix/issue-description, clear purpose, searchable. Protection: Branch protection rules, main branch protected, require review, require tests, prevent force push, prevent delete, maintain stability. Lifetime: Short-lived branches preferred, merge promptly, delete after merge, reduce conflicts, clean repository, maintain focus, reduce complexity. Communication: Coordinate branch work, communicate changes, avoid conflicts, team awareness, merge coordination, shared understanding, collaboration focus. Management = deliberate approach. Strategy defined. Naming consistent. Protection rules. Short-lived branches. Communication active. Clean maintenance. Team alignment."
      }
    },
    {
      "@type": "Question",
      "name": "How do I write good commit messages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Commit message standards: Format: Subject line first, imperative mood, concise summary, body if needed, separate sections, structured format, clear separation. Subject: 50 characters limit, imperative verb start, no period end, summarize change, specific description, issue reference if applicable, lowercase start convention. Body: Explain why change, context provided, contrast with before, implementation notes, limitations noted, alternatives considered, blank line separation. Examples: Add feature for user authentication, Fix bug in payment processing, Refactor code for better performance, Update documentation for new API, Remove deprecated functionality. Reference: Issue/PR numbers, ticket references, link to context, related commits, breaking change notes, version impact. Messages = clear communication. Format structured. Subject concise. Body explains why. References included. Consistent style. Team adoption."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle merge conflicts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conflict resolution: Prevention: Small commits frequent, pull before push, communicate changes, coordinate work, avoid overlapping files, update regularly, team awareness. Detection: Identify conflicts early, check before merge, understand conflicts, see file changes, review markers, assess impact, plan resolution. Resolution: Understand both changes, determine correct version, combine if needed, preserve both changes, maintain logic, test after merge, commit resolution. Tools: Use merge tools, visual comparison, conflict markers, resolution assistance, integrated tools, external tools available, familiar options. Process: Fetch latest changes, attempt merge, resolve conflicts, verify resolution, complete merge, push result, verify build. Conflicts = managed process. Prevention first. Early detection. Understanding required. Careful resolution. Tools assistance. Verification testing. Communication helps."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use pull requests effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pull request workflow: Creation: Create from feature branch, target correct branch, descriptive title, detailed description, issue links, reviewers assigned, labels added. Description: Change summary clear, why change explained, testing notes, screenshots if visual, breaking changes noted, deployment notes, review guidance. Review: Review thoroughly, check functionality, verify tests, review style, provide feedback, approve or request changes, constructive comments. Discussion: Respond to feedback, address concerns, explain decisions, accept suggestions, update code, iterate review, maintain conversation. Merge: All reviews approved, tests passing, conflicts resolved, clean merge, appropriate method, branch cleanup, update tracking. Pull requests = collaborative review. Clear creation. Detailed description. Thorough review. Active discussion. Clean merge. Branch cleanup. Continuous improvement."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Version Control Workflow Guide - Branching & Operations',
  description: 'Workflow types, branching strategies, operations, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VersionControlWorkflowGuide />
    </Suspense>
  );
}