
document.addEventListener('DOMContentLoaded', () => {

    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.querySelector('#alert');
    const score = document.querySelector('.score');


    let isJumping = false;
    let gameOver = false; 
    let position = 0;
    let points = 0;
   

    function keyForJump (e) {
        // caundo se presiona la tecla espacio el dinosaurio salta 
        if(e.keyCode === 32 ) {

            if(!isJumping ) {
                isJumping = true;
                jump();
            }
           
        }   
    };


document.addEventListener('keydown', keyForJump);

function jump() {

    
    let timerId = setInterval(function () {

        // Mover abajo
        if (position > 150) {
            clearInterval(timerId);

            let downTimerId = setInterval(function () {
                if (position < 10) {
                    clearInterval(downTimerId);
                    isJumping = false;
                } else {
                    position -= 30;
                    dino.style.bottom = position + 'px';
                }
            }, 20);

        }

        // Mover arriba
        position += 20;
        dino.style.bottom = position + 'px';

    },20);
}



function generateObstacles()  {
   
    
    let randomTime = Math.random() * 4000;

    let obstaclePosition = 1000;

    const obstacle = document.createElement('div');
    if(!gameOver) obstacle.classList.add('obstacle');
    grid.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + 'px';

    let timerId = setInterval(function() {

        // verificamos cuando se pierde

        if( obstaclePosition > 0 && obstaclePosition < 60 && position < 60 ) {
            clearInterval(timerId);
            clearInterval(timerScore);
            alert.innerHTML = 'Juego Terminado, reintentalo presionando la tecla F5';
            gameOver = true;
            start = false;

            //eliminamos los obstaculos que hayan quedado restantes 
            while(grid.firstChild) {
                grid.removeChild(grid.lastChild)
            }
        }

        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + 'px';
       
    }, 20);

    if(gameOver == false ) {
        setTimeout(generateObstacles, randomTime);
    };
    
};

generateObstacles();

function scoreShow () {
    points += 3;
    score.innerHTML = `${points}`;

}

let timerScore = setInterval(scoreShow, 90);


});

