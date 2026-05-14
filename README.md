# Finance Tracker API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge)

API RESTful pour la gestion de finances personnelles — suivi des dépenses et revenus, catégorisation des transactions, multi-comptes et statistiques agrégées.

Projet construit **from scratch** pour maîtriser l'architecture backend en couches, la modélisation de données relationnelle normalisée et l'écriture de requêtes SQL complexes avec un ORM typé.

---

## Fonctionnalités

- **Authentification JWT** — inscription, connexion, routes protégées, suppression de compte
- **Multi-comptes** — chaque utilisateur gère plusieurs comptes (courant, épargne...)
- **Catégories personnalisables** — CRUD complet, liées à l'utilisateur
- **Transactions** — CRUD complet, chaque transaction est typée (`income` / `expense`), datée, liée à un compte et optionnellement à une catégorie
- **Statistiques** — solde net calculé par l'API sur une plage de dates (année, ou mois précis)
- **Validation des données** — chaque endpoint valide ses entrées via des schémas Zod avant d'atteindre la base

---

## Architecture

Le projet suit une architecture en couches stricte, sans logique métier dans les contrôleurs :

```
src/
├── routes/         # Définition des endpoints, ordre des middlewares
├── controllers/    # Parsing de la requête HTTP, délègue au service
├── services/       # Logique métier et requêtes DB (Drizzle ORM)
├── schemas/        # Schémas Zod (validation + inférence des types DTO)
├── middlewares/    # auth (JWT), validation (Zod), erreurs globales
└── db/
    ├── schema.ts   # Définition des tables (source de vérité)
    └── index.ts    # Connexion Drizzle + PostgreSQL
```

---

## Stack technique

| Couche | Technologie |
|---|---|
| Langage | TypeScript (ESM) |
| Framework | Express 5 |
| Base de données | PostgreSQL (via Docker Compose) |
| ORM | Drizzle ORM |
| Validation | Zod v4 |
| Auth | JWT + bcrypt |
| Dev | Nodemon + ts-node |
| Migrations | Drizzle Kit |

---

## Endpoints

Toutes les routes sont préfixées par `/api`.

### Auth — `/api/users`

| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/register` | Non | Création de compte (email + password hashé bcrypt) |
| GET | `/login` | Non | Connexion — retourne un JWT |
| GET | `/me` | JWT | Infos de l'utilisateur connecté |
| DELETE | `/:id` | JWT | Suppression de compte |

### Comptes — `/api/accounts`

| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/` | JWT | Créer un compte |
| GET | `/` | JWT | Lister ses comptes |

### Catégories — `/api/category`

| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/` | JWT | Créer une catégorie |
| GET | `/` | JWT | Lister ses catégories |
| PATCH | `/:id` | JWT | Modifier une catégorie |
| DELETE | `/:id` | JWT | Supprimer une catégorie |

### Transactions — `/api/transaction`

| Méthode | Route | Auth | Description |
|---|---|---|---|
| POST | `/` | JWT | Créer une transaction (`income` ou `expense`) |
| GET | `/` | JWT | Lister toutes ses transactions |
| PATCH | `/:id` | JWT | Modifier une transaction |
| DELETE | `/:id` | JWT | Supprimer une transaction |

### Statistiques — `/api/stats`

| Méthode | Route | Auth | Params | Description |
|---|---|---|---|---|
| GET | `/` | JWT | `?year=2025&month=5` (month optionnel) | Solde net + liste des transactions sur la période |

---

## Démarrage rapide

### Prérequis

- Node.js v18+
- pnpm (ou npm)
- Docker + Docker Compose

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-user/finance-tracker-api.git
cd finance-tracker-api

# 2. Installer les dépendances
pnpm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# 4. Lancer la base de données
docker-compose up -d

# 5. Appliquer les migrations
pnpm db:migrate

# 6. Démarrer le serveur
pnpm dev
```

L'API tourne sur `http://localhost:3000`.

---

## Variables d'environnement

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=finance_db

JWT_SECRET=your_long_secret_key
```

---

## Modèle de données

```
users
  id, email (unique), password_hash, role, created_at

accounts
  id, name, user_id → users(id)

categories
  id, name, user_id → users(id)

transactions
  id, amount, type (income|expense), description, transaction_date
  user_id → users(id)
  account_id → accounts(id)
  category_id → categories(id) (nullable)
```

Les suppressions en cascade sont gérées au niveau DB (Drizzle `onDelete`).
