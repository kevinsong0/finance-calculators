import HomeImprovementBudgetCalculator from '@/components/HomeImprovementBudgetCalculator';

export default function HomeImprovementBudgetCalculatorPage() {
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
                "name": "How much does a kitchen remodel cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kitchen remodel costs range $8,000-50,000. Minor updates (cabinet refacing, new countertops): $8,000-15,000. Mid-range remodel (new cabinets, appliances, flooring): $15,000-30,000. Major renovation (layout changes, high-end materials): $30,000-50,000+. Labor typically 40-60% of cost. ROI averages 60% on resale. Get 3 contractor quotes before starting."
                }
              },
              {
                "@type": "Question",
                "name": "What home improvements have the best ROI?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Best ROI home improvements: Landscaping 100% (boosts curb appeal), Window replacement 70%, Basement finishing 70%, Minor kitchen remodel 60-80%, Siding replacement 65%, Deck addition 65%. Worst ROI: Major kitchen remodel 40-60%, Bathroom addition 40-50%, Home office (depends on market). Focus on maintenance projects and curb appeal for best returns."
                }
              },
              {
                "@type": "Question",
                "name": "How much should I budget for home improvement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Budget 1-4% of home value annually for maintenance and improvements. For major projects, avoid spending more than 10-15% of home value on a single renovation. Add 10-20% contingency for unexpected costs (older homes need more). Get financing pre-approved if not paying cash. Compare HELOC (tax-deductible interest) vs personal loan vs cash options."
                }
              },
              {
                "@type": "Question",
                "name": "How much does DIY save on home improvement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "DIY saves 20-80% on labor costs depending on skill level. Simple projects (painting, flooring installation) save 40-60% if you have skills. Major work (electrical, plumbing) should use professionals for safety and code compliance. DIY finishing work (trim, painting, landscaping) offers best savings. Consider your time value - DIY may take much longer than professionals."
                }
              },
              {
                "@type": "Question",
                "name": "How should I finance home improvements?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Best financing depends on project size and timeline. Cash/savings: no interest, best for small projects. HELOC: tax-deductible interest, best for large projects, rates around 8-9%. Home equity loan: fixed rate, predictable payments. Personal loan: 7-12% rate, no home collateral. Credit cards: avoid for large projects (18%+ rates). Match financing to project timeline and budget."
                }
              }
            ]
          })
        }}
      />
      <HomeImprovementBudgetCalculator />
    </>
  );
}