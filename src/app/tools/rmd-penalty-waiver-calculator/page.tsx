import RMDPenaltyWaiverCalculator from '@/components/RMDPenaltyWaiverCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the penalty for missing a Required Minimum Distribution (RMD)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under SECURE 2.0 Act (effective 2023), the penalty for missed RMDs is 25% of the missed amount (reduced from 50% before 2023). For example, missing a $10,000 RMD could result in a $2,500 excise tax penalty. The IRS may waive this penalty if you demonstrate reasonable cause."
      }
    },
    {
      "@type": "Question",
      "name": "What qualifies as reasonable cause for RMD penalty waiver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reasonable cause includes: serious illness of the account owner or family member, death of the account owner, disability, natural disasters, custodian or financial institution errors, military service, or other documented circumstances beyond your control that prevented timely distribution."
      }
    },
    {
      "@type": "Question",
      "name": "How do I request an RMD penalty waiver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "File IRS Form 5329 for each year with a missed RMD. Attach a detailed statement explaining the reasonable cause. Include supporting documentation (medical records, death certificate, error documentation from custodian). Take the missed distribution as soon as possible to show corrective action."
      }
    },
    {
      "@type": "Question",
      "name": "Does taking the missed distribution help with waiver approval?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, taking corrective action (withdraw the missed RMD immediately) significantly increases waiver approval chances. The IRS views prompt correction as evidence of good faith. Include proof of the corrective distribution when filing your waiver request."
      }
    },
    {
      "@type": "Question",
      "name": "When did the SECURE 2.0 Act change RMD penalties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SECURE 2.0 Act reduced the RMD excise tax penalty from 50% to 25% for missed distributions starting in 2023. If the account owner corrects the missed RMD by the end of the second year following the error, the penalty may be further reduced to 10% under automatic waiver provisions."
      }
    }
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RMDPenaltyWaiverCalculator />
    </>
  )
}