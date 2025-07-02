import { Home } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

interface BackToHomeButtonProps {
  className?: string
}

export function BackToHomeButton({ className = '' }: BackToHomeButtonProps) {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Don't render on the home page
  if (location.pathname === '/') {
    return null
  }
  
  return (
    <button
      onClick={() => navigate('/')}
      className={`flex items-center justify-center p-2 bg-blue-600/85 hover:bg-blue-700 rounded-lg text-white transition-colors backdrop-blur-sm ${className}`}
      aria-label="Back to home"
    >
      <Home className="w-5 h-5" />
    </button>
  )
}
