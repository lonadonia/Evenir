import { SiteShell } from "@/components/site/SiteShell";
import { NotFoundBody } from "@/components/site/NotFoundBody";

export default function NotFound() {
  return (
    <SiteShell locale="cs" alternateHref="/en">
      <NotFoundBody locale="cs" />
    </SiteShell>
  );
}
