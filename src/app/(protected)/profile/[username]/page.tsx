import ProfileCover from '@/components/profile/ProfileCover'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileTabs from '@/components/profile/ProfileTabs'
import { videos } from '@/data/videos'

export default function ProfilePage() {
  return (
    <div>
      <ProfileCover />

      <ProfileHeader />

      <ProfileTabs videos={videos} />
    </div>
  )
}
