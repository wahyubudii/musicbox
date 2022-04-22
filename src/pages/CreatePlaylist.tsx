import Sidebar from "../components/Sidebar";
import Bottom from "../components/Bottom";
import CreatePlaylist from "../components/Playlist";
import { useEffect } from "react";

export default function CreatePage() {
  useEffect(() => {
    document.title = "Create Playlist"
  }, [])
  return (
    <div>
      <main className="flex">
        <Sidebar/>
        <CreatePlaylist />
      </main>

      <div className="sticky bottom-0">
        <Bottom />
      </div>
    </div>
  );
}
