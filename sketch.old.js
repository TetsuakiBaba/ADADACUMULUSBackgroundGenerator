var pg;

function setup() {

    // graphics stuff:
    //textFont('Sawarabi Mincho');
    var canvas = createCanvas(windowWidth - 80, (windowWidth - 80) * (9.0 / 16.0),
        P2D);
    var pg = createGraphics(1920, 1080);
    canvas.parent('sketch-holder');

    let client_w = document.getElementById('container').clientWidth;
    resizeCanvas(client_w, (client_w) * 9 / 16);
    //document.getElementById("screen_size").value = str(int(width)) + "x" + str(int(height));


    frameRate(30);

}

function windowResized() {
    let client_w = document.getElementById('container').clientWidth;
    resizeCanvas(client_w, (client_w) * 9 / 16);
    document.getElementById("screen_size").value = str(int(width)) + "x" + str(int(height));
}

function draw() {
    background(100);
    text("hello", mouseX, mouseY);
    image(pg, 0, 0, width, height);
}

function keyPress() {
    if (key == 's') {
        pg.save("myWallpaper.png");
    }
}