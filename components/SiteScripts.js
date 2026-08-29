"use client";

import Script from "next/script";

export default function SiteScripts({ isHome, cursorImages = [] }) {
  return (
    <>
      {/* jQuery + webflow.js are loaded in app/(site)/layout.js with strategy="beforeInteractive"
          so they're guaranteed ready before any of the scripts below run. */}
      <Script
        id="auto-tabs"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        (function() {
          function init() {
            if (!window.jQuery) { setTimeout(init, 50); return; }
            var $ = window.jQuery;
            var tabDuration = 7000;
            var delayDuration = 1100;
            var tabTimeout;
            clearTimeout(tabTimeout);
            tabLoop($(".auto-tabs_tab.w--current"));
            function tabLoop(trigger) {
              $(".auto-tabs_timer-bar").stop(true, true).css("width", "0%");
              trigger.find(".auto-tabs_timer-bar").animate({ width: "100%" }, tabDuration);
              tabTimeout = setTimeout(function () {
                var $next = trigger.next();
                if ($next.length) {
                  $next.removeAttr("href").click();
                } else {
                  $(".auto-tabs_tab:first").removeAttr("href").click();
                }
              }, tabDuration);
            }
            $(".auto-tabs_tab").click(function () {
              clearTimeout(tabTimeout);
              tabLoop($(this));
              setTimeout(function() {
                tabLoop($(".auto-tabs_tab.w--current"));
              }, delayDuration);
            });
          }
          init();
        })();
        `,
        }}
      />
      {isHome && cursorImages.length > 0 && (
        <Script
          id="cursor-trail"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.imageUrls = ${JSON.stringify(cursorImages)};
          let __distThreshold = 100;
          let __images = [];
          let __queue = [];
          let __lastMousePos = { x: 0, y: 0 };
          let __imgIndex = 0;
          let __canvasCreated = false;
          window.preload = function() {
            for (let i = 0; i < window.imageUrls.length; i++) {
              __images[i] = loadImage(window.imageUrls[i]);
            }
          };
          // Below 768px the mobile image-cycle component (a plain fading <img> carousel)
          // replaces this mouse-driven trail entirely, since there's no persistent
          // pointer position on touch devices.
          window.setup = function() {
            if (windowWidth < 768) { noLoop(); return; }
            let cnv = createCanvas(windowWidth, windowHeight);
            cnv.parent("canvas-parent");
            cnv.style("display", "block");
            cnv.style("position", "absolute");
            cnv.style("inset", "0");
            cnv.style("z-index", "-1");
            __lastMousePos = { x: mouseX, y: mouseY };
            __canvasCreated = true;
          };
          window.draw = function() {
            if (windowWidth < 768) { clear(); return; }
            clear();
            let d = dist(mouseX, mouseY, __lastMousePos.x, __lastMousePos.y);
            if (d > __distThreshold) {
              __queue.unshift({ x: mouseX, y: mouseY, index: __imgIndex });
              __lastMousePos = { x: mouseX, y: mouseY };
              __imgIndex = (__imgIndex + 1) % __images.length;
            }
            if (__queue.length > 4) { __queue.pop(); }
            let scale = width / 4;
            for (let i = __queue.length - 1; i >= 0; i--) {
              let img = __images[__queue[i].index];
              if (img) {
                let imgWidth = (img.width * scale) / img.width;
                let imgHeight = (img.height * scale) / img.width;
                image(img, __queue[i].x - imgWidth / 2, __queue[i].y - imgHeight / 2, imgWidth, imgHeight);
              }
            }
          };
          window.windowResized = function() {
            if (!__canvasCreated || windowWidth < 768) { return; }
            resizeCanvas(windowWidth, windowHeight);
          };
          `,
          }}
        />
      )}
      <Script
        id="scroll-fade"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        (function() {
          function init() {
            if (!window.jQuery) { setTimeout(init, 50); return; }
            var $ = window.jQuery;
            $(window).scroll(function() {
              var scroll = $(window).scrollTop();
              if (scroll >= 50) {
                $(".fadeonscrolllogo").addClass("fade");
                $(".navbar").addClass("move");
              } else {
                $(".fadeonscrolllogo").removeClass("fade");
                $(".navbar").removeClass("move");
              }
            });
            $(window).scroll(function() {
              var scroll = $(window).scrollTop();
              if (scroll >= 100) {
                $(".icon-shift").addClass("blend");
                $(".Navbar-Sec").addClass("blend");
              } else {
                $(".icon-shift").removeClass("blend");
                $(".Navbar-Sec").removeClass("blend");
              }
            });
          }
          init();
        })();
        `,
        }}
      />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js" strategy="afterInteractive" />
      <Script
        id="lenis-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        (function() {
          function init() {
            if (!window.Lenis || !window.jQuery) { setTimeout(init, 50); return; }
            var $ = window.jQuery;
            let lenis = new Lenis({
              lerp: 0.1,
              wheelMultiplier: 0.7,
              gestureOrientation: "vertical",
              normalizeWheel: false,
              smoothTouch: false,
            });
            function raf(time) {
              lenis.raf(time);
              requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
            $("[data-lenis-start]").on("click", function () { lenis.start(); });
            $("[data-lenis-stop]").on("click", function () { lenis.stop(); });
            $("[data-lenis-toggle]").on("click", function () {
              $(this).toggleClass("stop-scroll");
              if ($(this).hasClass("stop-scroll")) { lenis.stop(); } else { lenis.start(); }
            });
          }
          init();
        })();
        `,
        }}
      />
    </>
  );
}
