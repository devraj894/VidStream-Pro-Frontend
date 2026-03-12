import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Comment from './Comment'
import { commentsTypes } from '@/types/comments'

interface CommentSectionProps {
  comments: commentsTypes[]
}

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg text-white">Comments (128)</h2>

      {/* Add Comment */}
      <div className="flex gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <Textarea placeholder="Add a comment..." />
          <div className="flex justify-end">
            <Button size="sm">Comment</Button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
