let names = [
    "Alicia",
    "Bernadette",
    "Catherine",
    "Daniela",
    "Eleanor",
    "Francisca",
    "Georgina",
    "Henrietta",
];

// Choose CSS color names from https://www.w3schools.com/cssref/css_colors.asp
let colors = [
    "BlueViolet",
    "Violet",
    "SeaGreen",
    "LightSkyBlue",
    "Gold",
    "Crimson",
    "LightGreen",
    "White",
];

let fontSize = 48;

let spinner;

function setup() {
    createCanvas(windowWidth, windowHeight);

    spinner = new Spinner();

    spinner.addWheel(
        new Wheel(
            names, colors,
            centerX = width / 2,
            centerY = height / 2,
            diameter = min(width, height) * 0.8
        )
    );
}

function draw() {
    if (spinner.hasChanged()) {
        background("Gray");
        for (let wheel of spinner.wheels) {
            wheel.draw();
        }
    }
    spinner.continue();
}

// Start spinning when the mouse is clicked.
function mouseClicked() {
    spinner.start();
}

// Start spinning when the spacebar is pressed.
function keyPressed() {
    if (key == " ") {
        spinner.start();
    }
}

//===============================================================================
// Wheel 
//===============================================================================

class Wheel {
    constructor(names, colors, centerX, centerY, diameter) {
        this.names = names;
        this.colors = colors;
        this.cx = centerX;
        this.cy = centerY;
        this.diameter = diameter;
        this.angle = 0;
        this.changed = true;
    }

    turn(delta) {
        this.angle += delta;
        this.changed = true;
    }

    draw() {
        push();

        angleMode(DEGREES);
        textSize(fontSize);
        textAlign(RIGHT);

        let N = this.names.length;
        let diam = this.diameter;
        let radius = diam / 2;

        let angleSlice = 360 / N;

        translate(this.cx, this.cy);

        // Draw the pointer.

        fill("Black");
        triangle(0, -radius - 20, -30, -radius - 70, +30, -radius - 70);

        // Draw the colored slices.

        rotate(this.angle);

        strokeWeight(5);
        for (let i = 0; i < N; i++) {
            fill(this.colors[i % this.colors.length]);
            arc(0, 0, diam, diam, 0, angleSlice, PIE);
            rotate(angleSlice);
        }

        // Draw the names.

        rotate(angleSlice / 2 + 6);

        for (let i = 0; i < N; i++) {
            fill(0);
            text(names[i], radius * 0.9, 0);
            rotate(angleSlice);
        }

        pop();

        this.changed = false;
    }
}

//===============================================================================
// Spinning logic 
//===============================================================================

class Spinner {
    constructor() {
        this.speed = 0;
        this.count = "";
        this.flag = false;
        this.step = "";
        this.plateau = "";

        this.wheels = [];
    }

    addWheel(wheel) {
        this.wheels.push(wheel);
    }

    hasChanged() {
        for (let wheel of this.wheels) {
            if (wheel.changed) return true;
        }
        return false;
    }

    start() {
        this.speed = 0;
        this.count = 0;
        this.flag = true;
        this.step = 20;
        this.plateau = int(random(30, 80));
    }

    continue() {
        let S = this.step;
        let P = this.plateau;

        if (this.flag) {
            if (this.count < S) {
                this.speed += 1;
            } else if (S <= this.count && this.count < S + P) {
                // nothing to do
            } else if (S + P <= this.count && this.speed > 0) {
                this.speed = max(0, this.speed - 0.1);
            } else if (this.speed == 0) {
                this.flag = false;
            }

            for (let wheel of this.wheels) {
                wheel.turn(this.speed);
            }

            this.count++;
        }
    }
}
