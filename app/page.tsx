import { Hero } from "@/components/home/hero";
import { FeaturedCase } from "@/components/home/featured-case";
import { Capabilities } from "@/components/home/capabilities";
import { ArchiveTeaser } from "@/components/home/archive-teaser";
import { ContactCta } from "@/components/home/contact-cta";
import { featuredProjects } from "@/lib/projects";

export default function HomePage() {
  return (
    <>
      <Hero />

      {featuredProjects.map((project, index) => (
        <FeaturedCase key={project.slug} project={project} index={index} />
      ))}

      <Capabilities />
      <ArchiveTeaser />
      <ContactCta />
    </>
  );
}
