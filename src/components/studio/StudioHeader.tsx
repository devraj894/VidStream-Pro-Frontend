interface StudioHeaderProps {
  fullName?: string
}

export default function StudioHeader({ fullName }: StudioHeaderProps) {
  return (
    <div className="space-y-2 pt-6 px-8">
      <h1 className="text-2xl md:text-4xl font-bold text-white">
        {`Welcome Back, ${fullName}`}
      </h1>

      <p className="text-md text-neutral-400">
        Seamless Video Management, Elevated Results.
      </p>
    </div>
  )
}
