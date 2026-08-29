import HeadScripts from "@/components/HeadScripts";
import "./globals.css";

export const metadata = {
  title: "Krech.Co",
  description:
    "Enhance user experiences with top-notch UX/UI website design and development services. We also offer graphic design, creative direction, and photography in Northwest Arkansas.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/webclip.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-wf-page="66062a8c5e1b01c5af4bb4ae"
      data-wf-site="66062a8b5e1b01c5af4bb2a9"
    >
      <head>
        <link href="/css/normalize.css" rel="stylesheet" />
        <link href="/css/webflow.css" rel="stylesheet" />
        <link href="/css/krech.webflow.css" rel="stylesheet" />
        <link href="/css/mobile-cycle.css" rel="stylesheet" />
        <link href="/css/case-study.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
`,
          }}
        />
      </head>
      <body className="body" suppressHydrationWarning>
        <HeadScripts />
        {children}
      </body>
    </html>
  );
}
