// Основной класс рабочего поля
class WorkField {
    constructor(width, height, background, id){
        var that = this;
        that.points = [];
        that.app = new PIXI.Application(width, height, {backgroundColor : background});
        document.getElementById(id).appendChild(that.app.view);
        document.getElementById(id).getElementsByTagName('canvas')[0].addEventListener('click', that.creatBezier.bind(null, that.app, that.points), false);
    }
    creatBezier(app, points, event){
        var circle = new Circle(event.layerX, event.layerY, app);
        points.push(circle);
        if(points.length > 1){
            // console.dir(points);
            var bezier = new Bezier(points[points.length-2].circle.transform.position, points[points.length-1].circle.transform.position, app);
        }
    }
}
// Класс отрисовки контрольной точки
class Circle {
    constructor(x, y, app) {
        var that = this;

        that.circle = PIXI.Sprite.fromImage('./point.png');
        that.circle.anchor.set(0.5);
        that.circle.x = x;
        that.circle.y = y;
        app.stage.addChild(that.circle);
    }
}

// Класс отрисовки кривой Безье
class Bezier {
    constructor(coord1, coord2, app) {
        var that = this;
        that.bezier = new PIXI.Graphics();
        that.bezier.lineStyle(1);
        that.bezier.moveTo(coord1.x,coord1.y);
        that.bezier.bezierCurveTo(coord1.x+100,coord1.y+100, coord2.x-100 ,coord2.y-100, coord2.x,coord2.y);
        app.stage.addChild(that.bezier);
    }
}

// инициализация основного класса
var clientWidth = window.innerWidth-10;
var clientHeight = window.innerHeight-10;

const field = new WorkField(clientWidth, clientHeight, 0x1099bb, 'work_field');




