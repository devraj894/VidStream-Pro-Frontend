'use client'

import { subscribedChannelTypes } from '@/types/subscribedChannel'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface SubscribedChannelCardProps {
  channel: subscribedChannelTypes
}

export default function SubscribedChannelCard({
  channel,
}: SubscribedChannelCardProps) {
  return (
    <Card className="bg-neutral-900/70 border-neutral-800 hover:bg-neutral-900 transition-colors">
      <CardContent className="p-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Avatar className="h-12 w-12">
            <AvatarImage src={channel.avatar.url} />
            <AvatarFallback>
              {channel.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="space-y-1">
            <h4 className="text-white font-semibold text-sm">
              {channel.fullName}
            </h4>

            <p className="text-xs text-neutral-400">
              {channel.subscribers.toLocaleString()} Subscribers
            </p>
          </div>
        </div>

        {/* Right */}
        <Button
          variant="secondary"
          className="bg-neutral-800 hover:bg-neutral-700 text-white"
        >
          Subscribed
        </Button>
      </CardContent>
    </Card>
  )
}
