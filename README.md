# Comment s'habiller ? 👔

Application SaaS de recommandations vestimentaires basée sur la météo, construite avec une architecture Clean/Hexagonale stricte.

## 🏗️ Architecture

Ce projet suit les principes de l'architecture Clean/Hexagonale :

- **Domain Layer** (`src/core/domain/`) : Logique métier pure, sans dépendances externes
- **Ports** (`src/core/ports/`) : Interfaces définissant les contrats
- **Use Cases** (`src/core/usecases/`) : Orchestration de la logique métier
- **Infrastructure** (`src/infra/`) : Adapters implémentant les ports (OpenWeather API)
- **UI** (`src/ui/`) : Composants réutilisables
- **Features** (`src/features/`) : Composants métier spécifiques
- **App** (`src/app/`) : Pages et routes API Next.js

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20+
- npm ou yarn
- Clé API OpenWeatherMap (gratuite sur [openweathermap.org](https://openweathermap.org/api))

### Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.local.example .env.local

# Éditer .env.local et ajouter votre clé API
# OPENWEATHER_API_KEY=votre_clé_ici
```

### Lancement

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🧪 Tests

```bash
# Tests unitaires
npm run test:unit

# Tests E2E
npm run test:e2e

# Vérification TypeScript
npm run type-check

# Linter
npm run lint
```

## 📁 Structure du projet

```
src/
├── shared/              # Utilitaires partagés
├── core/                # Couche Domain
│   ├── domain/          # Types et logique métier
│   ├── ports/           # Interfaces
│   └── usecases/        # Cas d'usage
├── infra/               # Adapters
├── ui/                  # Composants UI
├── features/            # Composants métier
└── app/                 # Next.js App Router
```

## 🎯 Fonctionnalités

- ✅ Recommandations vestimentaires personnalisées
- ✅ Prise en compte de la frilosité personnelle
- ✅ Prévisions météo sur 5 jours
- ✅ Visualisation mannequin SVG
- ✅ Rate limiting (30 req/h)
- ✅ Système de déblocage par publicité (24h)
- ✅ Première utilisation gratuite

## 🔧 Technologies

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Validation** : Zod
- **Tests** : Vitest + Playwright
- **API** : OpenWeatherMap

## 📝 Variables d'environnement

```env
OPENWEATHER_API_KEY=your_api_key_here
NODE_ENV=development
```

## 🏛️ Principes architecturaux

### Séparation des responsabilités

- **Domain** : Logique métier pure (fonctions pures, déterministes)
- **Ports** : Abstraction des services externes
- **Infrastructure** : Implémentations concrètes
- **UI** : Présentation uniquement

### Testabilité

- Tests unitaires sur la logique métier
- Tests d'intégration avec fake adapters
- Tests E2E avec Playwright

### Évolutivité

- Facile d'ajouter de nouveaux providers météo
- Architecture modulaire et extensible
- Types stricts TypeScript

## 📄 License

MIT

## 👨‍💻 Auteur

Projet généré avec architecture Clean/Hexagonale
