import React from 'react'
import './ProgressBar.css'

export default function ProgressBar() {
    const progressBarStyle = {
        height: "100%",
        width: "0%",
        backgroundColor: "rgb(0, 0, 0)",
        borderRadius: "20px",
        opacity:"1",
        transition: "0.5s",
    }
    return (
        <>
            <div className="progressContainer">
                <div className="progressBar" style={progressBarStyle}/>
            </div>
            <div className="progressContainer">
                <div className="progressBar2" style={progressBarStyle}/>
            </div>
        </>
    )
}
