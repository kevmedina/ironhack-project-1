class Brick extends Component {
    constructor(game){
        super(game);
        this.game = game;
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.rows = 3;
        this.columns = 12;
        this.width = 60;
        this.height = 30;
        this.padding = 5;
        this.offsetTop = 30;
        this.offsetLeft = 60;
        this.bricks = [];
        this.score = 0;
        this.brickSound = new Audio();
        this.brickSound.src = "./sounds/brick_short.mp3";
    }

    // generates a random color for the bricks
    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    // build the wall of bricks
    buildBricks() {
        for(let c = 0; c < this.columns; c++) {
            this.bricks[c] = [];
            for(let r = 0; r < this.rows; r++) {
                this.bricks[c][r] = { x: 0, y: 0, markerForDeletion: false, color: this.getRandomColor()};
            }
        }
    }

    // draws the wall of bricks to the canvas
    drawBricks() {
        for(let c = 0; c < this.columns; c++) {
            for(let r = 0; r < this.rows; r++) {
                if (this.bricks[c][r].markerForDeletion == false) {
                    let brickX = (c * (this.width + this.padding)) + this.offsetLeft;
                    let brickY = (r * (this.height + this.padding)) + this.offsetTop;
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;
                    this.ctx.beginPath();
                    this.ctx.rect(brickX, brickY, this.width , this.height);
                    this.ctx.fillStyle = this.bricks[c][r].color;
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }

    // collision detection between the ball and bricks
    detectCollision(ball) {
        for (let c = 0; c < this.columns; c++) {
            for (let r = 0; r < this.rows; r++) {
                let b = this.bricks[c][r];
                if (b.markerForDeletion == false) {
                    if (ball.x > b.x && ball.x < b.x + this.width && ball.y > b.y && ball.y < b.y + this.height) {
                        ball.dy = -ball.dy;
                        b.markerForDeletion = true;
                        this.score++;
                        this.brickSound.play();
                        document.getElementById('score').innerHTML = `Score: ${this.score}`;
                    }
                }
            }
        }
    }
}