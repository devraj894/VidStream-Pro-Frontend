import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { backendApi } from '@/lib/backendApi'
import { serverApiHandler } from '@/lib/serverApiHandler'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{
      videoId: string
      playlistId: string
    }>
  }
) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { videoId, playlistId } = await context.params

    const { data } = await backendApi.patch(
      API_ENDPOINTS.PLAYLISTS.ADD_VIDEO_TO_PLAYLIST(
        videoId,
        playlistId
      ),
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return NextResponse.json(data)

  } catch (error) {
    return serverApiHandler(error)
  }
}