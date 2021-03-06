var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// canvas properties
var game = {
    ctx: canvas.getContext('2d'),
    width: canvas.width,
    height: canvas.height
};


// player paddles properties
var paddle = {
    width: canvas.width / 50,
    height: canvas.height / 5,
    speed: canvas.height / 50
};


// ball
var ball = {
    x: 50,
    y: 50,
    radius: canvas.width / 50,
    speedX: canvas.width / 100,
    speedY: canvas.width / 500,
    color: '#E3EB64'
};


// players
var p1 = {
    x: 10,
    y: game.height / 2 - paddle.height / 2,
    color: "#A7EBCA"
};

var p2 = {
    x: game.width - 10 - paddle.width,
    y: game.height / 2 - paddle.height / 2,
    color: "#A7EBCA"
};


// reset ball
function new_ball() {
    
    // position
    ball.x = game.width / 2;
    ball.y = game.height / 2;
    
    // speed
    var rand = Math.random() * 6 + 4;
    ball.speedX = (Math.random() > 0.5) ? rand : -rand;
    ball.speedY = (Math.random() > 0.5) ? rand : -rand;
}

new_ball(); // random speed for first game


// draw everything
function draw() {
    getGamepadInput();
    clear(game.ctx, game.width, game.height);

    // move the ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    
    // move the paddle
    p1.y += p1_direction * paddle.speed;
    p2.y += p2_direction * paddle.speed;
    
    
    // restrict paddle top/bottom
    if (p1.y <= 0) {
        p1.y = 0;
    }
    if (p2.y <= 0) {
        p2.y = 0;
    }
    
    if (p1.y + paddle.height >= game.height) {
        p1.y = game.height - paddle.height;
    }
    if (p2.y + paddle.height >= game.height) {
        p2.y = game.height - paddle.height;
    }
    
    
    // collision ball & paddle
    if (ball.y + ball.radius >= p1.y &&
        ball.y - ball.radius <= p1.y + paddle.height &&
        ball.x - ball.radius <= p1.x + paddle.width) {
        
        ball.speedX *= -1.2;
    }
    
    if (ball.y + ball.radius >= p2.y &&
        ball.y - ball.radius <= p2.y + paddle.height &&
        ball.x + ball.radius >= p2.x) {
        
        ball.speedX *= -1.2;
    }
    
    
    // ai
    p1.y = ball.y - paddle.height / 2;
    
    
    // if ball hits top or bottom
    if (ball.y - ball.radius <= 0) {
        ball.speedY *= -1;
    }
    
    if (ball.y + ball.radius >= game.height) {
        ball.speedY *= -1;
    }
    
    // if ball hits left or right, reset
    if ((ball.x - ball.radius <= 0) ||
        (ball.x + ball.radius >= game.width)) {
        new_ball();
    }
   
    // draw the ball
    // ctx, x, y, radius, farbe
    drawCircle(game.ctx,
               ball.x, ball.y,
               ball.radius, ball.color);
    
    // draw the paddles
    drawRectangle(game.ctx,
                  p1.x, p1.y,
                  paddle.width, paddle.height,
                  p1.color);
    
    drawRectangle(game.ctx,
                  p2.x, p2.y,
                  paddle.width, paddle.height,
                  p2.color);
    
}



// run draw() every 30ms
setInterval(draw, 30);

















