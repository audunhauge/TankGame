const THW = 16;

class Tank {
  constructor(id, klass) {
    this.div = document.createElement("div");
    this.div.className = "tanks " + klass;
    this.div.id = id;
    this.speed = 1;
    this.a = 0.035;
    this.x = 0;
    this.y = 0;
    this.v = 0;
    this.rot = 0;
    this.turnrate = 2;
    this.alive = true;
  }

  move(delta) {
    if (this.alive) {
      this.y += delta * Math.sin(Math.PI * this.rot / 180);
      this.x += delta * Math.cos(Math.PI * this.rot / 180);
      this.div.style.left = this.x + "px";
      this.div.style.top = this.y + "px";
    }
  }

  turn(delta) {
    if (this.alive) {
      if (this.v < 0) delta *= 2.5;        //turn fast when reversing
      var d = (this.rot + delta) % 360;
      this.rot = d;
      this.div.style.transform = 'rotate(' + (+d) + 'deg)';
    }
  }
}