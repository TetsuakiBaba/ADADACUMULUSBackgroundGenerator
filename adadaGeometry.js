class Spot {
    constructor(_canvas, _x, _y, _c, _r) {
        this.x = this.x_init = _x;
        this.y = this.y_init = _y;
        this.c = _c;
        this.r = _r;
        this.param_noise = random(10000.0);
        this.position_noise_x = random(10000.0);
        this.position_noise_y = random(10000.0);
        this.increment_noise = 0.001;
        this.increment_noise_position = 0.002;
        this.number_of_vertex = int(random(3, 6));
        this.canvas = _canvas;
    }

    draw() {
        this.param_noise = this.param_noise + this.increment_noise;
        this.position_noise_x += this.increment_noise_position;
        this.position_noise_y += this.increment_noise_position;
        this.x = this.x_init + 0.5 * height * noise(this.position_noise_x);
        this.y = this.y_init + 0.5 * height * noise(this.position_noise_y);

        this.canvas.noStroke();

        let geometry_color = color(this.c);
        geometry_color.setAlpha(200);
        this.canvas.fill(geometry_color);

        this.canvas.beginShape();
        for (let angle = 0.0; angle < 360.0; angle = angle + 360 / this.number_of_vertex) {
            let circle_noise = 0.5 * height * noise(
                this.param_noise + cos(radians(angle)),
                this.param_noise + sin(radians(angle))
            );

            this.canvas.vertex(
                this.x + (this.r + circle_noise) * cos(radians(angle)),
                this.y + (this.r + circle_noise) * sin(radians(angle)));
        }
        this.canvas.endShape();
        //image(this.canvas, 0, 0, width, height);
    }
};

class adadaGeometry {
    constructor(_n, _r_min, _r_max) {

        this.c = ['#8dcfcc', '#8AB4DB', '#91D3E6', '#91E6C9', '#8ADBA9'];
        this.canvas = createGraphics(1920, 1080);
        this.r_min = _r_min;
        this.r_max = _r_max;
        this.name = "Etsuo Genda";
        this.affilication = "Guru of ADADA";
        this.spot = Array(_n);
        for (let i = 0; i < _n; i++) {
            this.spot[i] = new Spot(this.canvas,
                random(this.canvas.width), random(this.canvas.height),
                this.c[int(random(this.c.length))],
                random(_r_min, _r_max));
        }

        this.canvas.textFont('Helvetica');

    }
    setName(_str) {
        this.name = _str;
    }
    setAffiliation(_str) {
        this.affilication = _str;
    }
    repattern(_n) {
        for (let i = 0; i < _n; i++) {
            this.spot[i] = new Spot(this.canvas,
                random(this.canvas.width), random(this.canvas.height),
                this.c[int(random(this.c.length))],
                random(this.r_min, this.r_max));
        }
    }
    update() {

    }
    download() {
        this.canvas.save(this.name + "-Background.png");
    }
    draw(_x, _y, _w, _h) {
        this.update();
        this.canvas.background('#8dcfcc');
        for (let i = 0; i < this.spot.length; i++) {
            this.spot[i].draw();
        }

        // Display user information
        // name
        this.canvas.fill(255);
        this.canvas.textSize(72);
        this.canvas.textAlign(LEFT, TOP);
        this.canvas.text(this.name, 50, 50);

        //  affiliation
        let text_width = this.canvas.textWidth(this.name);
        console.log(text_width);
        this.canvas.textSize(48);
        this.canvas.textAlign(LEFT, BOTTOM);
        this.canvas.text("(" + this.affilication + ")",
            50 + 50 + text_width,
            45 + 72);

        // Display Conference Information
        this.canvas.fill(255);
        this.canvas.textAlign(LEFT, TOP);
        this.canvas.textSize(60);
        this.canvas.text("ADADA+CUMULUS2020",
            1200, this.canvas.height - 120);
        this.canvas.textSize(24.6);
        this.canvas.text("International Conference for Asia Digital Art and Design 2020", 1200, this.canvas.height - 60);
        image(this.canvas, _x, _y, _w, _h);
    }
};