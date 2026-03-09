import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import VideosTab from './tabs/VideosTab'
import PlaylistsTab from './tabs/PlaylistsTab'
import TweetsTab from './tabs/TweetsTab'
import SubscribedTab from './tabs/SubscribedTab'
import { homeVideoType } from '@/types/videos'

interface profileTabsProps {
  videos: homeVideoType[]
}

export default function ProfileTabs({ videos }: profileTabsProps) {
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
        <PlaylistsTab />
      </TabsContent>

      <TabsContent value="tweets">
        <TweetsTab />
      </TabsContent>

      <TabsContent value="subscribed">
        <SubscribedTab />
      </TabsContent>
    </Tabs>
  )
}
