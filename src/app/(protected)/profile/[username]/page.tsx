import ProfileCover from '@/components/profile/ProfileCover'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileTabs from '@/components/profile/ProfileTabs'
import { playlists } from '@/data/playlists'
import { tweets } from '@/data/tweets'
import { videos } from '@/data/videos'

export default function ProfilePage() {
  return (
    <div>
      <ProfileCover />

      <ProfileHeader />

      <ProfileTabs videos={videos} playlists={playlists} tweets={tweets} />
    </div>
  )
}
