'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { tweetTypes } from '@/types/tweet'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

interface TweetCardProps {
  tweet: tweetTypes
}

export default function TweetCard({ tweet }: TweetCardProps) {
  return (
    <Card className="bg-neutral-900/70 border-neutral-800 hover:bg-neutral-900 transition-colors">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Avatar */}
          <Avatar>
            <AvatarImage src={tweet.avatar.url} />
            <AvatarFallback>{tweet.fullName.slice(0, 1)}</AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-white font-semibold text-sm">
                {tweet.fullName}
              </h4>
            </div>

            <p className="text-sm text-neutral-200 leading-relaxed whitespace-pre-line">
              {tweet.content}
            </p>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-4 pb-4 pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-xs text-blue-500"
        >
          <Heart className="h-4 w-4" />
          <span>{tweet.likes}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
