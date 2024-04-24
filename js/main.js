const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = '#ff8';

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }
    draw(Context) {
        Context.beginPath();
        Context.lineWidth = 5;
        Context.strokeStyle = this.color;
        Context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        Context.stroke();
        Context.closePath();
        Context.textAlign = "center";
        Context.textBaseline = "middle";
        Context.font = "20px Arial";
        Context.fillText(this.text, this.posX, this.posY);
    }

    update(context) {
        this.draw(context);

        if ((this.posX + this.radius > window_width) || (this.posX - this.radius < 0)) {
            this.dx = -this.dx;
        }

        if ((this.posY - this.radius < 0) || (this.posY + this.radius > window_height)) {
            this.dy = -this.dy;
        }
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

let arrayCircle = [];

for (let i = 0; i < 5; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomRadius = Math.floor(Math.random() * 100 + 15);
    let randomSpeed = Math.random() * 5 + 1; // Velocidad aleatoria entre 1 y 5

    let miCirculo = new Circle(randomX, randomY, randomRadius, 'red', i + 1, randomSpeed);
    arrayCircle.push(miCirculo);
}

let updateCircles = function() {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);
    arrayCircle.forEach(circle => {
        circle.update(ctx);
    });
}

updateCircles();
