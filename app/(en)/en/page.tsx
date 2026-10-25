import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { copy } from "@/content/site";

export const metadata: Metadata = {
  title: copy.en.meta.homeTitle,
  description: copy.en.meta.homeDescription,
  alternates: { languages: { cs: "/", en: "/en" } },
};

export default function Page() {
  return <HomePage locale="en" />;
}
