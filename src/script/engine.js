const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function playSound(sound){
    let audio = new Audio(`./src/audios/${sound}`);
    audio.volume = 0.2;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        playSound("spongebob-fail.mp3")
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Game Over! cabosse, seu resultado foi: " + state.values.result)
        alert("Aperte o botão F5 ou Recarregue a página para reiniciar o game!")
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// function moveEnemy(){
//     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
// }

function addListenerHitbox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a")
            }
        } )
    })
}

function initialize(){
    // moveEnemy();
    addListenerHitbox();
};

initialize();

