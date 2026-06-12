-- CreateTable
CREATE TABLE `Quarto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospede` VARCHAR(191) NOT NULL,
    `dataEntrada` DATETIME(3) NOT NULL,
    `dataSaida` DATETIME(3) NOT NULL,
    `quartoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_quartoId_fkey` FOREIGN KEY (`quartoId`) REFERENCES `Quarto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
