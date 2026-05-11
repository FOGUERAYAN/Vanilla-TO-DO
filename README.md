### 🚀 Project 0 — Vanilla Todo HTTP API

Bienvenue dans le **Project 0**, une API REST de gestion de tâches (Todos) conçue comme un modèle d'industrialisation backend. Ce projet met l'accent sur la **rigueur technique**, la **sécurité des types** et la **fiabilité** via des tests automatisés.

---

## 🛠️ Stack Technique

* **Runtime** : Node.js (v22+)
* **Framework** : Express 5 (Gestion native des erreurs asynchrones)
* **Langage** : TypeScript (Mode ultra-strict)
* **Validation** : Zod (Parsing et typage à l'entrée)
* **Logging** : Pino & Pino-HTTP (Logs structurés JSON)
* **Sécurité** : Helmet.js
* **Tests** : Jest (Unitaires) & Playwright (E2E)

---

## 📋 Prérequis

* **Node.js** : v22.0.0 ou supérieur
* **npm** : v10.0.0 ou supérieur

---

## ⚙️ Installation et Lancement

1.  **Installer les dépendances** :
    ```bash
    npm install
    ```
2.  **Lancer en mode développement** (avec auto-reload) :
    ```bash
    npm run dev
    ```
3.  **Lancer en production** :
    ```bash
    npm run build
    ```
    ```bash
    npm start
    ```

---

## 🧪 Stratégie de Tests

Le projet suit une pyramide de tests rigoureuse :

* **Tests Unitaires (Jest)** : Vérification de la logique de filtrage, de tri et des schémas de validation.
    ```bash
    npm test
    ```
* **Tests End-to-End (Playwright)** : Simulation de scénarios réels sur l'API HTTP (CRUD complet, cas d'erreurs 400/404).
    ```bash
    npm run test:e2e
    ```
* **Vérification statique** :
    ```bash
    npm run typecheck  # Vérifie les types TS sans compiler
    npm run lint       # Vérifie la qualité et le style du code
    ```

---

## 🏗️ Architecture et Design Decisions

### 1. Pourquoi Express 5 ?
Nous utilisons la version 5 pour sa gestion native de la **propagation des erreurs asynchrones**. Contrairement à la v4, les erreurs dans les handlers `async` sont automatiquement capturées et envoyées au middleware d'erreur global sans avoir besoin de blocs `try/catch` répétitifs.

### 2. Pourquoi "No Layers" ?
Pour ce projet, nous avons appliqué le principe **YAGNI** (You Ain't Gonna Need It). Au lieu d'une architecture complexe en couches (Controller/Service/Repository/Database), la logique est centralisée par domaine. Cela réduit la complexité cognitive tout en restant facile à faire évoluer vers une base de données réelle.

### 3. "Parse-inside-handler" vs Middleware
La validation Zod est effectuée directement dans le handler (`Schema.parse`).
* **Avantage** : C'est explicite et cela garantit que TypeScript connaît instantanément le type de `req.body` dès que la ligne de validation est passée.

### 4. Test-mode Reset
Pour garantir l'**idempotence** des tests E2E, une route `POST /__test__/reset` est exposée uniquement lorsque `NODE_ENV === 'test'`. Elle permet de remettre le stockage en mémoire à zéro avant chaque scénario de test.

---

## 🛣️ API Contract (Résumé)

| Méthode | Chemin | Description | Succès |
| :--- | :--- | :--- | :--- |
| **GET** | `/health` | Vérification de l'état du serveur | 200 |
| **GET** | `/todos` | Liste les todos (filtres: `completed`, `search`) | 200 |
| **POST** | `/todos` | Crée un nouveau todo | 201 |
| **GET** | `/todos/:id` | Récupère un todo par son ID | 200 |
| **PATCH** | `/todos/:id` | Modifie un titre ou un statut | 200 |
| **DELETE** | `/todos/:id` | Supprime un todo | 204 |

**Format d'erreur standard :**
```json
{
  "error": "Nom de l'erreur",
  "details": "Détails optionnels (ex: champs manquants)"
}
```

---

## 🐳 Docker & CI/CD

* **Dockerfile** : Build multi-stage (Builder -> Runner) pour une image ultra-légère. L'application tourne sous un utilisateur non-root pour une sécurité maximale.
* **GitHub Actions** : Un workflow CI automatique exécute le linting, le typechecking et l'intégralité des tests (Unit + E2E) à chaque Pull Request ou Push sur `main`.

---

## 📂 Structure du Projet

```text
project-0/
├── src/
│   ├── app.ts              # Configuration d'Express et middlewares
│   ├── server.ts           # Point d'entrée (Listen & Graceful Shutdown)
│   ├── store.ts            # Stockage In-memory (Map)
│   ├── schemas.ts          # Contrats Zod et types inférés
│   ├── helpers.ts          # Logique de tri et filtrage
│   ├── middleware/         # Gestionnaire d'erreurs global
│   └── routes/             # Endpoints de l'API
├── tests/                  # Tests Unitaires et E2E
├── Dockerfile              # Image de production
└── .github/workflows/      # Automatisation CI/CD
```

---

**Développé par Rayan Junior Fogue - 2026**