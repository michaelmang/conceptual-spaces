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

| Step | What happens |
|------|----------------|
| **Pull request** | GitHub Actions runs lint + build (`.github/workflows/ci.yml`) |
| **Merge to `main`** | Vercel deploys production automatically via the GitHub integration |

Repository: [github.com/michaelmang/conceptual-spaces](https://github.com/michaelmang/conceptual-spaces)

### Branch protection (recommended)

On GitHub → **Settings → Branches**, protect `main` and require the **CI** check to pass before merging. Merges to `main` then trigger a Vercel production deployment.

### Vercel

The project is linked to Vercel as `conceptual-spaces` under `michaelmangs-projects`. Preview deployments are created for pull requests; production deploys on every push to `main`.

## License

Private — all rights reserved.
