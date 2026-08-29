-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "heroHeadline" TEXT NOT NULL DEFAULT 'UX/UI Designer + Developer',
    "heroImageUrl" TEXT NOT NULL DEFAULT '',
    "heroTag1" TEXT NOT NULL DEFAULT '',
    "heroTag2" TEXT NOT NULL DEFAULT '',
    "heroTag3" TEXT NOT NULL DEFAULT '',
    "aboutTag" TEXT NOT NULL DEFAULT '',
    "aboutHeading" TEXT NOT NULL DEFAULT '',
    "aboutText" TEXT NOT NULL DEFAULT '',
    "aboutImage1Url" TEXT NOT NULL DEFAULT '',
    "aboutImage2Url" TEXT NOT NULL DEFAULT '',
    "videoUrl" TEXT NOT NULL DEFAULT '',
    "videoWebmUrl" TEXT NOT NULL DEFAULT '',
    "videoPosterUrl" TEXT NOT NULL DEFAULT '',
    "footerName" TEXT NOT NULL DEFAULT '',
    "footerRole" TEXT NOT NULL DEFAULT '',
    "footerPhotoUrl" TEXT NOT NULL DEFAULT '',
    "footerBlurb" TEXT NOT NULL DEFAULT '',
    "footerPhone" TEXT NOT NULL DEFAULT '',
    "footerEmail" TEXT NOT NULL DEFAULT '',
    "footerLinkedin" TEXT NOT NULL DEFAULT '',
    "footerInstagram" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quote" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '',
    "thumbnailUrl" TEXT NOT NULL DEFAULT '',
    "badgeUrl" TEXT NOT NULL DEFAULT '',
    "externalUrl" TEXT NOT NULL DEFAULT '',
    "hasCaseStudy" BOOLEAN NOT NULL DEFAULT false,
    "caseStudyIntro" TEXT NOT NULL DEFAULT '',
    "caseStudyContent" TEXT NOT NULL DEFAULT '',
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
