# Conceptual Spaces

Interactive 3D visualization of Aristotelian-Thomistic faculty psychology unified with Gärdenfors' conceptual spaces framework.

Visualizes the model articulated in this paper: https://michaelmangialardi.substack.com/p/beyond-and-below-conceptual-spaces

Built with Next.js, React Three Fiber, and Three.js.

<img width="1040" height="513" alt="image" src="https://github.com/user-attachments/assets/b841fb2f-c14c-43a4-9661-8823cd87ee63" />

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
