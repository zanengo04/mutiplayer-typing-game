import roomReducer from './room';
import usernameReducer from './username';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    room: roomReducer,
    username: usernameReducer
})

export default allReducers
