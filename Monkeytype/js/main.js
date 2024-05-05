const $time = document.querySelector('time');
const $paragraph = document.querySelector('p');
const $input = document.querySelector('input');

const INITIAL_TIME = 30;
const TEXT = 'this is a initial test of the different paragraphs the intention is create a clone of monkeytype using HTML, CSS and Javascript this all the probably important things'

let words = [];
let currentsTime = INITIAL_TIME;

initGame();
initEvents();

function initGame(){

    // logica de el texto
    
    words = TEXT.split(' ').slice(0, 32)
    currentsTime = INITIAL_TIME
    $time.textContent = currentsTime;

    $paragraph.innerHTML = words.map((word, index) => {
        const letters = word.split('')

        return  `<x-word>
        ${letters
            .map(letter =>`<x-letter>${letter}</x-letter>`)
            .join('')
        }
        </x-word>
        `
    }).join('')

    //logica del puntero
    const $firstWord =$paragraph.querySelector('x-word')
    $firstWord.classList.add('active')
    $firstWord.querySelector('x-letter').classList.add('active')


    //logica del tiempo
    const intervalId = setInterval(() =>{
        currentsTime--;
        $time.textContent = currentsTime
        if(currentsTime ===0){
            clearInterval(intervalId)
           gameOver();
        }
    }, 1000)
}


function initEvents(){
    document.addEventListener('keydown',()=>{
        $input.focus();
    })
    $input.addEventListener('keydown', onkeydown);
    $input.addEventListener('keyup', onkeyup);
}
function onkeydown(){
    

}
function onkeyup(){
    //recuperamos los elementos actuales
    const $currentWord = $paragraph.querySelector('x-word.active');
    const $currentLetter = $paragraph.querySelector('x-letter.active');

    const currentWord = $currentWord.innerText.trim();
    $input.maxLength = currentWord.length
    //comprobacion de que se este capturando la palabra actual y la palabra esscrita
    console.log({value: $input.value, currentWord})

    //se recupera el input en forma de array y se compara
    const $allLetters = $currentWord.querySelectorAll('x-letter');

    $allLetters.forEach($letter => $letter.classList.remove('correct', 'incorrect'))
     
    $input.value.split('').forEach((char, index)=>{
        //se guarda cada letra en una variable
        const $letter = $allLetters[index]
        //se guarda la letra actural tambien
        const letterToCheck = currentWord[index]
        //se comparan los dos y se les da su respectivo estado
        const isCorrect = char === letterToCheck
        const letterClass = isCorrect ? 'correct': 'incorrect'
        //se le añade al elemento esta nueva clase
        $letter.classList.add(letterClass)
    })

    //logica movimiento del cursor

    //se remueve la letra que esta actualmente activa
    $currentLetter.classList.remove('active', 'is-last')
    //se asigna a una nueva letra el clase activa
    const inputLength = $input.value.length
    const $nextActiveLetter = $allLetters[inputLength]
    if($nextActiveLetter){
        $nextActiveLetter.classList.add('active')

    }else{
        $currentLetter.classList.add('active', 'is-last')
        //To do: game over si no hay proxima palabra
    }


}

function gameOver(){
    console.log('game over')
}