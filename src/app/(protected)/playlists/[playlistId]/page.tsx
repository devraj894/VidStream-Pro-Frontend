import PlaylistHeader from '@/components/playlist/PlaylistHeader'
import VideoCard from '@/components/video/VideoCard'
import { playlistDetails } from '@/data/playlists'

export default function PlaylistDetailPage() {
  return (
    <div>
      <PlaylistHeader playlistDetails={playlistDetails} />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-2 px-8">
        {playlistDetails.videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}
