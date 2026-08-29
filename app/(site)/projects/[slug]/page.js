import { notFound } from "next/navigation";
import { marked } from "marked";
import { prisma } from "@/lib/db";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteScripts from "@/components/SiteScripts";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    prisma.project.findUnique({ where: { slug } }),
    prisma.settings.findUnique({ where: { id: 1 } }),
  ]);

  if (!project || !project.hasCaseStudy) {
    notFound();
  }

  const otherProjects = await prisma.project.findMany({
    where: { visible: true, slug: { not: slug } },
    orderBy: { order: "asc" },
    take: 2,
  });

  const contentHtml = project.caseStudyContent ? marked.parse(project.caseStudyContent) : "";

  const details = [
    { label: "Project Name", value: project.clientName },
    { label: "Timeframe", value: project.caseStudyTimeframe },
    { label: "Role", value: project.caseStudyRole },
    { label: "Scope", value: project.caseStudyScope || project.category },
  ].filter((d) => d.value);

  return (
    <>
      <Nav contactEmail={settings.footerEmail} />

      <section className="section case-hero">
        <div className="main-container">
          <div className="tag">
            <div className="black-dot"></div>
            <div>{project.category}</div>
          </div>
          <h1 className="case-title">{project.clientName}</h1>
        </div>
      </section>

      <section className="section">
        <div className="main-container">
          {project.caseStudyIntro && (
            <>
              <div className="case-intro-label">Introduction</div>
              <div className="case-intro">
                {project.caseStudyIntro.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </>
          )}

          {details.length > 0 && (
            <>
              <div className="case-details-label">Details</div>
              <div className="case-details-grid">
                {details.map((d) => (
                  <div key={d.label}>
                    <div className="case-detail-item-label">{d.label}</div>
                    <div className="case-detail-item-value">{d.value}</div>
                  </div>
                ))}
                {project.externalUrl && (
                  <div>
                    <div className="case-detail-item-label">Live Site</div>
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="case-detail-item-value"
                      style={{ color: "inherit" }}
                    >
                      Visit ↗
                    </a>
                  </div>
                )}
              </div>
            </>
          )}

          {contentHtml && (
            <div className="case-study-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          )}
        </div>
      </section>

      {otherProjects.length > 0 && (
        <section className="case-more-section">
          <div className="main-container">
            <div className="case-more-label">Want to see more?</div>
            <div className="case-more-grid">
              {otherProjects.map((p) => {
                const href = p.hasCaseStudy ? `/projects/${p.slug}` : p.externalUrl;
                return (
                  <a
                    key={p.id}
                    href={href || "#"}
                    target={p.hasCaseStudy ? undefined : "_blank"}
                    rel={p.hasCaseStudy ? undefined : "noreferrer"}
                    className="case-more-card"
                  >
                    {p.thumbnailUrl && <img src={p.thumbnailUrl} alt={p.clientName} />}
                    <h3>{p.clientName}</h3>
                    <div className="case-more-card-cat">{p.category}</div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer settings={settings} />
      <SiteScripts />
    </>
  );
}
