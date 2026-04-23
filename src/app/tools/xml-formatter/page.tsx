import type { Metadata } from 'next';
import { Suspense } from 'react';
import XMLFormatter from '@/components/XMLFormatter';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is XML format?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "XML (Extensible Markup Language) is a markup language for storing and transporting data. Uses tags like <tag>content</tag> to define elements. Supports attributes, nesting, and hierarchy. Common for configuration files, API messages (SOAP), data exchange, and documents (Maven POM, Spring configs, SVG)."
      }
    },
    {
      "@type": "Question",
      "name": "How do I validate XML structure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "XML validation checks: 1) Every opening tag has matching closing tag. 2) Tags properly nested (no overlapping). 3) Single root element contains all others. 4) Attributes have quoted values. 5) No duplicate attributes. Use online validators or xmllint command. DTD and XSD provide stricter schema validation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between XML and JSON?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "XML: Markup language, uses tags, supports attributes, complex structure, larger file size, comments, DTD/XSD validation. JSON: Data format, uses braces/brackets, no attributes, simpler structure, smaller files, no comments, schema validation optional. JSON preferred for APIs, XML for documents and enterprise systems."
      }
    },
    {
      "@type": "Question",
      "name": "How do I minify XML?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "XML minification removes whitespace between tags: result.replace(/>\s+</g, '><'). Keeps content whitespace intact. Minified XML has smaller file size for transmission. Use for production deployments. Tools: online minifiers, xmllint, custom scripts. Always validate before minifying."
      }
    },
    {
      "@type": "Question",
      "name": "Why use XML for Maven POM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maven uses XML for pom.xml because: 1) Standard in Java ecosystem since 2004. 2) Supports complex project structure with dependencies, plugins, profiles. 3) XSD schema provides validation. 4) IDE integration works well. 5) XML namespaces avoid conflicts. Maven 4 may support alternative formats (YAML, JSON) but XML remains standard."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'XML Formatter & Validator - Format Maven POM, Config, SOAP XML',
  description: 'Format and validate XML documents. Beautify XML with proper indentation. Check tag matching and structure. Support for Maven POM, Spring config, SOAP messages.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <XMLFormatter />
    </Suspense>
  );
}