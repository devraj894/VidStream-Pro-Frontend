import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import VideosTab from './tabs/VideosTab'
import PlaylistsTab from './tabs/PlaylistsTab'
import TweetsTab from './tabs/TweetsTab'
import SubscribedTab from './tabs/SubscribedTab'
import { homeVideoType } from '@/types/videos'
import { playlistType } from '@/types/playlist'
import { tweetTypes } from '@/types/tweet'
import { subscribedChannelTypes } from '@/types/subscribedChannel'

interface profileTabsProps {
  videos: homeVideoType[]
  playlists: playlistType[]
  tweets: tweetTypes[]
  subscribedChannels: subscribedChannelTypes[]
}

export default function ProfileTabs({
  videos,
  playlists,
  tweets,
  subscribedChannels,
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
        <VideosTab videos={videos} />
      </TabsContent>

      <TabsContent value="playlists">
        <PlaylistsTab playlists={playlists} />
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
