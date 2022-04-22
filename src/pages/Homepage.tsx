import React, { useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { getAccount } from "../features/accountSlice";
import {BASE_URL, USER, PLAYLIST, TRACKS, SEARCH} from "../config/urlApi";
import { milisToMinutesAndSeconds } from "../utils/timeConverter";
import axios from "axios";
import "../styles/style.css";
import Header from "../components/Header";
import { AppDispatch, RootState } from "../store";
import { setTracks } from "../features/tracksSlice";

export default function Homepage() {
  const dispatch = useDispatch<AppDispatch>()
  const { token } = useSelector((state:RootState) => state.token);
  const [searchKey, setSearchKey] = useState("");
  const [selectedTracksUri, setSelectedTracksUri] = useState<any>([]);
  const [isSelected, setIsSelected] = useState(false);

  const { tracks } = useSelector((state:RootState) => state.tracks)

  useEffect(() => {
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
          type: "track",
        },
      });
      dispatch(setTracks(data.tracks.items))
      // setTracks(data.tracks.items);
    } catch (error) {
      console.log(error)
    }
  };

  const toggleSelect = (track) => {
    const uri = track.uri;
    const songDuration = track.duration_ms

    // delete
    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setIsSelected(false);
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setIsSelected(true);
    }
  };

  return (
    <div className="containers text-white">
      <Header />
      <main className="scrollbar-hide">
        <section>
          <div className="search-section">
            <form onSubmit={searchTracks} className="search-form">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search for songs"
                className="search-field"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <button type="submit" />
            </form>
          </div>
        </section>

        <section>
          {tracks.length > 0 ? (
            <div className="grid-container">
              {tracks.map((track) => {
                return (
                  <div key={track.id} className="grid-song">
                      <div className="song-item">
                          <div className="song-description">
                              <img src={track.album.images[0].url} className="song-image" />
                              <div className="song-details">
                                  <p className="text-white hover-active">{track.name}</p>
                                  <p>{track.artists[0].name}</p>
                                  <p>{track.album.name}</p>
                                  <p>{milisToMinutesAndSeconds(track.duration_ms)}</p>
                                  {selectedTracksUri.includes(track.uri) ? (
                                    <button onClick={() => toggleSelect(track)} className="select-button-red">Deselect</button>
                                  ) : (
                                    <button onClick={() => toggleSelect(track)} className="select-button-green">Select</button>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="no-found-tracks">
              <p className="">No data found!</p>
              <p className="">You have to search first</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
