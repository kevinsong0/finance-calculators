import type { Metadata } from 'next';
import { Suspense } from 'react';
import SoftwareLicenseComparison from '@/components/SoftwareLicenseComparison';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between MIT and GPL license?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MIT: permissive license, minimal restrictions. Can modify, distribute, commercialize freely. Derivatives can be closed/proprietary. GPL: copyleft license, derivatives must remain GPL. Modifications must be shared. Can commercialize but must keep open. MIT = maximum freedom for users. GPL = ensures code stays open forever."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use GPL code in commercial software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GPL can be used commercially BUT: entire derivative work must be GPL and open source. Cannot mix GPL with proprietary code. If you distribute GPL code, must provide source. SaaS using GPL internally doesn&apos;t require source distribution. For closed commercial: use MIT, Apache, BSD instead. GPL forces openness."
      }
    },
    {
      "@type": "Question",
      "name": "Which license should I use for my open source project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose license by goals: MIT/ISC - maximum adoption, no restrictions. Apache 2.0 - enterprise-friendly, patent protection. GPL v3 - ensure derivatives stay open. LGPL - library usable by proprietary. BSD 3-Clause - like MIT, no endorsement. Consider: target users, enterprise needs, patent concerns, contribution expectations, community values."
      }
    },
    {
      "@type": "Question",
      "name": "What is LGPL license used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LGPL (Lesser GPL): designed for libraries. Allows linking without derivative becoming GPL. Proprietary software can use LGPL library. Modifications to library itself must be LGPL. Good for: shared libraries that want commercial adoption. Compromise between GPL&apos;s copyleft and permissive licenses. Used by GNU libraries, Qt."
      }
    },
    {
      "@type": "Question",
      "name": "Does Apache 2.0 license provide patent protection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Apache 2.0 includes patent grant: contributors grant patent license to users. Patent retaliation clause: if you sue for patents, license terminates. Better patent protection than MIT/BSD. Important for: corporate projects, enterprise use, companies with patent portfolios. Microsoft, Google, large companies prefer Apache for patent safety."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Software License Comparison - MIT, GPL, Apache, BSD Guide',
  description: 'Compare open source software licenses. MIT, Apache 2.0, GPL v3, BSD, LGPL. Understand permissions, conditions, limitations. Choose license for your project.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SoftwareLicenseComparison />
    </Suspense>
  );
}