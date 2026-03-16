import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '../ui/button'
import StudioVideosTab from './tabs/StudioVideosTab'
import { studioVideosTypes } from '@/types/studio'

interface StudioTabsProps {
  videos: studioVideosTypes[]
}

export default function StudioTabs({ videos }: StudioTabsProps) {
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

      <TabsContent value="playlists"></TabsContent>

      <TabsContent value="tweets"></TabsContent>
    </Tabs>
  )
}
