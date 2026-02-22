const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height, rows, cols;
let points = [];
const spacing = 60;
let time = 0;

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    points = [];
    cols = Math.ceil(width / spacing) + 1;
    rows = Math.ceil(height / spacing) + 1;

    for (let y = 0; y < rows; y++) {
        points[y] = [];
        for (let x = 0; x < cols; x++) {
            points[y][x] = {
                baseX: x * spacing,
                baseY: y * spacing,
                phase: Math.random() * Math.PI * 2,
                speed: 0.2 + Math.random() * 0.4
            };
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    time += 0.005;

    ctx.strokeStyle = 'rgba(120, 150, 200, 0.12)';
    ctx.lineWidth = 1;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const p = points[y][x];

            const movementX = Math.cos(time * p.speed + p.phase) * 15;
            const movementY = Math.sin(time * p.speed + p.phase) * 15;

            p.currentX = p.baseX + movementX;
            p.currentY = p.baseY + movementY;
        }
    }

    for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        for (let x = 0; x < cols; x++) {
            if (x === 0) ctx.moveTo(points[y][x].currentX, points[y][x].currentY);
            else ctx.lineTo(points[y][x].currentX, points[y][x].currentY);
        }
        ctx.stroke();
    }

    for (let x = 0; x < cols; x++) {
        ctx.beginPath();
        for (let y = 0; y < rows; y++) {
            if (y === 0) ctx.moveTo(points[y][x].currentX, points[y][x].currentY);
            else ctx.lineTo(points[y][x].currentX, points[y][x].currentY);
        }
        ctx.stroke();
    }

    requestAnimationFrame(draw);
}

window.addEventListener('resize', init);
init();
draw();
