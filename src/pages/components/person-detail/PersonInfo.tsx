import type { PersonInfoProps } from './PersonDetailTypes'

export function PersonInfo({ person }: PersonInfoProps) {
  if (!person.biography) {
    return null
  }

  return (
    <section className="py-8 bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6">Biography</h2>
        <div className="prose prose-invert max-w-none">
          {person.biography.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-300 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
