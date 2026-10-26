interface Circle {
    x: number;
    y: number;
    radius: number;
    color: string;
    vx: number;
    vy: number;
}

function start(): void {
    const canvas = document.getElementById("scene");
    const select = document.getElementById("selected");
    const color = document.getElementById("color");
    const speed = document.getElementById("speed");
    const apply = document.getElementById("apply");
    const toggle = document.getElementById("toggle");
    const reset = document.getElementById("reset");
    const status = document.getElementById("status");
    const errorMsg = document.getElementById("errorMsg");

   
    if (!(canvas instanceof HTMLCanvasElement) ||
        !(select instanceof HTMLSelectElement) ||
        !(color instanceof HTMLInputElement) ||
        !(speed instanceof HTMLInputElement) ||
        !(apply instanceof HTMLButtonElement) ||
        !(toggle instanceof HTMLButtonElement) ||
        !(reset instanceof HTMLButtonElement) ||
        !(status instanceof HTMLParagraphElement) ||
        !(errorMsg instanceof HTMLParagraphElement)) {
        throw new Error("Required page elements are missing");
    }

    const ctx = canvas.getContext("2d");
    if (ctx === null) throw new Error("Canvas 2D is unavailable");

    
    const initials: readonly Circle[] = [
        { x: 50, y: 50, radius: 20, color: "#ff0000", vx: 100, vy: 80 },
        { x: 300, y: 150, radius: 30, color: "#00ff00", vx: -150, vy: 120 },
        { x: 500, y: 250, radius: 25, color: "#0000ff", vx: 90, vy: -100 }
    ];

    let circles: Circle[] = initials.map(c => ({ ...c }));
    let running = true;

    const clamp = (v: number, low: number, high: number): number =>
        Math.max(low, Math.min(v, high));

   
    const getSelectedCircle = (): Circle | undefined => {
        const index = Number(select.value);
        return circles[index];
    };

    const draw = (): void => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
       
        for (const circle of circles) {
            ctx.fillStyle = circle.color;
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
            ctx.fill();
        }

       
        const activeCircle = getSelectedCircle();
        if (activeCircle !== undefined) {
            status.textContent = `Circle ${Number(select.value) + 1}: x=${activeCircle.x.toFixed(1)}, y=${activeCircle.y.toFixed(1)} | ${running ? "running" : "paused"}`;
        }
    };

    select.addEventListener("change", () => {
        const activeCircle = getSelectedCircle();
        if (activeCircle !== undefined) {
            color.value = activeCircle.color;
            speed.value = Math.abs(activeCircle.vx).toString();
        }
    });

    color.addEventListener("input", () => {
        const activeCircle = getSelectedCircle();
        if (activeCircle !== undefined) {
            activeCircle.color = color.value;
        }
    });

    apply.addEventListener("click", () => {
        const raw = speed.value.trim();
        const newSpeed = Number(raw);
        
        if (raw === "" || !Number.isFinite(newSpeed) || newSpeed < 0) {
            errorMsg.textContent = "Enter a nonnegative number";
            return;
        }
        errorMsg.textContent = ""; 
        
        const activeCircle = getSelectedCircle();
        if (activeCircle !== undefined) {
            if (activeCircle.vx === 0) {
                activeCircle.vx = newSpeed;
            } else {
                activeCircle.vx = Math.sign(activeCircle.vx) * newSpeed;
            }
        }
    });

    toggle.addEventListener("click", () => {
        running = !running;
        toggle.textContent = running ? "Pause" : "Resume";
    });

    reset.addEventListener("click", () => {
        circles = initials.map(c => ({ ...c }));
        select.value = "0"; 
        
        const activeCircle = getSelectedCircle();
        if (activeCircle !== undefined) {
            color.value = activeCircle.color;
            speed.value = Math.abs(activeCircle.vx).toString();
        }

        running = false;
        toggle.textContent = "Resume";
        errorMsg.textContent = "";
    });

  

    canvas.addEventListener("pointerdown", (event) => {
        const activeCircle = getSelectedCircle();
        if (activeCircle !== undefined) {
            const bounds = canvas.getBoundingClientRect();
            const x = (event.clientX - bounds.left) * canvas.width / bounds.width;
            const y = (event.clientY - bounds.top) * canvas.height / bounds.height;
            
            activeCircle.x = clamp(x, activeCircle.radius, canvas.width - activeCircle.radius);
            activeCircle.y = clamp(y, activeCircle.radius, canvas.height - activeCircle.radius);
        }
    });

  let previous: number | undefined;
    const frame = (now: number): void => {
        const dt = previous === undefined ? 0 : Math.min((now - previous) / 1000, 0.05);
        previous = now;
        
        if (running) {
            for (const circle of circles) {
                circle.x += circle.vx * dt;
                circle.y += circle.vy * dt;

                
                if (circle.x > canvas.width - circle.radius) {
                    circle.x = canvas.width - circle.radius;
                    circle.vx = -Math.abs(circle.vx);
                } else if (circle.x < circle.radius) {
                    circle.x = circle.radius;
                    circle.vx = Math.abs(circle.vx);
                }

                
                if (circle.y > canvas.height - circle.radius) {
                    circle.y = canvas.height - circle.radius;
                    circle.vy = -Math.abs(circle.vy);
                } else if (circle.y < circle.radius) {
                    circle.y = circle.radius;
                    circle.vy = Math.abs(circle.vy);
                }
            }
        }
        draw();
        requestAnimationFrame(frame);
    };
    
    requestAnimationFrame(frame);
}

start();
export {};