import { ModalType } from '@/types/modal'
import StudioTweetHeader from '../tweet/StudioTweetHeader'
import StudioTweetRow from '../tweet/StudioTweetRow'
import { tweetTypes } from '@/types/tweet'

interface StudioTweetsTabProps {
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  tweets: tweetTypes[]
}

export default function StudioTweetsTab({
  setModal,
  tweets,
}: StudioTweetsTabProps) {
  return (
    <div className="mt-6 space-y-4">
      <StudioTweetHeader />

      {tweets.map((tweet) => (
        <StudioTweetRow key={tweet.id} setModal={setModal} tweet={tweet} />
      ))}
    </div>
  )
}
