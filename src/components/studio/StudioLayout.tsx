import { studioStatsTypes } from '@/types/studio'
import StudioHeader from './StudioHeader'
import StudioStats from './StudioStats'

interface StudioLayoutProps {
  children: React.ReactNode
  stats: studioStatsTypes
}

export default function StudioLayout({ children, stats }: StudioLayoutProps) {
  return (
    <div className="space-y-6 pt-14">
      <StudioHeader />
      <StudioStats stats={stats} />
      <div>{children}</div>
    </div>
  )
}
