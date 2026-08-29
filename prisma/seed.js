const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      heroHeadline: "UX/UI Designer + Developer",
      heroImageUrl: "/uploads/hero.jpg",
      heroTag1: "Will Krech<br>Northwest Arkansas",
      heroTag2: "Designer + Developer<br>10+ Years Experience",
      heroTag3: "Where there is a Will<br>There is a way.",

      aboutTag: "About Krech Co",
      aboutHeading: "It started with this thought, <em>The daily grind wasn't working</em>.",
      aboutText:
        "I had a dream to start out on my own, but fears and a lack of confidence kept me from making the jump. I worked with several amazing agencies, and there is nothing wrong with that model, but I kept feeling that I was meant for more and needed to trust God and make the jump. I decided to go full-time as an independent contractor and have faith in God and myself. Thus, Krech.co was formed. It's my name, and I don't let anything go to the client that I'm not prepared to put my name on.\n\nI have experience designing and developing websites with UX/UI and ADA best practices for optimal search engine results. From branding to photography, videography, and content creation, I offer a wide range of skills for companies and digital marketing teams to propel their brands forward. At Krech.co, I'm not just building websites—I'm building relationships and investing in their companies as if they were my own.",
      aboutImage1Url: "/uploads/about-photo-1.jpg",
      aboutImage2Url: "/uploads/about-photo-2.jpg",

      videoUrl: "/uploads/hero-video.mp4",
      videoWebmUrl: "/uploads/hero-video.webm",
      videoPosterUrl: "/uploads/hero-video-poster.jpg",

      footerName: "Will Krech",
      footerRole: "UX/UI Designer and Developer",
      footerPhotoUrl: "/uploads/footer-photo.jpg",
      footerBlurb: "I would love to talk and hear how i can help your company!",
      footerPhone: "9012129652",
      footerEmail: "willkrech@gmail.com",
      footerLinkedin: "https://www.linkedin.com/in/willkrech/",
      footerInstagram: "https://www.instagram.com/willkrech/?hl=en",
    },
  });

  const testimonials = [
    {
      quote:
        "Will is a true member and partner of the creative team here at Eko Health. With minimal direction he'll execute on designs—often with better alternatives to the original design direction given! Not only is he a great designer and web developer, he's truly invested in the Eko brand and making it shine across all of our marketing channels and websites.",
      name: "Steven Contreras",
      title: "Creative Director, Brand & Marketing",
      order: 0,
    },
    {
      quote:
        "Thanks to Will's expertise, our 'build your own box' flow now only takes 3 clicks instead of 10. The result? Remarkably higher conversion rates. He's a master at streamlining processes for maximum effectiveness.",
      name: "Sidnee",
      title: "CEO of Schaefer",
      order: 1,
    },
    {
      quote:
        "Will's expertise is outstanding! His attention to detail and commitment to excellence produced a website that surpassed our expectations. Thanks to his innovative approach, our site now has a perfect score from Google in SEO and ADA best practices. A new standard has been set for web development!",
      name: "Jennie",
      title: "Sprig Consulting",
      order: 2,
    },
  ];
  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!existing) await prisma.testimonial.create({ data: t });
  }

  const services = [
    "Creative Direction",
    "Branding",
    "Website Design",
    "Website Development",
    "Product Design",
    "Content Creation",
  ];
  for (let i = 0; i < services.length; i++) {
    const existing = await prisma.service.findFirst({ where: { name: services[i] } });
    if (!existing) await prisma.service.create({ data: { name: services[i], order: i } });
  }

  const projects = [
    {
      slug: "onyx-coffee-lab",
      clientName: "Onyx Coffee Lab",
      category: "Web Design",
      thumbnailUrl: "/uploads/onyx-thumb.gif",
      badgeUrl: "/uploads/onyx-badge.png",
      externalUrl: "https://onyxcoffeelab.com/",
      hasCaseStudy: false,
      visible: true,
      order: 0,
    },
    {
      slug: "eko-health",
      clientName: "Eko Health",
      category: "Web Design and Social Marketing",
      thumbnailUrl: "/uploads/eko-thumb.jpg",
      externalUrl: "http://ekohealth.com",
      hasCaseStudy: false,
      visible: true,
      order: 1,
    },
    {
      slug: "meatworks",
      clientName: "Meatworks",
      category: "Web Design and Social Marketing",
      thumbnailUrl: "/uploads/meatworks-thumb.jpg",
      externalUrl: "http://meatworks.com",
      hasCaseStudy: false,
      visible: true,
      order: 2,
    },
    {
      slug: "goodsprout",
      clientName: "GoodSprout",
      category: "Web Design and Developemt",
      thumbnailUrl: "/uploads/goodsprout-thumb.jpg",
      externalUrl: "https://www.good-sprout.com/",
      hasCaseStudy: false,
      visible: true,
      order: 3,
    },
    {
      slug: "heartbeam",
      clientName: "HeartBeam",
      category: "Web Design and Development",
      thumbnailUrl: "/uploads/heartbeam-thumb.jpg",
      externalUrl: "http://heartbeam.com",
      hasCaseStudy: false,
      visible: true,
      order: 4,
    },
    {
      slug: "macarooz",
      clientName: "Macarooz",
      category: "Packaging",
      thumbnailUrl: "/uploads/macarooz-thumb.gif",
      externalUrl: "",
      hasCaseStudy: false,
      visible: true,
      order: 5,
    },
    {
      slug: "social-academy",
      clientName: "Social Academy",
      category: "Web Design and Developemt",
      thumbnailUrl: "/uploads/social-academy-thumb.png",
      externalUrl: "https://www.thesocialacademy.com/",
      hasCaseStudy: false,
      visible: false,
      order: 6,
    },
  ];
  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
