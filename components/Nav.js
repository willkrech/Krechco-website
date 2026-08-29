export default function Nav({ contactEmail }) {
  return (
    <div
      data-w-id="42f04e15-e585-3e39-af3a-fc05376bb5bf"
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="section navbar-sec w-nav"
    >
      <div className="main-container navbar-container">
        <a href="/" className="navlogo w-inline-block">
          <div className="image-3 icon-shift w-embed">
            <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 43.306 41.32">
              <defs>
                <clipPath id="clip-path">
                  <rect width="43.306" height="41.319" transform="translate(0 0.001)" fill="none" />
                </clipPath>
              </defs>
              <g transform="translate(0 0)">
                <path d="M0,0V41.32H15.822V0Z" fill="currentColor" />
                <g>
                  <g clipPath="url(#clip-path)">
                    <path
                      d="M41.844,11.247,30.656.059,19.284,11.433C8.256,22.462,16.067,41.32,31.664,41.32h9.655V25.5H27.593Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <img src="/images/KCo-logo-02.svg" loading="lazy" alt="" className="fadeonscrolllogo" />
        </a>
        <nav role="navigation" className="nav-menu w-nav-menu">
          <div className="nav-menu-inner">
            <a href="/#about" className="nav-link w-inline-block">
              <div className="big-text footer">About</div>
            </a>
            <a href="/#work" className="nav-link w-inline-block">
              <div className="big-text footer">Work</div>
            </a>
            <a href="/#services" className="nav-link w-inline-block">
              <div className="big-text footer">Services</div>
            </a>
            <a href="/#footer" className="nav-link w-inline-block">
              <div className="big-text footer">Contact</div>
            </a>
          </div>
        </nav>
        <div className="burger hide w-nav-button">
          <div className="burger-line-1"></div>
          <div className="burger-line-2"></div>
          <div className="burger-line-3"></div>
        </div>
        <div className="div-block-7">
          <a
            data-w-id="b47ce454-2170-bc75-92ca-bbcf7085d5a6"
            href={`mailto:${contactEmail}?subject=I%20want%20to%20work%20with%20you!`}
            className="button-copy alt w-inline-block"
          >
            <div className="big-text small">Contact</div>
          </a>
        </div>
      </div>
    </div>
  );
}
