import { AchievementBadge } from './AchievementBadge'

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  threshold: number
}

interface AchievementListProps {
  achievements: Achievement[]
}

export function AchievementList({ achievements }: AchievementListProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {achievements.map((ach) => (
        <AchievementBadge key={ach.id} {...ach} />
      ))}
    </div>
  )
}
