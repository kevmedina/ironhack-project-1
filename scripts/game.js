class Game {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.width = 900;
        this.height = 600;
        this.ball = new Ball();
        this.backgroundImg = new Image();
        this.paddle = new Paddle(this);
        this.brick = new Brick();
        this.interval;
    }

    init() {
        this.startGame();
    }

    startGame() {
        this.clear();
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "50px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.textAlign = "center";
        this.ctx.fillText("BRICK BREAKER", canvas.width/2, canvas.height/3);
        this.ctx.fillText("PRESS SPACE BAR TO START", canvas.width/2, canvas.height/1.5);
        document.onkeydown = event => {
            const key = event.keyCode;
            if (key === 32) {
                event.preventDefault();
                this.start();
            }
        };
    }

    start() {
        this.clear();
        this.drawBackground();
        this.brick.buildBricks();
        this.interval = setInterval(() => { 
            this.clear();
            this.drawBackground();
            this.ball.moveBall();
            this.paddle.drawPaddle();
            this.paddle.move();
            this.brick.drawBricks();
            this.brick.detectCollision(this.ball);
            this.paddle.detectCollision(this.ball);
            this.gameOver();
            this.youWin();
        }, 10);
    }

    drawBackground() {
        this.backgroundImg.src = "./images/background.png";
        this.ctx.drawImage(
            this.backgroundImg,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    gameOver() {
        if(this.ball.lives === 0) {
            this.clear();
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white"
            this.ctx.textAlign = "center";
            this.ctx.fillText("GAME OVER!", canvas.width/2, canvas.height/2);
            clearInterval(this.interval);
        }
    }

    youWin() {
        if(this.brick.score === 27) {
            this.clear();
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white"
            this.ctx.textAlign = "center";
            this.ctx.fillText("YOU WIN!", canvas.width/2, canvas.height/2);
            clearInterval(this.interval);
        }
    }
}