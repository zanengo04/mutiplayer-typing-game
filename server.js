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
const vocabGen = async () => {
    const vocab = await vocabulary()
    console.log(vocab)
    return vocab
}
const fetchWords = async () =>{
    try {
        words = await vocabGen()
        io.on('connection', socket => {
            
            socket.emit('message','Welcome To Typing Game')
            io.emit('vocabWords', words)
            io.emit('numWords', numWords)
        })
    } catch (error) {
        console.error(error)
    }
}

fetchWords()
io.on('connection', socket => {
    socket.on('loadCount', async (loadCount) => {
        if (loadCount>0) {
            words = await vocabGen()
            io.emit('vocabWords', words)
            console.log(words)
            console.log(loadCount)
        }
    })

})