import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NEW_RELEASES } from '../../config/urlApi'
import { setReleases } from '../../features/releasesSlice'
import { AppDispatch, RootState } from '../../store'

export default function Release() {
  const { token } = useSelector((state: RootState) => state.token)
  const { releases } = useSelector((state: RootState) => state.releases)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    release(token)
  }, []);

  const release = async (token) => {
    try {
        const { data } = await axios.get(NEW_RELEASES, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
              country: "IN",
              limit: 9,
              offset: 5
            }
        })
        dispatch(setReleases(data.albums.items))
    } catch (error) {
        console.log(error)
    }
  }

  return (
  <div className="flex justify-items-start">
    <div className="p-8 pt-20">
      <h1 className="text-2xl font-bold mb-4">New Release Songs</h1>
      <div className="grid grid-cols-9 gap-7">
        {releases.map((release, index) => {
          return (
            <div key={release.id} className="p-3 bg-slate-800 rounded-lg">
              <img className="rounded-lg" src={release.images[0].url} alt="" />
              <p className="text-lg font-semibold mt-3 mb-3 line-clamp-2 leading-6">
                <span className="text-purple-400 pr-2">#{index+1}</span>
                {release.name}
              </p>
              <p className="text-base line-clamp-1 mb-1">{release.artists.length > 0 ? release.artists.map((artist) => {return artist.name + ", "}) : release.artists[0].name} </p>
              <p className="text-xs text-slate-400 line-clamp-1">{release.release_date}</p>
            </div>
          )
        })}
      </div>
    </div>
  </div>
  )
}
