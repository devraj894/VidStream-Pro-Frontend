import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Comment() {
  return (
    <div className="flex gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <p className="text-sm font-medium text-white">Devraj</p>
        <p className="text-sm text-muted-foreground">
          Bhai amazing explanation helped a lot!
        </p>

        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
          <button>Like</button>
          <button>Reply</button>
        </div>
      </div>
    </div>
  )
}
