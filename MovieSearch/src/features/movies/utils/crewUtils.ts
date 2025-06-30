import type { Crew } from '../types/movie.types'

export interface CrewByDepartment {
  directors: Crew[]
  producers: Crew[]
  writers: Crew[]
}

export function filterCrewByJob(crew: Crew[]): CrewByDepartment {
  const directors = crew.filter(person => 
    person.job === 'Director' || person.job === 'Co-Director'
  )
  
  const producers = crew.filter(person => 
    person.job === 'Producer' || 
    person.job === 'Executive Producer' || 
    person.job === 'Co-Producer' ||
    person.job === 'Associate Producer'
  )
  
  const writers = crew.filter(person => 
    person.job === 'Writer' || 
    person.job === 'Screenplay' || 
    person.job === 'Story' ||
    person.job === 'Novel' ||
    person.job === 'Adaptation' ||
    person.department === 'Writing'
  )

  return {
    directors,
    producers,
    writers
  }
}

export function getTopCrewMembers(crew: Crew[], job: string, limit = 3): Crew[] {
  return crew
    .filter(person => person.job === job)
    .slice(0, limit)
}
