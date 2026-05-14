import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import {
  MoreHorizontal,
  Pencil,
  ThumbsUp,
  Trash2,
} from 'lucide-react'
import { formatTimeAgo } from '@/lib/utils'
import { Comment as CommentType } from '@/types/comments.types'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'

interface CommentProps {
  comment: CommentType
}

export default function Comment({
  comment,
}: CommentProps) {

  const { user } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  const isOwner = user?._id === comment.ownerInfo._id

  return (
    <div className="flex gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage
          src={comment.ownerInfo.avatar.url}
        />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="flex-1">

        {/* TOP */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">
              {comment.ownerInfo.username}
            </span>

            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(comment.createdAt)}
            </span>
          </div>

          {/* OWNER ACTIONS */}
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  className="h-8 w-8"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    setIsEditing(true)
                  }
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          )}

        </div>

        {/* COMMENT CONTENT */}
        <div className='mt-1'>
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={editedContent}
                onChange={(e) =>
                  setEditedContent(
                    e.target.value
                  )
                }
                className="text-white"
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setIsEditing(false)
                    setEditedContent(
                      comment.content
                    )
                  }}
                >
                  Cancel
                </Button>

                <Button size="sm">
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-white font-normal">
              {comment.content}
            </p>
          )}
        </div>

        {/* ACTIONS */}
        {!isEditing && (
          <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              {comment.likes || 0}
            </Button>

            <button>
              Reply
            </button>
          </div>
        )}
      </div>
    </div>
  )
}