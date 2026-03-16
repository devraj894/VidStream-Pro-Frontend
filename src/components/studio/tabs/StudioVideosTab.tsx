import { studioVideosTypes } from '@/types/studio'
import StudioVideoHeader from '../video/StudioVideoHeader'
import StudioVideoRow from '../video/StudioVideoRow'

interface StudioVideosProps {
  videos: studioVideosTypes[]
}

export default function StudioVideosTab({ videos }: StudioVideosProps) {
  return (
    <div className="mt-6 space-y-4">
      <StudioVideoHeader />

      {videos.map((video) => (
        <StudioVideoRow key={video.id} video={video} />
      ))}
    </div>
  )
}
