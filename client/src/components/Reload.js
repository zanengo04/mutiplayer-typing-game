import React from 'react'
const refreshPage = ()=>{
    window.location.reload();
 }
export default function Reload() {
    return (
        <button className="btn" id='reload' onClick={refreshPage}><i className="fas fa-redo"></i></button>
    )
}
