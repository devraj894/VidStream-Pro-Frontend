import Image from 'next/image'

export default function SuggestionCard() {
  return (
    <div className="flex gap-3 cursor-pointer group">
      <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
          alt="thumbnail"
          fill
          className="object-cover group-hover:scale-105 transition"
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium line-clamp-2 text-white">
          Next.js 15 Crash Course | Build Production Apps Fast
        </p>
        <p className="text-xs text-muted-foreground">CodeWithDev</p>
        <p className="text-xs text-muted-foreground">245K views • 3 days ago</p>
      </div>
    </div>
  )
}
