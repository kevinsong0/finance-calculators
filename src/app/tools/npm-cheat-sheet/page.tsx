import type { Metadata } from 'next';
import { Suspense } from 'react';
import NPMCheatSheet from '@/components/NPMCheatSheet';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I install NPM packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Install all dependencies: npm install. Install specific package: npm install package-name. Install specific version: npm install package@1.2.3. Install globally: npm install -g package. Install as dev dependency: npm install --save-dev package (or -D). Clean install from lock file: npm ci (faster, reproducible)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between npm install and npm ci?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "npm install: reads package.json, may update lock file, installs missing packages, slower. npm ci: reads lock file only, exact versions, deletes node_modules first, faster, reproducible builds. Use npm install for development, npm ci for CI/CD production builds. npm ci requires lock file to exist."
      }
    },
    {
      "@type": "Question",
      "name": "How do I run scripts from package.json?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Run scripts: npm run script-name. Common shortcuts: npm test (runs test script), npm start (runs start script), npm build (runs build script). Pass arguments: npm run script -- --arg. View available scripts: npm run (lists all). Scripts defined in package.json scripts section."
      }
    },
    {
      "@type": "Question",
      "name": "How do I check for vulnerable NPM packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Check vulnerabilities: npm audit. Fix automatically: npm audit fix. Fix breaking changes: npm audit fix --force. View detailed report: npm audit --json. Update dependencies: npm update to get patched versions. Use npm audit in CI/CD pipelines for security. Check before publishing packages."
      }
    },
    {
      "@type": "Question",
      "name": "What is npx and when should I use it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "npx runs npm package executables without installing. Use npx to: run one-time commands (npx create-react-app), run locally installed tools, try packages before installing, execute package binaries. npx downloads package temporarily, runs command, cleans up. Included with npm 5.2+. npx is convenient for CLI tools."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'NPM Cheat Sheet - Complete NPM Command Reference for Node.js',
  description: 'Complete NPM command reference. Install, update, remove packages. Run scripts, publish packages, manage cache. Essential for Node.js development workflows.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NPMCheatSheet />
    </Suspense>
  );
}