-- CreateTable
CREATE TABLE `posts` (
    `id` VARCHAR(255) NOT NULL,
    `content` MEDIUMTEXT NULL,
    `user_id` INTEGER NULL,
    `upload_date` VARCHAR(19) NULL,
    `username` VARCHAR(255) NULL,
    `user_avatar` VARCHAR(255) NULL DEFAULT 'https://github.com/shadcn.png',

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_avatar` VARCHAR(255) NULL DEFAULT 'https://github.com/shadcn.png',

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

