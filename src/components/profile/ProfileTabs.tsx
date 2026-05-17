import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import VideosTab from './tabs/VideosTab'
import PlaylistsTab from './tabs/PlaylistsTab'
import TweetsTab from './tabs/TweetsTab'
import SubscribedTab from './tabs/SubscribedTab'
import { tweetTypes } from '@/types/tweet'
import { subscribedChannelTypes } from '@/types/subscribedChannel'
import { Video } from '@/types/videos.types'
import { Playlist } from '@/types/playlist.types'

interface profileTabsProps {
  videos: Video[]
  playlists: Playlist[]
  tweets: tweetTypes[]
  subscribedChannels: subscribedChannelTypes[]

  hasNextPageVideos?: boolean
  hasNextPagePlaylists?: boolean

  onLoadMoreVideos: () => void
  onLoadMorePlaylists: () => void

  loadingMoreVideos?: boolean
  loadingMorePlaylists?: boolean
}

export default function ProfileTabs({
  videos,
  playlists,
  tweets,
  subscribedChannels,

  hasNextPageVideos,
  hasNextPagePlaylists,

  onLoadMoreVideos,
  onLoadMorePlaylists,

  loadingMoreVideos,
  loadingMorePlaylists
}: profileTabsProps) {
  return (
    <Tabs defaultValue="videos" className="mt-6 px-8">
      <TabsList className="flex justify-center md:space-x-48 bg-[#654c7640]">
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="playlists">Playlists</TabsTrigger>
        <TabsTrigger value="tweets">Tweets</TabsTrigger>
        <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
      </TabsList>

      <TabsContent value="videos">
        <VideosTab 
          videos={videos} 
          hasNextPage={hasNextPageVideos}
          onLoadMore={onLoadMoreVideos}
          loadingMoreVideos={loadingMoreVideos}
        />
      </TabsContent>

      <TabsContent value="playlists">
        <PlaylistsTab 
          playlists={playlists}
          hasNextPage={hasNextPagePlaylists} 
          onLoadMore={onLoadMorePlaylists}
          loadingMorePlaylists={loadingMorePlaylists}
        />
      </TabsContent>

      <TabsContent value="tweets">
        <TweetsTab tweets={tweets} />
      </TabsContent>

      <TabsContent value="subscribed">
        <SubscribedTab subscribedChannels={subscribedChannels} />
      </TabsContent>
    </Tabs>
  )
}
