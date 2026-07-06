# Conceptual Spaces

**An interactive 3D map of the mind** — Gärdenfors' conceptual spaces framework placed inside the Aristotelian-Thomistic cognitive hierarchy: sensation below, intellect above, and the two gaps the modern framework leaves open, filled.

**Live: [conceptual-spaces.vercel.app](https://conceptual-spaces.vercel.app)**

Companion to the paper: [Beyond and Below Cognitive Space: A Framework for Perfecting Conceptual Spaces](https://michaelmangialardi.substack.com/p/beyond-and-below-conceptual-spaces)

<img width="1040" height="513" alt="image" src="https://github.com/user-attachments/assets/b841fb2f-c14c-43a4-9661-8823cd87ee63" />

## Features

- **Story mode** — a 10-step narrated walkthrough of the paper's argument, from formal reception in the senses up to the immaterial intellect
- **Deep links** — every view is shareable (`?step=7`, `?focus=faculty:intellect`), each with its own server-rendered social card (`/og?step=7`)
- **Eight stations** — sensible reality, external senses, common sense, imagination, cogitative power, conceptual space, memory, intellect — each with camera framing and commentary
- **Reading guide** (`/guide`) — the argument station by station with the paper's sources and further reading, cross-linked with the 3D views

Built with Next.js, React Three Fiber, and Three.js.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
