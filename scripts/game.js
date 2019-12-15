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
        this.homeScreenImg.src = "./images/homeScreen.png";
        this.paddle = new Paddle(this);
        this.brick = new Brick();
        this.interval;
        this.leveled = false;
        this.level = 1;
    }

    // initiates the home screen 
    init() {
        this.startGame();
    }

    // loads the home screen
    startGame() {
        this.clear();
        this.homeScreenImg.onload = ()=>{
            this.ctx.drawImage(this.homeScreenImg, this.x, this.y, this.width, this.height);
            this.ctx.font = "40px Arial";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.font = "28px Arial";
            this.ctx.fillText("PRESS SPACE BAR TO CONTINUE", canvas.width/2, canvas.height/1.02);
        }
        document.onkeydown = event => {
            const key = event.keyCode;
            if (key === 32) {
                event.preventDefault();
                this.intro();
            }
        };
    }

    // loads the instructions screen
    intro() {
        this.clear();
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.font = "32px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText("INSTRUCTIONS", canvas.width/2, canvas.height/5);
        this.ctx.font = "24px Arial";
        this.ctx.fillText("Smash all the bricks by bouncing the ball off the paddle", canvas.width/2, canvas.height/3);
        this.ctx.fillText("The paddle moves horizontally using the left and right arrows on the keyboard", canvas.width/2, canvas.height/2);
        this.ctx.fillText("You start with three lives and lose a life if the ball hits the bottom of the screen", canvas.width/2, canvas.height/1.5);
        this.ctx.fillText("PRESS SPACE BAR TO START", canvas.width/2, canvas.height/1.2);
        document.onkeydown = event => {
            const key = event.keyCode;
            if (key === 32) {
                event.preventDefault();
                this.start();
            }
        };
    }

    // starts and loops the game
    start() {
        this.clear();
        this.drawBackground();
        this.brick.buildBricks();
        this.interval = setInterval(() => { 
            this.clear();
            this.drawBackground();
            if(this.leveled) {
                setTimeout(() => {
                    this.ball.moveBall;
                    this.leveled = false;
                }, 2000);
            }
            else {
                this.ball.moveBall();
            }
            this.paddle.drawPaddle();
            this.paddle.move();
            this.brick.drawBricks();
            this.brick.detectCollision(this.ball);
            this.paddle.detectCollision(this.ball);
            this.levelTwo(); 
            this.gameOver();
            this.youWin();
        }, 10);
    }

    // draws the background image to the canvas
    drawBackground() {
        this.backgroundImg.src = "./images/background.png";
        this.ctx.drawImage(this.backgroundImg, this.x, this.y, this.width, this.height);
    }

    // clears the canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // initiates level two
    levelTwo() {
        if(this.brick.score === 1 && this.level === 1) {
            this.clear();
            clearInterval(this.interval);
            this.ball.reset();
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.font = "60px Arial";
            this.ctx.fillStyle = "white"
            this.ctx.textAlign = "center";
            this.ctx.fillText("LEVEL 2", canvas.width/2, canvas.height/2);
            this.paddle.width = 90;
            this.ball.dx = 4;
            this.ball.dy = -4;
            this.brick.columns = 9;
            this.brick.offsetLeft = 160;
            this.paddle.x = 405;
            this.paddle.y = 570;
            this.leveled = true;
            this.level = 2;
            setTimeout(() => {
                this.start();
            }, 2000);
        }
    }

    // draws the game over image if the number of lives equals zero
    gameOver() {
        if(this.ball.lives === 0) {
            this.clear();
            this.ctx.drawImage(this.gameOverImg, this.x, this.y, this.width, this.height);
            clearInterval(this.interval);
        }
    }

    // draws the you win image if you reach a score of 72
    youWin() {
        if(this.brick.score === 63) {
            this.clear();
            this.ctx.drawImage(this.youWinImg, this.x, this.y, this.width, this.height);
            clearInterval(this.interval);
        }
    }
}