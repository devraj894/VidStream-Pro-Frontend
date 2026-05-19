'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserListItem as UserListItemTypes } from '@/types/user.types'

interface UserListItemProps {
  user: UserListItemTypes
}

export default function UserListItem({
  user,
}: UserListItemProps) {
  return (
    <Card className="bg-neutral-900/70 border-neutral-800 hover:bg-neutral-900 transition-colors cursor-pointer">
      <CardContent className="p-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          
          {/* Avatar */}
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar?.url} />

            <AvatarFallback>
              {user.fullName
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>

          {/* Info (minimal identity only) */}
          <div className="space-y-1">
            <h4 className="text-white font-semibold text-sm">
              {user.fullName}
            </h4>

            <p className="text-xs text-neutral-500">
              @{user.username}
            </p>
          </div>
        </div>

        {/* Right */}
        <Button
          variant="secondary"
          className="bg-neutral-800 hover:bg-neutral-700 text-white"
        >
          {user.isSubscribed ?  "Subscribed" : "Subscribe"}
        </Button>
      </CardContent>
    </Card>
  )
}