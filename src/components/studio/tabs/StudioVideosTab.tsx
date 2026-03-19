import { studioVideosTypes } from '@/types/studio'
import StudioVideoHeader from '../video/StudioVideoHeader'
import StudioVideoRow from '../video/StudioVideoRow'
import { ModalType } from '@/types/modal'

interface StudioVideosProps {
  setModal: React.Dispatch<React.SetStateAction<ModalType | null>>
  videos: studioVideosTypes[]
}

export default function StudioVideosTab({
  setModal,
  videos,
}: StudioVideosProps) {
  return (
    <div className="mt-6 space-y-4">
      <StudioVideoHeader />

      {videos.map((video) => (
        <StudioVideoRow key={video.id} setModal={setModal} video={video} />
      ))}
    </div>
  )
}
