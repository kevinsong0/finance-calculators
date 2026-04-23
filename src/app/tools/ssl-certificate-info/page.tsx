import type { Metadata } from 'next';
import { Suspense } from 'react';
import SSLCertificateInfo from '@/components/SSLCertificateInfo';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is an SSL certificate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SSL certificate: digital certificate enabling HTTPS encryption. Validates website identity, encrypts data between browser and server. Types: DV (Domain Validation), OV (Organization Validation), EV (Extended Validation). Issued by Certificate Authorities (CA). Shows trust indicators in browser. Required for secure websites."
      }
    },
    {
      "@type": "Question",
      "name": "What are SSL certificate types?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SSL types: DV (Domain Validation) - basic, auto-issued, for blogs. OV (Organization Validation) - business verified, for companies. EV (Extended Validation) - highest trust, green bar, for banks. Wildcard: covers subdomains. Multi-domain: multiple domains on one cert. Free: Let's Encrypt, Cloudflare. Paid: DigiCert, Sectigo."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get a free SSL certificate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Free SSL options: Let's Encrypt - automated, 90-day, renewable. Cloudflare - free with proxy. Certbot tool auto-installs Let's Encrypt. Many hosting providers offer free SSL. Setup: install Certbot, run certbot --nginx or --apache, auto-renew via cron. DV certificates only. OV/EV require paid certificates."
      }
    },
    {
      "@type": "Question",
      "name": "Why is my SSL certificate showing warning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SSL warnings: expired certificate, wrong hostname, untrusted CA, self-signed, mixed content (HTTP resources on HTTPS page). Fix: renew certificate, add domain to cert, use trusted CA, fix mixed content, redirect all to HTTPS. Check with openssl or SSL checker tools. Browser shows Not Secure for problems."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need SSL for my website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SSL required for: all modern websites, AdSense approval, payment processing, login forms, SEO ranking (Google prefers HTTPS), user trust, app store requirements. Chrome marks non-HTTPS as Not Secure. Free SSL available via Let's Encrypt. No reason to not use HTTPS in 2026."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'SSL Certificate Information - Types, Providers, Best Practices',
  description: 'SSL/TLS certificate guide. Certificate types DV, OV, EV. Free SSL providers. Common issues and fixes. HTTPS best practices for websites.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SSLCertificateInfo />
    </Suspense>
  );
}