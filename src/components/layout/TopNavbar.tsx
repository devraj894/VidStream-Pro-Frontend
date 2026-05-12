'use client'

import { Bell } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function TopNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isLoading } = useAuth();
  console.log('User in TopNavbar:', user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full text-white transition-all duration-200 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="text-xl font-bold cursor-pointer">
          VidStream Pro
        </Link>

        {/* Search */}
        <div className="w-1/3">
          <Input placeholder="Search videos..." />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 cursor-pointer" />

          {isLoading ? (
            <div className="h-10 w-10 rounded-full bg-neutral-800 animate-pulse" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.avatar.url} />
                  <AvatarFallback> {user?.username?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/profile/${user?.username}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/studio`}>Studio</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/history`}>History</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Playlists</DropdownMenuItem>
                <DropdownMenuItem>Subscriptions</DropdownMenuItem> */}
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
