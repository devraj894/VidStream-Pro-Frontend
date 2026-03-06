import { Button } from '@/components/ui/button'
import { featuredVideoType } from '@/types/videos'
import { Dot, Play } from 'lucide-react'
import { formatDuration } from '@/lib/constant'

export default function FeaturedSection({
  featuredVideo,
}: {
  featuredVideo: featuredVideoType
}) {
  return (
    <div className="relative w-full h-[480px] overflow-hidden">
      <img
        src={featuredVideo.thumbnail.url}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-8 space-y-3">
        <h1 className="text-4xl font-bold text-white">{featuredVideo.title}</h1>

        <div className="text-sm text-neutral-300 flex gap-1">
          <span>{formatDuration(featuredVideo.duration)}</span>
          <Dot />
          <span>{featuredVideo.views.toLocaleString('en-IN')} views</span>
        </div>

        <p className="text-neutral-300 max-w-xl">{featuredVideo.description}</p>

        <Button className="w-fit bg-red-600 hover:bg-red-700">
          <Play className="mr-2" />
          Watch Now
        </Button>
      </div>
    </div>
  )
}
