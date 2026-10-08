import { BeyondCode } from "@/components/sections/BeyondCode";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { getFeaturedProjects } from "@/lib/projects";

export default async function HomePage() {
  const featured = await getFeaturedProjects();

  return (
    <main>
      <Hero />
      <FeaturedProjects projects={featured} />
      <ProjectGrid />
      <Experience />
      <BeyondCode />
      <Contact />
    </main>
  );
}
