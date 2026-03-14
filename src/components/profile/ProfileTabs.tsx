import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import VideosTab from './tabs/VideosTab'
import PlaylistsTab from './tabs/PlaylistsTab'
import TweetsTab from './tabs/TweetsTab'
import SubscribedTab from './tabs/SubscribedTab'
import { homeVideoType } from '@/types/videos'
import { playlistType } from '@/types/playlist'
import { tweetTypes } from '@/types/tweet'
import { subscribedChannelTypes } from '@/types/subscribedChannel'
import { Button } from '../ui/button'

interface profileTabsProps {
  mode?: 'profile' | 'studio'
  videos: homeVideoType[]
  playlists: playlistType[]
  tweets: tweetTypes[]
  subscribedChannels?: subscribedChannelTypes[]
}

export default function ProfileTabs({
  videos,
  playlists,
  tweets,
  subscribedChannels = [],
  mode = 'profile',
}: profileTabsProps) {
  return (
    <Tabs defaultValue="videos" className="mt-6 px-8">
      {mode === 'profile' ? (
        <TabsList className="flex justify-center md:space-x-48 bg-[#654c7640]">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="tweets">Tweets</TabsTrigger>
          <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
        </TabsList>
      ) : (
        <div className="flex items-center justify-between bg-[#654c7640] rounded-lg">
          <TabsList className="md:gap-8 bg-transparent">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="tweets">Tweets</TabsTrigger>
          </TabsList>

          <Button className="bg-purple-600 px-4 rounded-lg text-sm font-semibold">
            Upload
          </Button>
        </div>
      )}

      <TabsContent value="videos">
        <VideosTab videos={videos} />
      </TabsContent>

      <TabsContent value="playlists">
        <PlaylistsTab playlists={playlists} />
      </TabsContent>

      <TabsContent value="tweets">
        <TweetsTab tweets={tweets} />
      </TabsContent>

      {mode === 'profile' && (
        <TabsContent value="subscribed">
          <SubscribedTab subscribedChannels={subscribedChannels} />
        </TabsContent>
      )}
    </Tabs>
  )
}
