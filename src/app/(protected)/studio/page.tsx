import ProfileTabs from '@/components/profile/ProfileTabs'
import StudioLayout from '@/components/studio/StudioLayout'
import { studioStats } from '@/data/studio'

export default function StudioPage() {
  return (
    <StudioLayout stats={studioStats}>
      <ProfileTabs
        videos={[]}
        playlists={[]}
        tweets={[]}
        subscribedChannels={[]}
      />
    </StudioLayout>
  )
}
