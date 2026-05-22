import StudioHeader from './StudioHeader'
import StudioStats from './StudioStats'
import { useEffect, useState } from 'react'
import { ChannelStats } from '@/types/dashboard.types'
import { getChannelStats } from '@/services/dashboard'
import { Spinner } from '../ui/spinner'

interface StudioLayoutProps {
  children: React.ReactNode
}

export default function StudioLayout({ children }: StudioLayoutProps) {
  const [channelStats, setChannelStats] = useState<ChannelStats>();
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoadingStats(true);

      try {
        const statsResponse = await getChannelStats();
        setChannelStats(statsResponse.data)

      } catch(err) {
        console.log("Failed to load channel stats", err);

      } finally {
        setLoadingStats(false)
      }
    }

    loadStats();
  }, []);

  if(loadingStats) return <Spinner />

  return (
    <div className="space-y-6 pt-14">
      <StudioHeader />
      {channelStats && (
        <StudioStats stats={channelStats}/>
      )}
      <div>{children}</div>
    </div>
  )
}
