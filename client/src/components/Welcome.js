import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
export default function Welcome() {
    const classes = useStyles();
    const [username,setUsername] = useState('')
    const [roomName, setRoomName] = useState('')
    function handleUsername(e) {
      setUsername(e.target.value)
    }
    function handleRoomName(e) {
      setRoomName(e.target.value)
    }
  console.log(username, roomName)
    return (
        <div>
            <p id='welcome'>Welcome to Typing Game</p>
            <div id = 'formContainer'>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField 
                      id="outlined-basic" 
                      label="Username" 
                      variant="outlined" 
                      value={username}
                      onChange={handleUsername}
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="Room Name" 
                      variant="outlined" 
                      value={roomName}
                      onChange={handleRoomName}
                    />
                </form>
                <button><Link to={'/game'}>{'Submit'}</Link></button>
            </div>
        </div>
    )
}
