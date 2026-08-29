// Legacy Webflow interaction IDs from the original hand-built site, kept so
// webflow.js's compiled IX2 data still finds these elements and animates them.
// Only the original 7 seeded projects have one; new projects simply get none.
const LEGACY_ITEM_IDS = {
  "onyx-coffee-lab": "a0339d39-e26a-53aa-c61f-8b418b23876f",
};
const LEGACY_LINK_IDS = {
  "onyx-coffee-lab": "8e5a53d8-f2de-a834-1842-46281255b753",
  "eko-health": "63a3ce86-ae85-e5f2-8132-019facf14177",
  meatworks: "5fe8096a-5fe2-e229-1cbf-fe6070efa1f1",
  goodsprout: "cb4bfdde-abac-31fd-0555-d3d991e3ba3a",
  "social-academy": "8b023955-a3e5-5956-5462-fdbf9dbf1b79",
  heartbeam: "f89aded8-be4a-c878-1bcb-5e2245bb08de",
};

export default function WorkItem({ project }) {
  const hasCaseStudy = project.hasCaseStudy;
  const link = hasCaseStudy ? `/projects/${project.slug}` : project.externalUrl;

  return (
    <div className="work-item" data-w-id={LEGACY_ITEM_IDS[project.slug]}>
      <div className="work-left">
        <h3 className="big-heading-3">{project.clientName}</h3>
      </div>
      <div className="work-preview-wrp">
        <div className="work-preview-img-wrp">
          {project.thumbnailUrl && (
            <img
              src={project.thumbnailUrl}
              loading="lazy"
              width="420"
              alt={project.clientName}
              className="tab-preview-img"
            />
          )}
        </div>
      </div>
      <div className="flex-right">
        {project.badgeUrl && (
          <img src={project.badgeUrl} loading="lazy" alt="" className="webby2025" />
        )}
        {project.category && <div className="big-text">{project.category}</div>}
        {link && (
          <a
            data-w-id={LEGACY_LINK_IDS[project.slug]}
            href={link}
            target={hasCaseStudy ? undefined : "_blank"}
            rel={hasCaseStudy ? undefined : "noreferrer"}
            className="button-copy w-inline-block"
          >
            <div className="big-text">{hasCaseStudy ? "View the Case Study" : "Visit the Site"}</div>
          </a>
        )}
      </div>
    </div>
  );
}
