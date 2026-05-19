"use client"

import ProfileCover from '@/components/profile/ProfileCover'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileTabs from '@/components/profile/ProfileTabs'
import { Spinner } from '@/components/ui/spinner'
import { fetchChannel } from '@/services/channel'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Channel } from '@/types/channel.types'
import { PaginatedResponse } from '@/types/api.types'
import { Video } from '@/types/videos.types'
import { searchVideos } from '@/services/videos'
import { Playlist } from '@/types/playlist.types'
import { getUserPlaylists } from '@/services/playlists'
import { Tweet } from '@/types/tweets.types'
import { getUserTweets } from '@/services/tweets'
import { UserListItem } from '@/types/user.types'
import { getUserSubscribers } from '@/services/subscriptions'

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [channel, setChannel] = useState<Channel | null>(null)
  const [loading, setLoading] = useState(true)

  const [channelVideos, setChannelVideos] = useState<PaginatedResponse<Video>>();
  const [loadingMoreChannelVideos, setLoadingMoreChannelVideos] = useState(false);

  const [channelPlaylists, setChannelPlaylists] = useState<PaginatedResponse<Playlist>>()
  const [loadingMoreChannelPlaylists, setLoadingMoreChannelPlaylists] = useState(false)

  const [channelTweets, setChannelTweets] = useState<PaginatedResponse<Tweet>>()
  const [loadingMoreChannelTweets, setLoadingMoreChanneltweets] = useState(false)

  const [channelSubscribers, setChannelSubscribers] = useState<PaginatedResponse<UserListItem>>()
  const [loadingMoreChannelSubscribers, setLoadingMoreChannelSubscribers] = useState(false)

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

        console.log("Channel id", channelData._id)

        const playlistsResponse = await getUserPlaylists({userId: channelData._id})
        setChannelPlaylists(playlistsResponse.data)

        const tweetsResponse = await getUserTweets({userId: channelData._id})
        setChannelTweets(tweetsResponse.data)

        const subscribersResponse = await getUserSubscribers({channelId: channelData._id})
        setChannelSubscribers(subscribersResponse.data)
      } catch(err) {
        console.error("Error fetching channel:", err)
      } finally {
        setLoading(false)
      }
    }
    loadChannel()
  }, [username])

  console.log("channel subscribers", channelSubscribers)

  console.log("Channel tweets", channelTweets)

  console.log("Channel Playlists", channelPlaylists)

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

  const loadMoreChannelPlaylists = async () => {
    if(!channelPlaylists?.hasNextPage) return

    try {
      setLoadingMoreChannelPlaylists(true)

      const nextPage = channelPlaylists.nextPage;

      if(!nextPage) return;

      const response = await getUserPlaylists({
        page: nextPage,
        limit: 10,
        userId: channel?._id
      })

      setChannelPlaylists((prev) => {
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
      console.log("Error loading more playlists", err);

    } finally {
      setLoadingMoreChannelPlaylists(false)
    }
  }

  const loadMoreChannelTweets = async () => {
    if(!channelTweets?.hasNextPage) return

    try {
      setLoadingMoreChanneltweets(true)

      const nextPage = channelTweets.nextPage;

      if(!nextPage) return;

      const response = await getUserTweets({
        page: nextPage,
        limit: 10,
        userId: channel?._id
      })

      setChannelTweets((prev) => {
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
      console.log("Error loading more tweets", err);

    } finally {
      setLoadingMoreChanneltweets(false)
    }
  }

  const loadMoreChannelSubscribers = async () => {
    if(!channelSubscribers?.hasNextPage) return

    try {
      setLoadingMoreChannelSubscribers(true)

      const nextPage = channelSubscribers.nextPage;

      if(!nextPage) return;

      const response = await getUserSubscribers({
        page: nextPage,
        limit: 10,
        channelId: channel?._id
      })

      setChannelSubscribers((prev) => {
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
      console.log("Error loading more subscribers", err);

    } finally {
      setLoadingMoreChannelSubscribers(false)
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
        playlists={channelPlaylists?.docs || []}
        tweets={channelTweets?.docs || []}
        subscribers={channelSubscribers?.docs || []}

        hasNextPageVideos={channelVideos?.hasNextPage}
        hasNextPagePlaylists={channelPlaylists?.hasNextPage}
        hasNextPageTweets={channelTweets?.hasNextPage}
        hasNextPageSubscribers={channelSubscribers?.hasNextPage}

        onLoadMoreVideos={loadMoreChannelVideos}
        onLoadMorePlaylists={loadMoreChannelPlaylists}
        onLoadMoreTweets={loadMoreChannelTweets}
        onLoadMoreSubscribers={loadMoreChannelSubscribers}

        loadingMoreVideos={loadingMoreChannelVideos}
        loadingMorePlaylists={loadingMoreChannelPlaylists}
        loadingMoreTweets={loadingMoreChannelTweets}
        loadingMoreSubscribers={loadingMoreChannelSubscribers}
      />
    </div>
  )
}
