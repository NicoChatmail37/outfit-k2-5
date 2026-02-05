# Mapping exact du code source

Ce document fait correspondre chaque section de votre code avec son emplacement exact dans l'arborescence.

---

## 📁 Section 1 : Configuration & Shared

### `package.json` → **Racine**
```
/Users/Office/antigravity/outfit k2-5/package.json
```

### `src/shared/env.ts`
```
/Users/Office/antigravity/outfit k2-5/src/shared/env.ts
```
**Contenu** : Validation Zod des variables d'environnement

### `src/shared/errors.ts`
```
/Users/Office/antigravity/outfit k2-5/src/shared/errors.ts
```
**Contenu** : Classes DomainError, WeatherError, GeoError, ValidationError, RateLimitError

### `src/shared/time.ts`
```
/Users/Office/antigravity/outfit k2-5/src/shared/time.ts
```
**Contenu** : Utilitaires Time (hours, days, now)

---

## 📁 Section 2 : Domain Layer

### `src/core/domain/weather/types.ts`
```
/Users/Office/antigravity/outfit k2-5/src/core/domain/weather/types.ts
```
**Contenu** : Interface WeatherSnapshot

### `src/core/domain/outfit/types.ts`
```
/Users/Office/antigravity/outfit k2-5/src/core/domain/outfit/types.ts
```
**Contenu** : Types Gender, ClothingCategory, Confidence, OutfitInput, ClothingItem, MannequinData, OutfitRecommendation

### `src/core/domain/outfit/rules.ts`
```
/Users/Office/antigravity/outfit k2-5/src/core/domain/outfit/rules.ts
```
**Contenu** : 
- TEMP_THRESHOLDS
- calculateFeelsLike()
- applyColdTolerance()
- getTemperatureCategory()
- generateItems()
- generateMannequinLayers()
- calculateConfidence()
- generateSummary()

### `src/core/domain/outfit/recommendOutfit.ts`
```
/Users/Office/antigravity/outfit k2-5/src/core/domain/outfit/recommendOutfit.ts
```
**Contenu** : Fonction recommendOutfit() (pure function)

---

## 📁 Section 3 : Ports

### `src/core/ports/WeatherPort.ts`
```
/Users/Office/antigravity/outfit k2-5/src/core/ports/WeatherPort.ts
```
**Contenu** : Interface WeatherPort (fetchForecast, healthCheck)

### `src/core/ports/GeoPort.ts`
```
/Users/Office/antigravity/outfit k2-5/src/core/ports/GeoPort.ts
```
**Contenu** : Interface GeoPort (geocode), type GeoLocation

---

## 📁 Section 4 : Use Cases

### `src/core/usecases/getOutfitRecommendation.ts`
```
/Users/Office/antigravity/outfit k2-5/src/core/usecases/getOutfitRecommendation.ts
```
**Contenu** : 
- Interface GetOutfitRecommendationInput
- Classe GetOutfitRecommendationUseCase

---

## 📁 Section 5 : Infrastructure

### `src/infra/weather/OpenWeatherAdapter.ts`
```
/Users/Office/antigravity/outfit k2-5/src/infra/weather/OpenWeatherAdapter.ts
```
**Contenu** : 
- Interface OpenWeatherForecast
- Classe OpenWeatherAdapter implements WeatherPort

### `src/infra/geo/OpenWeatherGeoAdapter.ts`
```
/Users/Office/antigravity/outfit k2-5/src/infra/geo/OpenWeatherGeoAdapter.ts
```
**Contenu** : 
- Interface OpenWeatherGeoResult
- Classe OpenWeatherGeoAdapter implements GeoPort

---

## 📁 Section 6 : API Routes

### `src/app/api/weather/health/route.ts`
```
/Users/Office/antigravity/outfit k2-5/src/app/api/weather/health/route.ts
```
**Contenu** : GET handler pour health check

### `src/app/api/weather/forecast/route.ts`
```
/Users/Office/antigravity/outfit k2-5/src/app/api/weather/forecast/route.ts
```
**Contenu** : GET handler pour récupération prévisions météo

### `src/app/api/outfit/route.ts`
```
/Users/Office/antigravity/outfit k2-5/src/app/api/outfit/route.ts
```
**Contenu** : 
- POST handler pour recommandation
- Rate limiter in-memory
- Validation Zod

---

## 📁 Section 7 : UI Components

### `src/ui/components/Button.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/ui/components/Button.tsx
```
**Contenu** : Composant Button avec variants (primary, secondary, outline)

### `src/ui/components/Slider.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/ui/components/Slider.tsx
```
**Contenu** : Composant Slider avec label et valueFormatter

### `src/ui/components/Toggle.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/ui/components/Toggle.tsx
```
**Contenu** : Composant Toggle pour sélection binaire

### `src/ui/components/DateRangePicker.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/ui/components/DateRangePicker.tsx
```
**Contenu** : Composant DateRangePicker (startDate, endDate)

### `src/ui/components/LocationInput.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/ui/components/LocationInput.tsx
```
**Contenu** : Composant LocationInput avec suggestions

### `src/ui/components/AdSlot.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/ui/components/AdSlot.tsx
```
**Contenu** : Composant AdSlot (sidebar, inline, modal)

### `src/ui/components/MannequinView.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/ui/components/MannequinView.tsx
```
**Contenu** : Composant MannequinView (SVG mannequin avec layers)

### `src/ui/components/OutfitList.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/ui/components/OutfitList.tsx
```
**Contenu** : Composant OutfitList (liste items + summary + confidence)

### `src/ui/components/ErrorBanner.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/ui/components/ErrorBanner.tsx
```
**Contenu** : Composant ErrorBanner avec retry

---

## 📁 Section 8 : Features

### `src/features/outfit/useOutfitRecommendation.ts`
```
/Users/Office/antigravity/outfit k2-5/src/features/outfit/useOutfitRecommendation.ts
```
**Contenu** : Hook React custom pour gestion state recommandation

### `src/features/outfit/OutfitForm.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/features/outfit/OutfitForm.tsx
```
**Contenu** : Composant formulaire de saisie (coldTolerance, gender, location, dates)

### `src/features/outfit/OutfitResult.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/features/outfit/OutfitResult.tsx
```
**Contenu** : Composant affichage résultat (mannequin + outfit list)

---

## 📁 Section 9 : Pages

### `src/app/page.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/app/page.tsx
```
**Contenu** : 
- Page d'accueil
- Gestion modal pub
- LocalStorage pour unlock
- Header + Hero + Form/Result + Sidebar

### `src/app/settings/page.tsx`
```
/Users/Office/antigravity/outfit k2-5/src/app/settings/page.tsx
```
**Contenu** : 
- Page paramètres
- Test connexion météo
- Infos configuration

---

## 📁 Section 10 : Tests

### `tests/unit/core/domain/outfit/rules.test.ts`
```
/Users/Office/antigravity/outfit k2-5/tests/unit/core/domain/outfit/rules.test.ts
```
**Contenu** : Tests Vitest pour rules.ts

### `tests/unit/core/domain/outfit/recommendOutfit.test.ts`
```
/Users/Office/antigravity/outfit k2-5/tests/unit/core/domain/outfit/recommendOutfit.test.ts
```
**Contenu** : Tests Vitest pour recommendOutfit.ts

### `tests/integration/api/outfit.integration.test.ts`
```
/Users/Office/antigravity/outfit k2-5/tests/integration/api/outfit.integration.test.ts
```
**Contenu** : Tests d'intégration avec fake adapters

### `tests/e2e/recommendation.spec.ts`
```
/Users/Office/antigravity/outfit k2-5/tests/e2e/recommendation.spec.ts
```
**Contenu** : Tests Playwright E2E (incomplet dans le code source)

---

## 📋 Fichiers manquants à créer

Ces fichiers de configuration ne sont pas dans votre code mais sont nécessaires :

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
```

### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### `postcss.config.js`
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `.env.local.example`
```env
OPENWEATHER_API_KEY=your_api_key_here
NODE_ENV=development
```

### `src/app/layout.tsx`
```tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comment s\'habiller ?',
  description: 'Recommandations vestimentaires basées sur la météo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
```

### `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## ✅ Résumé

**Total de fichiers à créer** : 37 fichiers

- ✅ Dossiers créés : 30 directories
- 📝 Fichiers de code : 31 fichiers
- ⚙️ Fichiers de config : 6 fichiers

**Prochaines étapes** :
1. Copier chaque section de code dans le fichier correspondant
2. Créer les fichiers de configuration manquants
3. Installer les dépendances (`npm install`)
4. Créer `.env.local` avec votre clé API OpenWeather
5. Lancer le dev server (`npm run dev`)
