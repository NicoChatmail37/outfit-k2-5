# 📝 TODO : Réimplémentation d'une API Key (Architecture Clean)

Ce document décrit la marche à suivre pour ajouter un fournisseur météo nécessitant une clé API (ex: OpenWeather, WeatherAPI) sans dégrader la qualité du code.

## 🔑 1. Configurer l'environnement
Ajouter la clé dans les fichiers de configuration pour qu'elle soit détectée par l'application.

- [ ] **[.env.local.example](file:///.env.local.example)** : Ajouter la variable (ex: `WEATHER_API_KEY=your_key_here`).
- [ ] **[src/shared/env.ts](file:///Users/Office/antigravity/outfit%20k2-5/src/shared/env.ts)** : Mettre à jour le `envSchema` (Zod) pour inclure la nouvelle variable.
  ```ts
  const envSchema = z.object({
    WEATHER_API_KEY: z.string().min(1), // Obligatoire en production
    // ...
  });
  ```

## 🏗️ 2. Créer les adaptateurs (Infrastructure)
Plutôt que de modifier Open-Meteo, créer de nouveaux fichiers pour le nouveau fournisseur.

- [ ] **[src/infra/weather/](file:///Users/Office/antigravity/outfit%20k2-5/src/infra/weather/)** : Créer `NewProviderAdapter.ts`.
  - Doit implémenter l'interface `WeatherPort`.
  - Utiliser `env.WEATHER_API_KEY` dans le constructeur ou les URLs de fetch.
- [ ] **[src/infra/geo/](file:///Users/Office/antigravity/outfit%20k2-5/src/infra/geo/)** : Créer `NewProviderGeoAdapter.ts`.
  - Doit implémenter l'interface `GeoPort`.

## 🔌 3. Injecter les nouveaux adaptateurs
Switcher l'implémentation dans la couche "Entry Point".

- [ ] **[src/app/api/weather/forecast/route.ts](file:///Users/Office/antigravity/outfit%20k2-5/src/app/api/weather/forecast/route.ts)** :
  - Importer les nouveaux adaptateurs.
  - Remplacer `new OpenMeteoGeoAdapter()` et `new OpenMeteoAdapter()`.

## ☁️ 4. Déploiement (Vercel)
- [ ] Aller dans **Settings > Environment Variables**.
- [ ] Ajouter `WEATHER_API_KEY` avec la valeur réelle.

---
> [!TIP]
> En suivant cette méthode, tu ne touches jamais à la logique de recommandation (`core/`), ce qui garantit que ton application reste stable quel que soit le fournisseur météo.
