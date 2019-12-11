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
        this.gameOverImg = new Image();
        this.gameOverImg.src = "./images/gameOver.png";
        this.youWinImg = new Image();
        this.youWinImg.src = "./images/youWin.png";
        this.homeScreenImg = new Image();
        this.homeScreenImg.src = "./images/home.png";
        this.paddle = new Paddle(this);
        this.brick = new Brick();
        this.gamePaused = false;
        this.interval;
    }

    init() {
        this.startGame();
    }

    startGame() {
        this.clear();
        // this.ctx.drawImage(this.homeScreenImg, this.x, this.y, this.width, this.height);
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
        this.ctx.drawImage(this.backgroundImg, this.x, this.y, this.width, this.height);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    gameOver() {
        if(this.ball.lives === 0) {
            this.clear();
            this.ctx.drawImage(this.gameOverImg, this.x, this.y, this.width, this.height);
            clearInterval(this.interval);
        }
    }

    youWin() {
        if(this.brick.score === 36) {
            this.clear();
            this.ctx.drawImage(this.youWinImg, this.x, this.y, this.width, this.height);
            clearInterval(this.interval);
        }
    }
}