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
import { Playlist } from '@/types/playlist.types'
import { getUserPlaylists } from '@/services/playlists'
import { Tweet } from '@/types/tweets.types'
import { getUserTweets } from '@/services/tweets'
import { UserListItem } from '@/types/user.types'
import { getUserSubscribers, getUserSubscriptions } from '@/services/subscriptions'

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [channel, setChannel] = useState<Channel | null>(null)
  const [loading, setLoading] = useState(true)

  const [channelTweets, setChannelTweets] = useState<PaginatedResponse<Tweet>>()
  const [loadingMoreChannelTweets, setLoadingMoreChanneltweets] = useState(false)

  const [channelSubscribers, setChannelSubscribers] = useState<PaginatedResponse<UserListItem>>()
  const [loadingMoreChannelSubscribers, setLoadingMoreChannelSubscribers] = useState(false)

  const [channelSubscriptions, setChannelSubscriptions] = useState<PaginatedResponse<UserListItem>>()
  const [loadingMoreChannelSubscriptions, setLoadingMoreChannelSubscriptions] = useState(false)

  useEffect(() => {
    const loadChannel = async () => {
      try {
        const response = await fetchChannel(username)
        const channelData = response.data

        setChannel(channelData)

        const tweetsResponse = await getUserTweets({userId: channelData._id})
        setChannelTweets(tweetsResponse.data)

        const subscribersResponse = await getUserSubscribers({channelId: channelData._id})
        setChannelSubscribers(subscribersResponse.data)

        const subscriptionsResponse = await getUserSubscriptions({subscriberId: channelData._id})
        setChannelSubscriptions(subscriptionsResponse.data)
      } catch(err) {
        console.error("Error fetching channel:", err)
      } finally {
        setLoading(false)
      }
    }
    loadChannel()
  }, [username])

  console.log("channel subscriptions", channelSubscriptions)

  console.log("channel subscribers", channelSubscribers)

  console.log("Channel tweets", channelTweets)

  console.log("Channel data:", channel)

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

  const loadMoreChannelSubscriptions = async () => {
    if(!channelSubscriptions?.hasNextPage) return

    try {
      setLoadingMoreChannelSubscriptions(true)

      const nextPage = channelSubscriptions.nextPage;

      if(!nextPage) return;

      const response = await getUserSubscriptions({
        page: nextPage,
        limit: 10,
        subscriberId: channel?._id
      })

      setChannelSubscriptions((prev) => {
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
      console.log("Error loading more subscriptions", err);

    } finally {
      setLoadingMoreChannelSubscriptions(false)
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
        channelId = {channel._id}

        tweets={channelTweets?.docs || []}
        subscribers={channelSubscribers?.docs || []}
        subscriptions={channelSubscriptions?.docs || []}

        hasNextPageTweets={channelTweets?.hasNextPage}
        hasNextPageSubscribers={channelSubscribers?.hasNextPage}
        hasNextPageSubscriptions={channelSubscriptions?.hasNextPage}

        onLoadMoreTweets={loadMoreChannelTweets}
        onLoadMoreSubscribers={loadMoreChannelSubscribers}
        onLoadMoreSubscriptions={loadMoreChannelSubscriptions}

        loadingMoreTweets={loadingMoreChannelTweets}
        loadingMoreSubscribers={loadingMoreChannelSubscribers}
        loadingMoreSubscriptions={loadingMoreChannelSubscriptions}
      />
    </div>
  )
}
