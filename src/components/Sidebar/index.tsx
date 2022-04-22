import { useEffect, useState } from 'react'
import {HomeIcon, PlusCircleIcon, HeartIcon} from '@heroicons/react/outline'
import axios from 'axios'
import { LIST_PLAYLIST } from '../../config/urlApi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store'
import { setPlaylists } from '../../features/playlistSlice'
import Swal from "sweetalert2";

function Sidebar() {
    const { token } = useSelector((state: RootState) => state.token)

    const dispatch = useDispatch<AppDispatch>()
    const { playlists } = useSelector((state:RootState) => state.playlists)

    useEffect(() => {
        getPlaylist(token)
    }, [])

    const getPlaylist = async (token) => {
        try {
            const { data } = await axios.get(LIST_PLAYLIST, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setPlaylists(data.items))
        } catch (error) {
            console.log(error)
        }
    }

    const buttonClick = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Page Not Found!',
            text: 'website under maintenance!',
        })
    }

    return (
        <div className='text-gray-400 p-5 lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen w-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
            <div className='space-y-4'>

                <Link to="/home">
                    <button className='flex items-center space-x-2 hover:text-white text-base pl-2'>
                        <HomeIcon className='h-6 w-6'/>
                        <p>Home</p>
                    </button>
                </Link>

                <button onClick={() => {buttonClick()}} className='flex items-center space-x-2 hover:text-white text-base pb-4 pl-2'>
                    <HeartIcon className='h-6 w-6'/>
                    <p>Liked Songs</p>
                </button>

                <Link to="/create-playlist">
                    <button className='flex items-center space-x-2 bg-purple-500 p-2 rounded-lg text-white hover:bg-purple-600 text-base'>
                        <PlusCircleIcon className='h-6 w-6'/>
                        <p>Create Playlist</p>
                    </button>
                </Link>
                <hr className='border-t-[0.3px] border-gray-800' />

                {/* Playlist */}
                {playlists.map((playlist) => {
                    return (
                        <div key={playlist.id}>
                            <p className='hover:text-white text-base pl-2'>{playlist.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar