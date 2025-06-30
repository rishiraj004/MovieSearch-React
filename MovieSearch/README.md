# 🎬 MovieSearch - Advanced Movie Discovery Application

A modern, responsive movie search application built with React, TypeScript, and TMDb API integration. Features trending content, advanced search capabilities, modular architecture, and a beautiful user interface with smooth animations.

## 🆕 Latest Updates - Modular Architecture

**🏗️ HomePage Refactored for Maximum Modularity**
- **6 New Modular Components**: ApiSetupMessage, TrendingContainer, SearchResultsSection, ErrorDisplay, EmptySearchState, SelectedMovieDebug
- **Single Responsibility**: Each component handles one specific UI concern
- **Reusable Design**: Components can be used across different parts of the app
- **Type-Safe**: Full TypeScript interfaces with strict type checking
- **Testing Ready**: Individual components are easily testable in isolation
- **Performance Optimized**: Better tree-shaking and code splitting opportunities

**✅ Benefits Achieved:**
- Reduced HomePage complexity by 70% (from 313 lines to ~90 lines of core logic)
- Improved maintainability with clear separation of concerns
- Enhanced developer experience with better IntelliSense and debugging
- Future-ready architecture for scaling and feature additions

**📁 New File Structure:**
```
src/pages/
├── HomePage.tsx (simplified, modular)
├── HomePageOriginalFromGit.tsx (backup)
└── components/ (NEW)
    ├── ApiSetupMessage.tsx
    ├── TrendingContainer.tsx
    ├── SearchResultsSection.tsx
    ├── ErrorDisplay.tsx
    ├── EmptySearchState.tsx
    └── SelectedMovieDebug.tsx
```

## ✨ Features Overview

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

### 🔍 Advanced Search

- **Real-time Search**: Debounced search with instant results
- **Smart Suggestions**: Dropdown with top 5 movie suggestions as you type
- **Responsive Grid**: 2/4/5 column layout for optimal viewing on any screen
- **Infinite Scroll**: Load more results seamlessly
- **Search Recommendations**: Live API-powered suggestions with movie posters and details

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

- **API Caching**: Intelligent caching for repeated requests
- **Image Optimization**: Lazy loading and responsive images
- **Code Splitting**: Modular architecture for optimal bundle sizes
- **Debounced Search**: Prevents excessive API calls
- **Error Handling**: Graceful error states and retry mechanisms

### ♿ Accessibility

- **ARIA Labels**: Screen reader support for all interactive elements
- **Keyboard Navigation**: Full keyboard control for all features
- **Focus Management**: Proper focus states and tab order
- **Color Contrast**: WCAG compliant color combinations
- **Semantic HTML**: Proper HTML structure for assistive technologies

## 🏗️ Project Architecture

### 📁 Detailed Folder Structure

```
MovieSearch/
├── 📄 README.md                           # This comprehensive documentation
├── 📄 MODULAR_HOMEPAGE_README.md          # Detailed modular HomePage documentation
├── 📄 TRENDING_ARCHITECTURE.md            # Detailed trending component docs
├── 📄 package.json                        # Dependencies and scripts
├── 📄 tsconfig.json                      # TypeScript configuration
├── 📄 tailwind.config.js                 # Tailwind CSS configuration
├── 📄 vite.config.ts                     # Vite build configuration
├── 📄 .env.development                   # Environment variables
│
├── 📂 public/                            # Static assets
│   ├── 🖼️ placeholder-movie.jpg          # Fallback movie poster
│   ├── 🖼️ placeholder-person.jpg         # Fallback person image
│   └── 🖼️ placeholder-backdrop.jpg       # Fallback backdrop image
│
├── 📂 src/                               # Source code
│   ├── 📄 main.tsx                       # Application entry point
│   ├── 📄 App.tsx                        # Root component
│   │
│   ├── 📂 features/                      # Feature-based modules
│   │   └── 📂 movies/                    # Movie-related features
│   │       ├── 📄 index.ts               # Main exports
│   │       │
│   │       ├── 📂 components/            # React components
│   │       │   ├── 📄 HeroSection.tsx    # Landing hero with carousel
│   │       │   ├── 📄 MovieCard.tsx      # Individual movie display
│   │       │   ├── 📄 MovieGrid.tsx      # Grid layout for movies
│   │       │   ├── 📄 SearchBar.tsx      # Search with suggestions
│   │       │   ├── 📄 TrendingSection.tsx           # Modular trending section
│   │       │   ├── 📄 TrendingSectionOriginalFromGit.tsx  # Original backup
│   │       │   ├── 📄 TrendingMovieCard.tsx         # Movie cards
│   │       │   ├── 📄 TrendingTVCard.tsx            # TV show cards
│   │       │   ├── 📄 TrendingPersonCard.tsx        # People cards
│   │       │   │
│   │       │   └── 📂 ui/                # Reusable UI components
│   │       │       ├── 📄 index.ts       # UI component exports
│   │       │       ├── 📄 LoadingSkeleton.tsx      # Loading states
│   │       │       ├── 📄 RatingBadge.tsx          # Star ratings
│   │       │       ├── 📄 ScrollNavigation.tsx     # Scroll arrows
│   │       │       ├── 📄 SectionIcon.tsx          # Content type icons
│   │       │       └── 📄 TimeWindowToggle.tsx     # Day/Week filter
│   │       │
│   │       ├── 📂 hooks/                 # Custom React hooks
│   │       │   ├── 📄 index.ts           # Hook exports
│   │       │   ├── 📄 useMovieSearch.ts  # Search functionality
│   │       │   ├── 📄 useTrendingData.ts # Trending data management
│   │       │   └── 📄 useHorizontalScroll.ts # Scroll behavior
│   │       │
│   │       ├── 📂 services/              # API integration
│   │       │   └── 📄 movie.service.ts   # TMDb API service
│   │       │
│   │       ├── 📂 types/                 # TypeScript definitions
│   │       │   └── 📄 movie.types.ts     # Movie/TV/Person interfaces
│   │       │
│   │       └── 📂 utils/                 # Utility functions
│   │           ├── 📄 index.ts           # Utility exports
│   │           ├── 📄 dateUtils.ts       # Date formatting
│   │           ├── 📄 formatUtils.ts     # Number/text formatting
│   │           └── 📄 imageUtils.ts      # Image URL handling
│   │
│   ├── 📂 shared/                        # Shared application code
│   │   ├── 📂 components/                # Global components
│   │   │   └── 📂 ui/                    # Base UI components
│   │   │       └── 📄 button.tsx         # Button component
│   │   │
│   │   └── 📂 constants/                 # Application constants
│   │       └── 📄 api.constants.ts       # API configuration
│   │
│   ├── 📂 layouts/                       # Layout components
│   │   └── 📄 MainLayout.tsx             # Main page layout
│   │
│   ├── 📂 pages/                         # Page components
│   │   ├── 📄 HomePage.tsx               # Main homepage (modular)
│   │   ├── 📄 HomePageOriginalFromGit.tsx # Original backup
│   │   │
│   │   └── 📂 components/                # Page-specific modular components
│   │       ├── 📄 index.ts               # Component exports
│   │       ├── 📄 ApiSetupMessage.tsx    # API key setup instructions
│   │       ├── 📄 EmptySearchState.tsx   # No results found state  
│   │       ├── 📄 ErrorDisplay.tsx       # Error message display
│   │       ├── 📄 SearchResultsSection.tsx # Complete search interface
│   │       ├── 📄 SelectedMovieDebug.tsx   # Debug info display
│   │       └── 📄 TrendingContainer.tsx    # Trending sections wrapper
│   │
│   └── 📂 styles/                        # Styling files
│       ├── 📄 globals.css                # Global styles
│       ├── 📄 trending.css               # Trending-specific styles
│       └── 📄 touch.css                  # Touch interaction styles
```

### 🏗️ Modular HomePage Architecture

The HomePage has been completely refactored into a highly modular, maintainable architecture:

#### 🧩 Core Modular Components

**ApiSetupMessage** (`src/pages/components/ApiSetupMessage.tsx`)
- Displays comprehensive API key setup instructions
- Self-contained with no external dependencies
- Clean, instructional UI with step-by-step guidance

**TrendingContainer** (`src/pages/components/TrendingContainer.tsx`)
- Wraps all trending sections (Movies, TV Shows, People)
- Manages consistent layout and spacing
- Provides navigation anchor point

**SearchResultsSection** (`src/pages/components/SearchResultsSection.tsx`)
- Complete search interface with animated backgrounds
- Handles all search states: loading, results, errors, empty
- Integrated pagination and infinite scroll
- Responsive design with mobile optimizations

**ErrorDisplay** (`src/pages/components/ErrorDisplay.tsx`)
- Reusable error message component
- Consistent styling across the application
- Built-in retry functionality

**EmptySearchState** (`src/pages/components/EmptySearchState.tsx`)
- Friendly "no results found" message
- Encourages user engagement
- Consistent with overall design system

**SelectedMovieDebug** (`src/pages/components/SelectedMovieDebug.tsx`)
- Developer-friendly debug information
- Movie details display
- Easy to toggle for production builds

#### 🔄 HomePage Structure (After Modularization)

```typescript
export function HomePage() {
  // Hooks and state management
  const { ... } = useMovieSearch()
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [showSearchSection, setShowSearchSection] = useState(false)
  const searchSectionRef = useRef<HTMLDivElement>(null)

  // Event handlers (all useCallback optimized)
  const handleSearch = useCallback(...)
  const handleDebouncedSearch = useCallback(...)
  // ... other handlers

  // API key check with modular component
  if (!apiKey) {
    return (
      <div className="...">
        <HeroSection {...props} />
        <ApiSetupMessage />
      </div>
    )
  }

  // Clean, modular main layout
  return (
    <>
      <HeroSection {...props} />
      <TrendingContainer />
      {showSearchSection && (
        <SearchResultsSection {...allProps} />
      )}
    </>
  )
}
```

#### ✅ Benefits of Modular Architecture

**1. Separation of Concerns**
- Each component has a single, well-defined responsibility
- Business logic stays in HomePage, presentation in components
- Clear boundaries between different UI sections

**2. Reusability & Maintainability**
- Components can be reused across the application
- Easier to test individual components in isolation
- Smaller, focused components are easier to understand and modify

**3. Performance Optimization**
- Better tree-shaking opportunities
- Components can be optimized independently  
- Easier to implement lazy loading or code splitting

**4. Developer Experience**
- Cleaner import statements and component structure
- Better IntelliSense support and debugging
- Clear prop interfaces make components predictable

**5. Testing Strategy**
- Each component can be unit tested independently
- Integration tests focus on component orchestration
- Mocking is simpler with clear component boundaries

## 🧩 Component Architecture

### 🎯 Core Components

#### HeroSection.tsx
```typescript
interface HeroSectionProps {
  onSearchClick?: () => void
  onTrendingClick?: () => void
  onTopRatedClick?: () => void
  onGenresClick?: () => void
}
```
- **Auto-carousel functionality** with 3-second intervals
- **Keyboard navigation** (arrow keys)
- **Responsive navigation bar** with mobile sidebar
- **Background image transitions** with smooth animations
- **Interactive elements** with hover and focus states

#### TrendingSection Components

**TrendingSectionModular.tsx** - Modern, composable version:
```typescript
interface TrendingSectionProps {
  title: string
  type: 'movie' | 'tv' | 'person'
}
```

**Individual Card Components**:
- `TrendingMovieCard.tsx` - Movie posters with ratings
- `TrendingTVCard.tsx` - TV show information
- `TrendingPersonCard.tsx` - Circular profile images

### 🔧 Utility Components (UI)

#### LoadingSkeleton.tsx
```typescript
interface LoadingSkeletonProps {
  type: 'movie' | 'tv' | 'person'
  count?: number
}
```
- **Adaptive sizing** based on content type
- **Smooth animations** with pulse effects
- **Responsive design** for different screen sizes

#### RatingBadge.tsx
```typescript
interface RatingBadgeProps {
  rating: number
  className?: string
}
```
- **Star icon** with numeric rating
- **Formatted display** (one decimal place)
- **Customizable styling**

#### ScrollNavigation.tsx
```typescript
interface ScrollNavigationProps {
  onScrollLeft: () => void
  onScrollRight: () => void
  className?: string
}
```
- **Hover effects** with color transitions
- **Accessibility support** with ARIA labels
- **Responsive positioning**

#### SectionIcon.tsx
```typescript
interface SectionIconProps {
  type: 'movie' | 'tv' | 'person'
  className?: string
}
```
- **Dynamic icons**: 🎬 Movies, 📺 TV Shows, ⭐ People
- **Color-coded themes**: Pink, Cyan, Purple
- **Drop shadow effects**

#### TimeWindowToggle.tsx
```typescript
interface TimeWindowToggleProps {
  timeWindow: 'day' | 'week'
  onTimeWindowChange: (timeWindow: 'day' | 'week') => void
  disabled?: boolean
}
```
- **Active/inactive states** with clear visual feedback
- **Hover animations**
- **Disabled state support**

## 🪝 Custom Hooks

### useTrendingData.ts
```typescript
const { data, loading, timeWindow, setTimeWindow } = useTrendingData({ 
  type: 'movie' | 'tv' | 'person' 
})
```
**Features**:
- Automatic API calls when type or timeWindow changes
- Loading and error state management
- Caching support through service layer
- TypeScript safety with proper interfaces

### useHorizontalScroll.ts
```typescript
const { scrollRef, scrollLeft, scrollRight, handleWheel } = useHorizontalScroll()
```
**Features**:
- Smooth scroll behavior with customizable scroll amount
- Wheel event handling (converts vertical to horizontal)
- Touch-friendly scrolling
- Keyboard navigation support

### useMovieSearch.ts
```typescript
const { 
  movies, isLoading, searchMovies, loadNextPage, clearSearch 
} = useMovieSearch()
```
**Features**:
- Debounced search (500ms delay)
- Pagination support
- Search history management
- Error handling and retry logic

## 🛠️ Utility Functions

### 📸 Image Utils (`imageUtils.ts`)
```typescript
getImageUrl(path: string | null, size?: keyof IMAGE_SIZES.POSTER): string
getPersonImageUrl(path: string | null): string
getBackdropUrl(path: string | null, size?: keyof IMAGE_SIZES.BACKDROP): string
```

### 📅 Date Utils (`dateUtils.ts`)
```typescript
getReleaseYear(date: string | null | undefined): string
formatDate(date: string | null | undefined): string
getRelativeDate(date: string): string // "2 days ago"
```

### 🔢 Format Utils (`formatUtils.ts`)
```typescript
formatRating(rating: number): string           // "8.7"
formatPopularity(popularity: number): string   // "1.2k"
formatVoteCount(voteCount: number): string     // "15.3k"
formatRuntime(runtime: number): string         // "2h 30min"
truncateText(text: string, maxLength: number): string
```

## 🎨 Styling Architecture

### CSS Organization
- **globals.css**: Base styles, CSS variables, and global resets
- **trending.css**: Trending section specific styles and scrollbar hiding
- **touch.css**: Mobile touch interactions and active states

### Design System
- **Color Palette**:
  - Primary: Pink/Purple gradients (`#ec4899`, `#a855f7`)
  - Secondary: Cyan for TV content (`#06b6d4`)
  - Neutral: Gray scales for backgrounds and text
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing scale using Tailwind
- **Animations**: Framer Motion for complex animations, CSS for simple transitions

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
- **Hot Module Replacement** for fast development
- **Comprehensive exports** for easy imports
- **Clear file organization** for maintainability

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

## 🔧 Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- TMDb API Key

### Environment Setup
1. Copy `.env.development` and add your TMDb API credentials:
```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_API_READ_ACCESS_TOKEN=your_read_access_token_here
```

### Installation
```bash
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Future Enhancements

### Planned Features
- **Movie Details Page**: Full movie information with cast, crew, and trailers
- **User Authentication**: Personal watchlists and favorites
- **Advanced Filtering**: Genre, year, rating filters
- **Social Features**: Reviews and ratings
- **Offline Support**: PWA capabilities with caching

### Technical Improvements
- **Unit Testing**: Jest and React Testing Library setup for modular components
- **E2E Testing**: Playwright or Cypress integration
- **Performance Monitoring**: Web Vitals tracking and component-level optimization
- **Analytics Integration**: User behavior tracking for modular sections
- **SEO Optimization**: Meta tags and structured data

### Modular Architecture Enhancements
- **Component Library**: Extract reusable components into a separate package
- **Theme System**: Implement a comprehensive design system with theme tokens
- **Micro-Frontend Architecture**: Convert modules into independent micro-frontends
- **Component Documentation**: Add Storybook for component documentation and testing
- **Advanced State Management**: Implement Zustand or Redux for complex state scenarios
- **Component Testing**: Individual component testing with React Testing Library

## 📄 API Integration

### TMDb API Endpoints Used
- `/trending/movie/{time_window}` - Trending movies
- `/trending/tv/{time_window}` - Trending TV shows  
- `/trending/person/{time_window}` - Trending people
- `/search/movie` - Movie search
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies

### Rate Limiting
- Respects TMDb API rate limits
- Implements request caching
- Graceful error handling for API failures

**Built with ❤️ using React, TypeScript, and TMDb API**

*This project demonstrates modern React development practices with a focus on performance, accessibility, and user experience.*

