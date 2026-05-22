import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { Channel } from '@/types/channel.types'
import { Dot } from 'lucide-react'
import Link from 'next/link'

export default function ProfileHeader({ channel }: { channel: Channel }) {
  const {user} = useAuth()
  const ownProfile = user?._id === channel._id;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-8 -mt-4">
      <div className="flex gap-2">
        <Avatar className="w-28 h-28 border-4 border-black">
          <AvatarImage src={channel.avatar.url} />
          <AvatarFallback>DV</AvatarFallback>
        </Avatar>

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-white">{channel.fullName}</h1>
          <h2 className="text-sm text-neutral-400">@{channel.username}</h2>
          <p className="flex items-center text-xs text-neutral-400">
            {channel.subscribersCount.toLocaleString()} subscribers <Dot size={15} /> {channel.channelsSubscribedToCount.toLocaleString()} subscribed
          </p>
        </div>
      </div>

      <Button variant="secondary" className="rounded-full">
        {ownProfile ? <Link href={`/studio`}>Manage Channel</Link> : channel.isSubscribed ? "Subscribed" : "Subscribe"}
      </Button>
    </div>
  )
}
