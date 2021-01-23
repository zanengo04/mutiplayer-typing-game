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
    const [wordProgress, setWordProgress] = useState(0)
    const [backSpaceCount, setBackSpaceCount] = useState(0);
    const [connectionCounter, setConnectionCounter] = useState(0);
    const arrayTyped = inputValue.split('')
    
    var currentWord = vocabs[wordTyped]
    let letterTyped = arrayTyped.length
    var currentLetter = arrayTyped[letterTyped-1]
    const [tempClass,setTempClass] = useState(false)
    const [tempClassList, setTempClassList] = useState([])

    const nameList = ['zane','zac','zed']
    const users = [];
    const infoList =[]
    function createObject() {
        for (var i = 0; i < nameList.length; i++) {
            var user = new Object()
            user.username = nameList[i];
            user.id =i+1
            users.push(user)
        }
        console.log(users)
        var info = new Object()
        info.room = '1'
        info.user= users
        infoList.push(info)
        console.log(infoList)
    }
    createObject()

    useKeyPress("Backspace");
    function useKeyPress(targetKey) {

        function downHandler({ key }) {
        if (key === targetKey) {
            setBackSpaceCount(backSpaceCount + 1);
        }
        }
        useEffect(() => {
        window.addEventListener("keydown", downHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
        }, [backSpaceCount]);
    }

    socket.on('vocabWords', vocabWords => setVocabs(vocabWords));
    socket.on('numWords', numWords => setNumWords(numWords))
    socket.on('connectionCounter', connectionCounter => setConnectionCounter(connectionCounter))
    console.log(connectionCounter)

        useEffect(() =>{

            if(currentWord){
                if(currentLetter ===' ' && letterTyped === 1){
                    setInputValue('')
                }
                else if(letterTyped ===0 && backSpaceCount>0){
                    setTempClass(false)
                    setTempClassList([])
                    setBackSpaceCount(0)
                }
                else if(wordTyped === numWords-1 && currentWord === inputValue) {
                    setClassName([...className,'correct'])
                    setInputValue('')
                    setWordTyped(wordTyped+1)
                    setTempClass(false)
                }
                else if (currentWord+' ' === inputValue) {
                    setClassName([...className,'correct'])
                    setInputValue('')
                    setWordTyped(wordTyped+1)
                    setTempClass(false)
                }
                else if(currentLetter === ' ' && inputValue !== currentWord){
                    setClassName([...className,'wrong'])
                    setInputValue('')
                    setWordTyped(wordTyped+1)
                    setTempClass(false)
                }else if (inputValue === currentWord.substring(0,letterTyped) && letterTyped !==0) {
                    setTempClass('correct')
                    setTempClassList([...className,'correct'])
                }
                else if (currentLetter && letterTyped !==0) {
                    setTempClass('wrong')
                    setTempClassList([...className,'wrong'])
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
        setInputValue('')
        setWordTyped(0)
    }
    
    function handleChange(e) {
        setInputValue(e.target.value)
    }

    
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
            <ProgressBar progress={wordProgress} infoList={infoList}/>
            
        </div>
    )
}