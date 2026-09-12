import { projects } from "../data/projects";
import { SunrisePortfolio } from "./SunrisePortfolio";

export function Daybreak() {
  return <SunrisePortfolio archive={projects.map(({ slug, title, label }) => ({ slug, title, label }))} />;
}
