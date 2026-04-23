import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoadBalancingGuide from '@/components/LoadBalancingGuide';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is load balancing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Load balancing: Distributing network traffic across multiple servers. Purpose: Prevent overload on single server, ensure high availability, improve performance, enable scalability. Components: Load balancer (distributes requests), backend servers (process requests), health checks (monitor server status). How it works: Client request → load balancer → algorithm selects server → request routed → response returned. Benefits: No single point of failure, horizontal scaling, better resource utilization, SSL termination, caching. Types: DNS, hardware, software (Nginx, HAProxy), cloud (AWS ALB, GCP). Load balancing = foundation of scalable systems. Essential for production applications."
      }
    },
    {
      "@type": "Question",
      "name": "Which load balancing algorithm should I use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Algorithm selection: Round Robin - simplest, equal distribution, works when servers equal capacity. Least Connections - route to least busy server, best for long-lived connections, prevents overload. Weighted Round Robin - distribute based on server capacity, use when servers have different specs. IP Hash - route based on client IP, maintains session persistence, use when sessions matter. Least Response Time - route to fastest responding server, optimizes performance. Choose: Round Robin for simple equal servers, Least Connections for varying request duration, Weighted for different server capacities, IP Hash for session persistence. Consider: Session needs, server capabilities, request characteristics. Algorithm choice impacts performance. Test different options."
      }
    },
    {
      "@type": "Question",
      "name": "What is session persistence in load balancing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Session persistence (sticky sessions): Route same client to same server consistently. Why needed: User sessions stored on specific server, shopping cart data, login state, in-memory session data. Implementation: IP Hash (route by IP), Cookie-based (insert cookie for server ID), Session ID (route by session identifier). Trade-offs: Persistence = session works but limits load distribution, server failure = lost session, uneven load possible. Alternatives: Shared session store (Redis, database), token-based auth (no server session), stateless architecture. Best practice: Avoid sticky sessions if possible (stateless design), use when transitioning legacy apps, implement external session storage. Persistence = compatibility vs scalability trade-off. Stateless = better for scaling."
      }
    },
    {
      "@type": "Question",
      "name": "How do load balancer health checks work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Health checks: Monitor server availability, route traffic only to healthy servers. Types: HTTP check - request endpoint, check response code (200 OK), TCP check - verify TCP connection established, Custom check - application-specific validation. Configuration: Check interval (how often to check), timeout (max wait time), unhealthy threshold (failures before marking down), healthy threshold (successes before marking up). Behavior: Unhealthy server = traffic rerouted to healthy, healthy server = traffic resumes, all unhealthy = fallback page or fail. Best practices: Check application health (not just server), include dependencies in check (DB connection), set reasonable thresholds (avoid flapping), monitor health check logs. Health checks = automatic failover. Configure carefully to detect real issues without false positives."
      }
    },
    {
      "@type": "Question",
      "name": "What is SSL termination at load balancer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SSL termination: Load balancer decrypts SSL/TLS, passes unencrypted to backend servers. Location options: At load balancer - decrypt there, plain HTTP to servers. At servers - pass through encrypted, each server decrypts. Benefits of termination at LB: Centralized certificate management, reduced server CPU (no decryption), easier certificate updates, consistent security policy. Downsides: Unencrypted traffic inside network (data center), requires secure internal network. When to use: Internal network trusted = terminate at LB, security requirements higher = pass through to servers. Implementation: LB handles SSL, backend on private network, or LB + backend SSL (double encryption). SSL termination = trade-off between security and efficiency. Choose based on network security posture."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Load Balancing Guide - Algorithms, Types & Implementation',
  description: 'Load balancing algorithms, types, health checks, and session persistence.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LoadBalancingGuide />
    </Suspense>
  );
}