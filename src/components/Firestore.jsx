import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Firestore = () => {
  const [movieList, setMovieList] = useState([]);

  // Movie
  const [title, setTitle] = useState("");
  const [releasedDate, setReleasedDate] = useState("");
  const [receivedOscar, setReceivedOscar] = useState(false);

  // Collection
  const movieListCollectionRef = collection(db, "movies");

  // Update Movie
  const [updatedMovieTitle, setUpdatedMovieTitle] = useState("");

  // Use Snapshot for realtime data
  useEffect(() => {
    onSnapshot(movieListCollectionRef, (snapshot) => {
      const filteredData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    });
  }, []);

  // Add movie
  const submitMovie = async () => {
    try {
      addDoc(movieListCollectionRef, {
        title: title,
        releasedDate: releasedDate,
        receivedOscar: receivedOscar,
        userId: auth?.currentUser?.uid,
      });
      setTitle("");
      setReleasedDate("");
      setReceivedOscar(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete movie
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  // Update movie title
  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {
        title: updatedMovieTitle,
      });
      setUpdatedMovieTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-5 p-4 mx-4 my-2">
      <div className="flex flex-wrap w-[650px] items-center">
        <input
          type="text"
          className="p-2 mr-3 border rounded"
          placeholder="Movie Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="p-2 mr-3 border rounded"
          value={releasedDate}
          placeholder="Released Date..."
          onChange={(e) => setReleasedDate(Number(e.target.value))}
        />

        <input
          type="checkbox"
          className="p-2 mr-3"
          value={receivedOscar}
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

      <div className="w-full">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="flex items-center justify-between w-full gap-2 p-4 mb-2 border rounded shadow-md cursor-pointer "
          >
            <div className="flex gap-5">
              <h1>{movie.title}</h1>
              <p> Date: {movie.releasedDate}</p>
              <p>{movie.recievedOscar ? "Received an Oscar" : "No Oscar"}</p>
              <button
                onClick={() => deleteMovie(movie.id)}
                className="px-4 py-2 text-white bg-red-500 border rounded-md "
              >
                Delete Movie
              </button>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="New Title..."
                className="px-4 mx-2 border rounded "
                onChange={(e) => setUpdatedMovieTitle(e.target.value)}
              />
              <button
                onClick={() => updateMovieTitle(movie.id)}
                className="px-4 py-2 text-white bg-black border rounded"
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Firestore;
