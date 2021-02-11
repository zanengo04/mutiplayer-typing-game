import React from 'react'
import './ProgressBar.css'

export default function ProgressBar2({infoList}) {
    return (
        <>
            {
                infoList.map(user =>
                    <div className="progressContainer" key={user[2]}>
                        <div className={`progressBar${user[2]}`} style={
                            {
                                height: "100%",
                                width: `${user[3]}%`,
                                backgroundColor: "rgb(0, 0, 0)",
                                borderRadius: "20px",
                                opacity:"1",
                                transition: "0.5s",
                            }
                        } key={user[2]}/>
                    </div>
                )
            }
        </>
    )
}
