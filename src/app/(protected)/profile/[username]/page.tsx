"use client"

import ProfileCover from '@/components/profile/ProfileCover'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileTabs from '@/components/profile/ProfileTabs'
import { Spinner } from '@/components/ui/spinner'
import { fetchChannel } from '@/services/channel'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Channel } from '@/types/channel.types'

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [channel, setChannel] = useState<Channel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadChannel = async () => {
      try {
        const response = await fetchChannel(username)
        setChannel(response.data)

      } catch(err) {
        console.error("Error fetching channel:", err)
      } finally {
        setLoading(false)
      }
    }
    loadChannel()
  }, [username])

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
      <ProfileTabs channelId = {channel._id} />
    </div>
  )
}
