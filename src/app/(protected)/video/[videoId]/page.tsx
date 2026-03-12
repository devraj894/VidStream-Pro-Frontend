import CommentSection from '@/components/comments/CommentSection'
import Suggestions from '@/components/video/Suggestions'
import VideoMeta from '@/components/video/VideoMeta'
import VideoPlayer from '@/components/video/VideoPlayer'
import { comments } from '@/data/comments'
import { videoDetails } from '@/data/videos'

export default function videoDetailsPage() {
  return (
    <div className="px-8 pt-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer videoFile={videoDetails.videoFile} />
          <VideoMeta videoDetails={videoDetails} />
          <CommentSection comments={comments} />
        </div>

        {/* RIGHT SIDE */}
        <div>
          <Suggestions />
        </div>
      </div>
    </div>
  )
}
