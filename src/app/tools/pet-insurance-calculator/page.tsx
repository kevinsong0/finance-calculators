import PetInsuranceCalculator from '@/components/PetInsuranceCalculator';

export default function PetInsuranceCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is pet insurance worth it?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pet insurance can be worth it for young pets, high-risk breeds, or if you'd struggle with unexpected $500-2,000 vet bills. Monthly premiums average $25-90. Insurance provides financial protection against major expenses. Self-insurance (saving $50/month) works for healthy pets with low breed risk. Compare premium costs vs expected vet visits."
                }
              },
              {
                "@type": "Question",
                "name": "How much does pet insurance cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pet insurance costs $25-90/month depending on pet type, age, size, and breed. Dogs average $40-65/month, cats $25-40/month. Young pets pay lowest rates. Senior pets (8+ years) pay 50-100% more. Large dogs cost more than small. High-risk breeds (bulldogs, German shepherds) pay 20-50% premium. Coverage level affects cost: basic $20-35, premium $60-90."
                }
              },
              {
                "@type": "Question",
                "name": "What does pet insurance cover?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most pet insurance covers accidents, illnesses, and emergency care. Typical policies exclude pre-existing conditions, routine wellness care, and preventive care. Premium plans may include wellness visits, vaccinations, dental. Deductibles range $0-500 per incident or annually. Reimbursement rates typically 70-90%. Annual limits range $5,000 to unlimited."
                }
              },
              {
                "@type": "Question",
                "name": "What pet breeds have higher insurance costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "High-risk breeds pay 20-50% more due to breed-specific health issues. Dogs: Bulldogs, German shepherds, Golden retrievers, Rottweilers, Great Danes. Cats: Persian, Siamese have moderate increases. Standard risk breeds include mixed breeds, Labs, Beagles. Some insurers exclude certain breeds entirely. Purebred pets generally cost more than mixed breeds."
                }
              },
              {
                "@type": "Question",
                "name": "When should I get pet insurance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Get pet insurance early (as puppy/kitten) for lowest rates and before any health issues become pre-existing conditions. Pre-existing conditions are permanently excluded. Waiting periods typically 14-30 days for illness, 2-5 days for accidents. Enroll before age 5-6 for best rates. Senior pets face higher premiums and more exclusions. Compare quotes from multiple insurers."
                }
              }
            ]
          })
        }}
      />
      <PetInsuranceCalculator />
    </>
  );
}