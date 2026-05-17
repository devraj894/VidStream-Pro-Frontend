import PlaylistCard from '@/components/playlist/PlaylistCard'
import { Button } from '@/components/ui/button'
import { Playlist } from '@/types/playlist.types'

interface PlaylistTabProps {
  playlists: Playlist[],
  hasNextPage?: boolean,
  onLoadMore: () => void,
  loadingMorePlaylists?: boolean
}

export default function PlaylistTab({ playlists, hasNextPage, onLoadMore, loadingMorePlaylists }: PlaylistTabProps) {
  if (playlists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-zinc-200">
          No playlists yet
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          This channel hasn&apos;t created any playlists.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 py-2">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>

      {/* LOAD MORE */}
      {hasNextPage && (
        <div className="flex justify-center">
  
          <Button
            variant="secondary"
            onClick={onLoadMore}
          >
            {loadingMorePlaylists ? (
              "Loading..."
            ) : (
              "Load More"
            )}
          </Button>
  
        </div>
      )}
    </>
  )
}
