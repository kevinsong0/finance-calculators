import type { Metadata } from 'next';
import { Suspense } from 'react';
import QRCodeGenerator from '@/components/QRCodeGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create a QR code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose QR type (text, URL, email, WiFi, etc.), enter your content, select size, and click Generate. Download the PNG image to print or share. QR codes work on all smartphones without special apps—most cameras scan them automatically."
      }
    },
    {
      "@type": "Question",
      "name": "How do I create a WiFi QR code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Select WiFi type, enter network name (SSID), password, and security type (WPA/WPA2, WEP, or open). Generate and share the QR code. Guests scan it to automatically connect without typing the password. Great for cafes, offices, events."
      }
    },
    {
      "@type": "Question",
      "name": "What QR code size should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "128x128: small icons, digital use. 256x256: standard size, most uses. 512x512: high quality, printing. 1024x1024: large prints, posters. Larger sizes work better for distance scanning. Choose based on your display/print size."
      }
    },
    {
      "@type": "Question",
      "name": "How do QR codes work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "QR codes encode data in a 2D pattern of black squares. Smartphone cameras scan the pattern and decode it. Depending on content type, the phone opens a URL, starts an email, dials a phone, or connects to WiFi. No app needed on modern phones."
      }
    },
    {
      "@type": "Question",
      "name": "Can QR codes be used for business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "QR codes are excellent for business: print on business cards for contact info, flyers for website links, product packaging for manuals, receipts for feedback forms, menus for digital ordering, event tickets for check-in. High adoption rate makes them effective."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'QR Code Generator - Create QR Codes for URLs, WiFi, Email, Phone',
  description: 'Free QR code generator for text, URLs, WiFi networks, emails, and phone numbers. Download high-quality PNG QR codes for print and digital use.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <QRCodeGenerator />
    </Suspense>
  );
}