-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'OTHER',
    "dateOfBirth" TIMESTAMP(3),
    "bio" TEXT,
    "institution" TEXT,
    "totalCourses" INTEGER NOT NULL DEFAULT 0,
    "completedCourses" INTEGER NOT NULL DEFAULT 0,
    "totalCertificates" INTEGER NOT NULL DEFAULT 0,
    "expertise" TEXT,
    "experience" INTEGER,
    "yearsExperience" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");
