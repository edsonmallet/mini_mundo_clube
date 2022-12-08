-- CreateTable
CREATE TABLE "Companies" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "fancyName" TEXT NOT NULL,
    "corporateName" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Users" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "preRegisterDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokePreRegister" TEXT,
    "registerDate" DATETIME,
    "tokenDiscount" TEXT,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "birthDate" DATETIME,
    "parentUuid" TEXT,
    "walletUuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Users_parentUuid_fkey" FOREIGN KEY ("parentUuid") REFERENCES "Users" ("uuid") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Users_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "wallets" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "wallets" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "textContract" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "beneficts" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "walletUuid" TEXT NOT NULL,
    CONSTRAINT "beneficts_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "wallets" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_document_key" ON "Users"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
