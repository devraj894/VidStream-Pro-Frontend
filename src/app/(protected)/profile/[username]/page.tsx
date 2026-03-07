import ProfileCover from '@/components/profile/ProfileCover'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileTabs from '@/components/profile/ProfileTabs'

export default function ProfilePage() {
  return (
    <div className="pb-20">
      <ProfileCover />

      <ProfileHeader />

      <ProfileTabs />
    </div>
  )
}
