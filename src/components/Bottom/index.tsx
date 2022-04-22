import { FastForwardIcon, PauseIcon, ReplyIcon, SwitchHorizontalIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/outline'
import { RewindIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import data from '../../data/longData'

function Player() {
  const [volume, setVolume] = useState(50)

  const handlePlay = () => {
      console.log("Selected")
  }

  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
        {/* Left */}
        <div className='flex items-center space-x-4'>
            <img src={data[0].album.images[0].url} className='hidden md:inline h-10 w-10'/>
            <div>
                <h3>{data[0].album.name}</h3>
                <p>{data[0].artists[0].name}</p>
            </div>
        </div>

        {/* Center */}
        <div className='flex items-center justify-evenly'>
            <SwitchHorizontalIcon className='button' />
            <RewindIcon className='button' />
            <PauseIcon className='button w-10 h-10 hover:text-green-400' onClick={handlePlay}/>
            <FastForwardIcon className='button' />
            <ReplyIcon className='button' />
        </div>

        {/* Right */}
        <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
            <VolumeOffIcon className='button' onClick={() => volume > 0 && setVolume(volume - 10)}/>
            <input type="range" value={volume} onChange={(e) => setVolume(Number(e.target.value))} min={0} max={100} className="w-14 md:w-28"/>
            <VolumeUpIcon className='button' onClick={() => volume < 100 && setVolume(volume + 10)}/>
        </div>
    </div>
  )
}

export default Player