export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#8b0000] via-[#0a0a0f] to-[#140000]">
      {children}
    </div>
  )
}
