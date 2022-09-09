import React, { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider';
import NavBar from '../components/NavBar';
import NewTopic from '../components/NewTopic';
import { getUserFromLocalStorage } from '../utility/utils';
import axios from 'axios';

const HomePage = () => {
    const [user, setUser] = useState()
    const [topics, setTopics] = useState()

    useEffect(() => {
        setUser(getUserFromLocalStorage())
    }, [])

    useEffect(() => {
        const fetchTopic = () => {
            if (user) {
                axios.get(`http://127.0.0.1:8000/api/topics-filter/${user.sub}`)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            }
        }

        fetchTopic()
    }, [user])

    return (
    <div className='app-container'>
        <NavBar />
        <NewTopic />
    </div>
    )
}

export default HomePage