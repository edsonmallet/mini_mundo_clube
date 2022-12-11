/*
  Warnings:

  - You are about to drop the column `value` on the `beneficts` table. All the data in the column will be lost.
  - You are about to drop the column `walletUuid` on the `beneficts` table. All the data in the column will be lost.
  - Added the required column `defaultDiscount` to the `beneficts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "walletsBeneficts" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "walletUuid" TEXT NOT NULL,
    "benefictsUuid" TEXT NOT NULL,
    "realDiscount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "walletsBeneficts_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "wallets" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "walletsBeneficts_benefictsUuid_fkey" FOREIGN KEY ("benefictsUuid") REFERENCES "beneficts" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_beneficts" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "defaultDiscount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_beneficts" ("createdAt", "deletedAt", "description", "name", "updatedAt", "uuid") SELECT "createdAt", "deletedAt", "description", "name", "updatedAt", "uuid" FROM "beneficts";
DROP TABLE "beneficts";
ALTER TABLE "new_beneficts" RENAME TO "beneficts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
