-- CreateTable
CREATE TABLE "companies" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fancyName" TEXT NOT NULL,
    "corporateName" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "preRegisterDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokePreRegister" TEXT,
    "registerDate" TIMESTAMP(3),
    "tokenDiscount" TEXT,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "birthDate" TIMESTAMP(3),
    "isAdminCompany" BOOLEAN NOT NULL DEFAULT false,
    "parentUuid" TEXT,
    "walletUuid" TEXT NOT NULL,
    "companyUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "wallets" (
    "uuid" TEXT NOT NULL,
    "textContract" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "companyUuid" TEXT NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "walletsBeneficts" (
    "uuid" TEXT NOT NULL,
    "walletUuid" TEXT NOT NULL,
    "benefictsUuid" TEXT NOT NULL,
    "realDiscount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "walletsBeneficts_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "beneficts" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "defaultDiscount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "beneficts_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_document_key" ON "users"("document");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "beneficts_slug_key" ON "beneficts"("slug");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_parentUuid_fkey" FOREIGN KEY ("parentUuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "wallets"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "companies"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "companies"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "walletsBeneficts" ADD CONSTRAINT "walletsBeneficts_walletUuid_fkey" FOREIGN KEY ("walletUuid") REFERENCES "wallets"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "walletsBeneficts" ADD CONSTRAINT "walletsBeneficts_benefictsUuid_fkey" FOREIGN KEY ("benefictsUuid") REFERENCES "beneficts"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
