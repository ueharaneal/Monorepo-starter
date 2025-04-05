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

Choose your development setup:

1. Web + Server (for web development):

   ```bash
   pnpm dev:web-server
   ```

2. Mobile + Server (for mobile development):

   ```bash
   pnpm dev:mobile-server
   ```

3. All services (web, mobile, and server):
   ```bash
   pnpm dev:all
   ```

Or start services individually:

```bash
# Start web app
pnpm dev:web

# Start mobile app
pnpm dev:mobile

# Start server
pnpm dev:server
```

### Available Scripts

- `pnpm dev:web-server` - Start web app and server in development mode
- `pnpm dev:mobile-server` - Start mobile app and server in development mode
- `pnpm dev:all` - Start all services (web, mobile, and server) in development mode
- `pnpm dev:web` - Start web app in development mode
- `pnpm dev:mobile` - Start mobile app in development mode
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
│   ├── config/       # Shared configuration
│   └── mobile/       # React Native Expo app
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
