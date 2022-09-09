import React, { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider';
import NavBar from '../components/NavBar';
import NewTopic from '../components/NewTopic';

const HomePage = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    return (
    <div className='app-container'>
        <NavBar />
        <NewTopic />
    </div>
    )
}

export default HomePage