let pg;
var geometry;
var image_logo;

function preload() {
    image_logo = loadImage("conference_logo.png");
}

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

    geometry = new adadaGeometry(5, 100, width, image_logo);


    select('#button_repattern').mouseClicked(Repattern);
    select('#input_name').input(changedName);
    select('#input_affiliation').input(changedAffiliation);
    select('#button_download').mouseClicked(download);
    select('#number_geometry').changed(changedGeometry);
    select('#select_color_scheme').changed(changedColorScheme);
}

function changedColorScheme() {
    console.log("hello");
    geometry.setColorScheme(this.value());
    let size_of_geometry = document.getElementById('number_geometry').value;
    geometry.repattern(size_of_geometry);
}

function changedGeometry() {
    let size_of_geometry = this.value();
    geometry.repattern(size_of_geometry);
}

function changedName() {
    geometry.setName(this.value());
}

function changedAffiliation() {
    geometry.setAffiliation(this.value());
}

function Repattern() {
    let size_of_geometry = document.getElementById('number_geometry').value;
    geometry.repattern(size_of_geometry);
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
    geometry.draw(0, 0, width, height);

}