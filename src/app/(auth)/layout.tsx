export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url('/bg.png')",
      }}
    >
      {children}
    </div>
  )
}
