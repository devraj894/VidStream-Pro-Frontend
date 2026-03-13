import { Card, CardContent } from '@/components/ui/card'

interface StudioStatCardProps {
  title: string
  value: number
}

export default function StudioStatCard({ title, value }: StudioStatCardProps) {
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardContent className="p-4 space-y-1">
        <p className="text-xs text-neutral-400">{title}</p>

        <p className="text-xl font-semibold text-white">{value}</p>
      </CardContent>
    </Card>
  )
}
