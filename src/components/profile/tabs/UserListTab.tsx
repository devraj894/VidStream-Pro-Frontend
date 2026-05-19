import UserListItem from '@/components/users/UserListItem'
import { subscribedChannelTypes } from '@/types/subscribedChannel'

interface UserListTabProps {
  subscribedChannels: subscribedChannelTypes[]
}

export default function UserListTab({
  subscribedChannels,
}: UserListTabProps) {
  return (
    <div className="py-2 space-y-4">
      {subscribedChannels.map((subscribedChannel) => (
        <UserListItem
          key={subscribedChannel.id}
          channel={subscribedChannel}
        />
      ))}
    </div>
  )
}
