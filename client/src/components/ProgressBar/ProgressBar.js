import React from 'react'
import './ProgressBar.css'

export default function ProgressBar({progress, infoList}) {
    return (
        <>
            {        
                infoList.map(infoItem=>{
                    return <>
                        <p key={infoItem.room}>{`Room: ${infoItem.room}`}</p>
                        {infoItem.user.map(user =>
                            <div className="progressContainer" key={user.id}>
                                <div className={`progressBar${user.id}`} style={
                                    {
                                        height: "100%",
                                        width: `${progress}%`,
                                        backgroundColor: "rgb(0, 0, 0)",
                                        borderRadius: "20px",
                                        opacity:"1",
                                        transition: "0.5s",
                                    }
                                } key={user.id}/>
                            </div>
                        )}
                    </>
                    })
            }
        </>
    )
}
