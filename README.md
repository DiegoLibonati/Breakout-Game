# Brick Pulse

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Brick Pulse** is a browser-based implementation of the classic Breakout arcade game, built entirely with vanilla TypeScript and no production dependencies. The player controls a horizontal paddle at the bottom of the game board using the left and right arrow keys. A ball bounces continuously across the board, and the objective is to use the paddle to keep the ball in play while it collides with and destroys a grid of 18 blocks arranged in three rows at the top of the board.

Each block destroyed adds one point to the score. The game ends in a win when all blocks have been cleared from the board, or in a loss when the ball falls past the paddle and reaches the bottom edge. The final score is displayed at the end of each match.

The project is structured around a three-layer architecture: pure game logic classes in the core layer (ball physics, block geometry, paddle movement), stateless DOM factory functions in the component layer, and a single page that orchestrates the game loop, collision detection, scoring, and keyboard input. The game loop runs at a fixed interval of 10ms, providing smooth and consistent movement regardless of frame rate.

The codebase follows strict TypeScript configuration with full type safety, and is covered by a suite of unit and integration tests using Jest and Testing Library, ensuring correctness of game mechanics, rendering, user interaction, and cleanup behavior.

> **Note:** mobile is not supported. The game is designed for desktop browsers and relies on physical keyboard arrow keys for paddle control.

## Technologies used

1. Typescript
2. CSS3
3. HTML5
4. Vite

## Libraries used

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.6"
```

## Getting Started

With the stack above in place, the project can be cloned and run locally:

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Beyond running the game, the project ships with a Jest + Testing Library suite covering core logic, components, and the page orchestrator.

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security Audit

Once tests pass, check the dependency tree for known vulnerabilities before sharing or publishing a build:

```bash
npm audit
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch. All jobs use the Node.js version pinned in [`.nvmrc`](.nvmrc) and install dependencies with `npm ci` so the lockfile is honoured exactly.

### Pipeline overview

```
                      ┌─── PR or push to main ───┐
                      ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│      testing     │─▶│      build       │
│   eslint · tsc       │  │  jest (jsdom)    │  │ vite production  │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

The jobs run sequentially — each one declares `needs:` on the previous, so a failure short-circuits the rest of the pipeline.

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — runs `npm run lint` (ESLint flat config v9+ with TypeScript strict + stylistic rules) and `npm run type-check` (TypeScript `--noEmit` against `tsconfig.app.json`).
2. **`testing`** — runs `npm run test`, executing the full Jest suite under `jest-environment-jsdom`. Covers `src/core/`, `src/components/` and `src/pages/BreakoutPage/` with mocked CSS imports.
3. **`build`** — runs `npm run build`, which performs a final type-check via `tsc` and produces the optimized Vite bundle in `dist/`. Acts as a smoke test that the production output compiles end-to-end.

### Running the same checks locally

Before pushing, you can reproduce exactly what CI does:

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

Pre-commit hooks via **Husky + lint-staged** already run ESLint and Prettier on staged files, so most lint issues are caught before the pipeline even starts.

### Where the build outputs live

| Output                                           | Location                     |
| ------------------------------------------------ | ---------------------------- |
| Validation logs (lint, type-check, tests, build) | **Actions** tab on GitHub    |
| Production bundle (`dist/`)                      | Ephemeral, inside the runner |

> **Note:** This pipeline only validates the repository — it does not publish artifacts, create releases, or deploy the bundle anywhere. Hosting the built site is left to the consumer.

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/brick-pulse`](https://www.diegolibonati.com.ar/#/project/brick-pulse)
