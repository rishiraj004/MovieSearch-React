# MovieSearch App

A modern, optimized React application for searching and discovering movies using the TMDb API.

## Features

- **Advanced Search**: Real-time debounced search with pagination
- **Optimized Performance**: In-memory caching, request deduplication, and retry logic
- **Modern UI**: Clean, responsive design with loading states
- **TypeScript**: Full type safety throughout the application
- **Feature-based Architecture**: Scalable folder structure

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- TMDb API account

### Setup

1. **Clone and Install**

   ```bash
   git clone <your-repo-url>
   cd MovieSearch
   npm install
   ```

2. **Get TMDb API Access Token**
   - Go to [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Get your **Read Access Token** (Bearer Token), not the API Key
   - Copy the token (starts with `eyJhbGciOiJIUzI1NiJ9...`)

3. **Configure Environment**

   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your TMDb Read Access Token
   VITE_TMDB_API_READ_ACCESS_TOKEN=your_actual_token_here
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **API**: TMDb REST API with Bearer token authentication
- **Performance**: Custom caching, debouncing, request deduplication
- **Code Quality**: ESLint + Prettier + TypeScript strict mode

