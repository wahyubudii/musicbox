import { SearchIcon } from "@heroicons/react/outline";
import Swal from "sweetalert2";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { milisToMinutesAndSeconds } from "../../utils/timeConverter";
import {BASE_URL, USER, PLAYLIST, TRACKS, SEARCH} from "../../config/urlApi";
import axios from "axios";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { accountSelectors, getAccount } from "../../features/accountSlice";
import { AppDispatch, RootState } from "../../store";
import { setTracks, setArtists } from "../../features/tracksSlice";
import gifSong from "../../assets/songs.gif";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-amber-500",
  "from-pink-500",
  "from-purple-500",
  "from-gray-500",
  "from-slate-500",
  "from-teal-500",
  "from-orange-500",
  "from-lime-500",
  "from-emerald-500",
  "from-cyan-500",
  "from-sky-500",
  "from-indigo-500",
];

export default function CreatePlaylist() {
  const dispatch = useDispatch<AppDispatch>()
  const { token } = useSelector((state:RootState) => state.token)
  const account = useSelector(accountSelectors.selectAll)
  const [searchKey, setSearchKey] = useState("");
  const [selectedTracksUri, setSelectedTracksUri] = useState<any>([]);
  const [addPlaylist, setAddPlaylist] = useState<any>([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [color, setColor] = useState<any>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [playlistForm, setPlaylistForm] = useState({
      title: "",
      description: "",
  })

  const { tracks } = useSelector((state:RootState) => state.tracks)

  useEffect(() => {
    setColor(shuffle(colors).pop());
    dispatch(getAccount(token))
  }, [dispatch]);

  const searchTracks = async (e) => {
    e.preventDefault();
    try {
      e.target[0].value = "";
      const { data } = await axios.get(`${SEARCH}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "track,artist",
          limit: 10
        },
      });
  
      dispatch(setTracks(data.tracks.items))
      dispatch(setArtists(data.tracks.items))
    } catch (error) {
      console.log(error)
    }
  };

  const toggleSelect = (track) => {
    const uri = track.uri;
    const songDuration = track.duration_ms

    setTotalDuration(totalDuration + songDuration)

    // delete
    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setAddPlaylist(addPlaylist.filter((item) => item !== track));
      setIsSelected(false);
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setAddPlaylist([...addPlaylist, track]);
      setIsSelected(true);
    }
  };

  const playlistChangeForm = (e) => {
      const {name, value} = e.target;
      setPlaylistForm({...playlistForm, [name]: value});
  }

  const createPlaylist = async () => {
    try {
      const response = await axios.post(BASE_URL + USER + `/${account[0].id}` + PLAYLIST, {
        name : playlistForm.title,
        description : playlistForm.description,
        public : false,
        collaborative: false
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setIsShowModal(false)
      if(response) return response?.data?.id

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Can't add new playlist!",
      })
    } 
  }

  const addSongsToPlaylist = async (e) => {
    e.preventDefault()
    try {
        const playlist_id = await createPlaylist()
        const response = await axios.post(BASE_URL + PLAYLIST + `/${playlist_id}` + TRACKS, {
            uris: selectedTracksUri.map((song) => song)
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setAddPlaylist([])
        setSelectedTracksUri([])
        setTracks([])
        setPlaylistForm({
          title: "",
          description: ""
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Playlist has been created',
          showConfirmButton: false,
          timer: 2000
        })
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide responsive">
      <Header />

      <section
        className={`bg-gradient-to-b to-black ${color} h-84 text-white w-full`}
      >
        {addPlaylist.length > 0 ? (
          addPlaylist.slice(0, 1).map((playlist) => {
            return (
              <div
                key={playlist.id}
                className="flex items-end space-x-7 p-8 pt-12"
              >
                <div key={playlist.key} className="flex items-end space-x-7">
                  <img
                    src={playlist.album.images[0].url}
                    className="h-56 w-56 shadow-2xl"
                  />
                  <div>
                    <p className="font-bold">Playlist</p>
                    <h1 className="pt-2 text-2xl md:text-3xl xl:text-5xl font-bold">
                      {playlist.name}
                    </h1>
                    <div className="pt-4 text-gray-400 flex items-center justify-space-evenly space-x-2 ">
                      <p className="text-white hover:text-green-400">
                        <a href={account[0].external_urls.spotify} target="_blank">{account[0].display_name}</a>
                      </p>
                      <span>•</span>
                      <p>{addPlaylist.length} songs</p>
                      <span>•</span>
                      <p>{milisToMinutesAndSeconds(totalDuration)} min</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-end space-x-7 p-8 pt-12">
            <div className="flex items-end space-x-7">
              <div className="h-56 w-56 bg-black flex items-center justify-center">
                <img src={gifSong} className="h-14 w-14 shadow-2xl" />
              </div>
              <div>
                <p className="font-bold">Playlist</p>
                <h1 className="text-3xl md:text-4xl xl:text-7xl font-bold">
                  My Playlist
                </h1>
                {account.length > 0 && (
                  <p className="pt-5 text-white hover:text-green-400">
                    <a href={account[0].external_urls.spotify} target="_blank">{account[0].display_name}</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="space-y-4 pt-4">
        <div className="px-8 flex flex-col space-y-6 text-white">
          <div className="flex flex-col space-y-1 text-white">
            {addPlaylist.length > 0 ? (
              addPlaylist.map((playlist) => {
                return (
                  <div
                    key={playlist.id}
                    className="grid grid-cols-2 text-gray-500 text-sm py-2 px-1 hover:bg-gray-900 rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 mx-2">
                      <img
                        src={playlist.album.images[0].url}
                        className="h-9 w-9"
                      />
                      <div>
                        <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">
                          {playlist.name}
                        </p>
                        <p className="w-36 lg:w-64 truncate">
                          {playlist.artists[0].name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between ml-auto md:ml-0 mx-4">
                      <p className="w-40 hidden md:inline truncate">
                        {playlist.album.name}
                      </p>
                      <p className="pr-4">
                        {milisToMinutesAndSeconds(playlist.duration_ms)}
                      </p>
                      {!addPlaylist.includes(playlist.uri) && (
                        <button
                          onClick={() => toggleSelect(playlist)}
                          className="bg-red-700 hover:bg-red-800 text-white py-2 rounded-full w-20"
                        >
                          Deselect
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>

          <div className="w-full space-y-3">
            <h1 className="text-lg font-bold">
              Let's find something for your playlist
            </h1>
            <div className="flex space-x-4">
                <div className="flex flex-col bg-gray-800 text-gray-300 w-80">
                  <form onSubmit={searchTracks} className="flex space-x-1 items-center px-3">
                      <SearchIcon className="h-6 w-6" />
                      <input
                      type="text"
                      placeholder="Search for songs"
                      className="items-center p-2 my-1 bg-gray-800 outline-0 w-80 text-sm"
                      onChange={(e) => setSearchKey(e.target.value)}
                      />
                      <button type="submit" />
                  </form>
                </div>

                {addPlaylist.length > 0 && 
                  <button className="block text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm px-5 py-2" type="button" onClick={() => {setIsShowModal(true)}}>Create Playlist</button>
                }

                {/* Modal */}
                {isShowModal &&
                    <>
                        <div id="authentication-modal" className="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex justify-end p-2">
                                        <button onClick={() => {setIsShowModal(false)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 ml-auto inline-flex items-center">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                                        </button>
                                    </div>
                                    <form onSubmit={addSongsToPlaylist} className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
                                        <h3 className="text-xl font-medium text-gray-300">Create your own playlist</h3>
                                        <div>
                                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                                            <input onChange={playlistChangeForm} type="text" name="title" id="title" className="outline-none bg-gray-600 border border-gray-500 text-white text-sm rounded-lg block w-full p-3" required />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-300">Description</label>
                                            <textarea onChange={playlistChangeForm} name="description" id="description" className="outline-none bg-gray-600 border border-gray-500 text-white text-sm rounded-lg block w-full p-3 h-32" required />
                                        </div>
                                        <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm px-5 py-3 text-center">Create Playlist</button>
                                    </form>
                                </div>
                            </div>
                        </div> 
                    </>
                }
            </div>
          </div>

          <hr className="border-slate-800" />

          <div className="flex flex-col space-y-1 pb-28 text-white">
            {tracks.map((track) => {
              return (
                <div
                  key={track.id}
                  className="grid grid-cols-2 text-gray-500 text-sm py-2 px-1 hover:bg-gray-900 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center space-x-3 mx-2">
                    <img src={track.album.images[0].url} className="h-9 w-9" />
                    <div>
                      <p className="w-36 lg:w-64 text-white hover:text-green-400 truncate">
                        {track.name}
                      </p>
                      <p className="w-36 lg:w-64 truncate">
                        {track.artists[0].name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between ml-auto md:ml-0 mx-4">
                    <p className="w-40 hidden md:inline truncate">
                      {track.album.name}
                    </p>
                    <p className="pr-4">
                      {milisToMinutesAndSeconds(track.duration_ms)}
                    </p>
                    {selectedTracksUri.includes(track.uri) ? (
                      <button
                        onClick={() => toggleSelect(track)}
                        className="bg-red-700 hover:bg-red-800 text-white py-2 rounded-full w-20"
                      >
                        Deselect
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleSelect(track)}
                        className="border-[1px] border-grey-700 bg-black hover:bg-white hover:text-black text-white py-2 rounded-full w-20"
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
