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
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/bg2.jpg')",
      }}
    >
      {children}
    </div>
  )
}
