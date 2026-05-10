'use client'

import FeaturedSection from '@/components/home/FeaturedSection'
import VideoRow from '@/components/home/VideoRow'
import { useAuth } from '@/context/AuthContext'
import {
  trendingVideos,
  latestVideos,
  subscriptionVideos,
  recommendedVideos,
} from '@/data/videos'
import { fetchFeedData } from '@/services/videos'
import { FeedData } from '@/types/feed.types'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const { user, isLoading } = useAuth()
  console.log("Loading status: ", isLoading)
  console.log("Logged in user: ", user)

  const [feedVideos, setFeedVideos] = useState<FeedData | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetchFeedData()
        setFeedVideos(response.data)
      } catch(err) {
        console.error("Error fetching feed data: ", err)
      }
    }

    fetchFeed()
  }, [])

  console.log("Feed Videos: ", feedVideos)
  
  return (
    <div>
      {feedVideos?.featured && (
        <FeaturedSection featuredVideo={feedVideos.featured} />
      )}

      <div className="px-8 space-y-12 pt-4">
        <VideoRow title="Trending Section" videos={trendingVideos} />
        <VideoRow title="Latest Section" videos={latestVideos} />
        <VideoRow title="Subscriptions Section" videos={subscriptionVideos} />
        <VideoRow title="Recommended Section" videos={recommendedVideos} />
      </div>
    </div>
  )
}
