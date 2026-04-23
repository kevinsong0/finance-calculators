import type { Metadata } from 'next';
import { Suspense } from 'react';
import BinaryCalculator from '@/components/BinaryCalculator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I convert decimal to binary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enter a decimal number, select the bit width (8, 16, 32, or 64), and the calculator shows binary, hexadecimal, and octal equivalents. For example, decimal 255 = binary 11111111 = hex FF = octal 377."
      }
    },
    {
      "@type": "Question",
      "name": "What are bitwise operations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bitwise operations manipulate individual bits: AND returns 1 only if both bits are 1, OR returns 1 if either bit is 1, XOR returns 1 if bits differ. These are fundamental in programming for flags, permissions, masks, and low-level system work."
      }
    },
    {
      "@type": "Question",
      "name": "How does signed vs unsigned binary work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unsigned binary uses all bits for positive values (0-255 for 8-bit). Signed binary uses the highest bit as sign: 0 = positive, 1 = negative. For 8-bit signed, values range from -128 to 127. The calculator shows both interpretations."
      }
    },
    {
      "@type": "Question",
      "name": "Why do developers need binary calculators?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Developers use binary for: IP address subnet masks, RGB color values, file permissions (Unix), flag combinations, memory addresses, register debugging, cryptography, and network protocols. Understanding binary is essential for systems programming."
      }
    },
    {
      "@type": "Question",
      "name": "What is hex notation in programming?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hexadecimal (base-16) uses digits 0-9 and letters A-F. It's compact: one hex digit = 4 binary bits. Programmers write 0xFF for decimal 255, 0x10 for 16. Hex is standard for colors (#FF0000 = red), memory addresses, and byte values."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Binary Calculator - Convert Decimal, Binary, Hex, Octal | Bitwise Operations',
  description: 'Free binary calculator for developers. Convert between decimal, binary, hexadecimal, and octal. Perform AND, OR, XOR bitwise operations. Essential tool for programming and systems work.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BinaryCalculator />
    </Suspense>
  );
}