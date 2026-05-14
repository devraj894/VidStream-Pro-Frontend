import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Comment from './Comment'
import { Comment as CommentType } from '@/types/comments.types'
import { Spinner } from '../ui/spinner'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { addComment } from '@/services/comments'

interface CommentSectionProps {
  comments: CommentType[]
  totalComments?: number
  hasNextPage: boolean | undefined
  onLoadMore: () => void
  commentsLoading: boolean
  loadingMoreComments?: boolean
  videoId: string
  onCommentAdded: () => void
}

export default function CommentSection({
  comments, 
  totalComments,
  hasNextPage, 
  onLoadMore, 
  commentsLoading, 
  loadingMoreComments,
  videoId,
  onCommentAdded,
}: CommentSectionProps) {

  const [content, setContent] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { user } = useAuth();

  const handleAddComment = async () => {
    if(!content.trim()) return;

    try {
      setAddingComment(true);

      await addComment(videoId, content);
      setContent("");
      onCommentAdded();

    } catch(err) {
      console.error("Error adding comment:", err);
    } finally {
      setAddingComment(false);
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg text-white">
        Comments {totalComments}
      </h2>

      {/* Add Comment */}
      <div className="flex gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user?.avatar.url}/>
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <Textarea 
            className='text-white' 
            placeholder="Add a comment..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end">
            <Button size="sm" onClick={handleAddComment} disabled={addingComment || !content.trim()}>
              {addingComment ? "Adding..." : "Comment"}
            </Button>
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
