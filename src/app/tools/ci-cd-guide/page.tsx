import type { Metadata } from 'next';
import { Suspense } from 'react';
import CiCdGuide from '@/components/CiCdGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CI/CD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CI/CD: Continuous Integration + Continuous Delivery/Deployment. CI (Continuous Integration): Frequent code commits, automated build, automated tests, fast feedback on every change. CD (Continuous Delivery): Automated deployment to staging, ready for production anytime, manual approval for prod. CD (Continuous Deployment): Fully automated, deploy to production automatically after tests pass. Benefits: Faster releases, fewer bugs, faster feedback, consistent process, reduced manual errors. CI = integrate often, test automatically. CD = deliver continuously. Together = reliable, fast software delivery."
      }
    },
    {
      "@type": "Question",
      "name": "What are deployment strategies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deployment strategies: Blue-Green - two identical environments, switch traffic instantly, zero downtime, easy rollback, needs 2x resources. Canary - deploy to subset first, monitor, gradual rollout, limit blast radius, test with real users. Rolling - incremental replacement, update instances gradually, resource efficient, needs rollback plan. Feature Flags - deploy code but disable feature, separate deployment from release, test in prod safely, gradual enablement. Choose: Blue-green for critical, canary for validation, rolling for efficiency, flags for flexibility. Modern = combine strategies."
      }
    },
    {
      "@type": "Question",
      "name": "How do I design a CI/CD pipeline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CI/CD pipeline design: 1. Trigger - push to branch, PR, schedule. 2. Build - compile, bundle, create artifact. 3. Test - unit, integration, coverage. 4. Analyze - lint, security scan, quality gates. 5. Artifact - versioned, immutable, stored. 6. Deploy staging - automated, test environment. 7. Test staging - smoke, regression. 8. Deploy prod - chosen strategy. 9. Monitor - health, metrics, alerts. Principles: Fast feedback (complete in minutes), quality gates (fail fast), single artifact (build once), immutable (no changes after), automated (minimal manual). Pipeline = reliable delivery machine."
      }
    },
    {
      "@type": "Question",
      "name": "What is GitOps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GitOps: Git as single source of truth for infrastructure and deployments. Principles: Git = declarative state, changes via Git commits, automated sync to cluster, audit trail via Git history, PR workflow for changes. Tools: ArgoCD, Flux, Jenkins X. Benefits: Version control for infrastructure, PR review for changes, rollback via revert, audit trail, declarative config. How it works: Git repo defines desired state, operator watches repo, syncs cluster to match. GitOps = Git-driven operations. Declarative + automated + audited. Popular for Kubernetes deployments."
      }
    },
    {
      "@type": "Question",
      "name": "How do I rollback a deployment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rollback strategies: Blue-green: switch traffic back to old environment, instant, zero impact. Canary: stop rollout, revert canary pods to previous, traffic back to stable. Rolling: deploy previous version incrementally, same strategy as forward. Git revert: revert commit, pipeline redeploys previous, GitOps native rollback. ArgoCD: rollback to previous revision, click rollback button. General steps: 1. Detect issue (monitoring). 2. Decide rollback. 3. Trigger rollback (automated or manual). 4. Verify rollback success. 5. Investigate root cause. Automate rollback detection. Have rollback procedure documented. Test rollback regularly."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'CI/CD Pipeline Guide - Stages, Strategies & Best Practices',
  description: 'Pipeline stages, deployment strategies, GitOps, and rollback procedures.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CiCdGuide />
    </Suspense>
  );
}