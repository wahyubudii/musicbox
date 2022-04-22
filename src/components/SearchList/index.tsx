import { milisToMinutesAndSeconds } from "../../utils/timeConverter";
import { useEffect, useState } from "react";
import { ResponseTracks } from "../../models/Tracks";

type Props = {
  data: ResponseTracks
}

export default function SearchList({ data }: Props) {
  const [tracks, setTracks] = useState(data);
  const [selectedTracksUri, setSelectedTracksUri] = useState<any>([])
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    setTracks(data)
  }, [data])

  const toggleSelect = (track) => {
    const uri = track.uri;

    // delete
    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri))
      setIsSelected(false)
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri])
      setIsSelected(true)
    }
  }

  return (
    <div className="flex flex-col space-y-1 pb-28 text-white">
      {data.map((track, index) => {
        return (
          <div key={track.id} className="grid grid-cols-2 text-gray-500 py-4 px-1 hover:bg-gray-900 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-6 mx-4">
              <p>{index + 1}</p>
              <img src={track.album.images[0].url} className="h-10 w-10" />
              <div>
                <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">
                  {track.name}
                </p>
                <p className="w-36 lg:w-64 truncate">{track.artists[0].name}</p>
              </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0 mx-4">
              <p className="w-40 hidden md:inline truncate">{track.album.name}</p>
              <p className="pr-4">{milisToMinutesAndSeconds(track.duration_ms)}</p>
              {selectedTracksUri.includes(track.uri) ? (
                <button onClick={() => toggleSelect(track)} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg mx-4">Deselect</button>
              ) : (
                <button onClick={() => toggleSelect(track)} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg mx-4">Select</button>
              )}
            </div>
          </div>
        )}
      )}
    </div>
  )
}
