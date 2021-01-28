export default function usernameReducer(state = '', action){
    switch (action.type){
        case 'setUsername':
            return action.payload
        default:
            return state
    }
}