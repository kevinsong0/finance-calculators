import type { Metadata } from 'next';
import { Suspense } from 'react';
import PasswordStrengthChecker from '@/components/PasswordStrengthChecker';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes a strong password?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strong password criteria: 12+ characters, mix of uppercase/lowercase/numbers/special characters, no dictionary words, no personal info, no sequential patterns (abc, 123), no repeated characters (aaa). Longer passwords exponentially increase security - each additional character multiplies possible combinations."
      }
    },
    {
      "@type": "Question",
      "name": "How long should my password be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Minimum: 8 characters (barely acceptable). Recommended: 12+ characters for good security. Strong: 16+ characters. Very strong: 20+ characters. Modern brute force can crack 8-character passwords in hours. 12+ characters with mixed types takes years. Use password managers to store long passwords."
      }
    },
    {
      "@type": "Question",
      "name": "What is password entropy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Entropy measures password unpredictability in bits. Formula: log2(number of possible combinations). Higher entropy = harder to crack. 8-char lowercase only: ~37 bits (weak). 12-char with all types: ~78 bits (strong). 20+ bits = billions of combinations. Each bit doubles difficulty."
      }
    },
    {
      "@type": "Question",
      "name": "Why avoid common patterns in passwords?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Attackers use dictionaries with: common words (password, qwerty), sequences (abc, 123), repeats (aaa), substitutions (p@ssword), dates, names. These patterns reduce entropy dramatically. 'password123' takes seconds to crack despite being 11 characters. Randomness matters more than length alone."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use a password manager?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, password managers (Bitwarden, 1Password, LastPass) are strongly recommended. Benefits: generate truly random passwords, store unlimited unique passwords per account, autofill securely, encrypted storage, sync across devices. One strong master password protects all others. Much safer than reused passwords or written notes."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Password Strength Checker - Test Password Security Online',
  description: 'Free password strength checker. Analyze password length, character types, patterns, and crack time. Get improvement suggestions. Security tool for creating strong passwords.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PasswordStrengthChecker />
    </Suspense>
  );
}