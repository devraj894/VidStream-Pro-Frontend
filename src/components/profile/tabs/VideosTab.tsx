import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner';
import VideoCard from '@/components/video/VideoCard'
import { searchVideos } from '@/services/videos';
import { PaginatedResponse } from '@/types/api.types';
import { Video } from '@/types/videos.types'
import { useEffect, useState } from 'react';

interface VideosTabProps {
  channelId: string
}

export default function VideosTab({channelId}: VideosTabProps) {
  const [channelVideos, setChannelVideos] = useState<PaginatedResponse<Video>>();
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [loadingMoreVideos, setLoadingMoreVideos] = useState(false);

  useEffect(() => {
    const loadVideos = async () => {
      if(!loadingVideos) return

      try {
        const videosResponse = await searchVideos({
            userId: channelId
        })

        setChannelVideos(videosResponse.data)

      } catch (err) {
        console.log("Failed to load videos", err)
        
      } finally {
        setLoadingVideos(false)
      }
    }

    loadVideos();
  }, [channelId])

  const loadMoreVideos = async () => {
    if(!channelVideos?.hasNextPage) return

    try {
      setLoadingMoreVideos(true)

      const nextPage = channelVideos.nextPage;

      if(!nextPage) return;

      const response = await searchVideos({
        page: nextPage,
        limit: 10,
        userId: channelId
      })

      setChannelVideos((prev) => {
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
      console.log("Error loading more search videos", err);

    } finally {
      setLoadingMoreVideos(false)
    }
  }

  if(loadingVideos) return <Spinner />

  if (channelVideos?.docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-zinc-200">
          No videos yet
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          This channel hasn&apos;t uploaded any videos.
        </p>
      </div>
    )
  }

  return (
    <>
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-2">
      {channelVideos?.docs.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}

    </div>

    {/* LOAD MORE */}
    {channelVideos?.hasNextPage && (
      <div className="flex justify-center">

        <Button
          variant="secondary"
          onClick={loadMoreVideos}
        >
          {loadingMoreVideos ? (
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
