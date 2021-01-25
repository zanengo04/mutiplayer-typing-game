import React from 'react'

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
    return (
        <div>
            <p id='welcome'>Welcome to Typing Game</p>
            <div id = 'formContainer'>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Username" variant="outlined" />
                    <TextField id="outlined-basic" label="Room Name" variant="outlined" />
                </form>
                <button><Link to={'/game'}>{'Submit'}</Link></button>
            </div>
        </div>
    )
}
