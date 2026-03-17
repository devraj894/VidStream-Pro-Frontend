import StudioTweetHeader from '../tweet/StudioTweetHeader'
import StudioTweetRow from '../tweet/StudioTweetRow'
import { tweetTypes } from '@/types/tweet'

interface StudioTweetsTabProps {
  tweets: tweetTypes[]
}

export default function StudioTweetsTab({ tweets }: StudioTweetsTabProps) {
  return (
    <div className="mt-6 space-y-4">
      <StudioTweetHeader />

      {tweets.map((tweet) => (
        <StudioTweetRow key={tweet.id} tweet={tweet} />
      ))}
    </div>
  )
}
