-- CreateTable
CREATE TABLE "Instance" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "banner" TEXT NOT NULL,

    CONSTRAINT "Instance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instance_domain_key" ON "Instance"("domain");
