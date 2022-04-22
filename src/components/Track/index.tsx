import { useEffect, useState } from "react";
import { ResponseTracks } from "../../models/Tracks";
import SearchList from "../SearchList";

type Props = { 
  tracksData: ResponseTracks
}

export default function Track({ tracksData }: Props) {
  const [tracks, setTracks] = useState(tracksData);

  useEffect(() => {
    setTracks(tracksData);
  }, [tracksData]);

  return (
    <>
      {tracks.length ? <SearchList data={tracks} /> : <div>No data found</div>}
    </>
  );
}
