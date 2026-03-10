import SubscribedChannelsCard from '@/components/subscribed/SubscribedChannelsCard'
import { subscribedChannelTypes } from '@/types/subscribedChannel'

interface SubscribedTabProps {
  subscribedChannels: subscribedChannelTypes[]
}

export default function SubscribedTab({
  subscribedChannels,
}: SubscribedTabProps) {
  return (
    <div className="py-2 space-y-4">
      {subscribedChannels.map((subscribedChannel) => (
        <SubscribedChannelsCard
          key={subscribedChannel.id}
          channel={subscribedChannel}
        />
      ))}
    </div>
  )
}
