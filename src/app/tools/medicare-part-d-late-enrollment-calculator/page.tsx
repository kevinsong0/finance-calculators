import MedicarePartDLateEnrollmentCalculator from '@/components/MedicarePartDLateEnrollmentCalculator'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Medicare Part D late enrollment penalty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Part D late enrollment penalty is 1% of the national base beneficiary premium ($34.70 in 2024) for each month you went without creditable drug coverage after your Initial Enrollment Period ended. The penalty is permanent - you pay it for as long as you have Part D coverage."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Initial Enrollment Period for Medicare Part D?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your Initial Enrollment Period is 7 months: 3 months before you turn 65, the month you turn 65, and 3 months after. If you don't enroll during this window and don't have creditable coverage, you'll face a permanent penalty when you eventually enroll."
      }
    },
    {
      "@type": "Question",
      "name": "What is creditable coverage and how does it avoid the penalty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Creditable coverage is drug coverage from an employer, union, or other source that's at least as good as standard Part D coverage. If you have creditable coverage when your Initial Enrollment Period ends, you can enroll later without penalty through a Special Enrollment Period (63 days after coverage ends)."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the Part D late enrollment penalty last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The penalty is permanent - it lasts as long as you have Part D coverage. For someone who pays the penalty for 20+ years on Medicare, a small monthly penalty can add up to thousands of dollars over their lifetime. There's no way to remove the penalty once it's assessed."
      }
    },
    {
      "@type": "Question",
      "name": "How do I calculate my Part D penalty?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiply the number of months without creditable coverage by 1%, then multiply that percentage by the national base premium ($34.70 in 2024). Example: 36 months late = 36% penalty = $12.49 added to your monthly premium. This amount may increase slightly each year as the base premium rises."
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
      <MedicarePartDLateEnrollmentCalculator />
    </>
  )
}