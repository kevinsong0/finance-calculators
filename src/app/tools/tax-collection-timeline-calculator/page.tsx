'use client';

import TaxCollectionTimelineCalculator from '@/components/TaxCollectionTimelineCalculator';

export default function TaxCollectionTimelineCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How long does IRS take to start collection actions?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'After assessment (typically 6 months from filing), IRS sends billing notices over 90 days: CP14 (first bill), CP501 (second notice), CP504/LT11 (final notice before levy). Levy action can begin 30 days after final notice.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is the IRS Collection Statute Expiration Date (CSED)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The CSED is 10 years from assessment date. After this period, IRS cannot legally collect the debt unless extended by certain actions (bankruptcy, Offer in Compromise pending, leaving US). Some actions toll or suspend the statute.'
                }
              },
              {
                '@type': 'Question',
                name: 'When does IRS file a tax lien?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IRS may file a Notice of Federal Tax Lien when tax debt exceeds certain thresholds. The lien protects IRS interest in your property and is public record. Liens are typically filed before levy actions begin.'
                }
              },
              {
                '@type': 'Question',
                name: 'What notice comes before IRS levy action?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'IRS must send Final Notice of Intent to Levy (CP504 or LT11) at least 30 days before levy. This notice gives you the right to request a Collection Due Process (CDP) hearing. Requesting a hearing stops levy temporarily.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can IRS levy my bank account without notice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No, IRS must send Final Notice of Intent to Levy at least 30 days before levy action. However, once the 30-day period expires without CDP hearing request, IRS can levy bank accounts, wages, and other assets without further notice.'
                }
              }
            ]
          })
        }}
      />
      <TaxCollectionTimelineCalculator />
    </>
  );
}