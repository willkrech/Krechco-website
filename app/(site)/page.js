import { prisma } from "@/lib/db";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkItem from "@/components/WorkItem";
import SiteScripts from "@/components/SiteScripts";
import MobileImageCycle from "@/components/MobileImageCycle";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, projects, testimonials, services] = await Promise.all([
    prisma.settings.findUnique({ where: { id: 1 } }),
    prisma.project.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
  ]);

  const cursorImages = projects
    .slice(0, 4)
    .map((p) => p.thumbnailUrl)
    .filter(Boolean);

  return (
    <>
      <Nav contactEmail={settings.footerEmail} />

      <div id="canvas-parent" data-w-id="e814f9ff-50c0-0ae1-8672-d0336d1d6727" className="full">
        <MobileImageCycle images={cursorImages} />
        <div className="div-block-2">
          <div className="main-container flex">
            <div
              className="testimonial-name-text text-color-white"
              dangerouslySetInnerHTML={{ __html: settings.heroTag1 }}
            />
            <div
              className="testimonial-name-text text-color-white"
              dangerouslySetInnerHTML={{ __html: settings.heroTag2 }}
            />
            <div
              className="testimonial-name-text text-color-white align-right"
              dangerouslySetInnerHTML={{ __html: settings.heroTag3 }}
            />
            <div className="testimonial-name-text text-color-white mobile-only">Tap anywhere, trust me</div>
          </div>
        </div>
        <div className="hero-title-wrp">
          <h1 className="hero-h1-wrp">
            {[0, 1, 2].map((i) => (
              <div className="hero-h1" key={i}>
                {settings.heroHeadline}
              </div>
            ))}
          </h1>
        </div>
        {settings.heroImageUrl && (
          <img
            src={settings.heroImageUrl}
            loading="lazy"
            data-w-id="c5c98609-8b4f-1431-8a4d-940f24382276"
            sizes="(max-width: 4000px) 100vw, 4000px"
            alt=""
            className="image-4"
          />
        )}
        <div className="image-4 alt"></div>
      </div>

      <section id="work" className="section work-sec">
        <div className="main-container">
          <div className="work-container">
            <div className="work-title-wrp">
              <div className="tag">
                <div className="black-dot"></div>
                <div>Recent work</div>
              </div>
            </div>
            <div className="work-bottom">
              <div className="work-list">
                {projects.map((project) => (
                  <WorkItem key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="background-blockl"></div>
      </section>

      <section id="about" className="section about-sec">
        <div className="main-container">
          <div className="about-container">
            <div className="about-top">
              <div id="w-node-_111d37a2-45cd-f0b8-1d5e-9f8b9326f716-af4bb4ae" className="about-title">
                <div className="tag">
                  <div className="black-dot"></div>
                  <div>{settings.aboutTag}</div>
                </div>
                <h2 className="about-h2" dangerouslySetInnerHTML={{ __html: settings.aboutHeading }} />
              </div>
              <div id="w-node-_111d37a2-45cd-f0b8-1d5e-9f8b9326f71b-af4bb4ae" className="about-text-wrp">
                <div>
                  {settings.aboutText.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="about-bottom">
              <div className="about-content">
                {settings.aboutImage1Url && (
                  <div id="w-node-_111d37a2-45cd-f0b8-1d5e-9f8b9326f729-af4bb4ae" className="about-img-wrp">
                    <img src={settings.aboutImage1Url} loading="lazy" width="640" alt="" className="about-img" />
                  </div>
                )}
                {settings.aboutImage2Url && (
                  <div id="w-node-bce1b7ff-94aa-d39c-a7d4-0b31537e3cf2-af4bb4ae" className="about-img-wrp">
                    <img
                      src={settings.aboutImage2Url}
                      loading="lazy"
                      width="640"
                      alt=""
                      className="about-img smaller"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {settings.videoUrl && (
        <section data-w-id="ea33f78d-189c-d6bc-326b-5fac068ffde2" className="bigimage-section">
          <div className="div-block">
            <div className="background-video w-background-video w-background-video-atom">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={settings.videoPosterUrl || undefined}
                style={settings.videoPosterUrl ? { backgroundImage: `url('${settings.videoPosterUrl}')` } : undefined}
              >
                <source src={settings.videoUrl} type="video/mp4" />
                {settings.videoWebmUrl && <source src={settings.videoWebmUrl} type="video/webm" />}
              </video>
            </div>
          </div>
          <div className="div-block-6"></div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="section testimonials-sec black">
          <div className="main-container">
            <div className="testimonials-container text-color-white">
              <div className="tag">
                <div className="black-dot"></div>
                <div>Testimonials</div>
              </div>
              <div className="testimonials-bottom">
                <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" className="auto-tabs w-tabs">
                  <div className="auto-tabs_content w-tab-content">
                    {testimonials.map((t, i) => (
                      <div
                        key={t.id}
                        data-w-tab={`Tab ${i + 1}`}
                        className={`auto-tabs_pane w-tab-pane${i === 0 ? " w--tab-active" : ""}`}
                      >
                        <h3>{t.quote}</h3>
                      </div>
                    ))}
                  </div>
                  <div className="auto-tabs_menu w-tab-menu">
                    {testimonials.map((t, i) => (
                      <a
                        key={t.id}
                        data-w-tab={`Tab ${i + 1}`}
                        className={`auto-tabs_tab w-inline-block w-tab-link${i === 0 ? " w--current" : ""}`}
                      >
                        <div className="testimonials-info-wrp text-color-white">
                          <div className="testimonial-name-text">-</div>
                          <div className="testimonials-info text-color-white">
                            <div className="testimonials-name-wrp">
                              <div className="testimonial-name-text">{t.name}</div>
                            </div>
                            <div className="testimonials-position-wrp">
                              <div className="text-color-white">{t.title}</div>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section id="services" className="section services-se">
          <div className="main-container">
            <div className="services-container">
              <div className="services-inner">
                <div id="w-node-_71d39199-9673-e83e-06be-d4e4b757a77a-af4bb4ae" className="services-left">
                  <div className="services-title-wrp">
                    <div className="tag">
                      <div className="black-dot"></div>
                      <div>Services</div>
                    </div>
                  </div>
                </div>
                <div id="w-node-_71d39199-9673-e83e-06be-d4e4b757a77e-af4bb4ae" className="services-right">
                  {services.map((s) => (
                    <div className="service-item" key={s.id}>
                      <h3>{s.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer settings={settings} />
      <SiteScripts isHome cursorImages={cursorImages} />
    </>
  );
}
