# Guide de placement des fichiers

## 📋 Checklist de placement du code

### ✅ Configuration & Shared

- [ ] `package.json` → **Racine du projet**
- [ ] `src/shared/env.ts` → **Validation variables d'environnement**
- [ ] `src/shared/errors.ts` → **Classes d'erreurs métier**
- [ ] `src/shared/time.ts` → **Utilitaires de temps**

---

### ✅ Domain Layer (Logique métier pure)

#### Weather
- [ ] `src/core/domain/weather/types.ts` → **Interface WeatherSnapshot**

#### Outfit
- [ ] `src/core/domain/outfit/types.ts` → **Types: Gender, ClothingCategory, OutfitInput, etc.**
- [ ] `src/core/domain/outfit/rules.ts` → **Règles métier (fonctions pures)**
  - calculateFeelsLike()
  - applyColdTolerance()
  - getTemperatureCategory()
  - generateItems()
  - generateMannequinLayers()
  - calculateConfidence()
  - generateSummary()
- [ ] `src/core/domain/outfit/recommendOutfit.ts` → **Fonction principale de recommandation**

---

### ✅ Ports (Interfaces)

- [ ] `src/core/ports/WeatherPort.ts` → **Interface WeatherPort**
- [ ] `src/core/ports/GeoPort.ts` → **Interface GeoPort**

---

### ✅ Use Cases (Orchestration)

- [ ] `src/core/usecases/getOutfitRecommendation.ts` → **Classe GetOutfitRecommendationUseCase**

---

### ✅ Infrastructure (Adapters)

- [ ] `src/infra/weather/OpenWeatherAdapter.ts` → **Implémentation WeatherPort**
- [ ] `src/infra/geo/OpenWeatherGeoAdapter.ts` → **Implémentation GeoPort**

---

### ✅ API Routes (Next.js App Router)

- [ ] `src/app/api/weather/health/route.ts` → **Health check météo**
- [ ] `src/app/api/weather/forecast/route.ts` → **Récupération prévisions**
- [ ] `src/app/api/outfit/route.ts` → **Endpoint recommandation principale**

---

### ✅ UI Components (Composants réutilisables)

- [ ] `src/ui/components/Button.tsx`
- [ ] `src/ui/components/Slider.tsx`
- [ ] `src/ui/components/Toggle.tsx`
- [ ] `src/ui/components/DateRangePicker.tsx`
- [ ] `src/ui/components/LocationInput.tsx`
- [ ] `src/ui/components/AdSlot.tsx`
- [ ] `src/ui/components/MannequinView.tsx`
- [ ] `src/ui/components/OutfitList.tsx`
- [ ] `src/ui/components/ErrorBanner.tsx`

---

### ✅ Features (Composants métier)

- [ ] `src/features/outfit/useOutfitRecommendation.ts` → **Hook React**
- [ ] `src/features/outfit/OutfitForm.tsx` → **Formulaire de saisie**
- [ ] `src/features/outfit/OutfitResult.tsx` → **Affichage résultat**

---

### ✅ Pages (Next.js)

- [ ] `src/app/page.tsx` → **Page d'accueil**
- [ ] `src/app/settings/page.tsx` → **Page paramètres**

---

### ✅ Tests

#### Tests unitaires
- [ ] `tests/unit/core/domain/outfit/rules.test.ts` → **Tests des règles métier**
- [ ] `tests/unit/core/domain/outfit/recommendOutfit.test.ts` → **Tests recommandation**

#### Tests d'intégration
- [ ] `tests/integration/api/outfit.integration.test.ts` → **Tests API end-to-end**

#### Tests E2E
- [ ] `tests/e2e/recommendation.spec.ts` → **Tests Playwright**

---

## 🎯 Ordre de création recommandé

### Phase 1 : Fondations
1. Configuration projet (`package.json`)
2. Shared utilities (`env.ts`, `errors.ts`, `time.ts`)
3. Types domain (`weather/types.ts`, `outfit/types.ts`)

### Phase 2 : Logique métier
4. Règles métier (`outfit/rules.ts`)
5. Fonction recommandation (`outfit/recommendOutfit.ts`)
6. Ports (`WeatherPort.ts`, `GeoPort.ts`)

### Phase 3 : Infrastructure
7. Adapters (`OpenWeatherAdapter.ts`, `OpenWeatherGeoAdapter.ts`)
8. Use case (`getOutfitRecommendation.ts`)

### Phase 4 : API
9. Routes API (`api/outfit/route.ts`, `api/weather/*/route.ts`)

### Phase 5 : UI
10. Composants UI de base (`Button`, `Slider`, `Toggle`, etc.)
11. Composants métier (`OutfitForm`, `OutfitResult`)
12. Hook React (`useOutfitRecommendation`)

### Phase 6 : Pages
13. Page principale (`page.tsx`)
14. Page paramètres (`settings/page.tsx`)

### Phase 7 : Tests
15. Tests unitaires
16. Tests d'intégration
17. Tests E2E

---

## 📝 Fichiers de configuration à créer

```bash
# Racine du projet
.
├── .env.local.example          # Template variables d'environnement
├── .gitignore                  # Fichiers à ignorer
├── next.config.js              # Config Next.js
├── tailwind.config.js          # Config Tailwind
├── postcss.config.js           # Config PostCSS
├── tsconfig.json               # Config TypeScript
├── vitest.config.ts            # Config tests unitaires
└── playwright.config.ts        # Config tests E2E
```

---

## 🔑 Variables d'environnement requises

Créer `.env.local` avec :
```env
OPENWEATHER_API_KEY=your_api_key_here
NODE_ENV=development
```

---

## ⚠️ Points d'attention

1. **Imports absolus** : Configurer `tsconfig.json` avec `baseUrl: "./src"`
2. **Tailwind** : Configurer les chemins dans `tailwind.config.js`
3. **Next.js 14** : Utiliser App Router (pas Pages Router)
4. **Tests** : Séparer unit/integration/e2e
5. **Types** : Activer `strict: true` dans TypeScript

---

## 📦 Dépendances principales

```json
{
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zod": "^3.22.4",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@playwright/test": "^1.40.0",
    "vitest": "^0.34.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0"
  }
}
```
