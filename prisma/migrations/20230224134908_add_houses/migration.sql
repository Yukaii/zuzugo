-- CreateTable
CREATE TABLE "House" (
    "id" SERIAL NOT NULL,
    "pk" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "House_pk_key" ON "House"("pk");
