"use client"

import ProfileCover from '@/components/profile/ProfileCover'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileTabs from '@/components/profile/ProfileTabs'
import { Spinner } from '@/components/ui/spinner'
import { playlists } from '@/data/playlists'
import { subscribedChannels } from '@/data/subscribedChannels'
import { tweets } from '@/data/tweets'
import { fetchChannel } from '@/services/channel'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Channel } from '@/types/channel.types'
import { PaginatedResponse } from '@/types/api.types'
import { Video } from '@/types/videos.types'
import { searchVideos } from '@/services/videos'

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [channel, setChannel] = useState<Channel | null>(null)
  const [loading, setLoading] = useState(true)

  const [channelVideos, setChannelVideos] = useState<PaginatedResponse<Video>>();
  const [loadingMoreChannelVideos, setLoadingMoreChannelVideos] = useState(false);

  useEffect(() => {
    const loadChannel = async () => {
      try {
        const response = await fetchChannel(username)
        const channelData = response.data

        setChannel(channelData)

        const videosResponse = await searchVideos({
          userId: channelData._id
        })
        console.log("VIDEOS RESPONSE:", videosResponse)

        setChannelVideos(videosResponse.data)
      } catch(err) {
        console.error("Error fetching channel:", err)
      } finally {
        setLoading(false)
      }
    }
    loadChannel()
  }, [username])

  console.log("Channel data:", channel)
  console.log("Channel Videos : ", channelVideos)

  const loadMoreChannelVideos = async () => {
    if(!channelVideos?.hasNextPage) return

    try {
      setLoadingMoreChannelVideos(true)

      const nextPage = channelVideos.nextPage;

      if(!nextPage) return;

      const response = await searchVideos({
        page: nextPage,
        limit: 10,
        userId: channel?._id
      })

      setChannelVideos((prev) => {
        if(!prev) return response.data;

        return {
          ...response.data,

          docs: [
            ...prev.docs,
            ...response.data.docs
          ],
        }
      })
    } catch(err) {
      console.log("Error loading more search videos", err);

    } finally {
      setLoadingMoreChannelVideos(false)
    }
  }

   if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (!channel) {
    return (
      <div className="text-center text-neutral-400 pt-20">
        Channel not found.
      </div>
    )
  }

  return (
    <div>
      <ProfileCover coverImage={channel.coverImage} />

      <ProfileHeader channel={channel} />

      <ProfileTabs
        videos={channelVideos?.docs || []}
        playlists={playlists}
        tweets={tweets}
        subscribedChannels={subscribedChannels}
        hasNextPageVideos={channelVideos?.hasNextPage}
        onLoadMoreVideos={loadMoreChannelVideos}
        loadingMoreVideos={loadingMoreChannelVideos}
      />
    </div>
  )
}
