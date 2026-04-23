import type { Metadata } from 'next';
import { Suspense } from 'react';
import NetworkingGuide from '@/components/NetworkingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I network effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective networking: Mindset: Build relationships, not collect contacts. Give before asking. Be genuinely curious. Approach: Quality over quantity. 5 meaningful conversations > 50 surface ones. Follow up within 48 hours. Methods: Events (conferences, meetups), online (LinkedIn engagement), internal (company colleagues), warm introductions (ask for referrals). Tips: Prepare talking points, ask good questions, listen actively, offer value, take notes. Maintenance: Check in quarterly, share updates, offer help, celebrate their wins. Don&apos;t: be transactional, ask favors immediately, ghost after success. Networking = relationship building. Takes time. Invest before needing."
      }
    },
    {
      "@type": "Question",
      "name": "How do I network on LinkedIn?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LinkedIn networking: Build profile: Complete profile, professional photo, clear headline, detailed experience. Engage: Comment thoughtfully on posts, share valuable content, post your own insights, use hashtags. Connect: Connect with purpose (mutual interest, shared background), personalize message, don&apos;t mass-connect blindly. Grow: Follow industry leaders, join relevant groups, participate in discussions. Maintain: Check feed daily, engage regularly, congratulate connections, share their content. Reach out: For specific purpose (advice, intro, collaboration), be specific in message, offer value. Don&apos;t: spam requests, only ask favors, ignore messages, be overly promotional. LinkedIn = professional community. Contribute first. Consistency builds presence."
      }
    },
    {
      "@type": "Question",
      "name": "How do I ask for an introduction?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Request introduction: Choose right connector: Mutual connection who knows both parties well, trusted by target, willing to help. Ask politely: Direct message, explain why you want intro, what you&apos;ll ask, offer context for connector. Make it easy: Provide draft message they can forward, give target&apos;s value proposition, set clear expectation. Don&apos;t pressure: Accept if they decline, they may have reasons, move to other approaches. After intro: Thank connector, update them on outcome, offer reciprocity. Timing: Ask when relationship with connector is established, not immediately after meeting. Warm intro = much higher response rate than cold outreach. Ask respectfully. Make connector&apos;s job easy."
      }
    },
    {
      "@type": "Question",
      "name": "How do I maintain my network?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maintain network: Regular touchpoints: Quarterly check-ins, share updates, congratulate achievements, share relevant content. Methods: Email/message, coffee chat, comment on posts, share articles, attend events together, introduce them to others. Track contacts: CRM or notes app, record conversations, interests, key dates, last contact date. Set reminders: Calendar reminders for check-ins, important dates (birthdays if appropriate). Give value: Share opportunities, make introductions, offer advice, celebrate wins, acknowledge achievements. Be consistent: Don&apos;t reach out only when you need something, maintain even when busy, small touches count. Network maintenance = ongoing investment. Relationships need nourishment. Build before needing."
      }
    },
    {
      "@type": "Question",
      "name": "How do I network at events?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Networking at events: Before: Research attendees/speakers, set goals (who to meet), prepare questions, bring business cards/LinkedIn QR. During: Introduce yourself confidently, ask questions (open-ended), listen actively, take notes, move on gracefully (don&apos;t monopolize), collect contact info. After: Follow up within 48 hours, personalized message referencing conversation, suggest next step (coffee chat, call), add to LinkedIn. Tips: Quality conversations > quantity, be genuinely interested, look for shared interests, help others connect, don&apos;t sell aggressively. Common mistake: talking too much, not listening. Ask questions. Let them talk. Remember names (write down immediately). Events = opportunity. Prepare + execute + follow up."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Networking Guide - Types, Approaches & Best Practices',
  description: 'Networking strategies, LinkedIn tips, introduction requests, and maintenance.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NetworkingGuide />
    </Suspense>
  );
}