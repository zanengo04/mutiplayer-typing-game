import React, {useState, useEffect} from 'react'
import socketClient  from "socket.io-client";

import ProgressBar from './ProgressBar/ProgressBar'
import Reload from './Reload'


const SERVER = "http://127.0.0.1:5000";
var socket = socketClient (SERVER, {transports: ['websocket']});
export default function Typing() {
    const [vocabs, setVocabs] = useState([])
    socket.on('vocabWords', vocabWords => setVocabs(vocabWords));
    var loadCount = 0
    function handleClick() {
        loadCount +=1
        console.log(loadCount)
        socket.emit('loadCount', loadCount)
    }
        return (
        
        <div className="typingContainer">
            <script src="typing.js" defer></script>
            <canvas id="myCanvas" width="1px" height='1px'></canvas>
            <div className="textBox" id='textBox'>
                <div className="text-display" id= "textDisplay">
                    {vocabs.map((word,index) => {return <span key={index}>{word} </span>})}
                </div>
            </div>
            
            <input type='text' className="text-Input" id="textInput" autoFocus></input>
            <button className="btn" id='reload' onClick={handleClick}><i className="fas fa-redo"></i></button>
            <ProgressBar />
            
        </div>
    )
}