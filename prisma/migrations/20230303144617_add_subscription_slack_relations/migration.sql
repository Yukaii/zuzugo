-- CreateTable
CREATE TABLE "SlackInstallationToSubscription" (
    "id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "houseSubscriptionId" TEXT NOT NULL,

    CONSTRAINT "SlackInstallationToSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseSubscription" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,

    CONSTRAINT "HouseSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SlackInstallationToSubscription_channel_id_houseSubscriptio_key" ON "SlackInstallationToSubscription"("channel_id", "houseSubscriptionId");

-- AddForeignKey
ALTER TABLE "SlackInstallationToSubscription" ADD CONSTRAINT "SlackInstallationToSubscription_houseSubscriptionId_fkey" FOREIGN KEY ("houseSubscriptionId") REFERENCES "HouseSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
