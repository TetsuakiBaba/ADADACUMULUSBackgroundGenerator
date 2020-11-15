let pg;
var geometry;

function setup() {

    // graphics stuff:
    //textFont('Sawarabi Mincho');
    var canvas = createCanvas(windowWidth - 80, (windowWidth - 80) * (9.0 / 16.0),
        P2D);
    pg = createGraphics(1920, 1080);
    canvas.parent('sketch-holder');

    let client_w = document.getElementById('container').clientWidth;
    resizeCanvas(client_w, (client_w) * 9 / 16);
    frameRate(15);

    geometry = new adadaGeometry(5, 100, width);

    select('#button_repattern').mouseClicked(Repattern);
    select('#input_name').changed(changedName);
    select('#input_affiliation').changed(changedAffiliation);
    select('#button_download').mouseClicked(download);
}

function changedName() {
    geometry.setName(this.value());
}

function changedAffiliation() {
    geometry.setAffiliation(this.value());
}

function Repattern() {
    geometry.repattern(5);
}

function download() {
    geometry.download();

}

function windowResized() {
    let client_w = document.getElementById('container').clientWidth;
    resizeCanvas(client_w, (client_w) * 9 / 16);

}

function draw() {
    background(100);
    pg.background(100);
    text("hello", mouseX, mouseY);

    //pg.ellipse(random(pg.width), random(pg.height), 100, 100);
    geometry.draw(0, 0, width, height);

}

function keyPressed() {
    if (key == 's') {
        pg.save("myWallpaper.png");
    }

}

// let pg;

// function setup() {
//     createCanvas(400, 400);
//     pg = createGraphics(4000, 4000);
//     pg.background(32);
// }

// function draw() {
//     pg.ellipse(random(pg.width), random(pg.height), 100, 100);
//     image(pg, 0, 0, width, height);
// }

// function mousePressed() {
//     pg.save("pg.png");
// }