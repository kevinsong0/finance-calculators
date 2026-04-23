import type { Metadata } from 'next';
import { Suspense } from 'react';
import CloudComputingGuide from '@/components/CloudComputingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the cloud service models?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cloud service models: IaaS (Infrastructure as a Service) - virtual machines, storage, networks. You manage OS, apps. Examples: AWS EC2, Azure VMs. PaaS (Platform as a Service) - platform for apps, no OS management. Examples: Heroku, Google App Engine. SaaS (Software as a Service) - complete software delivered. Examples: Gmail, Salesforce. FaaS (Function as a Service) - serverless, run functions on events. Examples: AWS Lambda. More abstraction = less management, less control. Choose based on team skills, requirements, budget."
      }
    },
    {
      "@type": "Question",
      "name": "Which cloud provider should I choose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cloud provider selection: AWS - most services (200+), mature, enterprise focus, complex pricing, best for large orgs, widest skill market. Azure - Microsoft integration, enterprise-friendly, good for Windows/Office365 users. Google Cloud - data/AI strength, Kubernetes expertise, competitive pricing, good for analytics/ML. DigitalOcean - simple, developer-friendly, affordable, good for small projects. Factors: existing stack (Azure if Microsoft), budget, team skills, specific services needed, compliance requirements, support needs. Multi-cloud possible but adds complexity."
      }
    },
    {
      "@type": "Question",
      "name": "What is serverless computing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Serverless (FaaS): run code without managing servers. Characteristics: Pay per execution (no idle cost). Auto-scaling (handles any load). Event-driven (triggered by HTTP, scheduled, events). Stateless (no server state maintained). Cold starts (initial latency for new functions). Limited execution time (e.g., 15 min Lambda). Good for: APIs, data processing, scheduled jobs, microservices. Not ideal for: long-running processes, stateful apps, predictable steady load (VMs cheaper). Major platforms: AWS Lambda, Azure Functions, Google Cloud Functions. Serverless = less ops, more focus on code."
      }
    },
    {
      "@type": "Question",
      "name": "How do I estimate cloud costs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cloud cost estimation: Components: Compute (VMs, containers, serverless), Storage (object, block, databases), Network (bandwidth, CDN), Services (managed databases, queues, AI). Tools: AWS Pricing Calculator, Azure Pricing Calculator, GCP Pricing Calculator. Variables: region (prices vary), instance type (specs affect price), reserved vs on-demand (commit = discount), storage amount, bandwidth out. Tips: Start small, monitor usage, optimize (right-size instances, spot/preemptible, reserved capacity, auto-scaling limits). Hidden costs: data transfer, premium support, add-on services. Cost optimization = ongoing effort."
      }
    },
    {
      "@type": "Question",
      "name": "What are cloud security best practices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cloud security: Identity management (IAM) - least privilege, roles not individual users, MFA required. Network security - VPCs, firewalls, private subnets, security groups. Encryption - data at rest (storage), in transit (HTTPS), manage keys (KMS). Monitoring - CloudTrail (AWS), log all access, detect anomalies. Backup - regular backups, test recovery. Compliance - check certifications (SOC2, HIPAA, PCI). Shared responsibility - provider secures infrastructure, you secure apps/data. Common mistakes: over-permissive IAM, public S3 buckets, no encryption, missing logs. Security = ongoing vigilance."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Cloud Computing Guide - Service Models, Providers & Concepts',
  description: 'Cloud service models, major providers, key concepts, and best practices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CloudComputingGuide />
    </Suspense>
  );
}