import { Button } from '@/components/ui/button'
import VideoCard from '@/components/video/VideoCard'
import { Video } from '@/types/videos.types'

interface VideosTabProps {
  videos: Video[]
  hasNextPage: boolean | undefined
  onLoadMore: () => void
  loadingMoreVideos?: boolean
}

export default function VideosTab({ videos, hasNextPage, onLoadMore, loadingMoreVideos }: VideosTabProps) {

  if (videos.length === 0) {
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
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}

    </div>

    {/* LOAD MORE */}
    {hasNextPage && (
      <div className="flex justify-center">

        <Button
          variant="secondary"
          onClick={onLoadMore}
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
