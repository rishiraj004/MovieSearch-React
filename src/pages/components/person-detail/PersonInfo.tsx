import { BookOpen } from 'lucide-react'

import type { PersonInfoProps } from './PersonDetailTypes'

export function PersonInfo({ person }: PersonInfoProps) {
  if (!person.biography) {
    return null
  }

  return (
    <section className="mb-8 sm:mb-12 animate-fadeIn">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Biography</h2>
        </div>
        <div className="prose prose-invert prose-lg max-w-none">
          {person.biography.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-300 leading-relaxed mb-4 text-base sm:text-lg last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
