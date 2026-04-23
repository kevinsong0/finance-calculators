import CollegeBudgetCalculator from '@/components/CollegeBudgetCalculator';

export default function CollegeBudgetCalculatorPage() {
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
                "name": "How much should a college student budget per month?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "College students typically spend $800-1,200 per month excluding tuition. This covers housing (40-50%), food (15-20%), transportation, entertainment, and personal expenses. Budget varies by location and housing type (dorm vs apartment vs living at home)."
                }
              },
              {
                "@type": "Question",
                "name": "What are typical college housing costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dorm costs average $500-800/month including utilities. Off-campus apartments range $600-1,000/month plus utilities. Living at home saves $500-800/month. Consider location, meal plan requirements, lease terms, and commute costs when choosing housing."
                }
              },
              {
                "@type": "Question",
                "name": "How much do college books and supplies cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Books and supplies cost $300-600 per semester. Save 50% by buying used books, renting, or using library copies. Digital textbooks often cheaper. Many professors use free online resources. Budget $50-100/month for ongoing supplies."
                }
              },
              {
                "@type": "Question",
                "name": "Should college students work part-time?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Part-time work ($300-600/month) significantly offsets college costs. On-campus jobs offer flexible hours and convenient location. Consider work-study programs, tutoring, or freelancing. Balance work hours with study time - 10-20 hours/week recommended."
                }
              },
              {
                "@type": "Question",
                "name": "How does financial aid affect budgeting?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Financial aid reduces net annual cost. Scholarships and grants don't require repayment. Work-study provides income. Loans add future debt burden. Calculate net cost after aid to plan realistic budget. Apply for FAFSA annually for continued eligibility."
                }
              }
            ]
          })
        }}
      />
      <CollegeBudgetCalculator />
    </>
  );
}