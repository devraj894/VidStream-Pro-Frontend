import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import VideosTab from './tabs/VideosTab'
import PlaylistsTab from './tabs/PlaylistsTab'
import TweetsTab from './tabs/TweetsTab'
import { subscribedChannelTypes } from '@/types/subscribedChannel'
import { Video } from '@/types/videos.types'
import { Playlist } from '@/types/playlist.types'
import { Tweet } from '@/types/tweets.types'
import UserListTab from './tabs/UserListTab'

interface profileTabsProps {
  videos: Video[]
  playlists: Playlist[]
  tweets: Tweet[]
  subscribedChannels: subscribedChannelTypes[]

  hasNextPageVideos?: boolean
  hasNextPagePlaylists?: boolean
  hasNextPageTweets?: boolean

  onLoadMoreVideos: () => void
  onLoadMorePlaylists: () => void
  onLoadMoreTweets: () => void

  loadingMoreVideos?: boolean
  loadingMorePlaylists?: boolean
  loadingMoreTweets?: boolean
}

export default function ProfileTabs({
  videos,
  playlists,
  tweets,
  subscribedChannels,

  hasNextPageVideos,
  hasNextPagePlaylists,
  hasNextPageTweets,

  onLoadMoreVideos,
  onLoadMorePlaylists,
  onLoadMoreTweets,

  loadingMoreVideos,
  loadingMorePlaylists,
  loadingMoreTweets
}: profileTabsProps) {
  return (
    <Tabs defaultValue="videos" className="mt-6 px-8">
      <TabsList className="flex justify-start md:justify-center gap-2 md:gap-12 bg-[#654c7640] w-full overflow-x-auto whitespace-nowrap px-2 scrollbar-hide no-scrollbar">
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="playlists">Playlists</TabsTrigger>
        <TabsTrigger value="tweets">Tweets</TabsTrigger>
        <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
        <TabsTrigger value="subscriptions">subscriptions</TabsTrigger>
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
        <TweetsTab 
          tweets={tweets} 
          hasNextPage={hasNextPageTweets}
          onLoadMore={onLoadMoreTweets}
          loadingMorePlaylists={loadingMoreTweets}
        />
      </TabsContent>

       <TabsContent value="subscribers">
        <UserListTab subscribedChannels={subscribedChannels} />
      </TabsContent>

      <TabsContent value="subscriptions">
        <UserListTab subscribedChannels={subscribedChannels} />
      </TabsContent>
    </Tabs>
  )
}
