import FeaturedSection from '@/components/home/FeaturedSection'
import VideoRow from '@/components/home/VideoRow'
import {
  featuredVideo,
  trendingVideos,
  latestVideos,
  subscriptionVideos,
  recommendedVideos,
} from '@/data/videos'

export default function HomePage() {
  return (
    <div>
      <FeaturedSection featuredVideo={featuredVideo} />

      <div className="px-8 space-y-12 pt-4">
        <VideoRow title="Trending Section" videos={trendingVideos} />
        <VideoRow title="Latest Section" videos={latestVideos} />
        <VideoRow title="Subscriptions Section" videos={subscriptionVideos} />
        <VideoRow title="Recommended Section" videos={recommendedVideos} />
      </div>
    </div>
  )
}
