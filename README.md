# Kaméleon AG — Portfolio Flyer & Motion

Site portfolio bilingue (FR/EN) pour flyer publicitaire et motion design.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- next-intl (FR/EN)
- Sanity CMS (`/studio`)
- Framer Motion
- Resend (formulaire brief)

## Démarrage

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) (redirige vers `/fr`).

Sans credentials Sanity, le site utilise des **données démo** intégrées.

## Variables d’environnement

Copie `.env.example` → `.env.local` :

| Variable | Rôle |
|----------|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Projet Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (défaut `production`) |
| `RESEND_API_KEY` | Envoi des briefs |
| `BRIEF_TO_EMAIL` | Destinataire des briefs |

## Sanity

1. Crée un projet sur [sanity.io/manage](https://www.sanity.io/manage)
2. Renseigne `NEXT_PUBLIC_SANITY_PROJECT_ID` dans `.env.local`
3. Ouvre `/studio` et crée : Site settings, Projects, Services, About

## Déploiement

Déploie sur Vercel, ajoute les variables d’env, pointe le domaine.

Marque : **Kaméleon AG** — logo dans `public/logo-kameleon-ag.png`.  
Sanity project ID : `rc7se525` (voir `.env.local`).
