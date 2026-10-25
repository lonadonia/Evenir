import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";
import { copy } from "@/content/site";

export const metadata: Metadata = {
  title: copy.en.meta.servicesTitle,
  description: copy.en.meta.servicesDescription,
  alternates: { languages: { cs: "/sluzby", en: "/en/services" } },
};

export default function Page() {
  return <ServicesPage locale="en" />;
}
