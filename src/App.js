import React from 'react'
import AddMovie from './components/AddMovie'
import EditMovie from './components/EditMovie'
import ListMovies from './components/ListMovies'
import RealtimeMovies from './components/RealtimeMovies'

const App = () => {
    return (
        <div>
            <ListMovies />
            <RealtimeMovies />
            <AddMovie />
            <EditMovie />
        </div>
    )
}

export default App