import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOP_ARTISTS } from '../../../config/urlApi'
import { setTopArtists } from '../../../features/topItemsSlices'
import { AppDispatch, RootState } from '../../../store'

export default function TopArtists() {
  const { token } = useSelector((state: RootState) => state.token)
  const { topArtists } = useSelector((state: RootState) => state.topItems)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    topArtist(token)
  }, []);

  const topArtist = async (token) => {
    try {
      const { data } = await axios.get(TOP_ARTISTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 9
        }
      });
      dispatch(setTopArtists(data.items))
    } catch (error) {
        console.log(error)
    }
  }

  console.log(topArtists)

  return (
    <div className="flex justify-items-start text-white">
        <div className="p-8 pt-12">
            <h1 className="text-2xl font-bold mb-4">Top Artists</h1>
            <div className="grid grid-cols-9 gap-7">
                {topArtists.map((topArtist, index) => {
                return (
                    <div key={topArtist.id} className="p-3 bg-slate-800 rounded-lg">
                    <img className="rounded-lg w-fit" src={topArtist.images[1].url} alt="" />
                    <p className="text-lg font-semibold mt-3 mb-3 line-clamp-2 leading-6">
                        <span className="text-purple-400 pr-2">#{index+1}</span>
                        {topArtist.name}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-1">Popularity: <span className="text-purple-400 pr-2">{topArtist.popularity}</span></p>
                    </div>
                )
                })}
            </div>
        </div>
    </div>
  )
}
