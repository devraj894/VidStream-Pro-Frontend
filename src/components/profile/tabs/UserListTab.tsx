import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import UserListItem from '@/components/users/UserListItem'
import { getUserSubscribers, getUserSubscriptions } from '@/services/subscriptions'
import { PaginatedResponse } from '@/types/api.types'
import { UserListItem as UserLIstItemTypes } from '@/types/user.types'
import { useEffect, useState } from 'react'

interface UserListTabProps {
  type: "subscribers" | "subscriptions"
  channelId: string
}

export default function UserListTab({
  type,
  channelId
}: UserListTabProps) {
  const [users, setUsers] = useState<PaginatedResponse<UserLIstItemTypes>>()
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [loadingMoreUsers, setLoadingMoreUsers] = useState(false)

  useEffect(() => {
    const loadUsers = async () => {
      setLoadingUsers(true)

      try {
        if(type === "subscribers") {
          const subscribersResponse = await getUserSubscribers({channelId: channelId})
          setUsers(subscribersResponse.data)
          
      } else{
          const subscriptionsResponse = await getUserSubscriptions({subscriberId: channelId})
          setUsers(subscriptionsResponse.data)

        }

      } catch (err) {
        console.log("Failed to load videos", err)
        
      } finally {
        setLoadingUsers(false)
      }
    }

    loadUsers();
  }, [channelId, type])

  const loadMoreUsers = async () => {
    if(loadingMoreUsers) return
    if (!users?.hasNextPage) return

    try {
      setLoadingMoreUsers(true)

      const nextPage = users.nextPage

      if (!nextPage) return

      const response =
        type === "subscribers"
          ? await getUserSubscribers({
              page: nextPage,
              limit: 10,
              channelId,
            })
          : await getUserSubscriptions({
              page: nextPage,
              limit: 10,
              subscriberId: channelId,
            })

      setUsers((prev) => {
        if (!prev) return response.data

        return {
          ...response.data,
          docs: [
            ...prev.docs,
            ...response.data.docs,
          ],
        }
      })

    } catch (err) {
      console.log("Error loading more users", err)

    } finally {
      setLoadingMoreUsers(false)
    }
  }

  if(loadingUsers) return <Spinner />

  if (users?.docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-zinc-200">
          {type === "subscribers"
            ? "No subscribers yet"
            : "Not subscribed to anyone yet"}
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          {type === "subscribers"
            ? "This channel doesn't have any subscribers."
            : "This user hasn't subscribed to any channels yet."}
        </p>
    </div>
    )
  }

  return (
    <div className="py-2 space-y-4">
      {users?.docs.map((user) => (
        <UserListItem
          key={user._id}
          user={user}
        />
      ))}

      {/* LOAD MORE */}
      {users?.hasNextPage && (
        <div className="flex justify-center">
  
          <Button
            variant="secondary"
            onClick={loadMoreUsers}
            disabled={loadingMoreUsers}
          >
            {loadingMoreUsers ? (
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
