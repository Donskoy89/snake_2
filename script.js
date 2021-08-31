let field = document.querySelector('.field');
let div = document.querySelector('.score');

for(let i=0; i<225; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    field.append(excel);
}

let excel = document.querySelectorAll('.excel');
let i=0;
for(let y=1; y<16; y++) {
    for(let x=1; x<16; x++) {
        excel[i].setAttribute('data-x', x);
        excel[i].setAttribute('data-y', y);
        i++;
    }
}

let score = 0;

let food = {
    x: Math.floor(Math.random()*15+1),
    y: Math.floor(Math.random()*15+1)
};
let snake = [];
snake[0] = {
    x: 8,
    y: 8
};

let foodImg = new Image();
foodImg.src = 'food.png';

let audio = new Audio();
audio.src = 'score.mp3';

document.addEventListener('keydown', getDirection);
let dir = '';
function getDirection(Event) {
    if(Event.keyCode == 37 && dir != 'right') {
        dir = 'left';
    }
    if(Event.keyCode == 39 && dir != 'left') {
        dir = 'right';
    }
    if(Event.keyCode == 38 && dir != 'down') {
        dir = 'up';
    }
    if(Event.keyCode == 40 && dir != 'up') {
        dir = 'down';
    }
}

function eatTail(head,body) {
    for(let i=0; i<body.length; i++) {
        if(head.x == body[i].x && head.y == body[i].y) {
            gameOver();
        }
    }
}

function drawGame() {
    document.querySelector(`[data-x="${food.x}"][data-y="${food.y}"]`).appendChild(foodImg);
    div.textContent = score;
    for(let i=0; i<excel.length; i++) {
        excel[i].classList.remove('snake-head');
        excel[i].classList.remove('snake-body');
    }
    
    for(let i=0; i<snake.length; i++) {
        if(i == 0) {
            document.querySelector(`[data-x="${snake[i].x}"][data-y="${snake[i].y}"]`).classList.add('snake-head');
        } else {
            document.querySelector(`[data-x="${snake[i].x}"][data-y="${snake[i].y}"]`).classList.add('snake-body');
        }
    }
    
    let coordinates = [snake[0].x, snake[0].y];
    
    if(dir == 'left') {
        coordinates[0]--;
    } else if(dir == 'right') {
        coordinates[0]++;
    } else if(dir == 'up') {
        coordinates[1]--;
    } else if(dir == 'down') {
        coordinates[1]++;
    }
    
    if(snake[0].x == food.x && snake[0].y == food.y) {
        score++;
        audio.play();
        food = {
            x: Math.floor(Math.random()*15+1),
            y: Math.floor(Math.random()*15+1)
        };
        
        let foodTag = document.querySelector(`[data-x="${food.x}"][data-y="${food.y}"]`);
        while(foodTag.classList.contains('snake-body')) {
            food = {
                x: Math.floor(Math.random()*15+1),
                y: Math.floor(Math.random()*15+1)
            };
            foodTag = document.querySelector(`[data-x="${food.x}"][data-y="${food.y}"]`);
        }
        
    } else {
        snake.pop();
    }
    

    
    let newHead = {
        x: coordinates[0],
        y: coordinates[1]
    };
    
    eatTail(newHead, snake);
    
    if(newHead.x == 0) {
        newHead.x = 15;
    }
    if(newHead.x == 16) {
        newHead.x = 1;
    }
    if(newHead.y == 0) {
        newHead.y = 15;
    }
    if(newHead.y == 16) {
        newHead.y = 1;
    }
    
    snake.unshift(newHead);
}

let interval = setInterval(drawGame, 100);

function gameOver() {
    clearInterval(interval);
    if(score < 10) {
        alert(`Лузер! Сожрано ${score} морковок`);
    } else if(score >= 10 && score < 20) {
        alert(`Вы проиграли! Съедено ${score} морковок`);
    } else if(score >= 20) {
        alert(`Вы проиграли, милорд! Скушано ${score} морковок. Чувак, круто играешь!!`);
    }
    location.reload();
}











