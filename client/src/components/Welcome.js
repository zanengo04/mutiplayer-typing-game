import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import {setUsername, setRoom} from '../actions'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
export default function Welcome() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const username = useSelector(state=> state.username)
    const room = useSelector(state=> state.room)
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
                      onChange={(e) => dispatch(setUsername(e.target.value))}
                    />
                    <TextField 
                      id="outlined-basic" 
                      label="Room Name" 
                      variant="outlined" 
                      value={room}
                      onChange={(e) => dispatch(setRoom(e.target.value))}
                    />
                </form>
                <button><Link to={'/game'}>{'Submit'}</Link></button>
            </div>
        </div>
    )
}
