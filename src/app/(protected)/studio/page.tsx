import StudioLayout from '@/components/studio/StudioLayout'
import StudioTabs from '@/components/studio/StudioTabs'
import { studioStats, studioVideos } from '@/data/studio'

export default function StudioPage() {
  return (
    <StudioLayout stats={studioStats}>
      <StudioTabs videos={studioVideos} />
    </StudioLayout>
  )
}
