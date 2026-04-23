import type { Metadata } from 'next';
import { Suspense } from 'react';
import RandomGenerator from '@/components/RandomGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I generate random numbers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set minimum and maximum values, choose how many numbers to generate, and click Generate. Optionally disable duplicates for unique results. Example: numbers 1-100, no duplicates, 5 numbers = lottery-style draw."
      }
    },
    {
      "@type": "Question",
      "name": "How does coin flipping work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each coin flip uses random probability: exactly 50% chance for Heads or Tails. Flip multiple times to see results distribution. Over many flips, results approach 50/50 split. Track your flip history and statistics."
      }
    },
    {
      "@type": "Question",
      "name": "How do I roll dice online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose number of dice (1-10) and type (D4, D6, D8, D10, D12, D20). Click Roll to simulate dice throws. Shows individual results, total, and average. Useful for tabletop games, RPGs, and probability experiments."
      }
    },
    {
      "@type": "Question",
      "name": "How do I generate a secure password?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Set length (12+ recommended), select character types (uppercase, lowercase, numbers, symbols). Click Generate for a random password. Higher length and more character types increase entropy and security. Use password managers for storage."
      }
    },
    {
      "@type": "Question",
      "name": "What password length is secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minimum 12 characters for moderate security. 16+ characters for strong security. Include uppercase, lowercase, numbers, and symbols for maximum entropy. 12-character password with all types has ~79 bits of entropy."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Random Generator - Numbers, Coins, Dice, and Passwords',
  description: 'Free random number generator, coin flipper, dice roller, and password generator. Generate random numbers, flip coins, roll dice, and create secure passwords.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RandomGenerator />
    </Suspense>
  );
}