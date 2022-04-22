import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOP_TRACKS } from '../../../config/urlApi'
import { setTopTracks } from '../../../features/topItemsSlices'
import { AppDispatch, RootState } from '../../../store'

export default function TopTracks() {
  const { token } = useSelector((state: RootState) => state.token)
  const { topTracks } = useSelector((state: RootState) => state.topItems)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    topTrack(token)
  }, []);

  const topTrack = async (token) => {
    try {
      const { data } = await axios.get(TOP_TRACKS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 9
        }
      });
      dispatch(setTopTracks(data.items))
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="flex justify-items-start text-white">
        <div className="p-8 pt-12">
            <h1 className="text-2xl font-bold mb-4">Top Tracks</h1>
            <div className="grid grid-cols-9 gap-7">
                {topTracks.map((topTrack, index) => {
                return (
                    <div key={topTrack.id} className="p-3 bg-slate-800 rounded-lg">
                    <img className="rounded-lg" src={topTrack.album.images[0].url} alt="" />
                    <p className="text-lg font-semibold mt-3 mb-3 line-clamp-2 leading-6">
                        <span className="text-purple-400 pr-2">#{index+1}</span>
                        {topTrack.name}
                    </p>
                    <p className="text-base line-clamp-1 mb-1">{topTrack.artists.length > 0 ? topTrack.artists.map((artist) => {return artist.name + ", "}) : topTrack.artists[0].name} </p>
                    <p className="text-xs text-slate-400 line-clamp-1">{topTrack.album.name}</p>
                    </div>
                )
                })}
            </div>
        </div>
    </div>
  )
}
