-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preRegisterDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokePreRegister" TEXT,
    "registerDate" DATETIME,
    "tokenDiscount" TEXT,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "birthDate" DATETIME,
    "isAdminCompany" BOOLEAN NOT NULL DEFAULT false,
    "parentUuid" TEXT,
    "walletUuid" TEXT NOT NULL,
    "companyUuid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Users_parentUuid_fkey" FOREIGN KEY ("parentUuid") REFERENCES "Users" ("uuid") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Users_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "wallets" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Users_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "Companies" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("birthDate", "companyUuid", "createdAt", "deletedAt", "document", "email", "isActivated", "name", "parentUuid", "password", "preRegisterDate", "registerDate", "tokePreRegister", "tokenDiscount", "updatedAt", "uuid", "walletUuid") SELECT "birthDate", "companyUuid", "createdAt", "deletedAt", "document", "email", "isActivated", "name", "parentUuid", "password", "preRegisterDate", "registerDate", "tokePreRegister", "tokenDiscount", "updatedAt", "uuid", "walletUuid" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_document_key" ON "Users"("document");
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
