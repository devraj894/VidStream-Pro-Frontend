import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '../ui/button'
import StudioVideosTab from './tabs/StudioVideosTab'
import { studioPlaylistTypes, studioVideosTypes } from '@/types/studio'
import StudioPlaylistsTab from './tabs/StudioPlaylistsTab'
import StudioTweetsTab from './tabs/StudioTweetsTab'
import { tweetTypes } from '@/types/tweet'

interface StudioTabsProps {
  videos: studioVideosTypes[]
  playlists: studioPlaylistTypes[]
  tweets: tweetTypes[]
}

export default function StudioTabs({
  videos,
  playlists,
  tweets,
}: StudioTabsProps) {
  return (
    <Tabs defaultValue="videos" className="mt-6 px-8">
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

      <TabsContent value="videos">
        <StudioVideosTab videos={videos} />
      </TabsContent>

      <TabsContent value="playlists">
        <StudioPlaylistsTab playlists={playlists} />
      </TabsContent>

      <TabsContent value="tweets">
        <StudioTweetsTab tweets={tweets} />
      </TabsContent>
    </Tabs>
  )
}
