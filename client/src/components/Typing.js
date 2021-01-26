import React, {useState, useEffect} from 'react'
import socketClient  from "socket.io-client";

import ProgressBar from './ProgressBar/ProgressBar'


const SERVER = "http://127.0.0.1:5000";
var socket = socketClient (SERVER, {transports: ['websocket']});
export default function Typing() {
    const [started, setStarted] = useState(false)
    const [vocabs, setVocabs] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [className, setClassName] = useState([])
    const [wordTyped, setWordTyped] = useState(0)
    const [numWords, setNumWords] = useState(0)
    const [wordProgress, setWordProgress] = useState(0)
    const [backSpaceCount, setBackSpaceCount] = useState(0);
    const [connectionCounter, setConnectionCounter] = useState(0);
    const [userID, setUserID] = useState(false)
    var reloaded

    const arrayTyped = inputValue.split('')
    var currentWord = vocabs[wordTyped]
    let letterTyped = arrayTyped.length
    var currentLetter = arrayTyped[letterTyped-1]
    const [tempClass,setTempClass] = useState(false)
    const [tempClassList, setTempClassList] = useState([])
    
    const nameList = ['zane','zac']
    const users = [];
    const infoList =[]
    console.log(connectionCounter)

    useEffect(() => {
        const timer = setTimeout(() => {
          //if (!reloaded){
            //window.location.reload();
          //}
          console.log(connectionCounter)
        }, 1000);
        return () => clearTimeout(timer);
      }, []);
    function createObject() {
        for (var i = 0; i < connectionCounter; i++) {
            var user = new Object()
            user.username = nameList[i];
            user.progress=wordProgress
            users.push(user)
        }
        var info = new Object()
        info.room = '1'
        info.user= users
        infoList.push(info)
        infoList[0].user[connectionCounter-1].id = userID
        console.log(infoList[0].user)
    }
    if (connectionCounter){

        createObject()
    }
    console.log(connectionCounter)
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
    
    socket.on('vocabWords', vocabWords => {setVocabs(vocabWords)});
    socket.on('reloaded', load => reloaded =load);
    socket.on('numWords', numWords => setNumWords(numWords))
    socket.on('connectionCounter', connectionCounter => setConnectionCounter(connectionCounter))
    socket.on('connection', () =>{
        setUserID(socket.id)
    })
    //socket.emit('username',username)
    //socket.on('usernameList',usernames)
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
        if(numWords){
            setWordProgress(wordTyped/numWords*100)
        }
    },[letterTyped])
    var loadCount = 0
    function handleClick() {
        loadCount +=1
        console.log(loadCount)
        setClassName([])
        setWordProgress(0)
        setInputValue('')
        setWordTyped(0)
        socket.emit('loadCount', loadCount)
    }
    function handleStart(){
        window.location.reload();
    }
    useEffect(() =>{

        if(vocabs.length) {
            setStarted(true)
        }
    },[vocabs.length])
    function handleChange(e) {
        setInputValue(e.target.value)
    }
        return (
        
        <div className="typingContainer">
            {!started && <button id='start' onClick={handleStart}>Start Game</button>}
            
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