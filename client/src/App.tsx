import Portfolio from "./pages/portfolio";
import CaseStudy from "./pages/case-study";
import MascotGuide from "./pages/mascot-guide";
import NotFound from "./pages/not-found";
import { projects } from "./data/portfolio";
export default function App({ path = "/" }: { path?: string }) {
  const normalized = path.replace(/\/$/, "") || "/";
  if (normalized === "/") return <Portfolio />;
  if (normalized === "/lab/mascot") return <MascotGuide />;
  const slug = normalized.replace(/^\/work\//, "");
  if (normalized.startsWith("/work/") && projects.some((p) => p.slug === slug))
    return <CaseStudy slug={slug} />;
  return <NotFound />;
}
