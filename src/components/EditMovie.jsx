import React, { useState } from 'react'
import { doc, updateDoc } from '@firebase/firestore'
import { db } from '../lib/init-firebase'

const EditMovie = () => {
    const [name, setName] = useState("")
    const [id, setId] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if (name === '' || id === '') {
            return
        }
        const docRef = doc(db, 'movies', id)
        updateDoc(docRef, { name }).then(response => {
            console.log(response)
            setId('')
            setName('')
        }).catch(error => {
            console.log(error.message);
        })
    }
    return (
        <div>
            <h4>Edit Movie</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Movie ID </label>
                <input
                    id="id"
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <br />
                <label htmlFor="name">Movie Name </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Update Movie</button>
            </form>
        </div>
    )
}

export default EditMovie