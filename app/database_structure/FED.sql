DROP DATABASE IF EXISTS `FED`;
CREATE DATABASE IF NOT EXISTS `FED` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `FED`;

DROP TABLE IF EXISTS `authorized_themes`;
CREATE TABLE IF NOT EXISTS `authorized_themes` (
                                     `authorized_theme_id` int(11) NOT NULL,
                                     `theme_id` int(11) NOT NULL,
                                     `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
                         `task_id` int(11) NOT NULL,
                         `title` varchar(255) NOT NULL,
                         `user_id` int(11) NOT NULL,
                         `theme_id` int(11) NOT NULL,
                         `task_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `themes`;
CREATE TABLE IF NOT EXISTS `themes` (
                          `theme_id` int(11) NOT NULL,
                          `author_id` int(11) DEFAULT NULL,
                          `theme_name` varchar(255) NOT NULL DEFAULT 'Nouveau thème',
                          `theme_color` char(7) NOT NULL DEFAULT '#DDDDDD' CHECK (`theme_color` regexp '^#[a-fA-F0-9]{6}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
                         `user_id` int(11) NOT NULL,
                         `username` varchar(24) NOT NULL,
                         `password` varchar(64) NOT NULL,
                         `salt` varchar(255) NOT NULL,
                         `email` varchar(64) NOT NULL,
                         `first_name` varchar(32) DEFAULT NULL,
                         `last_name` varchar(32) DEFAULT NULL,
                         `profile_picture_url` text DEFAULT 'images/profile_picture/identifier.png' NOT NULL
);

ALTER TABLE `authorized_themes`
    ADD PRIMARY KEY (`authorized_theme_id`),
    ADD KEY `theme_id` (`theme_id`),
    ADD KEY `user_id` (`user_id`);

ALTER TABLE `tasks`
    ADD PRIMARY KEY (`task_id`),
    ADD KEY `user_id` (`user_id`),
    ADD KEY `theme_id` (`theme_id`);

ALTER TABLE `themes`
    ADD PRIMARY KEY (`theme_id`),
    ADD KEY `author_id` (`author_id`);

ALTER TABLE `users`
    ADD PRIMARY KEY (`user_id`),
    ADD UNIQUE KEY `username` (`username`),
    ADD UNIQUE KEY `salt` (`salt`),
    ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `authorized_themes`
    MODIFY `authorized_theme_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tasks`
    MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `themes`
    MODIFY `theme_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
    MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `authorized_themes`
    ADD CONSTRAINT `authorized_themes_ibfk_1` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`theme_id`),
    ADD CONSTRAINT `authorized_themes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `tasks`
    ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
    ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`theme_id`);

ALTER TABLE `themes`
    ADD CONSTRAINT `themes_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;
