import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { commentsTypes } from '@/types/comments'
import { Button } from '@/components/ui/button'
import { ThumbsUp } from 'lucide-react'

interface CommentProps {
  comment: commentsTypes
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="flex gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={comment.avatar} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <p className="text-sm font-medium text-white">{comment.username}</p>
        <p className="text-sm text-muted-foreground">{comment.content}</p>

        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
          <Button variant="ghost" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            {comment.likes}
          </Button>
          <button>Reply</button>
        </div>
      </div>
    </div>
  )
}
