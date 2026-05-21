"use client"

import PlaylistHeader from '@/components/playlist/PlaylistHeader'
import { Spinner } from '@/components/ui/spinner'
import VideoCard from '@/components/video/VideoCard'
import { getPlaylistDetails } from '@/services/playlists'
import { PlaylistDetails } from '@/types/playlist.types'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PlaylistDetailPage() {
  const params = useParams();
  const playlistId = params.playlistId as string

  const [playlistDetails, setPlaylistDetails] = useState<PlaylistDetails>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPlaylist = async () => {
      setLoading(true)

      try {
        const response = await getPlaylistDetails(playlistId);
        setPlaylistDetails(response.data)

      } catch(err) {
        console.log("Error while loading playlist details", err)

      } finally {
        setLoading(false)
      }
    }

    loadPlaylist()
  }, [playlistId])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      {playlistDetails && (
        <>   
          <PlaylistHeader playlistDetails={playlistDetails} />

          {playlistDetails.videos.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-neutral-400 text-lg">
                No videos in this playlist yet
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-2 px-8">
              {playlistDetails.videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
