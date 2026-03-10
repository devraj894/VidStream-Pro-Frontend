import TweetCard from '@/components/tweet/TweetCard'
import { tweetTypes } from '@/types/tweet'

interface tweetsTabProps {
  tweets: tweetTypes[]
}

export default function TweetsTab({ tweets }: tweetsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 py-2">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  )
}
