export default function infoReducer(state = [], action){
    switch (action.type){
        case 'setInfo':
            return state= [...state, action.payload]
        case 'setProgress':
            const i = 2;
            console.log(i)
            var arrayLength = state[0].length
            var currentList = [...state][0][i].slice(0,3)
            var listWithProgress = [...currentList, action.payload]
            var finalList = []
            var firstHalf = [...state][0].slice(0,i)
            var secondHalf = [...state][0].slice(i+1,arrayLength)
            finalList.push(...firstHalf, listWithProgress,...secondHalf)
            return state = [
                finalList
            ]
            
        default:
            return state

    }
}