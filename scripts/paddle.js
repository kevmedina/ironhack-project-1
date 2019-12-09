class Paddle extends Component {
    constructor(game, x, y, w, h) {
        super(game, x, y, w, h);
        this.game = game;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.x = 370;
        this.y = 570;
        this.width = 140;
        this.height = 20;
        this.dx = 40;
    }
    
    drawPaddle() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.closePath();
    }

    move() {
        document.onkeydown = event => {
            const key = event.keyCode;
            const possibleKeystrokes = [37, 38, 39, 40];
            if (possibleKeystrokes.includes(key)) {
                event.preventDefault();
                switch (key) {
                    case 37:
                        this.x -= this.dx;
                        console.log("left");
                        break;
                    case 39:
                        this.x += this.dx;
                        console.log("right");
                        break;
                }
            }
        };
    }

    detectCollision(ball) {
        if(ball.y > this.y && ball.y < this.y + this.height && ball.x > this.x && ball.x < this.x + this.width){
            ball.dy = -ball.dy;
            ball.y = this.y - ball.ballRadius;
            console.log("hit");
        }
    }
}