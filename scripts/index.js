const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const box = 32;

const ground = new Image();
ground.src = "images/ground.png";

const foodImg = new Image();
foodImg.src = "images/food.png";

let dead = new Audio();
let eat = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";

// create the snake
let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// create the food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// create the score var
let score = 0;

// control the snake
let d;

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";

    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    } else if (key == 32) {
        location.reload();
    }
}

// cheack collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// draw on the canvas
function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "rgb(15, 83, 185)" : "rgb(22, 104, 228)";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "transparent";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
        document.getElementById('game-over-banner').style.display = 'block';
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);

document.getElementById("game-restart-btn").addEventListener("click", restartGame);

document.getElementById("game-start-btn").addEventListener("click", function(){
    document.addEventListener("keydown", direction); // Keys are initiated here otherwise game will start before tutorial is closed
    document.getElementById("tutorial").style.display = 'none'; // Tutorial Hidden
    d = "RIGHT" // A default movement is applied
})
function restartGame() {
    location.reload();
}