import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dot } from 'lucide-react'

export default function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 px-8 -mt-4">
      <Avatar className="w-28 h-28 border-4 border-black">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>DV</AvatarFallback>
      </Avatar>

      <div className="">
        <h1 className="text-2xl font-bold text-white">Devraj Songara</h1>
        <h2 className="text-sm text-neutral-400">@devraj</h2>
        <p className="flex text-sm text-neutral-400">
          120K subscribers <Dot /> 120K subscribed
        </p>
      </div>

      <div className="md:ml-auto">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white">
          Subscribe
        </Button>
      </div>
    </div>
  )
}
