const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 200;

let cat = { x: 50, y: 150, width: 40, height: 40, velocityY: 0, jumping: false };

const catImg = new Image();
catImg.src = "cat.png";

let obstacles = [];
let gameOver = false;

document.getElementById("jumpBtn").addEventListener("click", () => {
    if (!gameOver && !cat.jumping) {
        cat.velocityY = -10;
        cat.jumping = true;
    }
});

document.getElementById("restartBtn").addEventListener("click", () => {
    location.reload();
});

function update() {
    if (gameOver) return;
    
    cat.velocityY += 0.5;
    cat.y += cat.velocityY;

    if (cat.y >= 150) {
        cat.y = 150;
        cat.jumping = false;
    }

    if (Math.random() < 0.02) {
        let height = Math.floor(Math.random() * 30) + 30; // العقبات تكون بين 30 و60 ارتفاع
        obstacles.push({ x: 600, y: 200 - height, width: 40, height: height });
    }

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 5;
        if (obstacles[i].x + obstacles[i].width < 0) obstacles.splice(i, 1);
        if (cat.x < obstacles[i].x + obstacles[i].width &&
            cat.x + cat.width > obstacles[i].x &&
            cat.y < obstacles[i].y + obstacles[i].height &&
            cat.y + cat.height > obstacles[i].y) {
            gameOver = true;
            document.getElementById("restartBtn").style.display = "inline";
        }
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(catImg, cat.x, cat.y, cat.width, cat.height);

    ctx.fillStyle = "black";
    for (let obs of obstacles) {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }
}

update();
