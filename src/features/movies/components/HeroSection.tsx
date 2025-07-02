import { HeroSection as ModularHeroSection } from './hero'
import type { HeroSectionProps } from './hero/HeroSectionTypes'

export function HeroSection(props: HeroSectionProps) {
  return <ModularHeroSection {...props} />
}
