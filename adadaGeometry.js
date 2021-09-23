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
        geometry_color.setAlpha(150);
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
    constructor(_n, _r_min, _r_max, _image_logo) {

        this.c_modern = ['#8dcfcc', '#8AB4DB', '#91D3E6', '#91E6C9', '#8ADBA9'];
        this.c_traditional = ['#394C87', '#513794', '#3C3A9E', '#3A6E9E', '#377F94'];
        this.c_kawaii = ['#F272B8', '#F207A0', '#A187FF', '#F8FF24', '#80F2FF'];
        this.c = this.c_modern;
        if (isSmartPhone()) {
            this.canvas = createGraphics(1280, 720);
        } else {
            this.canvas = createGraphics(1920, 1080);
        }
        this.r_min = _r_min;
        this.r_max = _r_max;
        this.name = "Tetsuaki Baba";
        this.affilication = "Tokyo Metropolitan University";

        this.spot = Array(_n);
        for (let i = 0; i < _n; i++) {
            this.spot[i] = new Spot(this.canvas,
                random(this.canvas.width), random(this.canvas.height),
                this.c[int(random(this.c.length))],
                random(_r_min, _r_max));
        }

        this.canvas.textFont('Helvetica');
        this.image_logo = _image_logo;


    }
    setColorScheme(_color_id) {
        if (_color_id == 'color_modern') {
            this.c = this.c_modern;
        } else if (_color_id == 'color_traditional') {
            this.c = this.c_traditional;
        } else if (_color_id == 'color_kawaii') {
            this.c = this.c_kawaii;
        }
        for (let i = 0; i < this.spot.length; i++) {
            this.spot[i].c = this.c[int(random(this.c.length))];
        }


    }
    setName(_str) {
        this.name = _str;
    }
    setAffiliation(_str) {
        this.affilication = _str;
    }
    repattern(_n) {
        this.spot = [];
        this.r_max = this.canvas.width / 2;
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
        this.canvas.background(this.c[0]);
        for (let i = 0; i < this.spot.length; i++) {
            this.spot[i].draw();
        }

        // Display user information
        // name
        let font_size = this.canvas.width / 30;

        this.canvas.fill(255);
        this.canvas.textSize(font_size);
        this.canvas.textAlign(LEFT, TOP);
        this.canvas.text(this.name, 50, 50);

        //  affiliation
        let text_width = this.canvas.textWidth(this.name);
        this.canvas.textSize(font_size * 0.75);
        this.canvas.textAlign(LEFT, TOP);
        this.canvas.text("(" + this.affilication + ")",
            50,
            50 + font_size + 10);

        // Display Conference Information
        // this.canvas.fill(255);
        // this.canvas.textAlign(LEFT, TOP);
        // this.canvas.textSize(60);
        // this.canvas.text("ADADA+CUMULUS2020",
        //     1200, this.canvas.height - 120);
        // this.canvas.textSize(24.6);
        // this.canvas.text("International Conference for Asia Digital Art and Design 2020", 1200, this.canvas.height - 60);

        let w_logo = this.canvas.width / 3;
        let ratio = this.image_logo.height / this.image_logo.width;
        this.canvas.imageMode(CORNER)
        this.canvas.image(this.image_logo, this.canvas.width * 0.65, this.canvas.height * 0.85, w_logo, w_logo * ratio);
        image(this.canvas, _x, _y, _w, _h);
    }
};