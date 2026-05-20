import TweetCard from '@/components/tweet/TweetCard'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { getUserTweets } from '@/services/tweets'
import { PaginatedResponse } from '@/types/api.types'
import { Tweet } from '@/types/tweets.types'
import { useEffect, useState } from 'react'

interface tweetsTabProps {
  channelId: string
}

export default function TweetsTab({ channelId }: tweetsTabProps) {
  const [channelTweets, setChannelTweets] = useState<PaginatedResponse<Tweet>>()
  const [loadingTweets, setLoadingTweets] = useState(true)
  const [loadingMoreTweets, setLoadingMoretweets] = useState(false)

  useEffect(() => {
      const loadTweets = async () => {
        setLoadingTweets(true)
  
        try {
          const tweetsResponse = await getUserTweets({userId: channelId})
          setChannelTweets(tweetsResponse.data)
  
        } catch (err) {
          console.log("Failed to load tweets", err)
          
        } finally {
          setLoadingTweets(false)
        }
      }
  
      loadTweets();
  }, [channelId])

  const loadMoreTweets = async () => {
    if(loadingMoreTweets) return
    if(!channelTweets?.hasNextPage) return

    try {
      setLoadingMoretweets(true)

      const nextPage = channelTweets.nextPage;

      if(!nextPage) return;

      const response = await getUserTweets({
        page: nextPage,
        limit: 10,
        userId: channelId
      })

      setChannelTweets((prev) => {
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
      setLoadingMoretweets(false)
    }
  }

  if(loadingTweets) return <Spinner />

  if (channelTweets?.docs.length === 0) {
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
      {channelTweets?.docs.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} />
      ))}
    </div>

    {/* LOAD MORE */}
      {channelTweets?.hasNextPage && (
        <div className="flex justify-center">
  
          <Button
            variant="secondary"
            onClick={loadMoreTweets}
            disabled={loadingMoreTweets}
          >
            {loadingMoreTweets ? (
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
