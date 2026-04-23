import MedicarePartDHospiceBenefitCalculator from '@/components/MedicarePartDHospiceBenefitCalculator'

export default function MedicarePartDHospiceBenefitCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <MedicarePartDHospiceBenefitCalculator />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Does hospice cover all medications?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Hospice covers palliative medications for symptom management and pain control related to the terminal prognosis. Drugs unrelated to the hospice diagnosis may need Part D coverage.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I keep Part D while in hospice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Part D continues to cover medications unrelated to your hospice diagnosis. You may want to keep Part D if you take medications for other conditions.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I suspend my Part D plan while in hospice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, if all your medications are covered by hospice, you can suspend Part D. However, you must re-enroll if discharged from hospice to avoid late enrollment penalties.',
                },
              },
              {
                '@type': 'Question',
                name: 'What drugs are NOT covered by hospice?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Curative treatments and medications for unrelated conditions are not covered by hospice. Hospice focuses on comfort care, not curing the terminal illness.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}