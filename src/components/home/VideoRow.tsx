'use client'

import { useRef } from 'react'
import VideoCard from './VideoCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { homeVideoType } from '@/types/videos'

interface VideoRowProps {
  title: string
  videos?: homeVideoType[]
}

export default function VideoRow({ title, videos }: VideoRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-4 relative">
      <h2 className="text-xl font-semibold text-white">{title}</h2>

      <div className="relative group">
        {/* LEFT ARROW (desktop only) */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex opacity-0 group-hover:opacity-100 transition
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          bg-black/60 hover:bg-black/80 p-2 rounded-full"
        >
          <ChevronLeft className="text-white" />
        </button>

        {/* VIDEO ROW */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {videos && videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video.id} video={video} />)
          ) : (
            <p className="text-sm text-neutral-500">No videos available.</p>
          )}
        </div>

        {/* RIGHT ARROW (desktop only) */}
        <button
          onClick={scrollRight}
          className="hidden md:flex opacity-0 group-hover:opacity-100 transition
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          bg-black/60 hover:bg-black/80 p-2 rounded-full"
        >
          <ChevronRight className="text-white" />
        </button>
      </div>
    </div>
  )
}
