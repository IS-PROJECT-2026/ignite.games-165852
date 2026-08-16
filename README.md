# Ignite

Ignite is an NYT Games–style platform hosting six word and logic games in one place: Crossword, Word Search, Sudoku, Wordle, Scrabble, and Hangman. It includes user authentication and a shared home page linking to each game.

## Live Demo

🔗 [https://is-project-2026.github.io/ignite.games-165852/](https://is-project-2026.github.io/ignite.games-165852/)

## Games

- **Crossword** — randomly generated puzzle with intersecting word placement, typing with auto-advance, check/reveal, and win detection
- **Word Search** — 12x12 grid, 8 words across all 8 directions, click-to-select gameplay
- **Sudoku** — generated solvable grid, check/reveal, and win detection
- **Wordle** — standard 6-guess format with full duplicate-letter scoring logic and on-screen keyboard
- **Hangman** — ASCII gallows art, physical and on-screen keyboard input
- **Scrabble** — tile rack and board placement with standard letter-value scoring

## Authentication

Signup, login, and session handling powered by Supabase, with the navbar reflecting logged-in state app-wide.

## Tech Stack

- **Next.js** (statically exported for GitHub Pages)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (authentication)
- **GitHub Actions** (CI/CD deployment to GitHub Pages)
- **lucide-react** (icons)

## Development

```bash
npm install
npm run dev
```

Runs locally at `http://localhost:3000`.

## Project Status

Built solo as part of a university Git workflow assignment, using a full GitHub-based Agile workflow: milestones, issues, a project board, feature branches, conventional commits, pull requests, and CI/CD deployment.