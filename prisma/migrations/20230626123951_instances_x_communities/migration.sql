-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "instanceId" INTEGER;

-- AddForeignKey
ALTER TABLE "Community" ADD CONSTRAINT "Community_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "Instance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
