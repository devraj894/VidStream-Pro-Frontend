import StudioVideoHeader from '../video/StudioVideoHeader'
import StudioVideoRow from '../video/StudioVideoRow'
import { ModalType } from '@/types/modal'
import { useEffect, useState } from 'react'
import { StudioVideo } from '@/types/videos.types'
import { PaginatedResponse } from '@/types/api.types'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { getChannelVideos } from '@/services/dashboard'

interface StudioVideosProps {
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  refreshVideos: number
}

export default function StudioVideosTab({
  setModal,
  refreshVideos
}: StudioVideosProps) {
  const [videos, setVideos] = useState<PaginatedResponse<StudioVideo>>()
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true)

      try {
        const videosResponse = await getChannelVideos()
        setVideos(videosResponse.data)

      } catch (err) {
        console.log("Failed to load videos", err)
        
      } finally {
        setLoading(false)
      }
    }

    loadVideos();
  }, [refreshVideos]);
  
  const loadMoreVideos = async () => {
    if (loadingMore) return
    if(!videos?.hasNextPage) return

    try {
      setLoadingMore(true)

      const nextPage = videos.nextPage;

      if(!nextPage) return;

      const response = await getChannelVideos(
        nextPage,
        10,
      )

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
      setLoadingMore(false)
    }
  }
  
  if(loading) return <Spinner />
  
  if (videos?.docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-zinc-200">
          No videos yet
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          You didn't post any video yet.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-4">
      <StudioVideoHeader />

      {videos?.docs.map((video) => (
        <StudioVideoRow key={video._id} setModal={setModal} video={video} />
      ))}

      {/* LOAD MORE */}
      {videos?.hasNextPage && (
        <div className="flex justify-center">

          <Button
            variant="secondary"
            onClick={loadMoreVideos}
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
