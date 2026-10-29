import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projectCategories } from './project-data';
import HoverImageCards from './HoverImageCards';

export function ProjectCards({ preview = false }: { preview?: boolean }) {
  const categories = preview ? projectCategories.slice(0, 3) : projectCategories;
  return <HoverImageCards items={categories.map(c => ({ id: c.slug, title: c.title, image: c.image, alt: `Illustrative ${c.title.toLowerCase()} interior`, description: c.description, href: `/projects/${c.slug}`, action: 'Explore application' }))} />;
}

export function ProjectDetail({ slug }: { slug: string }) {
  const category = projectCategories.find(c => c.slug === slug);
  if (!category) return <section className="automation-detail-missing"><h1>Project category not found</h1><a href="/projects">All Project Categories</a></section>;
  return <><section className="automation-detail"><div className="automation-detail-inner"><nav aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/projects">Projects</a><span>/</span><span>{category.title}</span></nav><div className="automation-detail-layout"><div className="automation-detail-copy"><p className="automation-detail-eyebrow">PROJECT APPLICATIONS</p><h1>{category.title}</h1><p>{category.description}</p><p>Discuss your space with our team to plan compatible automation and control systems around your requirements.</p><a href={`/contact?interest=${encodeURIComponent(category.title)}#contact`} className="automation-detail-cta">Discuss Your Project<ArrowUpRight size={18} /></a><a href="/projects#project-categories" className="automation-detail-back"><ArrowLeft size={15} />All Project Categories</a><p className="automation-detail-note">Illustrative application imagery. Completed project names, locations and verified case studies will be added once available.</p></div><div className="automation-detail-image"><img src={category.image} alt={`Illustrative ${category.title.toLowerCase()} interior`} width={1200} height={900} fetchPriority="high" /></div></div></div></section><section className="automation-related"><h2>More Project Applications</h2><div>{projectCategories.filter(c => c.slug !== slug).map(c => <a key={c.slug} href={`/projects/${c.slug}`}>{c.title}<ArrowUpRight size={16} /></a>)}</div></section></>;
}
