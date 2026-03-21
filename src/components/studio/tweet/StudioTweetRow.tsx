import { formatTimeAgo } from '@/lib/constant'
import { Pencil, ThumbsUp, Trash } from 'lucide-react'
import { tweetTypes } from '@/types/tweet'
import { ModalType } from '@/types/modal'

interface StudioTweetRowProps {
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  tweet: tweetTypes
}

export default function StudioTweetRow({
  setModal,
  tweet,
}: StudioTweetRowProps) {
  return (
    <div className="border-b border-neutral-800 py-3 px-2 md:px-0 flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_0.5fr] md:items-center md:gap-4 hover:bg-neutral-900/50 transition">
      {/* TOP ROW (content + actions) */}
      <div className="flex justify-between items-start gap-3">
        <p className="font-medium text-sm md:text-base text-white leading-tight line-clamp-2">
          {tweet.content}
        </p>

        {/* Actions (mobile + desktop) */}
        <div className="md:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={() => setModal({ type: 'edit-tweet', data: tweet })}
            className="p-2 rounded-md hover:bg-neutral-800 transition text-neutral-400 hover:text-white"
          >
            <Pencil size={16} className="text-blue-500" />
          </button>
          <button
            onClick={() => setModal({ type: 'delete-tweet', data: tweet })}
            className="p-2 rounded-md hover:bg-red-500/10 transition text-neutral-500 hover:text-red-500"
          >
            <Trash size={16} className="text-red-500" />
          </button>
        </div>
      </div>

      {/*  MOBILE META (likes + date) */}
      <div className="flex justify-between text-xs text-neutral-400 mt-1 md:hidden">
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-4 w-4" />
          <span>{tweet.likes}</span>
        </div>
        <span>{formatTimeAgo(tweet.createdAt)}</span>
      </div>

      {/*  DESKTOP ONLY */}
      <span className="hidden md:block text-sm text-neutral-300">
        {tweet.likes}
      </span>

      <span className="hidden md:block text-sm text-neutral-400">
        {formatTimeAgo(tweet.createdAt)}
      </span>

      <div className="hidden md:flex justify-end items-center gap-2">
        <button className="p-2 rounded-md hover:bg-neutral-800 transition text-neutral-400 hover:text-white">
          <Pencil
            onClick={() => setModal({ type: 'edit-tweet', data: tweet })}
            size={16}
            className="text-blue-500"
          />
        </button>
        <button
          onClick={() => setModal({ type: 'delete-tweet', data: tweet })}
          className="p-2 rounded-md hover:bg-red-500/10 transition text-neutral-500 hover:text-red-500"
        >
          <Trash size={16} className="text-red-500" />
        </button>
      </div>
    </div>
  )
}
