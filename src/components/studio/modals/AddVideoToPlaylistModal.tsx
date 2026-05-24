'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Video } from '@/types/videos.types'
import { searchVideos } from '@/services/videos'
import { useAuth } from '@/context/AuthContext'
import { PaginatedResponse } from '@/types/api.types'
import { addVideoToPlaylist } from '@/services/playlists'

interface AddVideoToPlaylistModalProps {
  playlistId: string
  onSuccess?: () => void
  existingVideoIds: string[]
}

export default function AddVideoToPlaylistModal({
  playlistId,
  onSuccess,
  existingVideoIds
}: AddVideoToPlaylistModalProps) {
  const [videos, setVideos] = useState<PaginatedResponse<Video>>()
  const [loadingVideos, setLoadingVideos] = useState(true)
  const [loadingMoreVideos, setLoadingMoreVideos] = useState(false)

  const [selected, setSelected] = useState<string | null>(null)

  const [addingError, setAddingError] = useState('')
  const [addLoading, setAddLoading] = useState(false)

  const { user } = useAuth();

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoadingVideos(true)

        const response = await searchVideos({ userId: user?._id })

        setVideos(response.data)

      } catch (err) {
        console.log(err)

      } finally {
        setLoadingVideos(false)
      }
    }

    loadVideos()
  }, [user?._id])

  const loadMoreVideos = async () => {
    if (loadingMoreVideos) return
    if(!videos?.hasNextPage) return

    try {
      setLoadingMoreVideos(true)

      const nextPage = videos.nextPage;

      if(!nextPage) return;

      const response = await searchVideos({
        page: nextPage,
        limit: 10,
        userId: user?._id
      })

      setVideos((prev) => {
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
      console.log("Error loading more videos", err);

    } finally {
      setLoadingMoreVideos(false)
    }
  }

  const filteredVideos = videos?.docs.filter((video) => !existingVideoIds.includes(video._id))

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev === id ? null : id))
  }

  const handleAdd = async () => {
    if (!selected) return

    try {
      setAddLoading(true)
      setAddingError('')

      await addVideoToPlaylist({
        videoId: selected, 
        playlistId: playlistId
      })

      onSuccess?.()

    } catch(err: any) {
      setAddingError(
        err?.response?.data?.message ||
        'Failed to add video to playlist'
      )
      console.log("Failed to add video to playlist", err)
      
    } finally {
      setAddLoading(false)
    }
  }

  if (loadingVideos) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2"
          >
            <div className="w-20 h-12 rounded bg-neutral-800 animate-pulse" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-neutral-800 animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-neutral-800 animate-pulse" />
            </div>

            <div className="w-4 h-4 rounded-sm bg-neutral-800 animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {addingError && (
        <p className="text-red-500 text-sm">
          {addingError}
        </p>
      )}

      {/* VIDEO LIST */}
      <div className="max-h-80 overflow-y-auto space-y-2">
        {filteredVideos?.length === 0 ? (
          <div className="py-10 text-center text-neutral-400">
            All videos already added
          </div>
        ) : (
          filteredVideos?.map((video) => (
            <div
              key={video._id}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                selected === video._id
                  ? 'bg-neutral-500'
                  : 'hover:bg-neutral-500'
              }`}
              onClick={() => toggleSelect(video._id)}
            >
              <img
                src={video.thumbnail.url}
                className="w-20 h-12 object-cover rounded"
              />

              <p className="flex-1">{video.title}</p>

              <input
                type="checkbox"
                checked={selected === video._id}
                readOnly
              />
            </div>
          ))
        )}

        {/* LOAD MORE */}
        {videos?.hasNextPage && filteredVideos?.length !== 0 && (
          <div className="flex justify-center">

            <Button
              variant="secondary"
              onClick={loadMoreVideos}
              disabled={loadingMoreVideos}
            >
              {loadingMoreVideos ? (
                "Loading..."
              ) : (
                "Load More"
              )}
            </Button>

          </div>
        )}
      </div>

      {/* ACTION */}
      <Button
        onClick={handleAdd}
        disabled={!selected || addLoading}
        className="w-full"
      >
        {addLoading ? (
          "Adding..."
        ) : (
          "Add Video"
        )}
      </Button>
    </div>
  )
}
