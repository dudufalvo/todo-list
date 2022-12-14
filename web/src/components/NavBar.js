import React, { useEffect, useState } from 'react'
import { GoTasklist } from 'react-icons/go'
import { getUserFromLocalStorage } from '../utility/utils'

const NavBar = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        setUser(getUserFromLocalStorage())
    }, [])
    
    return (
    <div className='navbar'>
        <div className='center-row'>
            <GoTasklist className='logo-image'/>
            <p className='logo-text'>todo-list</p>
        </div>
        <div className='center-row'>
            <img className='user-pic' src={user?.picture} alt='user-pic' />
            {/* <p className='user-name'>{user?.given_name}</p> */}
        </div>
    </div>
  )
}

export default NavBar