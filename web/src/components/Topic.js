import React, { useState } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { TbEdit } from 'react-icons/tb'
import { IoMdSend } from 'react-icons/io'
import axios from 'axios'

const Topic = ({ topic }) => {
    const [editing, setEditing] = useState()
    const [input, setInput] = useState('')
    const [level, setLevel] = useState(3)
    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleEdit = (event) => {
        if (input) {
            console.log('editing...')
            const token = localStorage.getItem('Authorization')
            axios.put(`http://127.0.0.1:8000/api/topics/${topic.id}/`, {
                'body': input,
                'created': topic.created,
                'updated': new Date(),
                'user': topic.user,
                'level': topic.level
            },{
                headers: {
                    "Authorization": token,
                    "Content-Type": 'application/json'
                }
            })
            .then(res => {
                console.log(res)
                window.location.reload(false);
            })
            .catch(err => console.log(err))

        }
    }

    const handleDelete = (event) => {
        console.log('deleting...')
        axios.delete(`http://127.0.0.1:8000/api/topics/${topic.id}/`)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        window.location.reload(false);
    }

    return (
    <div className='center-row space'>
        <div className='todo-form topic'>
            {!editing?
                <div className='todo-body middle'>{topic.body}</div> :
                <form className='todo-form-edit'>
                    <input
                        type='text'
                        placeholder={topic.body}
                        onChange={handleChange}
                        onClick={()=>{setIsOpen(!isOpen)}}
                    />
                </form>
            } 
            <div className='center-row'>
                {!editing?
                    <button className='middle todo-form-btn' onClick={() => {setEditing(!editing)}}><TbEdit /></button> :
                    <button className='todo-form-btn' onClick={handleEdit} ><IoMdSend/></button>
                }
                <button className='middle todo-form-btn' onClick={handleDelete}><TiDeleteOutline /></button>
            </div>
        </div>
    </div>
    )
}

export default Topic