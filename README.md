## ESIR2 JXT - Projet Programmation Serveur Web

## Description
Ce projet consiste en la partie back-end d'une application censée gérer une base de données d'utilisateurs, d'associations et de leurs relations. Ce projet a aussi servi d'approche pratique au langage Typescript ainsi que de premier projet backend pour nous. Ce backend ce centre sur la gestion des utilisateurs et des associations auxquelles ils appartiennent a travers l'utilisations de controlleurs, services et dépôts. Grâce à une base de données, nous pouvons gérer la création, la modification, la suppression et la récupération des utilisateurs et des associations. Le front-end de cette application est inexistant, la manipulation des données ce feras a travers de commandes `curl` passer par un terminal, ou même par SwaggerUI pour certaines commandes non securisés.

# Sommaire
* [Organisation](#organisation)
* [Installation](#installation)
* [Usage](#usage)

## Organisation
Les principaux fichiers .ts sont stockés dans le dossier src.

## Installation
Installez npm, installez NodeJS, installez NestJS et clonez ce dépôt

Dans un terminal: 
cd dans fr-administration et installer les dépendances avec npm
```
cd ./fr-administration 
npm install
```


## Usage
Dans un terminal: 
cd dans fr-administration et exécutez le backend
```
cd ./fr-administration 
npm run start
```
Une fois lancer, pour jeter un œil aux commandes, utilisez le http://localhost:3000/api/, l'interface OpenAPI devrait vous informer sur les commandes possibles.

Sachez que les commandes nécessitant la transmission d'un id en tant que paramètre sont protégées et nécessiteront une autorisation via un jeton d'accès fourni par la requête login.

`curl -X POST http://localhost:3000/auth/login -d 'username=id_of_user&password=valid_password' -v` 
(avec id_of_user et valid_password des variables a choisir).



## Auteurs
Ce projet a été réalisé par Miguel Condori et Touadia Kone, en suivant le dépôt [WebServer-course](https://github.com/stephaniechallita/WebServer-course) fait par Stéphanie Challita et Benjamin Danglot.
