import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

const Firestore = () => {
  const [movieList, setMovieList] = useState([]);

  // Movie
  const [title, setTitle] = useState("");
  const [releasedDate, setReleasedDate] = useState(0);
  const [receivedOscar, setReceivedOscar] = useState(false);

  // Collection
  const movieListCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(movieListCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getMovieList();
  }, []);

  const submitMovie = async () => {
    try {
      addDoc(movieListCollectionRef, {
        title: title,
        releasedDate: releasedDate,
        recievedOscar: receivedOscar,
      });
      setTitle("");
      setReleasedDate("");
      setReceivedOscar(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-5 p-4 mx-4 my-2">
      <div className="flex flex-wrap w-[650px] items-center">
        <input
          type="text"
          className="p-2 mr-3 border rounded"
          placeholder="Movie Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="p-2 mr-3 border rounded"
          placeholder="Released Date..."
          onChange={(e) => setReleasedDate(Number(e.target.value))}
        />

        <input
          type="checkbox"
          className="p-2 mr-3"
          checked={receivedOscar}
          onChange={(e) => setReceivedOscar(e.target.checked)}
        />
        <label htmlFor="" className="mr-3">
          Received an Oscar
        </label>
        <button
          onClick={submitMovie}
          className="px-4 py-2 my-3 text-white bg-black border rounded-md w-[200px]"
        >
          Submit Movie
        </button>
      </div>

      <div className="w-[580px]">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="flex gap-2 p-4 mb-2 border rounded shadow-md cursor-pointer "
          >
            <h1>{movie.title}</h1>
            <p> Date: {movie.releasedDate}</p>
            <p>{movie.recievedOscar ? "Received an Oscar" : "No Oscar"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Firestore;
