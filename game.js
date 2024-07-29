const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const frog = {
    x: canvas.width / 2 - 10,
    y: canvas.height - 20,
    width: 20,
    height: 20,
    dx: 20,
    dy: 20,
};

const cars = [];
const logs = [];
const carWidth = 40;
const carHeight = 20;
const logWidth = 60;
const logHeight = 20;
const carSpeed = 2;
const logSpeed = 1.5;
const numCars = 3;
const numLogs = 2;
const carRows = 3;
const logRows = 2;

function initCars() {
    for (let row = 0; row < carRows; row++) {
        for (let i = 0; i < numCars; i++) {
            cars.push({
                x: -carWidth - Math.random() * canvas.width,
                y: canvas.height - 100 - row * 40,
                width: carWidth,
                height: carHeight,
                dx: carSpeed + Math.random() * 2,
            });
        }
    }
}

function initLogs() {
    for (let row = 0; row < logRows; row++) {
        for (let i = 0; i < numLogs; i++) {
            logs.push({
                x: -logWidth - Math.random() * canvas.width,
                y: row * 40 + 20,
                width: logWidth,
                height: logHeight,
                dx: logSpeed + Math.random() * 1.5,
            });
        }
    }
}

function drawFrog() {
    ctx.fillStyle = 'green';
    ctx.fillRect(frog.x, frog.y, frog.width, frog.height);
}

function drawCars() {
    ctx.fillStyle = 'red';
    cars.forEach(car => {
        ctx.fillRect(car.x, car.y, car.width, car.height);
    });
}

function drawLogs() {
    ctx.fillStyle = 'brown';
    logs.forEach(log => {
        ctx.fillRect(log.x, log.y, log.width, log.height);
    });
}

function moveCars() {
    cars.forEach(car => {
        car.x += car.dx;
        if (car.x > canvas.width) {
            car.x = -car.width;
        }
    });
}

function moveLogs() {
    logs.forEach(log => {
        log.x += log.dx;
        if (log.x > canvas.width) {
            log.x = -log.width;
        }
    });
}

function detectCollision() {
    cars.forEach(car => {
        if (frog.x < car.x + car.width &&
            frog.x + frog.width > car.x &&
            frog.y < car.y + car.height &&
            frog.y + frog.height > car.y) {
            resetFrog();
        }
    });

    let onLog = false;
    logs.forEach(log => {
        if (frog.x < log.x + log.width &&
            frog.x + frog.width > log.x &&
            frog.y < log.y + log.height &&
            frog.y + frog.height > log.y) {
            onLog = true;
            frog.x += log.dx; // Move the frog with the log
        }
    });

    if (frog.y < (logRows * 40 + 20) && !onLog) {
        resetFrog();
    }
}

function resetFrog() {
    frog.x = canvas.width / 2 - 10;
    frog.y = canvas.height - 20;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrog();
    drawCars();
    drawLogs();
    moveCars();
    moveLogs();
    detectCollision();
    requestAnimationFrame(update);
}

function moveFrog(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (frog.y > 0) frog.y -= frog.dy;
            break;
        case 'ArrowDown':
            if (frog.y + frog.height < canvas.height) frog.y += frog.dy;
            break;
        case 'ArrowLeft':
            if (frog.x > 0) frog.x -= frog.dx;
            break;
        case 'ArrowRight':
            if (frog.x + frog.width < canvas.width) frog.x += frog.dx;
            break;
    }
}

document.addEventListener('keydown', moveFrog);

initCars();
initLogs();
update();
