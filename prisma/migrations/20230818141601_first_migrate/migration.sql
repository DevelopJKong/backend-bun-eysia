-- CreateEnum
CREATE TYPE "RoleData" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "address" VARCHAR(255),
    "avatarUrl" VARCHAR(255),
    "role" "RoleData" NOT NULL DEFAULT 'USER',
    "refreshToken" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
