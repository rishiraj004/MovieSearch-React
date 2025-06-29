import { Film, Tv, Star, type LucideIcon } from 'lucide-react'

interface SectionIconProps {
  type: 'movie' | 'tv' | 'person'
  className?: string
}

const iconMap: Record<string, { icon: LucideIcon; color: string }> = {
  movie: { icon: Film, color: 'text-pink-400' },
  tv: { icon: Tv, color: 'text-cyan-400' },
  person: { icon: Star, color: 'text-purple-400' }
}

export function SectionIcon({ type, className = 'w-5 h-5' }: SectionIconProps) {
  const { icon: Icon, color } = iconMap[type]
  
  return <Icon className={`${className} ${color} drop-shadow-lg`} />
}