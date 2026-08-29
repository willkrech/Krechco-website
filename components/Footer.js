export default function Footer({ settings }) {
  return (
    <section id="footer" data-w-id="60823ee3-631c-a6ad-78b5-f4e4c53337dc" className="section footer-sec">
      <div className="footer-moving-text-wrp">
        {[0, 1].map((i) => (
          <div className="footer-moving-text" key={i}>
            {[0, 1, 2, 3].map((j) => (
              <div className="foote-big-texts-wrp" key={j}>
                <h1 className="footer-big-text">Let&apos;s Talk</h1>
                <h1 className="footer-big-text accent">Let&apos;s Talk</h1>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="main-container">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-contaent">
              <div id="w-node-_60823ee3-631c-a6ad-78b5-f4e4c53337e6-c53337dc" className="footer-left-content">
                <div className="footer-person-info">
                  <div className="footer-photo-wrp">
                    {settings.footerPhotoUrl && (
                      <img
                        src={settings.footerPhotoUrl}
                        loading="lazy"
                        width="60"
                        sizes="60px"
                        alt=""
                        className="footer-photo"
                      />
                    )}
                  </div>
                  <div className="footer-person-data">
                    <div className="big-text align-left">{settings.footerName}</div>
                    <div className="footer-position-wrp">
                      <div>{settings.footerRole}</div>
                    </div>
                  </div>
                </div>
                <div className="footer-text-content">
                  <div className="footer-photo-wrp"></div>
                  <div className="footer-texts-wrp">
                    <div className="footer-text-wrp">
                      <div className="big-text align-left">{settings.footerBlurb}</div>
                    </div>
                    <a
                      data-w-id="35d2a54c-cc74-41a6-278b-b5eedeb2a9fd"
                      href={`mailto:${settings.footerEmail}`}
                      className="button w-inline-block"
                    >
                      <div className="big-text">Get in touch</div>
                      <div className="button-circle-wrp">
                        <div className="big-button-circle"></div>
                        <img src="/images/arrow-right-up-line.svg" loading="lazy" alt="" className="red-arrow red" />
                        <img src="/images/arrow-white.svg" loading="lazy" alt="" className="red-arrow white" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div id="w-node-_60823ee3-631c-a6ad-78b5-f4e4c53337f7-c53337dc" className="footer-social-links-wrp">
                {settings.footerLinkedin && (
                  <a href={settings.footerLinkedin} target="_blank" rel="noreferrer" className="footer-link w-inline-block">
                    <div>LinkedIn</div>
                  </a>
                )}
                {settings.footerInstagram && (
                  <a href={settings.footerInstagram} target="_blank" rel="noreferrer" className="footer-link w-inline-block">
                    <div>Instagram</div>
                  </a>
                )}
              </div>
              <div id="w-node-_60823ee3-631c-a6ad-78b5-f4e4c5333801-c53337dc" className="footer-contact-info-wrp">
                {settings.footerPhone && (
                  <a href={`tel:${settings.footerPhone}`} className="footer-link w-inline-block">
                    <div>+{settings.footerPhone}</div>
                  </a>
                )}
                {settings.footerEmail && (
                  <a href={`mailto:${settings.footerEmail}`} className="footer-link w-inline-block">
                    <div>{settings.footerEmail}</div>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="foorwe-bottom-content">
              <div id="w-node-_60823ee3-631c-a6ad-78b5-f4e4c533380d-c53337dc" className="small-text">© Krech Co</div>
              <div id="w-node-_60823ee3-631c-a6ad-78b5-f4e4c5333815-c53337dc" className="small-text">Hang Loose</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
