'use client'

import AccountForm from '@/components/settings/AccountForm'
import AvatarUpload from '@/components/settings/AvatarUpload'
import CoverUpload from '@/components/settings/CoverUpload'
import PasswordForm from '@/components/settings/PasswordForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="px-8 space-y-12 pt-14">
      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountForm />
        </CardContent>
      </Card>

      {/* Profile Images */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Images</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2">
          <AvatarUpload />
          <CoverUpload />
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
