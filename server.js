const express = require('express');
const http = require('http');
const socketio = require('socket.io')
const axios = require('axios')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 5000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on Port ${PORT}`))

var words =[]
var usernames=[]
const numWords = 5
var connectionCounter = 0
var reloaded =true
var usernameList = []
const api = 'https://random-word-api.herokuapp.com/word?number='
const vocabulary = async () => {
    try {
        const {data} = await axios.get(`${api}${numWords}`)
        return data
    } catch (error) {
        console.error(error)
    }
}
const vocabGen = async () => {
    const vocab = await vocabulary()
    console.log(vocab)
    return vocab
}
const fetchWords = async () =>{
    try {
        words = await vocabGen()
        io.on('connection', socket => {
            connectionCounter += 1
            io.emit("broadcast", connectionCounter);
            io.emit('numWords', numWords)
            io.emit('vocabWords', words)
            io.emit('reloaded', reloaded)
            io.emit('connectionCounter',connectionCounter)
            socket.on('disconnect', () => {
                connectionCounter -=1;  
                io.emit('connectionCounter',connectionCounter)
            })
            io.emit('usernameList', usernames)
            socket.on('loadCount', async (loadCount) => {
                if (loadCount>0) {
                    words = await vocabGen()
                    io.emit('vocabWords', words)
                    connectionCounter -= 1
                    console.log(words)
                    console.log(loadCount)
                }
            })
            socket.on('isClicked', isClicked => console.log(isClicked))
            socket.on('username', username => {
                const i = 1
                usernameList.push(username)
                console.log(usernameList)
                io.emit('getUsername', usernameList)
                io.emit('getInfo', usernameList)
                socket.on('updateInfo', info => {
                    beforeEditArray = [...usernameList.slice(0,i)]
                    afterEditArray = [...usernameList.slice(i+1,usernameList.length)]
                    editArray = [...usernameList[0].slice(0,2), ...info]
                    usernameList = [...beforeEditArray, editArray, ...afterEditArray]
                    console.log(usernameList)
                    io.emit('getUpdatedInfo', usernameList)
                })
            })
        })
    } catch (error) {
        console.error(error)
    }
}

fetchWords()
console.log(usernameList)