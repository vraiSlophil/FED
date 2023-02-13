-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 21 déc. 2022 à 14:01
-- Version du serveur : 10.6.11-MariaDB-0ubuntu0.22.04.1
-- Version de PHP : 7.4.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `FED`
--

-- --------------------------------------------------------

--
-- Structure de la table `authorized_themes`
--

CREATE TABLE `authorized_themes` (
                                     `authorized_theme_id` int(11) NOT NULL,
                                     `theme_id` int(11) NOT NULL,
                                     `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
                         `task_id` int(11) NOT NULL,
                         `title` varchar(255) NOT NULL,
                         `user_id` int(11) NOT NULL,
                         `theme_id` int(11) NOT NULL,
                         `task_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `themes`
--

CREATE TABLE `themes` (
                          `theme_id` int(11) NOT NULL,
                          `author_id` int(11) DEFAULT NULL,
                          `theme_name` varchar(255) NOT NULL,
                          `theme_color` char(7) NOT NULL DEFAULT '#FAEAB1' CHECK (`theme_color` regexp '^#[a-fA-F0-9]{6}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
                         `user_id` int(11) NOT NULL,
                         `username` varchar(24) NOT NULL,
                         `password` varchar(64) NOT NULL,
                         `salt` varchar(255) NOT NULL,
                         `email` varchar(64) NOT NULL,
                         `first_name` varchar(32) DEFAULT NULL,
                         `last_name` varchar(32) DEFAULT NULL,
                         `profile_picture_url` text DEFAULT 'images/profile_picture/identifier.png' NOT NULL
) ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `authorized_themes`
--
ALTER TABLE `authorized_themes`
    ADD PRIMARY KEY (`authorized_theme_id`),
    ADD KEY `theme_id` (`theme_id`),
    ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `tasks`
--
ALTER TABLE `tasks`
    ADD PRIMARY KEY (`task_id`),
    ADD KEY `user_id` (`user_id`),
    ADD KEY `theme_id` (`theme_id`);

--
-- Index pour la table `themes`
--
ALTER TABLE `themes`
    ADD PRIMARY KEY (`theme_id`),
    ADD KEY `author_id` (`author_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`user_id`),
    ADD UNIQUE KEY `username` (`username`),
    ADD UNIQUE KEY `salt` (`salt`),
    ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `authorized_themes`
--
ALTER TABLE `authorized_themes`
    MODIFY `authorized_theme_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
    MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `themes`
--
ALTER TABLE `themes`
    MODIFY `theme_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
    MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `authorized_themes`
--
ALTER TABLE `authorized_themes`
    ADD CONSTRAINT `authorized_themes_ibfk_1` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`theme_id`),
    ADD CONSTRAINT `authorized_themes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Contraintes pour la table `tasks`
--
ALTER TABLE `tasks`
    ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
    ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`theme_id`);

--
-- Contraintes pour la table `themes`
--
ALTER TABLE `themes`
    ADD CONSTRAINT `themes_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
