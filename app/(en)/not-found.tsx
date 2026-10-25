import { SiteShell } from "@/components/site/SiteShell";
import { NotFoundBody } from "@/components/site/NotFoundBody";

export default function NotFound() {
  return (
    <SiteShell locale="en" alternateHref="/">
      <NotFoundBody locale="en" />
    </SiteShell>
  );
}
