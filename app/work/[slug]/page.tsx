import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })) }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = index === projects.length - 1 ? null : projects[index + 1];
  return <CaseStudy project={project} next={next} />;
}
