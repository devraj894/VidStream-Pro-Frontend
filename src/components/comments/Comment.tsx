import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ThumbsUp } from 'lucide-react'
import { formatTimeAgo } from '@/lib/utils'
import { Comment as CommentType } from '@/types/comments.types'

interface CommentProps {
  comment: CommentType
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="flex gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={comment.ownerInfo.avatar.url} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white space-x-4">
            {comment.ownerInfo.username}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTimeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-white font-normal">{comment.content}</p>

        <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
          <Button variant="ghost" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            {comment.likes || 0}
          </Button>
          <button>Reply</button>
        </div>
      </div>
    </div>
  )
}
