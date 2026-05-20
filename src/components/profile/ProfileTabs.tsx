import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import VideosTab from './tabs/VideosTab'
import PlaylistsTab from './tabs/PlaylistsTab'
import TweetsTab from './tabs/TweetsTab'
import { Video } from '@/types/videos.types'
import { Playlist } from '@/types/playlist.types'
import { Tweet } from '@/types/tweets.types'
import UserListTab from './tabs/UserListTab'
import { UserListItem } from '@/types/user.types'

interface profileTabsProps {
  channelId: string

  tweets: Tweet[]
  subscribers: UserListItem[]
  subscriptions: UserListItem[]

  hasNextPageTweets?: boolean
  hasNextPageSubscribers?: boolean
  hasNextPageSubscriptions?: boolean

  onLoadMoreTweets: () => void
  onLoadMoreSubscribers: () => void
  onLoadMoreSubscriptions: () => void

  loadingMoreTweets?: boolean
  loadingMoreSubscribers?: boolean
  loadingMoreSubscriptions?: boolean
}

export default function ProfileTabs({
  channelId,

  tweets,
  subscribers,
  subscriptions,

  hasNextPageTweets,
  hasNextPageSubscribers,
  hasNextPageSubscriptions,

  onLoadMoreTweets,
  onLoadMoreSubscribers,
  onLoadMoreSubscriptions,

  loadingMoreTweets,
  loadingMoreSubscribers,
  loadingMoreSubscriptions
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
          channelId={channelId}
        />
      </TabsContent>

      <TabsContent value="playlists">
        <PlaylistsTab 
          channelId={channelId}
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
        <UserListTab 
          type="subscribers"
          users={subscribers} 
          hasNextPage={hasNextPageSubscribers}
          onLoadMore={onLoadMoreSubscribers}
          loadingMore={loadingMoreSubscribers}
        />
      </TabsContent>

      <TabsContent value="subscriptions">
        <UserListTab 
          type="subscriptions"
          users={subscriptions} 
          hasNextPage={hasNextPageSubscriptions}
          onLoadMore={onLoadMoreSubscriptions}
          loadingMore={loadingMoreSubscriptions}
        />
      </TabsContent>
    </Tabs>
  )
}
