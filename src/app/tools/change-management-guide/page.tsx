import type { Metadata } from 'next';
import { Suspense } from 'react';
import ChangeManagementGuide from '@/components/ChangeManagementGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is change management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Change management definition: Purpose: Guide organizational transitions, help people adapt, minimize disruption, achieve change goals, sustain improvements. Process: Prepare - assess need, plan approach, Communicate - explain reasons and benefits, Implement - execute changes, Support - help people adapt, Monitor - track progress and feedback, Sustain - embed changes permanently. Key elements: Clear vision and rationale, leadership support, employee involvement, communication throughout, training and support, address resistance, monitor progress, celebrate milestones. Change = people-focused process. Not just technical implementation. Support people through transition. Communication essential. Sustain after implementation."
      }
    },
    {
      "@type": "Question",
      "name": "How do I address resistance to change?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Addressing change resistance: Understand causes: Fear of unknown - uncertainty about future, Loss of control - decisions imposed externally, Habit disruption - comfortable patterns broken, Workload increase - more effort required, Trust issues - skepticism about leadership, Success skepticism - doubt about outcomes. Response strategies: Clear communication - explain reasons and benefits, Involvement - include in decisions and planning, Support - training, resources, time to adapt, Transparency - honest about challenges, Evidence - show examples and success, Gradual approach - paced change not sudden. Prevention: Early engagement, address concerns upfront, build trust before change, pilot programs, feedback channels. Resistance = normal human response. Understand underlying causes. Address proactively. Involve people. Support throughout. Don&apos;t ignore or force."
      }
    },
    {
      "@type": "Question",
      "name": "What roles are needed in change management?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Change management roles: Change Leader: Senior leader driving change, visible support and commitment, allocate resources, remove obstacles, champion the vision, accountability. Change Manager: Plan and coordinate, develop communication, manage timeline, coordinate activities, track progress, adjust as needed. Change Champions: Peer supporters, model new behaviors, help colleagues adapt, provide feedback, bridge between management and staff. Employees: Participate in process, provide input and feedback, learn and adapt, adopt new behaviors, support peers. Roles = clear responsibilities. Leader provides authority. Manager coordinates execution. Champions support peers. Employees participate. All contribute to success."
      }
    },
    {
      "@type": "Question",
      "name": "How do I communicate change effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Change communication: Timing: Early communication - before decisions final, Ongoing updates - throughout process, Post-change reinforcement - sustaining messaging. Content: Why change needed, What will change, How affects individuals, Benefits of change, Support available, Timeline and milestones. Methods: Multiple channels - meetings, email, intranet, presentations, Managers talking to teams, Written materials for reference, Q&A sessions for concerns. Frequency: Regular updates, not one-time, milestone communications, respond to questions promptly. Tone: Honest about challenges, confident about direction, empathetic about impact, hopeful about future. Communication = essential success factor. Start early. Be honest. Use multiple channels. Update regularly. Address concerns. Reinforce messages."
      }
    },
    {
      "@type": "Question",
      "name": "How do I sustain changes long-term?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sustaining changes: Embedding: Integrate into processes, update policies and procedures, make new practices standard, remove old alternatives. Reinforcement: Celebrate milestones, recognize early adopters, share success stories, measure and report progress. Support: Ongoing training, accessible resources, help available, address ongoing concerns. Monitoring: Track adoption metrics, measure outcomes, identify gaps, adjust approach. Leadership: Continue visible support, model behaviors, maintain priority, address backsliding. Culture: Align values with changes, tell success stories, hire for adaptability, reward new behaviors. Sustainability = make permanent. Not just implement, embed. Reinforce through metrics. Support ongoing. Leadership continues. Culture alignment. Watch for backsliding."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Change Management Guide - Stages, Resistance & Roles',
  description: 'Change process stages, resistance handling, principles, and roles.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ChangeManagementGuide />
    </Suspense>
  );
}