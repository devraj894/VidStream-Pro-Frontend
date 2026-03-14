import ProfileTabs from '@/components/profile/ProfileTabs'
import StudioLayout from '@/components/studio/StudioLayout'
import { playlists } from '@/data/playlists'
import { studioStats } from '@/data/studio'
import { tweets } from '@/data/tweets'
import { videos } from '@/data/videos'

export default function StudioPage() {
  return (
    <StudioLayout stats={studioStats}>
      <ProfileTabs
        mode="studio"
        videos={videos}
        playlists={playlists}
        tweets={tweets}
      />
    </StudioLayout>
  )
}
