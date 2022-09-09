import React, { useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import axios from 'axios'

const NewTopic = () => {
    const [input, setInput] = useState('')
    const [level, setLevel] = useState(3)
    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleSubmit = (event) => {
        const token = localStorage.getItem('Authorization')
        axios.post(`http://127.0.0.1:8000/api/topics/`, {
            'body': input,
            'created': new Date(),
            'updated': new Date(),
            'level': level
        },{
            headers: {
                "Authorization": token,
                "Content-Type": 'application/json'
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
    <div className='center-row'>
        <form className='todo-form'>
            <BsCheck className='todo-form-img'/>
            <input
                type='text'
                placeholder='create new topic...'
                onChange={handleChange}
            />
            <button className='todo-form-btn' onClick={handleSubmit} ><IoMdSend/></button>
        </form>
    </div>
    )
}

export default NewTopic