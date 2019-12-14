class Ball extends Component {
    constructor(game) {
        super(game);
        this.game = game;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.x = 20;
        this.y = 300;
        this.dx = 3;
        this.dy = -3;
        this.ballRadius = 10;   
        this.lives = 3;
    }

    // draws the ball to the canvas
    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, 6.3);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    }

    // resets the position of the ball when a life is lost
    reset() {
        this.x = 20;
        this.y = 300;
        this.dy = -this.dy;
    }

    // moves the ball on the canvas
    moveBall() {
        this.drawBall();

        if(this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        else if(this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        }
        else if(this.y + this.dy > canvas.height - this.ballRadius) {
            this.lives--;
            document.getElementById('lives').innerHTML = `${this.lives}`;
            this.reset();
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}