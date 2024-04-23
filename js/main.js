const canvas=document.getElementById("canvas");
let ctx = canvas.getContext('2d');

// obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// el canvas tien las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background='#ff8';

class Circle{
    constructor(x, y, radius, color, text, speed){
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;
        this.dx = 1*this.speed;
        this.dy = 1*this.speed;
    }
    draw(Context) {
        Context.beginPath();
        Context.lineWidth=5;
        Context.strokeStyle = this.color;
        Context.arc(this.posX, this.posY, this.radius,  0, Math.PI*2, false);
        Context.stroke();
        Context.closePath();
        Context.textAlign="center";
        Context.textBaseline="middle";
        Context.font="20px Arial";
        Context.fillText(this.text, this.posX, this.posY);
    }

    update(context){
        //context.clearRect(0, 0, window_width, window_height);
        this.draw(context);

        if((this.posX + this.radius>window_width)){
            this.dx = -this.dx;
            //si el circulo supera el margen derecho entonces se mueve a la izquierda
        }

        if((this.posX - this.radius<0)){
            this.dx = -this.dx;
            //si el circulo supera el margen izquierdo entonces se mueve a la derecha
        }

        if((this.posY - this.radius<0)){
            this.dy = -this.dy;
            //si el circulo supera el margen izquierdo entonces se mueve a la izquierda
        }

        if((this.posY + this.radius>window_height)){
            this.dy = -this.dy;
            //si el circulo supera el margen izquierdo entonces se mueve a la izquierda
        }
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

/* let arrayCircle=[];

for (let i=0;i<10;i++){
    let randomS = Math.random()* window_width;
    let randomR = Math.random()* window_height;
    let randomRadius = Math.floor(Math.random()* 100 + 15);
    let miCirculo = new Circle (randomS, randomR, randomRadius, 'red', i + 1);
    arrayCircle.push(miCirculo);
    arrayCircle[i].draw(ctx);
} */

let randomX = Math.random()* window_width;
let randomY = Math.random()* window_height;
let randomRadius = Math.floor(Math.random()* 100 + 15);

let miCirculo = new Circle (randomX, randomY, randomRadius, 'blue', 'pachuca', 15);
miCirculo.draw(ctx);

let miCirculo2 = new Circle (randomX, randomY, randomRadius, 'red', 'pachuca', 5);
miCirculo2.draw(ctx);

let updateCircle = function(){
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);
    miCirculo.update(ctx);
    miCirculo2.update(ctx);
}

updateCircle();