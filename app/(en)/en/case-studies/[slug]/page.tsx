import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case/CaseStudyPage";
import { caseStudies, findCaseStudy } from "@/content/case-studies";

// Every story is prerendered via generateStaticParams, so the page is static HTML.
// Reading params outside <Suspense> is intentional: the whole page depends on the slug.
export const instant = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug.en }));
}

export async function generateMetadata({ params }: PageProps<"/en/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = findCaseStudy("en", slug);
  if (!story) return {};
  return {
    title: `${story.title.en} — Case study — Evenir`,
    description: story.summary.en,
    alternates: { languages: { cs: `/pripadove-studie/${story.slug.cs}`, en: `/en/case-studies/${story.slug.en}` } },
  };
}

export default async function Page({ params }: PageProps<"/en/case-studies/[slug]">) {
  const { slug } = await params;
  const story = findCaseStudy("en", slug);
  if (!story) notFound();
  return <CaseStudyPage locale="en" story={story} />;
}
