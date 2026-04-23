import type { Metadata } from 'next';
import { Suspense } from 'react';
import DockerCheatSheet from '@/components/DockerCheatSheet';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I run a Docker container?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Run container: docker run image-name. Run in background: docker run -d image. Run with port mapping: docker run -p 8080:80 image (host:container). Run with volume: docker run -v /host:/container image. Run interactive: docker run -it image bash. Name container: docker run --name myapp image. Combine flags: docker run -d -p 80:80 --name web nginx."
      }
    },
    {
      "@type": "Question",
      "name": "How do I build a Docker image?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Build image: docker build -t image-name . (from Dockerfile in current directory). Build with tag: docker build -t user/image:v1.0 . Build from path: docker build -t name /path/to/dir. Build with Dockerfile name: docker build -t name -f Dockerfile.dev . Multi-stage builds use multiple FROM statements. Push to registry: docker push user/image."
      }
    },
    {
      "@type": "Question",
      "name": "How do I use Docker Compose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start services: docker-compose up. Start in background: docker-compose up -d. Stop services: docker-compose down. Rebuild: docker-compose build. View logs: docker-compose logs. List services: docker-compose ps. Run command: docker-compose exec service cmd. Use docker-compose.yml file for multi-container apps. Define services, networks, volumes."
      }
    },
    {
      "@type": "Question",
      "name": "How do I debug a Docker container?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open shell: docker exec -it container-name bash (or sh if no bash). View logs: docker logs container. Follow logs: docker logs -f container. Inspect container: docker inspect container. Show processes: docker top container. Copy file: docker cp file container:/path. Check stats: docker stats container. Network debugging: docker network inspect network."
      }
    },
    {
      "@type": "Question",
      "name": "How do I clean up Docker resources?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clean all unused: docker system prune (images, containers, networks, volumes). Clean images: docker image prune. Clean containers: docker container prune. Clean volumes: docker volume prune. Remove specific image: docker rmi image. Remove container: docker rm container. Force clean: docker system prune -a --volumes (removes everything unused)."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Docker Cheat Sheet - Complete Docker Command Reference',
  description: 'Complete Docker command reference. Images, containers, compose, networks, volumes. Essential commands for containerized development and deployment workflows.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DockerCheatSheet />
    </Suspense>
  );
}