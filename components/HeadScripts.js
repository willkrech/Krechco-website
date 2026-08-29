"use client";

import Script from "next/script";
import { useState } from "react";

export default function HeadScripts() {
  const [jqueryReady, setJqueryReady] = useState(false);
  const [webfontReady, setWebfontReady] = useState(false);
  const [gtagReady, setGtagReady] = useState(false);

  return (
    <>
      <Script
        id="wmod-js"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
        }}
      />

      <Script
        src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
        strategy="afterInteractive"
        onLoad={() => setWebfontReady(true)}
      />
      {webfontReady && (
        <Script
          id="webfont-load"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `WebFont.load({ google: { families: ["Instrument Sans:regular,500,600,700"] } });`,
          }}
        />
      )}

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XEGY3CLSLW"
        strategy="afterInteractive"
        onLoad={() => setGtagReady(true)}
      />
      {gtagReady && (
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XEGY3CLSLW');`,
          }}
        />
      )}

      <Script src="https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.js" strategy="afterInteractive" />

      {/* jQuery must finish loading before webflow.js runs, or webflow.js's IX2/nav code throws.
          next/script's beforeInteractive strategy isn't reliable from a route-group root layout,
          so this ordering is enforced explicitly via onLoad instead. */}
      <Script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=66062a8b5e1b01c5af4bb2a9"
        strategy="afterInteractive"
        onLoad={() => setJqueryReady(true)}
      />
      {jqueryReady && <Script src="/js/webflow.js" strategy="afterInteractive" />}
    </>
  );
}
