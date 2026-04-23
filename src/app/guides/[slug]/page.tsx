import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoGuidePageView from "@/components/SeoGuidePageView";
import { getSeoGuideBySlug, SEO_GUIDE_PAGES } from "@/lib/seoPages";

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

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getSeoGuideBySlug(slug);

  if (!page) notFound();

  return <SeoGuidePageView page={page} />;
}