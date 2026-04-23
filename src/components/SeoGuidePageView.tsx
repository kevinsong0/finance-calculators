"use client";

import Link from "next/link";
import type { SeoGuidePage } from "@/lib/seoPages";

type Props = {
  page: SeoGuidePage;
};

export default function SeoGuidePageView({ page }: Props) {
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <article className="space-y-6">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold">{page.title}</h1>
          <p className="text-zinc-600 dark:text-zinc-300">{page.description}</p>
        </header>

        <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="text-zinc-600 dark:text-zinc-400">{page.summary}</p>
        </section>

        <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
          <h2 className="text-xl font-semibold">Key Steps</h2>
          <ol className="space-y-3">
            {page.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-medium">
                  {idx + 1}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-6 space-y-4">
          <h2 className="text-xl font-semibold">Related Calculator</h2>
          <Link
            href={page.targetProductHref}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            {page.targetProductLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </section>

        <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-zinc-900 dark:hover:text-zinc-200">Guides</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-200">{page.title}</span>
        </nav>
      </article>
    </main>
  );
}