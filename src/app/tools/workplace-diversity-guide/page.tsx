import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceDiversityGuide from '@/components/WorkplaceDiversityGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are dimensions of workplace diversity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diversity dimensions: Race and ethnicity: Racial and ethnic backgrounds, cultural perspectives, diverse experiences, representation goals, hiring practices, inclusion efforts. Gender: Male, female, non-binary representation, gender equity, equal opportunity, pay equity, leadership representation, inclusive policies. Age: Generational diversity, experience range, multi-generational teams, age bias prevention, knowledge transfer, mentoring relationships. Disability: Physical disabilities, mental disabilities, accessibility needs, accommodation support, inclusive design, support services. Sexual orientation: LGBTQ inclusion, safe environment, equal treatment, supportive policies, identity expression, community support. Religion: Religious diversity, accommodation of practices, respectful environment, belief inclusion, schedule flexibility, dietary needs. Dimensions = multiple aspects. Race and ethnicity core. Gender essential. Age important. Disability required. Orientation protected. Religion accommodated. Comprehensive approach needed."
      }
    },
    {
      "@type": "Question",
      "name": "What are benefits of workplace diversity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diversity benefits: Innovation: Diverse perspectives bring different viewpoints, varied experiences contribute ideas, multiple approaches to problems, creative solutions, better innovation outcomes, broader thinking. Engagement: Inclusive culture increases engagement, belonging improves morale, representation matters, psychological safety, diverse leadership inspires, higher participation. Talent: Broader talent pool available, better candidate quality, competitive advantage, diverse skills, varied experiences, wider networks. Market insight: Diverse customer understanding, better product development, market expansion, cultural competence, global perspective, customer connection. Decision-making: Better group decisions, reduced blind spots, varied input, balanced perspectives, risk awareness, comprehensive analysis. Benefits = organizational advantage. Innovation boost. Engagement increase. Talent access. Market insight. Better decisions. Competitive edge."
      }
    },
    {
      "@type": "Question",
      "name": "How do I build workplace diversity?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diversity building strategies: Assessment: Understand current state, demographic analysis, representation gaps, inclusion barriers, policy review, culture assessment. Goals: Set diversity targets, measurable objectives, timeline for goals, specific dimensions, realistic targets, accountability assigned. Hiring: Diverse candidate sourcing, inclusive job descriptions, bias-free screening, diverse interview panels, equitable offers, onboarding support. Culture: Inclusive environment, psychological safety, respectful interactions, bias awareness, inclusive policies, supportive culture. Development: Mentorship programs, leadership development, career paths, promotion equity, skill building, opportunity access. Measurement: Track demographics, monitor hiring, analyze promotions, survey inclusion, assess retention, report progress. Building = systematic effort. Assess current. Set goals. Diverse hiring. Inclusive culture. Development support. Measure progress. Accountability required."
      }
    },
    {
      "@type": "Question",
      "name": "How do I measure diversity effectiveness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diversity metrics: Representation: Demographic composition, leadership diversity, department representation, hiring rates by group, promotion rates, retention rates. Inclusion: Engagement by group, belonging scores, inclusion survey, psychological safety, participation rates, voice representation. Equity: Pay equity analysis, promotion equity, opportunity distribution, resource allocation, development access, career progression. Process: Hiring funnel diversity, interview selection rates, offer acceptance rates, onboarding success, promotion decisions, compensation decisions. Outcomes: Innovation metrics, team performance, decision quality, customer satisfaction, market expansion, business results. Measurement = comprehensive tracking. Representation metrics. Inclusion surveys. Equity analysis. Process tracking. Outcome monitoring. Regular reporting. Goal progress."
      }
    },
    {
      "@type": "Question",
      "name": "What challenges affect diversity efforts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Diversity challenges: Bias: Unconscious bias in decisions, hiring bias, promotion bias, assignment bias, stereotyping, assumptions. Resistance: Resistance to change, status quo preference, discomfort with difference, cultural challenges, fear of disadvantage, pushback. Recruitment: Limited diverse pipeline, sourcing challenges, industry demographics, geographic constraints, competition for talent, network limitations. Retention: Higher turnover in some groups, inclusion gaps, belonging challenges, microaggressions, career path barriers, support gaps. Culture: Inclusive culture building, behavioral change, policy implementation, leadership modeling, systemic barriers, historical issues. Challenges = address proactively. Bias training needed. Resistance management. Recruitment strategies. Retention focus. Culture work. Systemic approach. Leadership commitment."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Diversity Guide - Dimensions, Benefits & Initiatives',
  description: 'Diversity dimensions, benefits, building strategies, initiatives, and measurement.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceDiversityGuide />
    </Suspense>
  );
}