import type { Metadata } from 'next';
import { Suspense } from 'react';
import PasswordSecurityGuide from '@/components/PasswordSecurityGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create a strong password?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Strong password criteria: Length 12+ characters (longer = stronger). Mix character types (uppercase, lowercase, numbers, symbols). Avoid common patterns (dictionary words, sequences like 123, keyboard patterns qwerty). No personal information (birthdates, names, pet names). Unique for each account (never reuse). Use password manager to generate random passwords. Example strong: Kx9#mP2$vL5@nQ8. Better: use password manager generated 16+ random characters. Length more important than complexity for modern security."
      }
    },
    {
      "@type": "Question",
      "name": "Why should I use a password manager?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Password manager benefits: Generate strong random passwords (no need to create them). Store all passwords securely (encrypted vault). Auto-fill login forms (convenience). Unique passwords for each site (security). One master password to remember. Sync across devices. Detect breached passwords. Share passwords securely. Free options: Bitwarden. Paid: 1Password, LastPass. Eliminates password reuse problem - biggest security risk. Master password must be very strong and memorable."
      }
    },
    {
      "@type": "Question",
      "name": "What is two-factor authentication?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2FA (two-factor authentication): requires two forms of identification to login. Types: SMS code (sent to phone, less secure). Authenticator app (Google Authenticator, Authy, generates codes, more secure). Hardware key (YubiKey, physical device, most secure). Biometric (fingerprint, face scan). Email code. Benefits: password alone not enough, prevents unauthorized access even if password stolen. Enable on all important accounts (email, banking, social). Use authenticator app or hardware key over SMS when possible. Essential security layer."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I change passwords?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Password change guidance: DON'T change regularly unless compromised (NIST recommendation). Change IMMEDIATELY if: account breached, password shared, suspicion of compromise, phishing attack happened. Regular changes cause: weaker passwords (users create patterns), password reuse, user frustration. Better approach: use strong unique passwords, enable 2FA, monitor for breaches. Check breaches at haveibeenpwned.com. Change only when needed, not on schedule. Focus on quality over frequency."
      }
    },
    {
      "@type": "Question",
      "name": "What makes a password weak?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Weak password characteristics: Short (under 8 characters). Dictionary words (password, admin, login). Common substitutions (p@ssw0rd, l0gin). Personal info (name, birthdate, pet). Keyboard patterns (qwerty, asdf). Sequences (123456, abcdef). Reused across sites. Found in breach lists. Popular passwords (password123). Attackers try these first - dictionary attacks, credential stuffing. Weak passwords cracked in seconds. Check your passwords with strength testers. Common passwords = first target for hackers."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Password Security Guide - Strength, Best Practices & Generation',
  description: 'Strength levels, best practices, common mistakes, and generation tips.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PasswordSecurityGuide />
    </Suspense>
  );
}