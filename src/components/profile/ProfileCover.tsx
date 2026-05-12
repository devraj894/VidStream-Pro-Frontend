import { Media } from "@/types/common.types";

export default function ProfileCover({ coverImage }: { coverImage: Media }) {
  return (
    <div className="w-full h-48 md:h-64 bg-neutral-800 relative">
      <img
        src={coverImage.url}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
