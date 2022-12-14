import React, { useEffect, useState } from 'react'
import { onSnapshot } from "firebase/firestore"
import { movieCollectionRef } from '../lib/firestore.collections'

const RealtimeMovies = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(movieCollectionRef, (snapshot) => {
            setMovies(snapshot.docs.map(doc => (({ id: doc.id, data: doc.data() }))))
        })

        return () => {
            unsubscribe()
        }
    }, [])


    return (
        <div>
            <h4>RealtimeMovies</h4>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        {movie.id} : {movie.data.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RealtimeMovies