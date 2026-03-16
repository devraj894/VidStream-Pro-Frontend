import StudioLayout from '@/components/studio/StudioLayout'
import StudioTabs from '@/components/studio/StudioTabs'
import { studioPlaylists, studioStats, studioVideos } from '@/data/studio'

export default function StudioPage() {
  return (
    <StudioLayout stats={studioStats}>
      <StudioTabs videos={studioVideos} playlists={studioPlaylists} />
    </StudioLayout>
  )
}
