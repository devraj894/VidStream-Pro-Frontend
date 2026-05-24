import { ModalType } from '@/types/modal'
import StudioTweetHeader from '../tweet/StudioTweetHeader'
import StudioTweetRow from '../tweet/StudioTweetRow'
import { useEffect, useState } from 'react'
import { PaginatedResponse } from '@/types/api.types'
import { Tweet } from '@/types/tweets.types'
import { getUserTweets } from '@/services/tweets'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

interface StudioTweetsTabProps {
  userId: string | undefined
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  refreshTweets: number
}

export default function StudioTweetsTab({
  userId,
  setModal,
  refreshTweets
}: StudioTweetsTabProps) {
  const [tweets, setTweets] = useState<PaginatedResponse<Tweet>>()
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    const loadTweets = async () => {
      setLoading(true)

      try {
        const tweetsResponse = await getUserTweets({userId: userId})
        setTweets(tweetsResponse.data)

      } catch (err) {
        console.log("Failed to load tweets", err)
        
      } finally {
        setLoading(false)
      }
    }
  
    loadTweets();
  }, [userId, refreshTweets]);

  const loadMoreTweets = async () => {
    if (loadingMore) return
    if(!tweets?.hasNextPage) return

    try {
      setLoadingMore(true)

      const nextPage = tweets.nextPage;

      if(!nextPage) return;

      const response = await getUserTweets({
        page: nextPage,
        limit: 10,
        userId: userId
      })

      setTweets((prev) => {
        if(!prev) return response.data;

        return {
          ...response.data,

          docs: [
            ...prev.docs,
            ...response.data.docs
          ],
        }
      })
    } catch(err) {
      console.log("Error loading more tweets", err);

    } finally {
      setLoadingMore(false)
    }
  }
    
  if(loading) return <Spinner />
    
  if (tweets?.docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-zinc-200">
          No tweets yet
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          You didn't post any tweet yet.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-4">
      <StudioTweetHeader />

      {tweets?.docs.map((tweet) => (
        <StudioTweetRow key={tweet._id} setModal={setModal} tweet={tweet} />
      ))}

      {/* LOAD MORE */}
      {tweets?.hasNextPage && (
        <div className="flex justify-center">

          <Button
            variant="secondary"
            onClick={loadMoreTweets}
            disabled={loadingMore}
          >
            {loadingMore ? (
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
