import StudioLayout from '@/components/studio/StudioLayout'
import StudioTabs from '@/components/studio/StudioTabs'
import { studioPlaylists, studioStats, studioVideos } from '@/data/studio'
import { tweets } from '@/data/tweets'

export default function StudioPage() {
  return (
    <StudioLayout stats={studioStats}>
      <StudioTabs
        videos={studioVideos}
        playlists={studioPlaylists}
        tweets={tweets}
      />
    </StudioLayout>
  )
}
