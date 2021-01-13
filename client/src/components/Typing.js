import React, {useState, useEffect} from 'react'
import axios from 'axios'

import ProgressBar from './ProgressBar/ProgressBar'
import Reload from './Reload'
export default function Typing() {
    const [vocabs, setVocabs] = useState([])
    useEffect(()=>{
        const fetchWords = async () =>{
            try {
                setVocabs(await vocabulary())
            } catch (error) {
              console.error(error)
            }
          }
        fetchWords()
    },[])
    const numWords = 5
    const api = 'https://random-word-api.herokuapp.com/word?number='
    const vocabulary = async () => {
    try {
        const {data} = await axios.get(`${api}${numWords}`)
        return data
    } catch (error) {
        console.error(error)
    }
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
            <Reload />
            <ProgressBar />
            
        </div>
    )
}