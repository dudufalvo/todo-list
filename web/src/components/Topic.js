import React from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { TbEdit } from 'react-icons/tb'

const Topic = ({ topic }) => {
    return (
    <div className='center-row space'>
        <div className='todo-form topic'>
            <div className='todo-body middle'>{topic.body}</div>
            <div className='center-row'>
                <button className='middle todo-form-btn'><TbEdit /></button>
                <button className='middle todo-form-btn'><TiDeleteOutline /></button>
            </div>
        </div>
    </div>
    )
}

export default Topic