import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { copy } from "@/content/site";

export const metadata: Metadata = {
  title: copy.cs.meta.homeTitle,
  description: copy.cs.meta.homeDescription,
  alternates: { languages: { cs: "/", en: "/en" } },
};

export default function Page() {
  return <HomePage locale="cs" />;
}
