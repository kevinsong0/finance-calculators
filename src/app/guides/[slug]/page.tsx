import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoGuidePageView from "@/components/SeoGuidePageView";
import { getSeoGuideBySlug, SEO_GUIDE_PAGES } from "@/lib/seoPages";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SEO_GUIDE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoGuideBySlug(slug);

  if (!page) {
    return {
      title: "Finance Guide",
      description: "Financial planning guides and strategies.",
    };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/guides/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/guides/${page.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

// Generate HowTo schema for GEO optimization
function generateHowToSchema(page: ReturnType<typeof getSeoGuideBySlug>, url: string) {
  if (!page) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": page.title,
    "description": page.description,
    "step": page.steps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "text": step,
      "name": `Step ${idx + 1}`
    })),
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    }
  };
}

// Generate BreadcrumbList schema
function generateBreadcrumbSchema(page: ReturnType<typeof getSeoGuideBySlug>) {
  if (!page) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Guides",
        "item": `${SITE_URL}/guides`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.title,
        "item": `${SITE_URL}/guides/${page.slug}`
      }
    ]
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getSeoGuideBySlug(slug);

  if (!page) notFound();

  const url = `${SITE_URL}/guides/${slug}`;
  const howToSchema = generateHowToSchema(page, url);
  const breadcrumbSchema = generateBreadcrumbSchema(page);

  return (
    <>
      {/* HowTo structured data for AI crawlers */}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {/* Breadcrumb structured data */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <SeoGuidePageView page={page} />
    </>
  );
}