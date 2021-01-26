export default function usernameReducer(state = '', action){
    switch (action.type){
        case 'setUsername':
            return 'a'
        default:
            return state
    }
}