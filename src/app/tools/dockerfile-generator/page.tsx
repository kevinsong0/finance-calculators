import type { Metadata } from 'next';
import { Suspense } from 'react';
import DockerfileGenerator from '@/components/DockerfileGenerator';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a Dockerfile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Dockerfile is a text file containing instructions to build a Docker image. Each instruction creates a layer in the image. Common instructions: FROM (base image), RUN (execute commands), COPY (add files), EXPOSE (port), CMD (start command). Docker reads the Dockerfile and builds an image with docker build command."
      }
    },
    {
      "@type": "Question",
      "name": "What is multi-stage Docker build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multi-stage builds use multiple FROM statements in one Dockerfile. Each FROM starts a new build stage. You can COPY artifacts from one stage to another, discarding intermediate files. Result: smaller production images without build tools, dependencies, or source code. Example: build stage with Go compiler, final stage with only the compiled binary."
      }
    },
    {
      "@type": "Question",
      "name": "Why use Alpine Linux in Docker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Alpine Linux is a minimal Docker base image (~5MB vs ~100MB for Debian/Ubuntu). Based on musl libc and busybox. Smaller images mean faster downloads, less storage, fewer vulnerabilities to scan. Use node:18-alpine, python:3.11-slim, golang:1.21-alpine. Note: musl libc may cause issues with some npm packages compiled for glibc."
      }
    },
    {
      "@type": "Question",
      "name": "How do I optimize Dockerfile layer caching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Docker caches each layer. If a layer changes, all subsequent layers rebuild. Optimization: 1) Put frequently changing instructions (COPY source code) last. 2) Put stable instructions (FROM, RUN install dependencies) first. 3) Combine related RUN commands with &&. 4) Use .dockerignore to exclude unnecessary files. This speeds up rebuilds significantly."
      }
    },
    {
      "@type": "Question",
      "name": "What is Docker HEALTHCHECK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HEALTHCHECK instruction tells Docker how to test container health. Docker runs the command periodically (default 30s). If exit code is 0, container is healthy. If non-zero, container is unhealthy. Kubernetes and Docker Swarm use health status for automatic restarts. Example: HEALTHCHECK CMD curl -f http://localhost:3000/ || exit 1"
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Dockerfile Generator - Create Docker Images for Node.js, Python, Go, Java',
  description: 'Generate Dockerfiles for your applications. Templates for Node.js, Python, Go, React, Next.js, Rust, Java Spring. Multi-stage builds, healthchecks, Alpine images.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DockerfileGenerator />
    </Suspense>
  );
}