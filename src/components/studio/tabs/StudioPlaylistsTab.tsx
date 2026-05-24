import StudioPlaylistHeader from '../playlist/StudioPlaylistHeader'
import StudioPlaylistRow from '../playlist/StudioPlaylistRow'
import { ModalType } from '@/types/modal'
import { useEffect, useState } from 'react'
import { PaginatedResponse } from '@/types/api.types'
import { Playlist } from '@/types/playlist.types'
import { getUserPlaylists } from '@/services/playlists'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

interface StudioPlaylistsTabProps {
  userId?: string
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  refreshPlaylists: number
}

export default function StudioPlaylistsTab({
  userId,
  setModal,
  refreshPlaylists,
}: StudioPlaylistsTabProps) {
  const [playlists, setPlaylists] = useState<PaginatedResponse<Playlist>>()
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  
    useEffect(() => {
      const loadPlaylists = async () => {
        setLoading(true)
  
        try {
          const playlistsResponse = await getUserPlaylists({userId: userId})
          setPlaylists(playlistsResponse.data)
  
        } catch (err) {
          console.log("Failed to load playlists", err)
          
        } finally {
          setLoading(false)
        }
      }
    
      loadPlaylists();
    }, [userId, refreshPlaylists]);
  
    const loadMorePlaylists = async () => {
      if (loadingMore) return
      if(!playlists?.hasNextPage) return
  
      try {
        setLoadingMore(true)
  
        const nextPage = playlists.nextPage;
  
        if(!nextPage) return;
  
        const response = await getUserPlaylists({
          page: nextPage,
          limit: 10,
          userId: userId
        })
  
        setPlaylists((prev) => {
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
        setLoadingMore(false)
      }
    }
      
    if(loading) return <Spinner />
      
    if (playlists?.docs.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <h2 className="text-2xl font-semibold text-zinc-200">
            No playlists yet
          </h2>
  
          <p className="mt-2 text-sm text-zinc-400">
            You didn't create any playlists yet.
          </p>
        </div>
      )
    }

  return (
    <div className="mt-6 space-y-4">
      <StudioPlaylistHeader />

      {playlists?.docs.map((playlist) => (
        <StudioPlaylistRow
          key={playlist._id}
          setModal={setModal}
          playlist={playlist}
        />
      ))}

      {/* LOAD MORE */}
      {playlists?.hasNextPage && (
        <div className="flex justify-center">

          <Button
            variant="secondary"
            onClick={loadMorePlaylists}
            disabled={loadingMore}
          >
            {loadingMore ? (
              "Loading..."
            ) : (
              "Load More"
            )}
          </Button>

        </div>
      )}
    </div>
  )
}
