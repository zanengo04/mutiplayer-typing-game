
  const textDisplayElement = document.getElementById('textDisplay')
  const textInputElement = document.getElementById('textInput')
  const numWords = 20
  const api = 'https://random-word-api.herokuapp.com/word?number='
  const vocabulary = async () => {
    try {
      const {data} = await axios.get(`${api}${numWords}`)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const fetchWords = async () =>{
    try {
      showWord(await vocabulary())
    } catch (error) {
      console.error(error)
    }
  }
  fetchWords()
  /*[
      {word: 'box', keystroke:3},
      {word: 'sand', keystroke:4},
      {word: 'keyboard', keystroke:8},
      {word: 'girl', keystroke:4},
      {word: 'boy', keystroke:3},
      {word: 'legend', keystroke:6},
      {word: 'length', keystroke:6},
      {word: 'width', keystroke:5},
      {word: 'you', keystroke:3},
      {word: 'love', keystroke:4},
      {word: 'table', keystroke:5},
      {word: 'desk', keystroke:4},
      {word: 'camera', keystroke:6},
      {word: 'hello', keystroke:5},
      {word: 'water', keystroke:5},
      {word: 'fire', keystroke:4},
      {word: 'earth', keystroke:5},
      {word: 'teeth', keystroke:5},
      {word: 'tooth', keystroke:5},
      {word: 'fairy', keystroke:5},
      {word: 'tail', keystroke:4},
      {word: 'cable', keystroke:5},
      {word: 'laptop', keystroke:6},
      {word: 'remote', keystroke:6},
      {word: 'speaker', keystroke:7},
      {word: 'paper', keystroke:5},
      {word: 'clock', keystroke:5},
      {word: 'time', keystroke:4},
      {word: 'music', keystroke:5},
  
  ]*/
  

  function showWord(words) {
      
      for (i=0; i< numWords; i++) {
          const randIndex = Math.floor(Math.random() * words.length);
          var content ="";
          var span = document.createElement("span");
          span.setAttribute('wordNum', i+1)
          content += words[randIndex]+ ' ';
          span.innerHTML=content
          textDisplayElement.appendChild(span)
  
      }
  }
   textInputElement.addEventListener('keydown', function (event) {
      if (textInputElement.value.length === 0 && event.which === 32) {
          event.preventDefault();
      }
    });
  
  function whiteSpace(){
      var patt = new RegExp(" ");
      var res = patt.test(textInputElement.value);
      return res
    }
var backspaceCount = 0
textInputElement.addEventListener("keydown", function(event){
  if(event.key === "Backspace") {
    backspaceCount +=1
  }
});
  let wordTyped = 0
  let rowLength = 886.007
  let keyStrokeCorrect= 0
  let keyStrokeWrong = 0
  var spaceLength = 11.1132813
  var wrongCharacter = 0
  var characterScore = 0
  
  textInputElement.addEventListener('input', () => {

      const arrayText = document.getElementsByTagName("span")
      const arrayValue = textInputElement.value.split('')
      var currentWord = arrayText[wordTyped].innerHTML

      var keystroke = currentWord.length-1
      letterTyped = arrayValue.length
      const inputCharacter = arrayValue[letterTyped-1]
      
      if (inputCharacter == null) {
          arrayText[wordTyped].classList.remove('correct')
          arrayText[wordTyped].classList.remove('wrong')
      } else if(whiteSpace(inputCharacter)&&
          textInputElement.value !== currentWord){
          arrayText[wordTyped].classList.remove('correct')
          arrayText[wordTyped].classList.add('wrong')
          textInputElement.value = []
          //rowLength -= wordLengthCalculator(currentWord.length)
          keyStrokeWrong += keystroke
          rowLength -= getTextWidth(currentWord)
          wordTyped += 1
          if (wordTyped < numWords){newRow(arrayText[wordTyped].innerHTML)}
          characterScore =0
      } else if(textInputElement.value === currentWord){
          arrayText[wordTyped].classList.add('correct')
          arrayText[wordTyped].classList.remove('wrong')
          keyStrokeCorrect += keystroke

          textInputElement.value = []
          if(wordTyped !==numWords){
            //rowLength -= wordLengthCalculator(currentWord.length)
            rowLength -= getTextWidth(currentWord)
            wordTyped += 1
            if (wordTyped < numWords){newRow(arrayText[wordTyped].innerHTML)}
          }
          characterScore = 0

      } else if (inputCharacter === currentWord[letterTyped-1]) {
          if ((letterTyped==characterScore+1 && backspaceCount ==0)|| (characterScore ==2 && letterTyped ==1)|| (characterScore == letterTyped)) {
            arrayText[wordTyped].classList.add('correct')
            arrayText[wordTyped].classList.remove('wrong')
          }
          if ( keystroke > letterTyped){
              characterScore += 1
              if (letterTyped ==1 && backspaceCount >0){
                characterScore =1
                backspaceCount =0
              }
              else if (characterScore >1 && backspaceCount >0) {
                characterScore -= 2
                if(letterTyped>characterScore){
                  characterScore +=1
                }
                backspaceCount = 0
              }
              
          } else if (keystroke == letterTyped && backspaceCount ==0){
            characterScore += 1
              if (letterTyped ==0 && backspaceCount >0){
                characterScore =0
                backspaceCount =0
              }
              else if (characterScore >1 && backspaceCount >0) {
                backspaceCount = 0
              }
          }

      }
      else {
          arrayText[wordTyped].classList.remove('correct')
          arrayText[wordTyped].classList.add('wrong')
          correct = false
      }
      let wordProgress = wordTyped/numWords*100
      const progress = document.querySelector('.progressBar')

      progress.style.width = `${wordProgress}%`
      const progress2 = document.querySelector('.progressBar2')
      progress2.style.width = `${wordProgress}%`
      //if (rowLength + 10.48 < wordLengthCalculator(currentWord.length)){
      function newRow(word){
        
          
          if (rowLength +spaceLength < getTextWidth(word)){
            $('#textDisplay').css('top','-=60px')
            
            rowLength = 886.007
          }
      }
    })
    

    function wordLengthCalculator(wordLength) {
        return (wordLength-1)*40 + 10.48
    }
		function getTextWidth(word) { 
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.font = "40px Arial";
      var txt = word
      length = ctx.measureText(txt).width
      return length
    } 
    
