class Paddle extends Component {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
        this.game = game;
        this.x = 370;
        this.y = 570;
        this.width = 140;
        this.height = 20;
        this.dx = 60;
        this.paddleSound = new Audio();
        this.paddleSound.src = "./sounds/ballPaddle.wav";
    }
    
    drawPaddle() {
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = "#34d2eb";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.closePath();
    }

    move() {
        document.onkeydown = event => {
            const key = event.keyCode;
            if(key === 37) {
                event.preventDefault();
                if(this.x <= 0) {
                    this.x += this.dx;
                } else {
                    this.x -= this.dx;
                    console.log("move left");
                }
            }
            else if (key === 39) {
                event.preventDefault();
                if(this.x + this.width > 890) {
                    this.x -= this.dx;
                } else {
                    this.x += this.dx;
                    console.log("move right");
                }
            }
        };
    }

    detectCollision(ball) {
        if(ball.y > this.y && ball.y < this.y + this.height && ball.x > this.x && ball.x < this.x + this.width){
            ball.dy = -ball.dy;
            ball.y = this.y - ball.ballRadius;
            this.paddleSound.play();
            console.log("hit");
        }
    }
}