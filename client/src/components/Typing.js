import React from 'react'

import ProgressBar from './ProgressBar/ProgressBar'
import Reload from './Reload'
export default function Typing() {
    return (
        <div className="typingContainer">
            <script src="typing.js" defer></script>
            <canvas id="myCanvas" width="1px" height='1px'></canvas>
            <div className="textBox" id='textBox'>
                <div className="text-display" id= "textDisplay"/>
            </div>
            
            <input type='text' className="text-Input" id="textInput" autoFocus></input>
            <Reload />
            <ProgressBar />
            
        </div>
    )
}