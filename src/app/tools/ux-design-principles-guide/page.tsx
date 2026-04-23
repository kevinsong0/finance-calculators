import type { Metadata } from 'next';
import { Suspense } from 'react';
import UXDesignPrinciplesGuide from '@/components/UXDesignPrinciplesGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are UX design principles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "UX design principles: User-Centered (design based on user needs, not assumptions - do research first). Consistency (same patterns, terminology throughout - reduces learning). Feedback (system responds to actions - hover states, loading indicators). Simplicity (remove unnecessary complexity - clear hierarchy, minimal steps). Accessibility (usable by all abilities - screen readers, contrast, keyboard nav). Visibility (important elements prominent - primary action clear). Error Prevention (design to prevent mistakes - confirmations, validation). Efficiency (users complete tasks quickly). These principles guide design decisions."
      }
    },
    {
      "@type": "Question",
      "name": "What are Nielsen's usability heuristics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nielsen's 10 heuristics (evaluated usability): 1. Visibility of System Status (keep users informed). 2. Match Real World (use familiar concepts). 3. User Control (allow undo, freedom). 4. Consistency (same patterns, standards). 5. Error Prevention (prevent before handling). 6. Recognition over Recall (minimize memory). 7. Flexibility (shortcuts for experts). 8. Aesthetic Design (clean, organized). 9. Error Recovery (helpful error messages). 10. Help & Documentation (when needed). Use heuristics to evaluate designs - identify usability issues systematically."
      }
    },
    {
      "@type": "Question",
      "name": "How do I conduct usability testing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Usability testing steps: Define goals (what to test, tasks to complete). Select participants (representative users, 5-8 per test). Prepare tasks (realistic scenarios). Set up environment (quiet, recording). Conduct test (observe, don't guide - ask them to think aloud). Record findings (where struggled, frustrations). Analyze results (patterns across users). Prioritize fixes (severity + frequency). Iterate design. Tips: test early (wireframes), test often (continuous feedback), test with real users (not colleagues). 5 users find 80% of issues."
      }
    },
    {
      "@type": "Question",
      "name": "What is user-centered design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "User-centered design (UCD): design process focused on user needs throughout. Steps: Understand users (research, interviews, personas). Define requirements (user needs, contexts). Design solutions (iterate with user feedback). Evaluate (usability testing, measure success). Iterate (refine based on findings). Key: involve users early and often, not just at end. Avoid: designing for yourself, assuming user behavior, skipping research. UCD = better products that users actually need/want/can use. Process is iterative - keep improving with user input."
      }
    },
    {
      "@type": "Question",
      "name": "How do I improve UX design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Improve UX: Research (user interviews, surveys, analytics). Identify pain points (where users struggle). Apply principles (consistency, feedback, simplicity). Test designs (usability testing with real users). Iterate (fix issues, test again). Measure (task completion, time, satisfaction). Learn standards (platform conventions, accessibility). Study users (watch them use product, ask questions). Common improvements: clearer labels, fewer steps, better error messages, faster loading, consistent navigation. UX improvement = continuous process, not one-time fix."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'UX Design Principles Guide - Core Principles & Heuristics',
  description: 'UX design principles, Nielsen heuristics, methods, and design checklist.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <UXDesignPrinciplesGuide />
    </Suspense>
  );
}