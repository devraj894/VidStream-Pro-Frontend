import { Media } from "@/types/common.types";

export default function ProfileCover({ coverImage }: { coverImage?: Media }) {
  return (
    <div className="w-full h-48 md:h-64 bg-neutral-800 relative">
      {coverImage?.url ?  (
        <img
          src={coverImage.url}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-600 flex items-center justify-center">
          <span className="text-gray-400">No cover image</span>
        </div>
      )}

    </div>
  )
}
