-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
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
    "caseStudyTimeframe" TEXT NOT NULL DEFAULT '',
    "caseStudyRole" TEXT NOT NULL DEFAULT '',
    "caseStudyScope" TEXT NOT NULL DEFAULT '',
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("badgeUrl", "caseStudyContent", "caseStudyIntro", "category", "clientName", "createdAt", "externalUrl", "hasCaseStudy", "id", "order", "slug", "thumbnailUrl", "updatedAt", "visible") SELECT "badgeUrl", "caseStudyContent", "caseStudyIntro", "category", "clientName", "createdAt", "externalUrl", "hasCaseStudy", "id", "order", "slug", "thumbnailUrl", "updatedAt", "visible" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
