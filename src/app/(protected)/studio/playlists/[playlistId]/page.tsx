'use client'

import ConfirmModal from '@/components/modals/ConfirmModal'
import FormModal from '@/components/modals/FormModal'
import AddVideoToPlaylistModal from '@/components/studio/modals/AddVideoToPlaylistModal'
import StudioPlaylistVideoHeader from '@/components/studio/playlist/videos/StudioPlaylistHeader'
import StudioPlaylistVideosRow from '@/components/studio/playlist/videos/StudioPlaylistVideosRow'
import StudioPlaylistVideosTableHeader from '@/components/studio/playlist/videos/StudioPlaylistVideosTableHeader'
import { ModalType } from '@/types/modal'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PlaylistDetails } from '@/types/playlist.types'
import { getPlaylistDetails } from '@/services/playlists'
import { Spinner } from '@/components/ui/spinner'

export default function PlaylistDetailPage() {
  const params = useParams();
  const playlistId = params.playlistId as string;

  const [playlistDetails, setPlaylistDetails] = useState<PlaylistDetails>()
  const [loading, setLoading] = useState(true)

  const [modal, setModal] = useState<ModalType | null>(null)

  const modalType = modal?.type

  const isAddVideoModal = modalType === 'add-video-to-playlist'

  const isRemoveVideoModal = modalType === 'remove-video-from-playlist'

  const loadPlaylistDetails = async () => {
    try {
      setLoading(true)

      const response = await getPlaylistDetails(playlistId)
      setPlaylistDetails(response.data)
    } catch(err) {
      console.log("Failed to load playlist details", err)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlaylistDetails()
  }, [playlistId])

  if(loading) return <Spinner />

  return (
    <div>
      {playlistDetails && (  
        <StudioPlaylistVideoHeader
          setModal={setModal}
          playlistDetails={playlistDetails}
        />
      )}

      {playlistDetails && (
        <div className="mt-6 px-8">
          <StudioPlaylistVideosTableHeader />
          {playlistDetails.videos.length === 0 ? (
             <div className="flex items-center justify-center py-16">
              <p className="text-neutral-400 text-lg">
                No videos in this playlist yet
              </p>
            </div>
          ) : (
            playlistDetails.videos.map((video) => (
            <StudioPlaylistVideosRow
              key={video._id}
              setModal={setModal}
              video={video}
              playlistId={playlistDetails._id}
            />
          ) 
          ))}
        </div>
      )}

      <FormModal
        open={isAddVideoModal}
        onClose={() => setModal(null)}
        title="Add Videos to Playlist"
      >
        {isAddVideoModal && (
          <AddVideoToPlaylistModal
            playlistId={modal.data.playlistId}
            onSuccess={() => {
              setModal(null)
              loadPlaylistDetails()
            }}
            existingVideoIds={
              playlistDetails?.videos.map((video) => video._id) || []
            }
          />
        )}
      </FormModal>

      <ConfirmModal
        open={isRemoveVideoModal}
        onClose={() => setModal(null)}
        title="Remove Video from Playlist"
        description="Are you sure you want to remove this video from the playlist?"
        onConfirm={() => {
          if (modal?.type === 'remove-video-from-playlist') {
            console.log('delete video id:', modal.data.videoId)
          }
          setModal(null)
        }}
        loading={false}
      />
    </div>
  )
}
