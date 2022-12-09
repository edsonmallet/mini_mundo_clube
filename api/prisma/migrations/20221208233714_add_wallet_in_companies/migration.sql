/*
  Warnings:

  - Added the required column `companyUuid` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_wallets" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "textContract" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "companyUuid" TEXT NOT NULL,
    CONSTRAINT "wallets_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "Companies" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_wallets" ("createdAt", "deletedAt", "textContract", "updatedAt", "uuid", "version") SELECT "createdAt", "deletedAt", "textContract", "updatedAt", "uuid", "version" FROM "wallets";
DROP TABLE "wallets";
ALTER TABLE "new_wallets" RENAME TO "wallets";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
