import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '../ui/button'
import StudioVideosTab from './tabs/StudioVideosTab'
import StudioPlaylistsTab from './tabs/StudioPlaylistsTab'
import StudioTweetsTab from './tabs/StudioTweetsTab'
import { useState } from 'react'
import { ModalType } from '@/types/modal'
import { User } from '@/types/auth.types'

interface StudioTabsProps {
  user: User | null
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  refreshVideos: number
  refreshTweets: number
  refreshPlaylists: number
}

export default function StudioTabs({
  user,
  setModal,
  refreshVideos,
  refreshTweets,
  refreshPlaylists
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
        <StudioVideosTab 
          setModal={setModal} 
          refreshVideos={refreshVideos}
        />
      </TabsContent>

      <TabsContent value="playlists">
        <StudioPlaylistsTab
          userId={user?._id} 
          setModal={setModal}  
          refreshPlaylists={refreshPlaylists}
        />
      </TabsContent>

      <TabsContent value="tweets">
        <StudioTweetsTab 
          userId={user?._id}
          setModal={setModal} 
          refreshTweets={refreshTweets}
        />
      </TabsContent>
    </Tabs>
  )
}
