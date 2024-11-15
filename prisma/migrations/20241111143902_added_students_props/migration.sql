/*
  Warnings:

  - A unique constraint covering the columns `[tel]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kbis` to the `Ecole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adresse` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cp` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pays` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexe` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ville` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ecole" ADD COLUMN     "kbis" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "adresse" TEXT NOT NULL,
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "cp" TEXT NOT NULL,
ADD COLUMN     "pays" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "sexe" TEXT NOT NULL,
ADD COLUMN     "tel" TEXT NOT NULL,
ADD COLUMN     "ville" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_tel_key" ON "Utilisateur"("tel");
