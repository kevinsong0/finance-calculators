import type { Metadata } from 'next';
import { Suspense } from 'react';
import CodeReviewBestPracticesGuide from '@/components/CodeReviewBestPracticesGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I do a good code review?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Good code review process: Start with understanding: Read PR description, understand context and goals, review related design docs if complex. Review structure: Functionality first - does it work?, design second - is approach right?, implementation third - code quality details, tests fourth - coverage adequate?. Feedback format: Critical issues first (bugs, security, design), important issues second (readability, performance), suggestions last (style nitpicks, alternative approaches). Tone: Constructive not critical, explain reasoning, suggest alternatives, ask questions for clarification. Timing: Within 24-48 hours ideally, don&apos;t block indefinitely. Scope: Focus on important issues, don&apos;t nitpick excessively, distinguish blocking vs optional. Good review = thorough + constructive. Bad review = vague comments, personal preferences, blocking for minor style. Check function, design, quality, tests. Be specific, explain why."
      }
    },
    {
      "@type": "Question",
      "name": "What should I check in a code review?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Code review checklist: Functionality: Does code do what&apos;s intended? Edge cases handled? Error handling present? Design: Is approach appropriate? Could it be simpler? Fits existing architecture? Readability: Is code understandable? Naming clear? Comments helpful (not redundant)? Complexity: Is it unnecessarily complex? Can it be simplified? Too clever? Security: Input validated? No injection risks? Secrets not hardcoded? Access controls correct? Performance: Efficient enough for use case? Unnecessary loops/recursion? Memory usage reasonable? Tests: Unit tests exist? Edge cases tested? Tests meaningful (not just passing)? Style: Follows team conventions? Consistent with rest of code? Not blocking for style unless critical. Check all areas systematically. Functionality first, then quality. Prioritize blocking issues over nitpicks."
      }
    },
    {
      "@type": "Question",
      "name": "How do I give constructive code review feedback?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Constructive feedback format: Be specific: Point to exact line, describe specific issue, not vague &apos;this is bad&apos;. Explain reasoning: Why is this an issue? What&apos;s the impact? What&apos;s the alternative? Offer alternatives: Suggest specific fix, show code example, explain trade-offs. Separate severity: Blocking issues (must fix before merge), important suggestions (should fix), nitpicks (optional). Use questions: &apos;Could this be simpler?&apos; instead of &apos;This is too complex&apos;, &apos;What happens if input is null?&apos; instead of &apos;You didn&apos;t handle null&apos;. Balance negative with positive: Acknowledge good approaches, praise clean code, not just criticism. Phrase constructively: &apos;Consider renaming for clarity&apos; not &apos;Bad name&apos;, &apos;This could be simplified&apos; not &apos;This is messy&apos;. Constructive = improvement-focused. Negative = discouraging. Specific, explain, suggest, ask questions, balance positive."
      }
    },
    {
      "@type": "Question",
      "name": "How should authors prepare PRs for review?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Author preparation for code review: PR size: Keep small (200-400 lines ideal), one logical change, easier to review, faster feedback. Description: Explain what change does, why needed, how tested, any context reviewers need, link to related issues/tickets. Self-review: Review own code before submitting, catch obvious issues, check your own checklist. Tests: Include tests for new code, ensure tests pass, make tests meaningful. Draft status: Use draft for work-in-progress, don&apos;t request review until ready, update description when ready. Breaking changes: Highlight breaking changes in description, explain migration path. Complex changes: Consider design doc first, discuss approach before implementing, get early feedback. Author preparation = faster review. Unprepared PRs = delays, back-and-forth. Small PRs, good description, self-review, tests included."
      }
    },
    {
      "@type": "Question",
      "name": "How do I respond to code review feedback?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Responding to review feedback: Accept valid feedback: Acknowledge issue, fix as suggested, thank reviewer, learn from the comment. Discuss disagreements: Explain your reasoning, ask clarifying questions, consider reviewer&apos;s perspective, reach consensus. Push back appropriately: If reviewer wrong, explain why with evidence, but be open to learning. Don&apos;t take personally: Feedback on code not on you, reviewers want better code, learn from patterns. Respond timely: Don&apos;t let PR stall, respond within 24 hours, even if just acknowledging. Make changes visible: Push fixes clearly, mark comments as resolved, show what changed. Ask for clarification: If comment unclear, ask, don&apos;t guess and make wrong change. Thank reviewers: Acknowledge their time and help, build positive review culture. Response = constructive dialogue. Defensiveness = slow progress. Accept valid feedback, discuss disagreements, thank reviewers."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Code Review Best Practices Guide - Checklist, Feedback & Process',
  description: 'Review checklist, feedback techniques, author and reviewer responsibilities.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CodeReviewBestPracticesGuide />
    </Suspense>
  );
}