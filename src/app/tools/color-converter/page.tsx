import type { Metadata } from 'next';
import { Suspense } from 'react';
import ColorConverter from '@/components/ColorConverter';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I convert HEX to RGB?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HEX to RGB: split the 6-digit hex into 3 pairs (#RRGGBB → RR, GG, BB). Convert each pair from hex to decimal. Example: #3B82F6 → 3B=59, 82=130, F6=246 → RGB(59, 130, 246). This converter handles it automatically."
      }
    },
    {
      "@type": "Question",
      "name": "How do I convert RGB to HSL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RGB to HSL: normalize RGB to 0-1 range, find max/min values, calculate lightness as average, saturation based on range, and hue based on which color is max. Use this converter for automatic calculation with visual preview."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between HEX and RGB?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HEX is hexadecimal representation of RGB values (#RRGGBB format). RGB is decimal (0-255 per channel). Both represent the same colors. HEX is shorter for CSS. RGB is more intuitive for adjustment. This converter works both ways."
      }
    },
    {
      "@type": "Question",
      "name": "What is a complementary color?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Complementary color is opposite on the color wheel. For RGB, subtract each channel from 255. Example: RGB(59, 130, 246) complement = RGB(196, 125, 9). Creates high contrast. Useful for design, highlights, and call-to-action elements."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use HSL for design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HSL is intuitive: Hue controls the color (red=0, green=120, blue=240), Saturation controls intensity (gray=0%, vivid=100%), Lightness controls brightness (black=0%, white=100%). Easier for creating color variations than RGB/HEX."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Color Converter - HEX RGB HSL Color Code Converter',
  description: 'Free color converter to translate between HEX, RGB, and HSL formats. Preview colors, generate CSS code, and find complementary colors.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ColorConverter />
    </Suspense>
  );
}