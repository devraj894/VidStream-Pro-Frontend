import { videoFileType } from '@/types/videos'

interface VideoPlayerProps {
  videoFile: videoFileType
}

export default function VideoPlayer({ videoFile }: VideoPlayerProps) {
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
      <iframe
        className="w-full h-full"
        src={videoFile.url}
        title="Video Player"
        allowFullScreen
      />
    </div>
  )
}
