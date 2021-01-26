export default function roomReducer(state = '', action){
    switch (action.type){
        case 'setRoom':
            return 'a'
        default:
            return state
    }
}