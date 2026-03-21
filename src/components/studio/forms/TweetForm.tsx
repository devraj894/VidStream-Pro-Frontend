import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { tweetTypes } from '@/types/tweet'
import { useEffect, useState } from 'react'

interface TweetFormProps {
  data?: tweetTypes
}

export default function TweetForm({ data }: TweetFormProps) {
  const isEdit = !!data

  const [content, setContent] = useState(data?.content || '')

  useEffect(() => {
    if (!data) return

    setContent(data.content)
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      content,
    }

    console.log('PAYLOAD: ', payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* CONTENT */}
      <Textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px] resize-none"
      />

      <Button type="submit" className="w-full">
        {isEdit ? 'Update Tweet' : 'Post Tweet'}
      </Button>
    </form>
  )
}
