# Structure du projet "Comment s'habiller"

## Architecture Clean/Hexagonale

```
outfit k2-5/
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.local.example
│
├── src/
│   ├── shared/                          # Utilitaires partagés
│   │   ├── env.ts                       # Validation des variables d'environnement
│   │   ├── errors.ts                    # Classes d'erreurs métier
│   │   └── time.ts                      # Utilitaires de temps
│   │
│   ├── core/                            # Couche Domain (logique métier pure)
│   │   ├── domain/
│   │   │   ├── weather/
│   │   │   │   └── types.ts             # Types météo
│   │   │   └── outfit/
│   │   │       ├── types.ts             # Types tenue vestimentaire
│   │   │       ├── rules.ts             # Règles métier (pure functions)
│   │   │       └── recommendOutfit.ts   # Fonction principale de recommandation
│   │   │
│   │   ├── ports/                       # Interfaces (contrats)
│   │   │   ├── WeatherPort.ts           # Interface service météo
│   │   │   └── GeoPort.ts               # Interface géocodage
│   │   │
│   │   └── usecases/                    # Cas d'usage (orchestration)
│   │       └── getOutfitRecommendation.ts
│   │
│   ├── infra/                           # Couche Infrastructure (adapters)
│   │   ├── weather/
│   │   │   └── OpenWeatherAdapter.ts    # Implémentation OpenWeather API
│   │   └── geo/
│   │       └── OpenWeatherGeoAdapter.ts # Implémentation Geocoding API
│   │
│   ├── ui/                              # Composants UI réutilisables
│   │   └── components/
│   │       ├── Button.tsx
│   │       ├── Slider.tsx
│   │       ├── Toggle.tsx
│   │       ├── DateRangePicker.tsx
│   │       ├── LocationInput.tsx
│   │       ├── AdSlot.tsx
│   │       ├── MannequinView.tsx
│   │       ├── OutfitList.tsx
│   │       └── ErrorBanner.tsx
│   │
│   ├── features/                        # Composants métier (features)
│   │   └── outfit/
│   │       ├── useOutfitRecommendation.ts  # Hook React
│   │       ├── OutfitForm.tsx              # Formulaire de saisie
│   │       └── OutfitResult.tsx            # Affichage résultat
│   │
│   └── app/                             # Next.js App Router
│       ├── page.tsx                     # Page d'accueil
│       ├── settings/
│       │   └── page.tsx                 # Page paramètres
│       ├── layout.tsx                   # Layout racine
│       ├── globals.css                  # Styles globaux
│       └── api/                         # Routes API
│           ├── weather/
│           │   ├── health/
│           │   │   └── route.ts         # Health check météo
│           │   └── forecast/
│           │       └── route.ts         # Récupération prévisions
│           └── outfit/
│               └── route.ts             # Endpoint recommandation
│
├── tests/                               # Tests
│   ├── unit/
│   │   └── core/
│   │       └── domain/
│   │           └── outfit/
│   │               ├── rules.test.ts
│   │               └── recommendOutfit.test.ts
│   ├── integration/
│   │   └── api/
│   │       └── outfit.integration.test.ts
│   └── e2e/
│       └── recommendation.spec.ts
│
└── public/                              # Assets statiques
    ├── favicon.ico
    └── images/

```

## Principes d'architecture

### 1. **Couche Domain (core/domain/)**
- **Logique métier pure** : aucune dépendance externe
- Fonctions pures, déterministes, testables
- Types métier (Weather, Outfit, ClothingItem, etc.)
- Règles de calcul (température ressentie, catégorisation, génération items)

### 2. **Ports (core/ports/)**
- **Interfaces** définissant les contrats
- Abstraction des services externes (météo, géocodage)
- Permet l'inversion de dépendance

### 3. **Use Cases (core/usecases/)**
- **Orchestration** de la logique métier
- Coordination entre domain et ports
- Validation des entrées

### 4. **Infrastructure (infra/)**
- **Adapters** implémentant les ports
- Communication avec APIs externes (OpenWeather)
- Détails techniques isolés

### 5. **UI (ui/components/)**
- Composants **réutilisables** et génériques
- Pas de logique métier
- Design system cohérent

### 6. **Features (features/)**
- Composants **métier spécifiques**
- Hooks React pour state management
- Assemblage des composants UI

### 7. **App (app/)**
- **Next.js App Router**
- Pages et routes API
- Point d'entrée de l'application

## Flux de données

```
User Input (app/page.tsx)
    ↓
Feature Component (features/outfit/OutfitForm.tsx)
    ↓
Hook (features/outfit/useOutfitRecommendation.ts)
    ↓
API Route (app/api/outfit/route.ts)
    ↓
Use Case (core/usecases/getOutfitRecommendation.ts)
    ↓
Ports (core/ports/WeatherPort.ts, GeoPort.ts)
    ↓
Adapters (infra/weather/OpenWeatherAdapter.ts)
    ↓
Domain Logic (core/domain/outfit/recommendOutfit.ts)
    ↓
Response → UI (features/outfit/OutfitResult.tsx)
```

## Avantages de cette structure

✅ **Testabilité** : Logique métier isolée et testable unitairement  
✅ **Maintenabilité** : Séparation claire des responsabilités  
✅ **Évolutivité** : Facile d'ajouter de nouveaux adapters (autre API météo)  
✅ **Indépendance** : Domain ne dépend d'aucune technologie externe  
✅ **Réutilisabilité** : Composants UI génériques  
✅ **Scalabilité** : Architecture prête pour croissance

## Fichiers de configuration

- `package.json` : Dépendances et scripts
- `tsconfig.json` : Configuration TypeScript
- `next.config.js` : Configuration Next.js
- `tailwind.config.js` : Configuration Tailwind CSS
- `.env.local.example` : Template variables d'environnement
- `vitest.config.ts` : Configuration tests unitaires
- `playwright.config.ts` : Configuration tests E2E
