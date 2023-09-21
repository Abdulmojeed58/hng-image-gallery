import { useEffect, useRef, useState } from "react";
import { json, useLoaderData } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import { useAuthContext } from "../context/useAuthContext";
import ImageCard from "../components/ImageCard";
import Navbar from "../components/Navbar";
import { useSearchContext } from "../context/useSearchContext";

const Home = () => {
  const { currentUser } = useAuthContext();
  const data: any = useLoaderData();

  const [albums, setAlbums] = useState<any>([]);
  const dragItem = useRef<number | null>(null);
  const dragNode = useRef<any>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const { value } = useSearchContext();

  useEffect(() => {
    if (value.trim() === "") {
      setAlbums(data);
      return;
    }

    const newMovies = data.filter((item: any) => {
      return item.title.toLowerCase().includes(value.toLowerCase().trim());
    });

    setAlbums(newMovies);
  }, [value]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragNode.current = e.target;
    dragItem.current = index;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setAlbums((oldList: any) => {
        const newList = JSON.parse(JSON.stringify(oldList));
        if (currentItem === 0 || currentItem) {
          newList[index] = oldList[currentItem];
          newList[currentItem] = oldList[index];
        }

        // newList.splice(index, 0, newList.splice(currentItem, 1)[0]);
        dragItem.current = index;
        return newList;
      });
    }
  };

  const handleDragEnd = () => {
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragNode.current = null;
    dragItem.current = null;
    setDragging(false);
  };

  const allAlbums = albums?.map((photo: any, index: number) => {
    const { id, title, poster_path } = photo;

    return (
      <ImageCard
        onDragStart={(e: React.DragEvent) => {
          handleDragStart(e, index);
        }}
        onDragEnter={
          dragging
            ? (e: React.DragEvent) => {
                handleDragEnter(e, index);
              }
            : null
        }
        key={id}
        src={poster_path}
        name={title}
        dragging={dragItem.current === index && dragging}
      />
    );
  });

  return (
    <ProtectedRoute user={currentUser}>
      <section>
        <Navbar />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {allAlbums}
        </div>
      </section>
    </ProtectedRoute>
  );
};

export const loader = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWExY2YyZDU4OGFkZWQ4M2E1ZTRkYjcyNTAyMzBhOCIsInN1YiI6IjY1MDFhYzk3ZmZjOWRlMGVkZjYxNWU0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s7IS3219YRwYIKvXPZ6vm_ZUfw1lcxc7fz3mdVStDlc`,
      },
    }
  );
  if (!res.ok) {
    throw json({ message: "There was an error" }, { status: 400 });
  } else {
    const data = await res.json();
    return data.results;
  }
};

export default Home;
