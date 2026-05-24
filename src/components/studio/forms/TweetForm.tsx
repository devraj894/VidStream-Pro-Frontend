import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createTweet, updateTweet } from '@/services/tweets'
import { Tweet } from '@/types/tweets.types'
import { useEffect, useState } from 'react'

interface TweetFormProps {
  data?: Tweet
  onSuccess?: () => void
}

export default function TweetForm({ data, onSuccess }: TweetFormProps) {
  const isEdit = !!data

  const [content, setContent] = useState(data?.content || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!data) return

    setContent(data.content)
  }, [data])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      if(isEdit && data?._id) {
        await updateTweet({ tweetId: data._id, newContent: content })
      } else {
        await createTweet({content: content})
      }

      onSuccess?.()

    } catch(err: any) {
      setError('Failed to create tweet')
      setError(
        err?.response?.data?.message ||
        (isEdit ? 'Update failed' : 'Upload failed')
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-sm text-red-500 font-medium">
          {error}
        </p>
      )}

      {/* CONTENT */}
      <Textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px] resize-none"
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading
          ? isEdit
            ? 'Updating...'
            : 'Uploading...'
          : isEdit
            ? 'Update Tweet'
            : 'Upload Tweet'}
      </Button>
    </form>
  )
}
