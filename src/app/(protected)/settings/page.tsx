'use client'

import AccountForm from '@/components/settings/AccountForm'
import AvatarUpload from '@/components/settings/AvatarUpload'
import CoverUpload from '@/components/settings/CoverUpload'
import PasswordForm from '@/components/settings/PasswordForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@/context/AuthContext'

export default function SettingsPage() {
  const { user, isLoading, checkAuth } = useAuth()

  if(isLoading) return <Spinner />

  return (
    <div className="px-8 space-y-12 pt-20">
      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
        </CardHeader>
        <CardContent>
          {user && <AccountForm user={user} checkAuth={checkAuth} />}
        </CardContent>
      </Card>

      {/* Profile Images */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Images</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2">
          <AvatarUpload avatar={user?.avatar.url} checkAuth={checkAuth} />
          <CoverUpload cover={user?.coverImage?.url} checkAuth={checkAuth} />
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
