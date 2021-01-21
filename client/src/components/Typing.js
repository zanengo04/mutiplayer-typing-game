import React, {useState, useEffect} from 'react'
import socketClient  from "socket.io-client";

import ProgressBar from './ProgressBar/ProgressBar'


const SERVER = "http://127.0.0.1:5000";
var socket = socketClient (SERVER, {transports: ['websocket']});
export default function Typing() {
    const [vocabs, setVocabs] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [className, setClassName] = useState([])
    const [wordTyped, setWordTyped] = useState(0)
    const [numWords, setNumWords] = useState(0)

    socket.on('vocabWords', vocabWords => setVocabs(vocabWords));
    socket.on('numWords', numWords => setNumWords(numWords))

    const [keyPressed, setKeyPressed] = useState(0);
    useKeyPress("Backspace");
    function useKeyPress(targetKey) {

        function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(keyPressed + 1);
        }
        }
        useEffect(() => {
        window.addEventListener("keydown", downHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
        }, [keyPressed]);
    }
    
        const arrayTyped = inputValue.split('')
        
        var currentWord = vocabs[wordTyped]
        var keystroke = currentWord && currentWord.length
        let letterTyped = arrayTyped.length
        var currentLetter = arrayTyped[letterTyped-1]
        var backspaceCount = keyPressed
        const [characterScore, setCharacterScore] = useState(0)
        const [tempClass,setTempClass] = useState(false)
        const [tempClassList, setTempClassList] = useState([])
        useEffect(() =>{

            if(currentWord){
                if(currentLetter ===' ' && letterTyped === 1){
                    setInputValue('')
                }
                else if(wordTyped === numWords-1 && currentWord === inputValue) {
                    setClassName([...className,'correct'])
                    setInputValue('')
                    setWordTyped(wordTyped+1)
                    setTempClass(false)
                    setCharacterScore(0)
                }
                else if (currentWord+' ' === inputValue) {
                    setClassName([...className,'correct'])
                    setInputValue('')
                    setWordTyped(wordTyped+1)
                    setTempClass(false)
                    setCharacterScore(0)
                }
                else if(currentLetter === ' ' && inputValue !== currentWord){
                    setClassName([...className,'wrong'])
                    setInputValue('')
                    setWordTyped(wordTyped+1)
                    setTempClass(false)
                }else if (currentLetter === currentWord[letterTyped-1] && currentLetter) {
                    console.log(letterTyped, characterScore, backspaceCount)
                    if (
                        (letterTyped===characterScore+1 && backspaceCount ===0)|| 
                        (characterScore ===2 && letterTyped ===1)|| 
                        (characterScore === letterTyped)) {
                        setTempClass('correct')
                        setTempClassList([...className,'correct'])
                        console.log(tempClassList)
                    }
                    if ( keystroke > letterTyped){
                        setCharacterScore(characterScore+1)
                        console.log(characterScore)
                        if (letterTyped ===1 && backspaceCount >0){
                          setCharacterScore(1)
                          backspaceCount =0
                        }
                        else if (characterScore >1 && backspaceCount >0) {
                          setCharacterScore(characterScore-2)
                          if(letterTyped>characterScore){
                            setCharacterScore(characterScore+1)
                          }
                          backspaceCount = 0
                        }
                    } else if (keystroke === letterTyped && backspaceCount ===0){
                        setCharacterScore(characterScore+1)
                        if (letterTyped ===0 && backspaceCount >0){
                            setCharacterScore(0)
                            backspaceCount =0
                        }
                        else if (characterScore >1 && backspaceCount >0) {
                          backspaceCount = 0
                        }
                    }
                }
                else if (currentLetter) {
                    setTempClass('wrong')
                    setTempClassList([...className,'wrong'])
                    console.log(tempClassList)
                }
            }
            setWordProgress(wordTyped/numWords*100)
        },[letterTyped])
        window.addEventListener("keydown", () => {
            
        }
        );
    
    var loadCount = 0
    function handleClick() {
        loadCount +=1
        console.log(loadCount)
        socket.emit('loadCount', loadCount)
        setClassName([])
        setWordProgress(0)
    }

    function handleChange(e) {
        setInputValue(e.target.value)
    }
    const [wordProgress, setWordProgress] = useState(0)
    
        return (
        
        <div className="typingContainer">
            <script src="typing.js" defer></script>
            <canvas id="myCanvas" width="1px" height='1px'></canvas>
            <div className="textBox" id='textBox'>
                <div className="text-display" id= "textDisplay">
                    {vocabs.map((word,index) => {return <span key={index} className={tempClass? tempClassList[index]: className[index]}>{word} </span>})}
                </div>
            </div>
            
            <input 
                type='text' 
                className="text-Input" 
                id="textInput" 
                autoFocus
                value={inputValue}
                onChange={handleChange}
            ></input>
            <button className="btn" id='reload' onClick={handleClick}><i className="fas fa-redo"></i></button>
            <ProgressBar progress={wordProgress? wordProgress: 0}/>
            
        </div>
    )
}