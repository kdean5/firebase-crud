import React, { useEffect, useState } from 'react'
import { doc, getDocs, deleteDoc } from 'firebase/firestore'
import { movieCollectionRef } from '../lib/firestore.collections'
import { db } from '../lib/init-firebase'

const ListMovies = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        getMovies()
    }, [])

    const getMovies = () => {
        getDocs(movieCollectionRef).then(response => {
            const moviesList = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            console.log(moviesList);
            setMovies(moviesList)
        }).catch(error => console.log(error.message))
    }

    const deleteMovie = (id) => {
        const docRef = doc(db, 'movies', id)
        deleteDoc(docRef).then(() => {
            console.log('Document deleted')
        }).catch(error => console.log(error.message))
    }

    return (
        <div>
            <h4>List Movies</h4>
            <button onClick={() => getMovies()}>Refresh movies</button>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        {movie.id} : {movie.data.name} &nbsp;
                        <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListMovies