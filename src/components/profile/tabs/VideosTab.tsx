import VideoCard from '@/components/video/VideoCard'
import { homeVideoType } from '@/types/videos'

interface VideosTabProps {
  videos: homeVideoType[]
}

export default function VideosTab({ videos }: VideosTabProps) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-2">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
