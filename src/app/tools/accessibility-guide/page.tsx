import type { Metadata } from 'next';
import { Suspense } from 'react';
import AccessibilityGuide from '@/components/AccessibilityGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the WCAG accessibility principles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WCAG principles (POUR): Perceivable - users can perceive content (alt text, captions, sufficient contrast). Operable - users can operate interface (keyboard navigation, no time limits, skip links). Understandable - users can understand content and UI (clear language, consistent navigation, error identification). Robust - content works with assistive technologies (valid HTML, ARIA labels, compatibility). Each principle has guidelines and success criteria. WCAG levels: A (minimum), AA (standard, most regulations), AAA (enhanced). Target WCAG 2.1 Level AA for compliance."
      }
    },
    {
      "@type": "Question",
      "name": "How do I test web accessibility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Accessibility testing methods: Automated tools (axe DevTools, WAVE, Lighthouse - catches ~30-40% issues). Manual testing (keyboard navigation, visual inspection). Screen reader testing (NVDA, VoiceOver, JAWS - test actual experience). User testing (people with disabilities - best feedback). Color contrast checkers (WebAIM Contrast Checker). HTML validation (valid code helps assistive tech). Process: run automated test first, then manual checks, then screen reader test, then user testing. Automated alone not sufficient - manual + real user testing essential."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum color contrast ratio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WCAG color contrast ratios: Level AA (standard): Normal text (< 18pt or < 14pt bold) needs 4.5:1 ratio. Large text (≥ 18pt or ≥ 14pt bold) needs 3:1 ratio. UI components and graphical objects need 3:1 ratio. Level AAA (enhanced): Normal text needs 7:1. Large text needs 4.5:1. Test with WebAIM Contrast Checker or browser tools. Don&apos;t rely on color alone - use additional indicators (icons, text, patterns). Contrast = essential for visually impaired users and readability."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make images accessible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Image accessibility: Decorative images (no meaning) - use empty alt=\"\" or role=\"presentation\". Informative images - descriptive alt text explaining content. Functional images (buttons, links) - alt text describing action (e.g., alt=\"Search\"). Complex images (charts, diagrams) - alt text + long description in nearby text or aria-describedby. Text images - avoid, use real text instead. SVG icons - use aria-label or title element. Test: screen reader should convey purpose, not just file name. Alt text = first accessibility fix, easiest to implement."
      }
    },
    {
      "@type": "Question",
      "name": "Is web accessibility legally required?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Legal requirements: US - ADA (Americans with Disabilities Act) applies to websites, Section 508 (federal agencies). EU - European Accessibility Act (public sector, some private). UK - Equality Act 2010. Australia - Disability Discrimination Act. Many jurisdictions require WCAG 2.1 Level AA. Risk: lawsuits (Dominos, Beyonce, Netflix sued), fines, damage to reputation. Best practice: implement accessibility before legal action. Good for SEO, UX, and ethics too. Legal landscape evolving - accessibility increasingly mandatory."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Web Accessibility Guide - WCAG Principles & Testing',
  description: 'WCAG principles, common issues, testing tools, and checklist.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AccessibilityGuide />
    </Suspense>
  );
}