var mySound;
var release;
var fail;
var miss;
var hit;

var rectX = 250;
var rectY = 400;

var circX = 250;
var circY = 100;

var circHexOne = 66;
var circHexTwo = 134;
var circHexThr = 244;

var xVelocity = -2;
var yVelocity = 0;

var score = 0;
var lives = 3;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}

function preload() {
    soundFormats('mp3', 'ogg');
    mySound = loadSound("sounds/Samba Isobel.mp3");
    release = loadSound("sounds/trumpetSoloEdited.mp3");
    fail = loadSound("sounds/JazzGuitarEdited.mp3");
    miss = loadSound("sounds/crashCymbolEdited.mp3");
    hit = loadSound("sounds/drumFillEdited.mp3");
}

function setup() {
    mySound.setVolume(0.2);
    mySound.play();
    mySound.isLooping();

    createCanvas(500, 500);
    noStroke();
}

function reset() {
    lives = 3;
    score = 0;
}

function draw() {
    //Game Background color based on Jazz Palette
    background("#8C325F");
    fill("#AB538B");
    rect(0, 110, 500, 2);
    fill("#283044");
    rect(0, 490, 500, 10);

    //As long as there are lives, the game does not end
    if (lives <= 0) {
        //GAME OVER code bloq
        mySound.stop();
        miss.stop()
        fail.setVolume(0.07);
        fail.play();

        fill("#EBF5EE");
        textSize(50);
        text("GAME OVER", 100, 150);
        textSize(20);
        text("Press ENTER to Restart", 150, 175);
    } else {
        //GAME PLAY code bloq
        rectX += xVelocity;
        circY += yVelocity;
        if (rectX >= 425) {
            xVelocity *= -1;
        } else if (rectX <= 0) {
            xVelocity *= -1;
        }

        fill(circHexOne, circHexTwo, circHexThr);
        var rectangle = rect(rectX, rectY, 75, 20);

        fill(circHexOne, circHexTwo, circHexThr);
        var circle = ellipse(circX, circY, 20, 20);

        if (circY >= 500) {
            circY = 100;
            yVelocity = 0;
            miss.setVolume(0.2);
            miss.play();
            lives--;
            circHexOne = random(0, 255);
            circHexTwo = random(0, 255);
            circHexThr = random(0, 255);
        }

        if (circX >= 490) {
            circX = 490;
        } else if (circX <= 10) {
            circX = 10;
        }

        //collision of the circle and box
        if (circX >= rectX && // right of the left edge AND
            circX <= rectX + 75 && // left of the right edge AND
            circY >= rectY && // below the top AND
            circY <= rectY + 20) { // above the bottom
            hit.setVolume(0.2);
            hit.play();
            score++;
            circY = 100;
            yVelocity = 0;

            circHexOne = random(0, 255);
            circHexTwo = random(0, 255);
            circHexThr = random(0, 255);
        }

        //score and lives layed over the game
        fill("white");
        textSize(30);
        text("Score: " + score, 35, 50);
        text("Lives: " + lives, 350, 50);

    }
}

function keyPressed() {
    if (keyCode === 32) {
        //if space bar is pressed
        yVelocity = 2.75;
        if (keyCode === 32 && yVelocity > 0) {
            release.setVolume(0.2);
            release.play();
        }
    } else if (keyCode === LEFT_ARROW && yVelocity != 2) {
        //if left arrow is pressed
        circX -= 25;
    } else if (keyCode === RIGHT_ARROW && yVelocity != 2) {
        //if right arrow is pressed
        circX += 25;
    } else if (keyCode === 13 && lives <= 0) {
        //if enter is pressed
        setup();
        reset();
        fail.stop();
    }
}