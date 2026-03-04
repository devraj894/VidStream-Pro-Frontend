import TopNavbar from '@/components/layout/TopNavbar'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavbar />
      <main>{children}</main>
    </div>
  )
}
