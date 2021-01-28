import roomReducer from './room';
import usernameReducer from './username';
import infoReducer from './info'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    room: roomReducer,
    username: usernameReducer,
    info: infoReducer,

})

export default allReducers
