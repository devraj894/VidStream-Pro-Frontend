import PlaylistCard from '@/components/playlist/PlaylistCard'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { getUserPlaylists } from '@/services/playlists'
import { PaginatedResponse } from '@/types/api.types'
import { Playlist } from '@/types/playlist.types'
import { useEffect, useState } from 'react'

interface PlaylistTabProps {
  channelId: string
}

export default function PlaylistTab({ channelId }: PlaylistTabProps) {
  const [channelPlaylists, setChannelPlaylists] = useState<PaginatedResponse<Playlist>>()
  const [loadingPlaylists, setLoadingPlaylists] = useState(true)
  const [loadingMorePlaylists, setLoadingMorePlaylists] = useState(false)

  useEffect(() => {
    const loadPlaylists = async () => {
      setLoadingPlaylists(true)

      try {
        const playlistsResponse = await getUserPlaylists({userId: channelId})
        setChannelPlaylists(playlistsResponse.data)

      } catch (err) {
        console.log("Failed to load playlists", err)
        
      } finally {
        setLoadingPlaylists(false)
      }
    }

    loadPlaylists();
  }, [channelId])

  const loadMorePlaylists = async () => {
    if(loadingMorePlaylists) return;
    if(!channelPlaylists?.hasNextPage) return

    try {
      setLoadingMorePlaylists(true)      
      const nextPage = channelPlaylists.nextPage;

      if(!nextPage) return;

      const response = await getUserPlaylists({
        page: nextPage,
        limit: 10,
        userId: channelId
      })

      setChannelPlaylists((prev) => {
        if(!prev) return response.data;

        return {
          ...response.data,

          docs: [
            ...prev.docs,
            ...response.data.docs
          ],
        }
      })
    } catch(err) {
      console.log("Error loading more playlists", err);

    } finally {
      setLoadingMorePlaylists(false)
    }
  }

  if(loadingPlaylists) return <Spinner />

  if (channelPlaylists?.docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-zinc-200">
          No playlists yet
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          This channel hasn&apos;t created any playlists.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-2">
        {channelPlaylists?.docs.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>

      {/* LOAD MORE */}
      {channelPlaylists?.hasNextPage && (
        <div className="flex justify-center">
  
          <Button
            variant="secondary"
            onClick={loadMorePlaylists}
            disabled={loadingMorePlaylists}
          >
            {loadingMorePlaylists ? (
              "Loading..."
            ) : (
              "Load More"
            )}
          </Button>
  
        </div>
      )}
    </>
  )
}
