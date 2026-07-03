# Conceptual Spaces

Interactive 3D visualization of Aristotelian-Thomistic faculty psychology unified with Gärdenfors' conceptual spaces framework.

Built with Next.js, React Three Fiber, and Three.js.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## CI/CD

- **CI** (`.github/workflows/ci.yml`) — runs lint and build on pull requests and pushes to `main`.
- **Deploy** (`.github/workflows/deploy-vercel.yml`) — deploys to Vercel production when changes merge to `main`.

### One-time setup

#### 1. GitHub repository

This project is intended to live in its own repository (not the home-directory git root).

#### 2. Vercel project + GitHub secrets

1. Create a project at [vercel.com/new](https://vercel.com/new) linked to the GitHub repo, **or** run locally:
   ```bash
   npx vercel link
   ```
2. Create a Vercel token: [vercel.com/account/tokens](https://vercel.com/account/tokens)
3. Add GitHub repository secrets (**Settings → Secrets and variables → Actions**):
   - `VERCEL_TOKEN` — [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` — Project **Settings → General** in Vercel (or run `npx vercel link` and check `.vercel/project.json`)
   - `VERCEL_PROJECT_ID` — same as above

**Alternative (simpler):** Enable Vercel's native GitHub integration in the Vercel dashboard. It auto-deploys on every push to `main` without the GitHub Actions deploy workflow. Keep the CI workflow for lint/build checks.

#### 3. Branch protection (recommended)

On GitHub, protect `main` and require the **CI** workflow to pass before merging.

## License

Private — all rights reserved.
