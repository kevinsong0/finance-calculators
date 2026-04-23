import type { Metadata } from 'next';
import { Suspense } from 'react';
import CSSGradientGenerator from '@/components/CSSGradientGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create a CSS gradient?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use background: linear-gradient(angle, color1, color2). Angle in degrees or keywords: to top, to right, to bottom, to left. Radial: radial-gradient(circle, color1, color2). Conic: conic-gradient(from angle, color1, color2). Multiple colors: add more values separated by commas. Use HEX, RGB, or named colors."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between linear and radial gradients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Linear gradient: colors flow along straight line at specified angle. Radial gradient: colors spread outward from center point in circular pattern. Linear for directional backgrounds. Radial for spotlight effects, buttons, circular elements. Both support multiple colors and color stops."
      }
    },
    {
      "@type": "Question",
      "name": "How do I add multiple colors to a gradient?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Add more color values: linear-gradient(90deg, red, yellow, green, blue). Specify color stops: linear-gradient(90deg, red 0%, yellow 50%, green 100%). Stop percentages control color transition positions. Without stops, colors evenly distribute. Stops create controlled color bands."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create a transparent gradient?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use rgba() or hex with opacity: rgba(255,0,0,0.5) or #ff000080. Linear gradient with transparency: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,1)). Create fade effects, overlays. Transparency useful for text overlays, image overlays, glassmorphism. Combine with background-blend-mode."
      }
    },
    {
      "@type": "Question",
      "name": "What is a conic gradient?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Conic gradient: colors rotate around center point like pie chart. Syntax: conic-gradient(from angle, color1, color2). Create color wheels, pie charts, progress indicators. Starts from top by default. Use from keyword to set starting angle. Colors sweep clockwise around center."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'CSS Gradient Generator - Create Linear, Radial, and Conic Gradients',
  description: 'Generate CSS gradients with live preview. Linear, radial, and conic gradients with multiple colors and angles. Copy CSS code instantly.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CSSGradientGenerator />
    </Suspense>
  );
}