import StudioPlaylistVideoHeader from '@/components/studio/playlist/videos/StudioPlaylistHeader'
import StudioPlaylistVideosRow from '@/components/studio/playlist/videos/StudioPlaylistVideosRow'
import StudioPlaylistVideosTableHeader from '@/components/studio/playlist/videos/StudioPlaylistVideosTableHeader'
import { playlistDetails } from '@/data/playlists'

export default function PlaylistDetailPage() {
  return (
    <div>
      <StudioPlaylistVideoHeader playlistDetails={playlistDetails} />
      <div className="mt-6 px-8">
        <StudioPlaylistVideosTableHeader />
        {playlistDetails.videos.map((video) => (
          <StudioPlaylistVideosRow key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}
