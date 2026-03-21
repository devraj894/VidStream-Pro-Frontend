import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '../ui/button'
import StudioVideosTab from './tabs/StudioVideosTab'
import { studioPlaylistTypes, studioVideosTypes } from '@/types/studio'
import StudioPlaylistsTab from './tabs/StudioPlaylistsTab'
import StudioTweetsTab from './tabs/StudioTweetsTab'
import { tweetTypes } from '@/types/tweet'
import { useState } from 'react'
import { ModalType } from '@/types/modal'

interface StudioTabsProps {
  videos: studioVideosTypes[]
  playlists: studioPlaylistTypes[]
  tweets: tweetTypes[]
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
}

export default function StudioTabs({
  videos,
  playlists,
  tweets,
  setModal,
}: StudioTabsProps) {
  const [activeTab, setActiveTab] = useState('videos')

  return (
    <Tabs
      defaultValue="videos"
      value={activeTab}
      onValueChange={setActiveTab}
      className="mt-6 px-8"
    >
      <div className="flex items-center justify-between bg-[#654c7640] rounded-lg">
        <TabsList className="md:gap-8 bg-transparent">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="tweets">Tweets</TabsTrigger>
        </TabsList>

        <Button
          onClick={() => {
            if (activeTab === 'videos') {
              setModal({ type: 'upload-video' })
            } else if (activeTab === 'playlists') {
              setModal({ type: 'upload-playlist' })
            } else {
              setModal({ type: 'upload-tweet' })
            }
          }}
          className="bg-purple-600 px-4 rounded-lg text-sm font-semibold"
        >
          Upload
        </Button>
      </div>

      <TabsContent value="videos">
        <StudioVideosTab setModal={setModal} videos={videos} />
      </TabsContent>

      <TabsContent value="playlists">
        <StudioPlaylistsTab setModal={setModal} playlists={playlists} />
      </TabsContent>

      <TabsContent value="tweets">
        <StudioTweetsTab setModal={setModal} tweets={tweets} />
      </TabsContent>
    </Tabs>
  )
}
