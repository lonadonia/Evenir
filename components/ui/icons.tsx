import {
  Activity,
  Bug,
  Building2,
  Cloud,
  Gauge,
  Headset,
  KeyRound,
  Layers,
  LayoutGrid,
  Lock,
  Network,
  Radar,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/content/services";

/** One icon set (Lucide), one stroke width (1.75) across the whole site. */
export const ICON_STROKE = 1.75;

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  sparkles: Sparkles,
  trending: TrendingUp,
  headset: Headset,
  building: Building2,
  shield: ShieldCheck,
  lock: Lock,
  bug: Bug,
  key: KeyRound,
  radar: Radar,
  activity: Activity,
  server: Server,
  network: Network,
  cloud: Cloud,
  layers: Layers,
  grid: LayoutGrid,
  users: Users,
  workflow: Workflow,
  gauge: Gauge,
};

export function ServiceGlyph({ icon, className }: { icon: ServiceIcon; className?: string }) {
  const Icon = serviceIcons[icon];
  return <Icon aria-hidden="true" strokeWidth={ICON_STROKE} className={className} />;
}
