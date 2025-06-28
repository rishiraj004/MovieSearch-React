# 🎬 MovieSearch - Project Structure

A modern, well-organized React TypeScript application for searching and discovering movies.

## 📁 Folder Structure

```
MovieSearch/
├── src/
│   ├── features/                   # Feature-based modules
│   │   └── movies/                 # Movie-related functionality
│   │       ├── components/         # Feature-specific components
│   │       │   ├── MovieCard.tsx   # Individual movie display
│   │       │   ├── MovieGrid.tsx   # Movie list layout
│   │       │   └── SearchBar.tsx   # Search input component
│   │       ├── hooks/              # Feature-specific hooks
│   │       │   └── useMovieSearch.ts # Movie search logic
│   │       ├── services/           # API and business logic
│   │       │   └── movie.service.ts # TMDb API integration
│   │       ├── types/              # Feature-specific types
│   │       │   └── movie.types.ts  # Movie-related TypeScript types
│   │       └── index.ts            # Feature exports
│   │
│   ├── shared/                     # Shared/common code
│   │   ├── components/             # Reusable UI components
│   │   │   └── ui/                 # Base UI components (shadcn/ui)
│   │   │       └── button.tsx      # Button component
│   │   ├── constants/              # App-wide constants
│   │   │   └── api.constants.ts    # API configuration
│   │   ├── hooks/                  # Reusable hooks
│   │   ├── types/                  # Common TypeScript types
│   │   │   └── common.types.ts     # Shared interfaces
│   │   ├── utils/                  # Utility functions
│   │   │   └── cn.ts               # className utility (clsx + tailwind-merge)
│   │   └── index.ts                # Shared exports
│   │
│   ├── layouts/                    # Layout components
│   │   └── MainLayout.tsx          # Main app layout
│   │
│   ├── pages/                      # Page components
│   │   └── HomePage.tsx            # Home page
│   │
│   ├── styles/                     # Global styles
│   │   ├── globals.css             # Global CSS and Tailwind
│   │   └── App.css                 # App-specific styles
│   │
│   ├── assets/                     # Static assets
│   │   └── react.svg               # Images, icons, etc.
│   │
│   ├── App.tsx                     # Main App component
│   ├── main.tsx                    # App entry point
│   └── vite-env.d.ts              # Vite type definitions
│
├── .vscode/                        # VS Code settings
│   ├── extensions.json             # Recommended extensions
│   └── settings.json               # Editor configuration
│
├── public/                         # Public assets
├── .env.example                    # Environment variables template
├── .editorconfig                   # Cross-editor configuration
├── .prettierrc                     # Prettier configuration
├── .prettierignore                 # Prettier ignore rules
├── eslint.config.js                # ESLint configuration
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── package.json                    # Dependencies and scripts
```

## 🏗️ Architecture Principles

### **1. Feature-Based Organization**
- Each feature has its own folder with components, hooks, services, and types
- Promotes modularity and makes it easy to find related code
- Scales well as the app grows

### **2. Shared/Common Code**
- Reusable components, utilities, and types are in the `shared` folder
- Prevents code duplication across features
- Makes it easy to maintain common functionality

### **3. Separation of Concerns**
- **Components**: UI presentation logic
- **Hooks**: Stateful logic and side effects
- **Services**: API calls and business logic
- **Types**: TypeScript interfaces and types
- **Constants**: Configuration and static values

### **4. Import Structure**
```typescript
// External libraries (npm packages)
import { useState } from 'react'
import axios from 'axios'

// Internal imports (project code)
import { Button } from '@/shared/components/ui/button'
import { useMovieSearch } from './hooks/useMovieSearch'
```

## 🎯 Benefits of This Structure

### **✅ Scalability**
- Easy to add new features without affecting existing code
- Clear separation of concerns
- Modules can be developed independently

### **✅ Maintainability**
- Related code is co-located
- Clear import/export patterns
- Consistent file naming conventions

### **✅ Developer Experience**
- Easy to find what you're looking for
- IntelliSense works better with proper imports
- Less cognitive overhead when working on features

### **✅ Team Collaboration**
- Multiple developers can work on different features
- Clear ownership boundaries
- Consistent code organization

## 🛠️ Development Guidelines

### **Adding a New Feature**
1. Create a new folder in `src/features/`
2. Add subfolders: `components/`, `hooks/`, `services/`, `types/`
3. Create an `index.ts` file to export public APIs
4. Follow the same patterns as the `movies` feature

### **Adding Shared Components**
1. Add to `src/shared/components/`
2. Export from `src/shared/index.ts`
3. Use the `@/shared` import alias

### **File Naming Conventions**
- **Components**: PascalCase (e.g., `MovieCard.tsx`)
- **Hooks**: camelCase starting with 'use' (e.g., `useMovieSearch.ts`)
- **Services**: camelCase with `.service.ts` suffix
- **Types**: camelCase with `.types.ts` suffix
- **Constants**: camelCase with `.constants.ts` suffix

## 🔧 NPM Scripts

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production

# Code Quality
npm run lint               # Check for linting errors
npm run lint:fix           # Auto-fix linting errors
npm run format             # Format code with Prettier
npm run format:check       # Check formatting
npm run type-check         # TypeScript type checking
```

This structure provides a solid foundation for building scalable React applications with excellent developer experience and maintainability! 🚀
