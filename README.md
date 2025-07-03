# 🎬 MovieSearch - Advanced Movie Discovery Application

A modern, full-featured movie and TV show discovery platform built with React, TypeScript, and TMDb API integration. Features comprehensive browsing, detailed information pages, advanced search capabilities, trending content, and a beautiful responsive user interface with smooth CSS-powered animations. Recently modernized with unified UI/UX design, enhanced mobile responsiveness, and production-ready code quality.

## 📚 Table of Contents

- [✨ Features Overview](#-features-overview)
  - [🏠 Multi-Page Application](#-multi-page-application)
  - [🎥 Hero Section](#-hero-section)
  - [🔥 Trending Sections](#-trending-sections)
  - [🔍 Advanced Search & Discovery](#-advanced-search--discovery)
  - [🎬 Media Detail Pages](#-media-detail-pages)
  - [🏗️ Modular Architecture](#️-modular-architecture)
  - [📱 Mobile Optimization](#-mobile-optimization)
  - [🎨 Visual Design](#-visual-design)
  - [⚡ Performance Features](#-performance-features)
  - [🎯 Advanced Features](#-advanced-features)
  - [♿ Accessibility](#-accessibility)
- [🏗️ Project Architecture](#️-project-architecture-1)
  - [📁 Detailed Folder Structure](#-detailed-folder-structure)
- [🚀 Performance Optimizations](#-performance-optimizations)
- [🧪 Development Features](#-development-features)
- [📱 Responsive Breakpoints](#-responsive-breakpoints)
- [�️ Tech Stack](#️-tech-stack)
  - [Core Dependencies](#core-dependencies)
  - [UI & Styling](#ui--styling)
  - [Development Tools](#development-tools)
  - [Build & Development](#build--development)
  - [Animation & Utilities](#animation--utilities)
  - [Why This Tech Stack?](#why-this-tech-stack)
- [�🔧 Setup and Installation](#-setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Environment Setup](#environment-setup)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [📄 API Integration](#-api-integration)
- [⚙️ Advanced Build Configuration](#-advanced-build-configuration)
- [💝 Built with ❤️](#-built-with-️)

## ✨ Features Overview

### 🏠 Multi-Page Application

- **Homepage**: Hero section with trending movies, TV shows, and people
- **Discover Page**: Advanced filtering and search across all media types
- **Movie Detail Pages**: Comprehensive movie information with cast, crew, videos, and watch providers
- **TV Show Detail Pages**: Detailed TV show information with seasons, episodes, and networks
- **Person Detail Pages**: Actor/director profiles with complete filmography
- **Production Company Pages**: Studio information and their productions
- **Network Pages**: TV network details and their shows

### 🎥 Hero Section

- **Dynamic Background Carousel**: Auto-rotating movie backdrops from popular films
- **Smart Navigation**: Responsive navbar with search, trending, top-rated, and genres navigation
- **Interactive Elements**:
  - "Featured" badge for highlighted content
  - Star ratings with visual indicators
  - "Watch Trailer" and "More Info" action buttons
  - Smooth carousel navigation with arrow keys and pagination dots
- **Responsive Design**: Adapts beautifully across desktop, tablet, and mobile devices
- **Auto-Carousel**: Changes movies every 3 seconds when in view, pauses on hover/interaction

### 🔥 Trending Sections

- **Triple Content Display**: Movies, TV Shows, and People in dedicated sections
- **Time Window Filtering**: Toggle between "Today" and "This Week" trending data
- **Smooth Horizontal Scrolling**:
  - Hidden scrollbars for clean UI
  - Arrow navigation buttons
  - Wheel scroll support (converts vertical to horizontal)
  - Touch-friendly swiping on mobile devices
- **Content-Specific Design**:
  - **Movies**: Poster cards with ratings and release years
  - **TV Shows**: Similar to movies but with first air date
  - **People**: Circular profile images with popularity scores
- **Interactive Cards**: Hover effects, touch feedback, and scaling animations
- **Section Icons**: 🎬 Movies, 📺 TV Shows, ⭐ People with color-coded themes

### 🔍 Advanced Search & Discovery

- **Multi-Type Search**: Search across movies, TV shows, and people simultaneously
- **Real-time Search**: Debounced search with instant results as you type
- **Smart Suggestions**: Dropdown with top 5 movie suggestions with posters and details
- **Advanced Filtering**: Genre, year, rating, and popularity filters on Discover page
- **Responsive Grid Layout**: 2/4/5 column layout adapting to screen size
- **Infinite Scroll**: Seamless loading of more results without pagination breaks
- **Search Recommendations**: Live API-powered suggestions with rich metadata
- **Empty States**: Beautiful no-results found screens with helpful suggestions
- **Search History**: Recent searches for quick access (browser storage)

### 🎬 Media Detail Pages

#### Movie Detail Pages
- **Hero Section**: Large backdrop with movie poster, ratings, and key information
- **Comprehensive Info**: Runtime, genres, release date, budget, revenue, and production companies
- **Cast & Crew**: Detailed cast list with character names and crew information
- **Videos**: Trailers, teasers, and behind-the-scenes content
- **Reviews**: User reviews with ratings and detailed feedback
- **Similar Movies**: Recommendations based on the current movie
- **Watch Providers**: Available streaming platforms by country
- **Collection Info**: Part of movie collections/franchises

#### TV Show Detail Pages
- **Show Overview**: Complete series information with network and creator details
- **Seasons & Episodes**: Detailed breakdown of all seasons and episode counts
- **Episode Guide**: Individual episode information with air dates
- **Networks**: Broadcasting networks and production companies
- **Created By**: Show creators and executive producers
- **Similar Shows**: Related TV show recommendations
- **Watch Providers**: Streaming availability across different platforms

#### Person Detail Pages
- **Biography**: Complete actor/director biography and personal information
- **Filmography**: Complete list of movies and TV shows with roles
- **Known For**: Highlighted popular works and achievements
- **Career Timeline**: Chronological view of their work
- **Images**: Photo gallery and promotional images
- **Personal Details**: Birth date, place, and other biographical info

### 🏗️ Modular Architecture

- **Component-Based Design**: Highly modular and reusable components
- **Separation of Concerns**: Clear boundaries between UI, logic, and data
- **Type-Safe**: Full TypeScript integration with strict type checking
- **Performance Optimized**: Tree-shaking, code splitting, and lazy loading
- **Developer Friendly**: Easy to maintain, test, and extend

### 📱 Mobile Optimization

- **Touch Interactions**: Proper active states and touch feedback
- **Responsive Navigation**: Mobile sidebar with smooth slide animations
- **Optimized Card Sizes**: Smaller, touch-friendly cards on mobile devices
- **Gesture Support**: Swipe navigation and touch scrolling
- **Mobile-First Design**: Built with mobile users in mind

### 🎨 Visual Design

- **Dark Theme**: Elegant dark color scheme with purple/pink accents
- **Glassmorphism**: Backdrop blur effects and translucent elements
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Loading States**: Beautiful skeleton screens and loading indicators
- **Consistent Branding**: Cohesive color system throughout the application

### ⚡ Performance Features

- **API Caching**: Intelligent caching for repeated requests with TTL management
- **Image Optimization**: Lazy loading, responsive images, and WebP support
- **Code Splitting**: Route-based and feature-based code splitting for optimal loading
- **Debounced Search**: Prevents excessive API calls during typing
- **Virtual Scrolling**: Efficient rendering for large lists and grids
- **Prefetching**: Strategic prefetching of likely-to-be-needed resources
- **Bundle Optimization**: Tree-shaking and dead code elimination
- **Memory Management**: Proper cleanup of event listeners and subscriptions
- **Error Boundaries**: React error boundaries for graceful error handling
- **Progressive Loading**: Skeleton screens and incremental content loading

### 🎯 Advanced Features

- **Dark Mode**: Elegant dark theme with system preference detection
- **Keyboard Navigation**: Full keyboard accessibility with logical tab order
- **Offline Support**: Basic offline functionality with cached content
- **PWA Ready**: Progressive Web App capabilities for mobile installation
- **Multi-language Support**: Internationalization ready architecture
- **Bookmarking**: Save favorite movies and shows (local storage)
- **Recently Viewed**: Track and display recently viewed content
- **Comparison Mode**: Side-by-side comparison of movies or shows
- **Advanced Filters**: Multiple filter combinations with saved filter sets
- **Export Features**: Export watchlists and favorite lists

### ♿ Accessibility

- **ARIA Labels**: Screen reader support for all interactive elements
- **Keyboard Navigation**: Full keyboard control for all features
- **Focus Management**: Proper focus states and tab order
- **Color Contrast**: WCAG compliant color combinations
- **Semantic HTML**: Proper HTML structure for assistive technologies

## 🏗️ Project Architecture

### 📁 Detailed Folder Structure

```text
MovieSearch-React/
├── 📄 README.md                           # This comprehensive documentation
├── 📄 package.json                        # Dependencies and scripts
├── 📄 package-lock.json                   # Dependency lock file
├── 📄 components.json                     # shadcn/ui configuration
├── 📄 index.html                          # HTML entry point
├── 📄 vite.config.ts                      # Vite build configuration
├── 📄 tsconfig.json                       # TypeScript base configuration
├── 📄 tsconfig.app.json                   # TypeScript app configuration
├── 📄 tsconfig.node.json                  # TypeScript Node configuration
├── 📄 eslint.config.js                    # ESLint configuration
├── 📄 .env.development                    # Development environment variables
├── � .prettierrc                         # Prettier configuration
├── � .prettierignore                     # Prettier ignore file
├── � .editorconfig                       # Editor configuration
├── 📄 .gitignore                          # Git ignore file
├── � .vscode/                            # VS Code workspace settings
├── 📂 dist/                               # Production build output
├── 📂 node_modules/                       # Dependencies
│
├── 📂 src/                                # Source code
│   ├── 📄 main.tsx                        # Application entry point
│   ├── 📄 App.tsx                         # Root component
│   ├── 📄 vite-env.d.ts                   # Vite environment types
│   │
│   ├── 📂 components/                     # Shared React components
│   │   ├── 📄 index.ts                    # Component exports
│   │   ├── 📄 PageLoader.tsx              # Page loading component
│   │   └── 📄 ScrollToTop.tsx             # Scroll to top utility
│   │
│   ├── 📂 features/                       # Feature-based modules
│   │   └── 📂 movies/                     # Movie-related features
│   │       ├── 📄 index.ts                # Main exports
│   │       │
│   │       ├── 📂 components/             # Movie feature components
│   │       │   ├── 📄 index.ts            # Component exports
│   │       │   ├── 📄 HeroSection.tsx     # Landing hero with carousel
│   │       │   ├── 📄 MovieCard.tsx       # Individual movie display
│   │       │   ├── 📄 MovieGrid.tsx       # Grid layout for movies
│   │       │   ├── 📄 SearchBar.tsx       # Search with suggestions
│   │       │   ├── 📄 SearchDropdown.tsx  # Search dropdown
│   │       │   ├── 📄 TrendingSection.tsx # Modular trending section
│   │       │   ├── 📄 TrendingMovieCard.tsx      # Movie cards
│   │       │   ├── 📄 TrendingTVCard.tsx         # TV show cards
│   │       │   ├── 📄 TrendingPersonCard.tsx     # People cards
│   │       │   ├── 📄 TopRatedSection.tsx        # Top rated movies
│   │       │   ├── 📄 UpcomingMoviesSection.tsx  # Upcoming movies
│   │       │   │
│   │       │   ├── 📂 hero/               # Hero section components
│   │       │   │   └── � [hero components]
│   │       │   │
│   │       │   └── �📂 ui/                 # Reusable UI components
│   │       │       └── 📄 [UI components]
│   │       │
│   │       ├── 📂 hooks/                  # Custom React hooks
│   │       │   └── 📄 [custom hooks]
│   │       │
│   │       ├── 📂 services/               # API integration
│   │       │   └── 📄 [API services]
│   │       │
│   │       ├── � types/                  # TypeScript definitions
│   │       │   └── 📄 [type definitions]
│   │       │
│   │       └── 📂 utils/                  # Utility functions
│   │           └── 📄 [utility functions]
│   │
│   ├── 📂 shared/                         # Shared application code
│   │   ├── 📄 index.ts                    # Shared exports
│   │   │
│   │   ├── 📂 components/                 # Global components
│   │   │   ├── 📄 BackToHomeButton.tsx    # Navigation component
│   │   │   ├── 📄 Footer.tsx              # Footer component
│   │   │   ├── 📄 Navbar.tsx              # Navigation bar
│   │   │   ├── 📄 SearchBar.tsx           # Global search
│   │   │   │
│   │   │   ├── 📂 search-bar/             # Search bar components
│   │   │   │   ├── 📄 index.ts            # Search exports
│   │   │   │   ├── 📄 SearchBar.tsx       # Main search component
│   │   │   │   ├── 📄 SearchInput.tsx     # Search input
│   │   │   │   ├── 📄 SearchResult.tsx    # Search result item
│   │   │   │   ├── 📄 SearchBarTypes.ts   # Search types
│   │   │   │   └── 📄 searchUtils.ts      # Search utilities
│   │   │   │
│   │   │   ├── 📂 ui/                     # Base UI components
│   │   │   │   └── 📄 button.tsx          # Button component
│   │   │   │
│   │   │   └── 📂 watch-providers/        # Watch providers components
│   │   │       ├── 📄 index.ts            # Watch providers exports
│   │   │       ├── 📄 WatchProviders.tsx  # Main watch providers
│   │   │       ├── 📄 WatchProvidersLoading.tsx # Loading state
│   │   │       ├── 📄 WatchProvidersTypes.ts    # Types
│   │   │       ├── 📄 ProviderGroup.tsx   # Provider grouping
│   │   │       ├── 📄 NoProviders.tsx     # No providers state
│   │   │       ├── 📄 CountryDropdown.tsx # Country selection
│   │   │       └── 📄 useWatchProviders.ts # Watch providers hook
│   │   │
│   │   ├── 📂 constants/                  # Application constants
│   │   │   └── 📄 api.constants.ts        # API configuration
│   │   │
│   │   ├── 📂 hooks/                      # Shared hooks
│   │   │   └── 📄 useDebounce.ts          # Debounce hook
│   │   │
│   │   ├── 📂 types/                      # Shared types
│   │   │   └── 📄 common.types.ts         # Common type definitions
│   │   │
│   │   └── 📂 utils/                      # Shared utilities
│   │       └── � cn.ts                   # Class name utility
│   │
│   ├── 📂 layouts/                        # Layout components
│   │   └── 📄 MainLayout.tsx              # Main page layout
│   │
│   ├── 📂 pages/                          # Page components
│   │   ├── 📄 index.ts                    # Page exports
│   │   ├── 📄 HomePage.tsx                # Main homepage
│   │   ├── 📄 DiscoverPage.tsx            # Discovery page
│   │   ├── 📄 MovieDetailPage.tsx         # Movie details page
│   │   ├── 📄 TVShowDetailPage.tsx        # TV show details page
│   │   ├── 📄 PersonDetailPage.tsx        # Person details page
│   │   ├── 📄 NetworkPage.tsx             # Network page
│   │   ├── 📄 ProductionCompanyPage.tsx   # Production company page
│   │   │
│   │   ├── � components/                 # Page-specific components
│   │   │   ├── 📄 index.ts                # Page component exports
│   │   │   ├── � CastCard.tsx            # Cast member card
│   │   │   ├── 📄 CastCrewDropdown.tsx    # Cast/crew dropdown
│   │   │   ├── 📄 CollectionSection.tsx   # Movie collection section
│   │   │   ├── � CreatedBySection.tsx    # TV show creator section
│   │   │   ├── 📄 CrewSection.tsx         # Crew section
│   │   │   ├── 📄 EmptySearchState.tsx    # No results state
│   │   │   ├── � ErrorDisplay.tsx        # Error display
│   │   │   ├── 📄 HeroSectionContainer.tsx # Hero container
│   │   │   ├── 📄 HorizontalMovieSection.tsx # Horizontal movie list
│   │   │   ├── 📄 HorizontalTVShowSection.tsx # Horizontal TV list
│   │   │   ├── 📄 MetaItem.tsx            # Metadata item
│   │   │   ├── 📄 MovieCard.tsx           # Movie card component
│   │   │   ├── 📄 MovieDetailsGrid.tsx    # Movie details grid
│   │   │   ├── � PersonCard.tsx          # Person card
│   │   │   ├── 📄 ProductionLogo.tsx      # Production logo
│   │   │   ├── 📄 ReviewCard.tsx          # Review card
│   │   │   ├── 📄 ReviewsSection.tsx      # Reviews section
│   │   │   ├── 📄 SearchResultsContainer.tsx # Search results wrapper
│   │   │   ├── 📄 SearchResultsSection.tsx   # Search results
│   │   │   ├── 📄 SeasonsSection.tsx      # TV seasons section
│   │   │   ├── 📄 TopRatedContainer.tsx   # Top rated wrapper
│   │   │   ├── 📄 TrendingContainer.tsx   # Trending wrapper
│   │   │   ├── � TVShowCard.tsx          # TV show card
│   │   │   ├── 📄 TVShowDetailsGrid.tsx   # TV show details
│   │   │   ├── 📄 TVShowWatchProvidersSection.tsx # TV watch providers
│   │   │   ├── 📄 UpcomingContainer.tsx   # Upcoming movies wrapper
│   │   │   ├── 📄 VideoCard.tsx           # Video card
│   │   │   ├── 📄 VideosSection.tsx       # Videos section
│   │   │   ├── � WatchProvidersSection.tsx # Watch providers
│   │   │   │
│   │   │   ├── 📂 discover/               # Discover page components
│   │   │   │   ├── 📄 FilterPanel.tsx     # Filter panel
│   │   │   │   ├── 📄 MediaGrid.tsx       # Media grid
│   │   │   │   ├── 📄 Pagination.tsx      # Pagination
│   │   │   │   ├── 📄 PeopleSearch.tsx    # People search
│   │   │   │   └── 📄 ResultsSection.tsx  # Results section
│   │   │   │
│   │   │   ├── 📂 movie-detail/           # Movie detail components
│   │   │   │   ├── 📄 index.ts            # Movie detail exports
│   │   │   │   ├── 📄 MovieDetailTypes.ts # Movie detail types
│   │   │   │   ├── 📄 MovieHero.tsx       # Movie hero section
│   │   │   │   ├── 📄 MovieOverview.tsx   # Movie overview
│   │   │   │   └── 📄 MovieCollectionSection.tsx # Collection section
│   │   │   │
│   │   │   ├── 📂 person-detail/          # Person detail components
│   │   │   │   ├── 📄 index.ts            # Person detail exports
│   │   │   │   ├── 📄 PersonDetailTypes.ts # Person detail types
│   │   │   │   ├── 📄 PersonHero.tsx      # Person hero section
│   │   │   │   ├── 📄 PersonInfo.tsx      # Person information
│   │   │   │   └── 📄 PersonCredits.tsx   # Person credits
│   │   │   │
│   │   │   └── 📂 tv-detail/              # TV detail components
│   │   │       ├── 📄 index.ts            # TV detail exports
│   │   │       ├── 📄 TVShowDetailTypes.ts # TV detail types
│   │   │       ├── 📄 TVHero.tsx          # TV hero section
│   │   │       ├── 📄 TVOverview.tsx      # TV overview
│   │   │       └── 📄 TVNetworks.tsx      # TV networks
│   │   │
│   │   └── 📂 hooks/                      # Page-specific hooks
│   │       ├── 📄 index.ts                # Hook exports
│   │       ├── 📄 useDiscoverFilters.ts   # Discover filters hook
│   │       ├── 📄 useDiscoverPagination.ts # Discover pagination hook
│   │       ├── 📄 useDiscoverResults.ts   # Discover results hook
│   │       ├── 📄 useDiscoverSearch.ts    # Discover search hook
│   │       ├── 📄 useMediaType.ts         # Media type hook
│   │       ├── 📄 useMovieDetails.ts      # Movie details hook
│   │       ├── 📄 useMovieTrailer.ts      # Movie trailer hook
│   │       ├── 📄 usePersonDetails.ts     # Person details hook
│   │       ├── 📄 useTVShowDetails.ts     # TV show details hook
│   │       └── 📄 useTVShowTrailer.ts     # TV show trailer hook
│   │
│   └── 📂 styles/                         # Styling files
│       ├── 📄 App.css                     # App-specific styles
│       ├── 📄 globals.css                 # Global styles
│       ├── 📄 trending.css                # Trending-specific styles
│       ├── 📄 touch.css                   # Touch interaction styles
│       ├── 📄 navigation.css              # Navigation styles
│       └── 📄 card-scroll-fix.css         # Card scrolling fixes
```

## 🚀 Performance Optimizations

### Code Splitting

- **Feature-based modules** allow for efficient code splitting
- **Dynamic imports** for heavy components
- **Tree-shaking** support with proper exports

### API Optimization

- **Request caching** to prevent duplicate API calls
- **Debounced search** to reduce server load
- **Image lazy loading** for better performance

### Bundle Optimization

- **Modular architecture** enables better tree-shaking
- **Utility functions** are separately importable
- **Component chunking** for optimal loading

## 🧪 Development Features

### TypeScript Integration

- **Strict type checking** for better code quality
- **Interface definitions** for all API responses
- **Generic utilities** for reusable code
- **Proper error handling** with typed catch blocks

### Developer Experience

- **ESLint configuration** for code consistency
- **Prettier integration** for code formatting
- **Hot Module Replacement** for fast development
- **Comprehensive exports** for easy imports
- **Clear file organization** for maintainability

### shadcn/ui Configuration

- **Design System**: New York style with modern aesthetics
- **Component Structure**: Located in `src/shared/components/ui/`
- **Theming**: CSS variables for dynamic color schemes
- **Customization**: Full control over component styling and behavior
- **Accessibility**: Built-in ARIA support and keyboard navigation
- **Variants**: Class Variance Authority for component state management
- **Import Aliases**: Clean imports using `@/components/ui/*` paths
- **Icon Library**: Lucide React integration for consistent iconography

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small tablets and large phones */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Laptops and desktops */
```

### Responsive Features

- **Card layouts**: 2 cols mobile → 4 cols tablet → 5 cols desktop
- **Typography scaling**: Responsive font sizes
- **Navigation**: Mobile sidebar ↔ Desktop horizontal nav
- **Touch interactions**: Enhanced for mobile devices
- **Image optimization**: Different sizes for different screens

## �️ Tech Stack

### Core Dependencies

- **React 19.1.0** - Latest React version with concurrent features
- **React DOM 19.1.0** - React DOM renderer with modern optimizations
- **React Router DOM 7.6.3** - Client-side routing with data loading
- **TypeScript 5.8.3** - Type-safe development with latest language features
- **Vite 7.0.0** - Ultra-fast build tool and development server

### UI & Styling

- **Tailwind CSS 4.1.11** - Utility-first CSS framework with new engine
- **@tailwindcss/vite 4.1.11** - Native Vite integration for Tailwind
- **shadcn/ui** - Modern component library built on Radix UI primitives
  - **Style**: New York design system
  - **Base Color**: Neutral color palette
  - **CSS Variables**: Dynamic theming support
  - **Component Aliases**: Clean import paths (`@/components/ui`)
- **Radix UI Slot 1.2.3** - Headless UI primitive for composable components
- **Class Variance Authority 0.7.1** - CVA for component variants and styling
- **Tailwind Merge 3.3.1** - Intelligent Tailwind class merging utility
- **CLSX 2.1.1** - Conditional className utility
- **Lucide React 0.525.0** - Beautiful and consistent icon library (shadcn/ui default)

### Development Tools

- **ESLint 9.29.0** - Latest ESLint with flat config support
- **@eslint/js 9.29.0** - ESLint JavaScript rules
- **TypeScript ESLint 8.34.1** - TypeScript-specific linting rules
- **ESLint Plugins**:
  - **eslint-plugin-react 7.37.5** - React-specific linting
  - **eslint-plugin-react-hooks 5.2.0** - React Hooks rules
  - **eslint-plugin-react-refresh 0.4.20** - React Refresh rules
  - **eslint-plugin-jsx-a11y 6.10.2** - Accessibility linting
  - **eslint-plugin-import 2.32.0** - Import/export linting
  - **eslint-plugin-prettier 5.5.1** - Prettier integration
  - **eslint-plugin-unused-imports 4.1.4** - Unused imports detection
- **Prettier 3.6.2** - Code formatting with latest features
- **eslint-config-prettier 10.1.5** - ESLint and Prettier integration

### Build & Development

- **@vitejs/plugin-react 4.5.2** - Official React plugin for Vite
- **Vite 7.0.0** - Next-generation frontend tooling
- **TypeScript Compiler 5.8.3** - Latest TypeScript compilation
- **Globals 16.2.0** - Global variables for various environments
- **@types/node 24.0.6** - Node.js type definitions
- **@types/react 19.1.8** - React type definitions
- **@types/react-dom 19.1.6** - React DOM type definitions
- **@types/react-router-dom 5.3.3** - React Router type definitions

### Animation & Utilities

- **tw-animate-css 1.3.4** - Tailwind CSS animation utilities
- **Modern Browser APIs** - Intersection Observer, ResizeObserver, etc.
- **CSS Custom Properties** - For dynamic theming and animations
- **CSS Grid & Flexbox** - Modern layout techniques

### Why This Tech Stack?

#### Modern React Ecosystem

- **React 19**: Latest features including concurrent rendering and server components ready
- **TypeScript 5.8**: Enhanced type inference and modern JavaScript features
- **Vite 7**: Lightning-fast development with HMR and optimized production builds

#### Performance First

- **Tailwind CSS 4**: New engine with better performance and smaller bundle sizes
- **Tree Shaking**: Automatic dead code elimination across the entire stack
- **Code Splitting**: Built-in support for optimal loading strategies

#### Developer Experience

- **Zero Configuration**: Vite + TypeScript + ESLint work together seamlessly
- **Type Safety**: End-to-end type safety from API responses to UI components
- **Hot Reload**: Instant feedback during development with fast refresh
- **Modern Tooling**: Latest versions of all tools with active maintenance
- **shadcn/ui Integration**: Copy-paste components with full customization control

#### Production Ready

- **Build Optimization**: Automatic optimization for production deployments
- **Browser Support**: Modern browsers with graceful degradation
- **Accessibility**: Built-in support for ARIA and semantic HTML
- **Scalability**: Architecture that grows with your application needs

## �🔧 Setup and Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TMDb API Key

### Environment Setup

1. Copy `.env.development` and add your TMDb API credentials:

```env
VITE_TMDB_API_READ_ACCESS_TOKEN=your_read_access_token_here
```

### Installation

```bash
npm install
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 📄 API Integration

### TMDb API Endpoints Used

#### Core Content Endpoints
- `/trending/movie/{time_window}` - Trending movies (day/week)
- `/trending/tv/{time_window}` - Trending TV shows (day/week)
- `/trending/person/{time_window}` - Trending people (day/week)
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/upcoming` - Upcoming movie releases
- `/tv/popular` - Popular TV shows
- `/tv/top_rated` - Top rated TV shows

#### Search Endpoints
- `/search/movie` - Movie search with query
- `/search/tv` - TV show search
- `/search/person` - People search
- `/search/multi` - Multi-type search (movies, TV, people)
- `/search/company` - Production company search
- `/search/collection` - Movie collection search

#### Detail Endpoints
- `/movie/{movie_id}` - Movie details
- `/movie/{movie_id}/credits` - Movie cast and crew
- `/movie/{movie_id}/videos` - Movie trailers and videos
- `/movie/{movie_id}/reviews` - Movie reviews
- `/movie/{movie_id}/similar` - Similar movies
- `/movie/{movie_id}/recommendations` - Movie recommendations
- `/movie/{movie_id}/watch/providers` - Movie streaming providers
- `/movie/{movie_id}/images` - Movie images and posters

#### TV Show Endpoints
- `/tv/{tv_id}` - TV show details
- `/tv/{tv_id}/credits` - TV show cast and crew
- `/tv/{tv_id}/videos` - TV show trailers and videos
- `/tv/{tv_id}/reviews` - TV show reviews
- `/tv/{tv_id}/similar` - Similar TV shows
- `/tv/{tv_id}/recommendations` - TV show recommendations
- `/tv/{tv_id}/watch/providers` - TV streaming providers
- `/tv/{tv_id}/season/{season_number}` - Season details
- `/tv/{tv_id}/season/{season_number}/episode/{episode_number}` - Episode details

#### Person Endpoints
- `/person/{person_id}` - Person details and biography
- `/person/{person_id}/movie_credits` - Person's movie credits
- `/person/{person_id}/tv_credits` - Person's TV credits
- `/person/{person_id}/combined_credits` - All credits combined
- `/person/{person_id}/images` - Person images

#### Discovery & Filtering
- `/discover/movie` - Discover movies with filters
- `/discover/tv` - Discover TV shows with filters
- `/genre/movie/list` - Movie genres list
- `/genre/tv/list` - TV genres list
- `/configuration` - API configuration
- `/configuration/countries` - Available countries
- `/configuration/languages` - Available languages

#### Company & Network Endpoints
- `/company/{company_id}` - Production company details
- `/company/{company_id}/movies` - Company's movies
- `/network/{network_id}` - TV network details
- `/network/{network_id}/tv` - Network's TV shows

### API Features & Optimization

#### Caching Strategy
- **Request Caching**: Intelligent caching for repeated API calls
- **Image Caching**: Poster and backdrop image optimization
- **Response Caching**: Cached responses for better performance
- **Cache Invalidation**: Smart cache refresh for updated content

#### Rate Limiting & Error Handling
- **Rate Limit Compliance**: Respects TMDb API rate limits (40 requests/10 seconds)
- **Graceful Degradation**: Fallback content when API is unavailable
- **Error Recovery**: Automatic retry mechanisms for failed requests
- **Loading States**: Beautiful loading indicators during API calls
- **Timeout Handling**: Request timeout management


## ⚙️ Advanced Build Configuration

### Vite Configuration Features

- **Path Aliases**: `@/` alias for clean imports from src directory
- **Tailwind CSS Vite Plugin**: Integrated Tailwind CSS processing
- **Manual Code Chunking**: Intelligent splitting of vendor and app code
  - **React Ecosystem**: Separate chunk for React and React DOM
  - **React Router**: Isolated routing library chunk
  - **UI Libraries**: Dedicated chunk for Lucide React icons
  - **Movie Features**: Business logic and components split separately

### Lazy Loading Strategy

- **Route-Level Splitting**: All pages are lazy-loaded for optimal initial bundle size
- **Layout Splitting**: Main layout is lazy-loaded separately
- **Feature Isolation**: Movie features are chunked independently
- **Vendor Optimization**: Large third-party libraries are isolated

### TypeScript Configuration

- **Multiple Config Files**: Separate configs for app, Node.js, and base settings
- **Strict Mode**: Enhanced type checking for better code quality
- **Path Mapping**: Consistent alias resolution across the project

## 💝 Built with ❤️

This project is built using React, TypeScript, and TMDb API, demonstrating modern React development practices with a focus on performance, accessibility, and user experience.
