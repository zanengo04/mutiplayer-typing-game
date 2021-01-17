import React from 'react'

export default function Reload() {
    var loadCount = 0
    function handleClick() {
        loadCount +=1
        console.log(loadCount)
    }
    return (
        <button className="btn" id='reload' onClick={handleClick}><i className="fas fa-redo"></i></button>
    )
}
