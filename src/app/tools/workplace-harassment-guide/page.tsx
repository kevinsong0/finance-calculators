import type { Metadata } from 'next';
import { Suspense } from 'react';
import WorkplaceHarassmentGuide from '@/components/WorkplaceHarassmentGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What constitutes workplace harassment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Workplace harassment definition: Verbal harassment: Offensive comments, inappropriate jokes, slurs, insults, threatening language, unwanted propositions, derogatory remarks, hostile comments. Physical harassment: Unwanted touching, blocking movement, physical intimidation, assault, inappropriate contact, physical threats, aggressive behavior, invasion of space. Visual harassment: Offensive images, inappropriate gestures, derogatory materials, sexual displays, offensive screens, inappropriate emails, disturbing visuals, hostile environment. Psychological harassment: Intimidation, threats, bullying, humiliation, exclusion, isolation, psychological pressure, emotional abuse, undermining, sabotage. Sexual harassment: Unwelcome sexual advances, quid pro quo demands, sexual comments, inappropriate touching, sexual materials, sexual coercion, hostile sexual environment. Harassment = unwelcome conduct. Verbal offensive. Physical unwanted. Visual disturbing. Psychological harmful. Sexual prohibited. Creates hostile environment. Interferes with work. Protected categories. Severe or pervasive."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prevent workplace harassment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Harassment prevention: Policy: Clear harassment policy, prohibited behavior defined, reporting procedures explained, consequences stated, zero tolerance declared, policy distributed to all. Training: Regular harassment training, all employees included, manager specific training, bystander intervention, recognition skills, reporting procedures, consequences explained. Reporting: Multiple reporting channels, accessible to all, anonymous option available, clear process explained, prompt response commitment, complainant support. Culture: Respectful workplace culture, inappropriate behavior challenged, bystander intervention encouraged, open communication, supportive environment, values modeling. Response: Prompt investigation, thorough process, appropriate action, consistent enforcement, complainant protection, retaliation prevention. Prevention = comprehensive approach. Clear policy. Regular training. Reporting channels. Culture building. Prompt response. Consistent enforcement. Zero tolerance."
      }
    },
    {
      "@type": "Question",
      "name": "How do I respond to harassment complaints?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Harassment complaint response: Receipt: Take all complaints seriously, listen without judgment, document complaint, acknowledge receipt, thank complainant, explain next steps. Investigation: Investigate promptly and thoroughly, interview complainant, interview alleged harasser, interview witnesses, gather evidence, review documents, maintain confidentiality. Process: Objective investigation, fair process, trained investigator, appropriate scope, timely completion, thorough documentation, legal compliance. Determination: Review evidence objectively, apply policy standards, make determination, document reasoning, ensure consistency, consider severity. Action: Apply appropriate discipline, match severity, follow progressive discipline where appropriate, document action, communicate outcome, protect complainant. Follow-up: Monitor situation, check on complainant, prevent retaliation, address culture issues, reinforce prevention, adjust training. Response = thorough process. Take seriously. Investigate promptly. Fair process. Objective determination. Appropriate action. Follow-up monitoring. Retaliation prevention."
      }
    },
    {
      "@type": "Question",
      "name": "What legal requirements apply to harassment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Harassment legal requirements: Title VII: Federal prohibition, protected categories covered, hostile work environment defined, quid pro quo prohibited, employer liability, prevention required. State laws: Additional protections, broader categories, specific requirements, reporting obligations, training mandates, timeline requirements. Employer duties: Prevention policy required, training often mandated, reporting channels required, prompt investigation duty, appropriate action required, retaliation prohibited. Documentation: Complaint records required, investigation documentation, action documentation, outcome records, retention requirements, access control. Training: Regular training often required, content specifications, documentation required, frequency requirements, manager training, new hire training. Investigation: Prompt investigation required, thorough process, appropriate scope, fair treatment, confidentiality, proper completion. Legal = compliance required. Title VII foundation. State law additions. Employer duties. Documentation standards. Training requirements. Investigation protocols. Retaliation prohibited."
      }
    },
    {
      "@type": "Question",
      "name": "How do I prevent harassment retaliation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Retaliation prevention: Definition: Retaliation prohibited, adverse action after complaint, punishment for reporting, negative consequences, treatment change, exclusion, demotion, termination. Prevention: Clear policy on retaliation, training on prohibition, manager awareness, complainant communication, consistent treatment, no adverse changes. Protection: Inform complainant of protection, check on complainant regularly, monitor treatment, watch for retaliation signs, intervene immediately, address any issues. Documentation: Document protection efforts, record check-ins, note any concerns, address issues promptly, maintain records, show compliance. Training: Manager training essential, retaliation recognition, prohibited behavior, consequences explained, case examples, ongoing reminders. Enforcement: Retaliation treated seriously, investigation of claims, appropriate discipline, documentation maintained, consistent standards, culture reinforcement. Retaliation = prohibited activity. Clear policy. Regular training. Complainant protection. Monitoring ongoing. Immediate intervention. Serious consequences. Culture support."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Workplace Harassment Guide - Types, Prevention & Response',
  description: 'Harassment types, prevention measures, response steps, and legal compliance.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WorkplaceHarassmentGuide />
    </Suspense>
  );
}