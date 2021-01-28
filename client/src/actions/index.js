export const setUsername =  (currentLetter) =>{
    return {
        type: 'setUsername',
        payload: currentLetter
    }
}
export const setRoom =  (currentLetter) =>{
    return {
        type: 'setRoom',
        payload: currentLetter
    }
}

export const setInfo = (currentList) => {
    return {
        type: 'setInfo',
        payload: currentList,
    }
}
export const setProgress = (wordProgress) => {
    return {
        type: 'setProgress',
        payload: wordProgress,
    }
}