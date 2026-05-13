import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Comment from './Comment'
import { Comment as CommentType } from '@/types/comments.types'
import { Spinner } from '../ui/spinner'

interface CommentSectionProps {
  comments: CommentType[]
  hasNextPage: boolean | undefined
  onLoadMore: () => void
  commentsLoading: boolean
  loadingMoreComments?: boolean
}

export default function CommentSection({
  comments, 
  hasNextPage, 
  onLoadMore, 
  commentsLoading, 
  loadingMoreComments 
}: CommentSectionProps) {

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg text-white">
        Comments {comments.length}
      </h2>

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
        {commentsLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : comments.length === 0 ? (

          <div className="text-center py-10 text-muted-foreground">
            No comments yet
          </div>
        ) : (
         comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
         )
        ))}
      </div>

       {/* LOAD MORE */}
      {hasNextPage && (
        <div className="flex justify-center">

          <Button
            variant="secondary"
            onClick={onLoadMore}
          >
            {loadingMoreComments ? (
              "Loading..."
            ) : (
              "Load More"
            )}
          </Button>

        </div>
      )}
    </div>
  )
}
