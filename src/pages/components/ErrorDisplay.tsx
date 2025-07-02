import { Button } from '@/shared/components/ui/button'

interface ErrorDisplayProps {
  error: string
  onClearError: () => void
}

export function ErrorDisplay({ error, onClearError }: ErrorDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 text-center">
        <div className="text-red-400 text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4">⚠️</div>
        <p className="text-red-300 font-medium text-base md:text-lg mb-4 md:mb-6">Error: {error}</p>
        <Button 
          onClick={onClearError} 
          className="bg-red-500 hover:bg-red-600 text-white border-0 px-6 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}
