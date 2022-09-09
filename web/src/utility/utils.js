
import axios from 'axios'

const usersAPI = `http://127.0.0.1:8000/api/users/`

export const fetchData = (setUsers) => {
    const getUsers = axios.get(usersAPI)
    axios.all([getUsers]).then(
        axios.spread((...allData) => {
            const allDataUsers = allData[0].data
            setUsers(allDataUsers)
        })
    )
}

export const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user'))
}

