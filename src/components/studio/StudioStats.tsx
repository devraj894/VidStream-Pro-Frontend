import { studioStatsTypes } from '@/types/studio'
import StudioStatCard from './StudioStatCard'

interface StudioStatsProps {
  stats: studioStatsTypes
}

export default function StudioStats({ stats }: StudioStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-8">
      <StudioStatCard title="Total views" value={stats.totalViews} />
      <StudioStatCard
        title="Total subscribers"
        value={stats.totalSubscribers}
      />
      <StudioStatCard title="Total likes" value={stats.totalLiks} />
    </div>
  )
}
