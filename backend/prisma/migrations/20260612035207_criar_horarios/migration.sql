-- CreateTable
CREATE TABLE `Horario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa` VARCHAR(191) NOT NULL,
    `origem` VARCHAR(191) NOT NULL,
    `destino` VARCHAR(191) NOT NULL,
    `horario` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
