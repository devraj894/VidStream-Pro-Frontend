import { Button } from '@/components/ui/button'
import UserListItem from '@/components/users/UserListItem'
import { UserListItem as UserLIstItemTypes } from '@/types/user.types'

interface UserListTabProps {
  users: UserLIstItemTypes[]
  hasNextPage?: boolean
  onLoadMore: () => void
  loadingMore?: boolean
}

export default function UserListTab({
  users,
  hasNextPage,
  onLoadMore,
  loadingMore
}: UserListTabProps) {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-zinc-200">
          No subscribers yet
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          This channel doesn't have any subscribers.
        </p>
      </div>
    )
  }

  return (
    <div className="py-2 space-y-4">
      {users.map((user) => (
        <UserListItem
          key={user._id}
          user={user}
        />
      ))}

      {/* LOAD MORE */}
      {hasNextPage && (
        <div className="flex justify-center">
  
          <Button
            variant="secondary"
            onClick={onLoadMore}
          >
            {loadingMore ? (
              "Loading..."
            ) : (
              "Load More"
            )}
          </Button>
  
        </div>
      )}
    </div>
  )
}
