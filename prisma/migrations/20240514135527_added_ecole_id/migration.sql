/*
  Warnings:

  - Added the required column `ecoleId` to the `Formation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Formation" DROP CONSTRAINT "Formation_id_fkey";

-- AlterTable
ALTER TABLE "Formation" ADD COLUMN     "ecoleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Formation" ADD CONSTRAINT "Formation_ecoleId_fkey" FOREIGN KEY ("ecoleId") REFERENCES "Ecole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
