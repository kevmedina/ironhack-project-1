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
    
    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, 6.3);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    }

    reset() {
        this.x = 20;
        this.y = 300;
    }

    moveBall() {
        this.drawBall();

        if(this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        if(this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        }
        if(this.y + this.dy > canvas.height - this.ballRadius) {
            this.lives--;
            document.getElementById('lives').innerHTML = `${this.lives}`;
            this.reset();
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}