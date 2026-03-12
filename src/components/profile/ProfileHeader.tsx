import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dot } from 'lucide-react'

export default function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-8 -mt-4">
      <div className="flex">
        <Avatar className="w-28 h-28 border-4 border-black">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>DV</AvatarFallback>
        </Avatar>

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-white">Devraj Songara</h1>
          <h2 className="text-sm text-neutral-400">@devraj</h2>
          <p className="flex items-center text-xs text-neutral-400">
            120K subscribers <Dot size={15} /> 120K subscribed
          </p>
        </div>
      </div>

      <Button variant="secondary" className="rounded-full">
        Subscribe
      </Button>
    </div>
  )
}
