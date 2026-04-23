import GroceryBudgetCalculator from '@/components/GroceryBudgetCalculator';

export default function GroceryBudgetCalculatorPage() {
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
                "name": "What is a reasonable grocery budget per person?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The USDA estimates grocery costs at $200-400 per person per month depending on plan level (thrifty to liberal). A moderate plan averages $250-300 per person monthly. Actual costs vary by location, diet, and shopping habits."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reduce my grocery spending?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Effective strategies include meal planning (saves 15%), buying staples in bulk (saves 10-20%), using coupons and store apps (saves 5-10%), reducing shopping frequency to avoid impulse purchases, and limiting organic purchases to Dirty Dozen items only."
                }
              },
              {
                "@type": "Question",
                "name": "What percentage of income should go to groceries?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Financial experts recommend spending 10-15% of take-home income on groceries. For a $5,000 monthly income, that suggests $500-750 for groceries. Adjust based on household size, special dietary needs, and local prices."
                }
              },
              {
                "@type": "Question",
                "name": "Does meal planning really save money?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, meal planning typically saves 15% on grocery costs by reducing impulse purchases, minimizing food waste, and enabling strategic use of ingredients across multiple meals. It also helps you shop with a list and avoid multiple store trips."
                }
              },
              {
                "@type": "Question",
                "name": "How do special diets affect grocery costs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Special diets increase costs: gluten-free adds 20-30%, organic-only adds 30%, vegan/vegetarian adds 5-10%, and low-carb/keto adds 15%. Factor these multipliers into your budget planning and consider cost-effective alternatives within your dietary requirements."
                }
              }
            ]
          })
        }}
      />
      <GroceryBudgetCalculator />
    </>
  );
}