"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.getElementById("canvas"),
    canvas2 = document.getElementById("canvas2"),
    context = canvas.getContext("2d"),
    context2 = canvas2.getContext("2d"),
    width = canvas.width = canvas2.width = window.innerWidth,
    height = canvas.height = canvas2.height = window.innerHeight;

window.onresize = function () {
  width = canvas.width = canvas2.width = window.innerWidth;
  height = canvas.height = canvas2.height = window.innerHeight;
};

var Vector = function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this._x = x;
    this._y = y;
  }

  Vector.prototype.setX = function setX(value) {
    this._x = value;
  };

  Vector.prototype.getX = function getX() {
    return this._x;
  };

  Vector.prototype.setY = function setY(value) {
    this._y = value;
  };

  Vector.prototype.getY = function getY() {
    return this._y;
  };

  Vector.prototype.setAngle = function setAngle(angle) {
    var length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  };

  Vector.prototype.getAngle = function getAngle() {
    return Math.atan2(this._y, this._x);
  };

  Vector.prototype.setLength = function setLength(length) {
    var angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
  };

  Vector.prototype.getLength = function getLength() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  };

  Vector.prototype.addTo = function addTo(v2) {
    this._x += v2.getX();
    this._y += v2.getY();
  };

  return Vector;
}();

var Particle = function () {
  function Particle(x, y, speed, direction) {
    _classCallCheck(this, Particle);

    this.position = new Vector(x, y); //position = {this._x = x, this._y = y}
    this.velocity = new Vector(0, 0); //velocity = {this._x = 0, this._y = 0 }
    this.velocity.setLength(speed);
    this.velocity.setAngle(direction);
  }
  /* not use this time
  accelerate(accel){
    this.velocity.addTo(accel);
  }
  */

  Particle.prototype.update = function update() {
    this.position.addTo(this.velocity);
  };

  Particle.prototype.angleTo = function angleTo(p2) {
    return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
  };

  Particle.prototype.distanceTo = function distanceTo(p2) {
    var dx = p2.position.getX() - this.position.getX();
    var dy = p2.position.getY() - this.position.getY();
    return Math.sqrt(dx * dx + dy * dy);
  };

  Particle.prototype.gravitateTo = function gravitateTo(p2) {
    var grav = new Vector(0, 0),
        dist = this.distanceTo(p2);
    grav.setLength(p2.mass / (dist * dist));
    grav.setAngle(this.angleTo(p2));
    this.velocity.addTo(grav);
  };

  return Particle;
}();

var sun = new Particle(width / 2, height / 2, 0, 0),
    planet = new Particle(width / 2 + 200, height / 2, 10, -Math.PI / 2);

//sun.mass =64500;
sun.mass = 20000;
update();
function update() {
  context.clearRect(0, 0, width, height); //在给定矩形里清空一个矩形  context.cleatReact(x, y, width, heigth):context.clearReact(要清除的矩形左上角的x坐标，y坐标，要清除矩形的宽度，要清除矩形的高度)
  planet.gravitateTo(sun);
  planet.update();

  context.fillStyle = "#fc2";
  context.beginPath(); //开始一条路径或者重置当前的路径
  context.arc(sun.position.getX(), sun.position.getY(), 20, 0, Math.PI * 2, false); //用于创建弧/曲线，把起始位置设置为0，结束角设置为2*Math.PI  (圆的中心的x坐标，圆的中心的y坐标，圆的半径，起始角，结束角，false 逆时针 true 顺时针)
  context.fill(); //填充当前绘图

  context.fillStyle = "#0ff";
  context.beginPath();
  context.arc(planet.position.getX(), planet.position.getY(), 5, 0, Math.PI * 2, false);
  context.fill();

  context2.fillStyle = "#fff";
  context2.beginPath();
  context2.arc(planet.position.getX(), planet.position.getY(), 1, 0, Math.PI * 2, false);
  context2.fill();
  requestAnimationFrame(update);
}