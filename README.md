# Big Monorepo Starter

A modern monorepo setup with Next.js, Express, and tRPC.

## ⚠️ Important Warnings

**DO NOT:**

- Run `npm` or `yarn` commands - this project uses `pnpm` exclusively
- Run `pnpm install` in child directories (like `packages/web` or `packages/server`) - this can break the workspace's dependency management and create multiple `node_modules` folders. Always run `pnpm install` from the root directory.
- Use different package managers for different packages
- Modify `pnpm-lock.yaml` manually
- Delete the root `node_modules` directory without using `pnpm clean`

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd big-monorepo-starter
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in the server package
   - Update the values as needed

### Development

Start all services (web and server):

```bash
pnpm dev:all
```

Or start services individually:

```bash
# Start web app
pnpm dev:web

# Start server
pnpm dev:server
```

### Available Scripts

- `pnpm dev:all` - Start both web and server in development mode
- `pnpm dev:web` - Start web app in development mode
- `pnpm dev:server` - Start server in development mode
- `pnpm build` - Build all packages
- `pnpm lint` - Run linting across all packages
- `pnpm format` - Format code using Prettier

## 📦 Project Structure

```
big-monorepo-starter/
├── packages/
│   ├── web/          # Next.js frontend
│   ├── server/       # Express backend with tRPC
│   ├── shared/       # Shared types and utilities
│   └── config/       # Shared configuration
├── package.json      # Root package.json
└── pnpm-workspace.yaml
```

## 🔧 Adding Dependencies

Always use pnpm workspace commands:

```bash
# Add dependency to specific package
pnpm --filter <package-name> add <dependency>

# Add dev dependency to specific package
pnpm --filter <package-name> add -D <dependency>

# Add dependency to all packages
pnpm add -w <dependency>
```

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Run `pnpm lint` and `pnpm format`
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.
