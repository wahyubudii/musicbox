import { SearchIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import axios from "axios";
import {  useSelector } from "react-redux";
import Header from "../Header";
import {  RootState } from "../../store";
import { ResponseTracks } from "../../models/Tracks";
import { ResponseArtists } from "../../models/Artists";
import { BASE_URL } from "../../config/urlApi";
import Release from "../Release";
import TopTracks from "../TopItems/TopTracks";
import TopArtists from "../TopItems/TopArtists";

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
  "from-orange-500",
  "from-lime-500",
  "from-emerald-500",
  "from-cyan-500",
  "from-sky-500",
  "from-indigo-500",
];

export default function Center() {
  const { token } = useSelector((state: RootState) => state.token)
  const [color, setColor] = useState<any>(null);
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState<ResponseArtists>([]);
  const [tracks, setTracks] = useState<ResponseTracks>([]);

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, []);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide responsive pb-32">
      <Header />
   
      <section className={`bg-gradient-to-b to-black ${color} h-84 text-white w-full`}>
        <Release />
      </section>

      <TopTracks />
      <TopArtists />
    </div>
  );
}