export default function roomReducer(state = '', action){
    switch (action.type){
        case 'setRoom':
            return action.payload
        default:
            return state
    }
}