import React, { useState } from "react";
import data  from "../../data/longData";
import { milisToMinutesAndSeconds } from "../../utils/timeConverter";

export default function Songs() {
  const [selectedDataUri, setSelectedDataUri] = useState<any>([])
  const [isSelected, setIsSelected] = useState(false)

  const toggleSelect = (dataList: any) => {
    const uri = dataList.uri;

    // delete
    if (selectedDataUri.includes(uri)) {
      setSelectedDataUri(selectedDataUri.filter((item) => item !== uri))
      setIsSelected(false)
    } else {
      setSelectedDataUri([...selectedDataUri, uri])
      setIsSelected(true)
    }
  }

  return (
    <div className="flex flex-col space-y-1 pb-28 text-white">
      {data.map((dataList, index) => {
        return (
          <div data-testid="song-container" key={dataList.id} className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
            <div className="flex items-center space-x-6">
              <p>{index + 1}</p>
              <img src={dataList.album.images[0].url} className="h-10 w-10" />
              <div>
                <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">
                  {dataList.album.name}
                </p>
                <p className="w-40">{dataList.artists[0].name}</p>
              </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
              <p className="w-40 hidden md:inline truncate">{dataList.album.name}</p>
              <p>{milisToMinutesAndSeconds(dataList.duration_ms)}</p>
              {selectedDataUri.includes(dataList.uri) ? (
                <button onClick={() => toggleSelect(dataList)} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg mx-4">Deselect</button>
              ) : (
                <button onClick={() => toggleSelect(dataList)} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg mx-4">Select</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
