import Footer from '@/components/layout/Footer'
import TopNavbar from '@/components/layout/TopNavbar'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground bg-gradient-to-br from-[#0a1333] via-[#0a0a0f] to-[#020d19]">
      <TopNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
