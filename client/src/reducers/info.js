export default function infoReducer(state = [], action){
    switch (action.type){
        case 'setInfo':
            return state= [...state, action.payload]
        case 'setProgress':
            const i = 1;
            console.log(i)
            var arrayLength = [...state][0].length
            var currentList = [...state][0][0].slice(0,3)
            var listWithProgress = [...currentList, action.payload]
            return state = [
                [...state][0].slice(0,i),
                [listWithProgress],
                [...state][0].slice(i,arrayLength)
            ]
            
        default:
            return state

    }
}