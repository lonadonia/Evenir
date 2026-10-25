import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case/CaseStudyPage";
import { caseStudies, findCaseStudy } from "@/content/case-studies";

// Every story is prerendered via generateStaticParams, so the page is static HTML.
// Reading params outside <Suspense> is intentional: the whole page depends on the slug.
export const instant = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug.cs }));
}

export async function generateMetadata({ params }: PageProps<"/pripadove-studie/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = findCaseStudy("cs", slug);
  if (!story) return {};
  return {
    title: `${story.title.cs} — Případová studie — Evenir`,
    description: story.summary.cs,
    alternates: { languages: { cs: `/pripadove-studie/${story.slug.cs}`, en: `/en/case-studies/${story.slug.en}` } },
  };
}

export default async function Page({ params }: PageProps<"/pripadove-studie/[slug]">) {
  const { slug } = await params;
  const story = findCaseStudy("cs", slug);
  if (!story) notFound();
  return <CaseStudyPage locale="cs" story={story} />;
}
