import React from 'react'
import './ProgressBar.css'

export default function ProgressBar({progress, infoList}) {
    const progressBarStyle = {
        height: "100%",
        width: `${progress}%`,
        backgroundColor: "rgb(0, 0, 0)",
        borderRadius: "20px",
        opacity:"1",
        transition: "0.5s",
    }

    /*infoList.map(infoItem=>{
        console.log("This is room:", infoItem.room)
        infoItem.user.map(user =>
            console.log(`User #${user.id} with the username of ${user.username}`)
        )})*/
    return (
        <>
            {        
                infoList.map(infoItem=>{
                    return <>
                        <p key={infoItem.room}>{`Room: ${infoItem.room}`}</p>
                        {infoItem.user.map(user =>
                            <div className="progressContainer" key={user.id}>
                                <div className={`progressBar${user.id}`} style={progressBarStyle} key={user.id}/>
                            </div>
                        )}
                    </>
                    })
            }
        </>
    )
}
