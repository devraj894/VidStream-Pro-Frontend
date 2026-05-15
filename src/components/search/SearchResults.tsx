'use client'

import { searchVideos } from '@/services/videos'
import { useEffect, useState } from 'react'
import VideoCard from '../video/VideoCard'
import { Video } from '@/types/videos.types'
import { Spinner } from '../ui/spinner'

interface SearchResultsProps {
  query: string
}

export default function SearchResults({
  query,
}: SearchResultsProps) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true)

        const response = await searchVideos({
          query,
        })

        setVideos(response.data.docs)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchResults()
    }
  }, [query])

  return (
    <div className="space-y-6">
        {/* Heading */}
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-zinc-300">
                Search results for{" "}
                <span className="text-white">
                    "{query}"
                </span>
            </h1>
        </div>

        {/* Loading */}
        {loading ? (
            <div className="flex justify-center py-20">
                <Spinner />
            </div>
        ) : !videos.length ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-xl font-medium text-zinc-300">
                    No videos found
                </h2>

                <p className="text-sm text-zinc-500 mt-2">
                    Try searching with different keywords
                </p>
            </div>
        ) : (
            /* Videos Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <VideoCard
                      key={video._id}
                      video={video}
                    />
                ))}
            </div>
        )}
    </div>
  )
}