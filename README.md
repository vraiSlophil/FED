# FED - To-do List

Une application de gestion de tâches simple et efficace.

## Table des matières

1. [Description](#description)
2. [Installation](#installation)
3. [Contribuer](#contribuer)
4. [Crédits](#crédits)

## Description

FED est une application de gestion de tâches qui permet aux utilisateurs de créer, modifier, supprimer et organiser leurs tâches par thèmes. Elle offre une interface utilisateur intuitive et des fonctionnalités collaboratives.

## Installation

### Prérequis

Assure-toi que ces outils sont installés :
- PHP (version 7.4 ou supérieure)
- MySQL
- Un serveur web (comme Apache ou Nginx)

### Instructions

1. Clone le projet :
   ```bash
   git clone https://github.com/vraiSlophil/FED.git
   ```

2. Configure la base de données :
   - Crée une base de données MySQL.
   - Importe le fichier `app/database_structure/FED.sql` dans ta base de données.
3. Configure les informations de connexion à la base de données dans `app/database_info.php`.
4. Lance le serveur web et accède à l'application via ton navigateur.

## Contribuer

Si tu veux contribuer à ce projet, voici comment faire :

1. Fork le repository.
2. Crée une branche (`git checkout -b feature/nouvelle-fonctionnalité`).
3. Fais tes modifications et ajoute des tests.
4. Commit tes changements.
5. Ouvre une pull request.

## Crédits

- [vraiSlophil](https://github.com/vraiSlophil) pour l'idée de base du projet et le développement principal.
- [Contributeurs](https://github.com/vraiSlophil/FED/graphs/contributors) pour leurs contributions et améliorations.
