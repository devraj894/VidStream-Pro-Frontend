import TweetCard from '@/components/tweet/TweetCard'
import { Button } from '@/components/ui/button'
import { Tweet } from '@/types/tweets.types'

interface tweetsTabProps {
  tweets: Tweet[]
  hasNextPage?: boolean
  onLoadMore: () => void
  loadingMorePlaylists?: boolean
}

export default function TweetsTab({ tweets, hasNextPage, onLoadMore, loadingMorePlaylists }: tweetsTabProps) {
  if (tweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-zinc-200">
          No tweets yet
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          This channel hasn&apos;t posted any tweets.
        </p>
      </div>
    )
  }

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 py-2">
      {tweets.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} />
      ))}
    </div>

    {/* LOAD MORE */}
      {hasNextPage && (
        <div className="flex justify-center">
  
          <Button
            variant="secondary"
            onClick={onLoadMore}
          >
            {loadingMorePlaylists ? (
              "Loading..."
            ) : (
              "Load More"
            )}
          </Button>
  
        </div>
      )}
    </>
  )
}
