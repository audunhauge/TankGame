class Skudd {
  constructor(id, klass) {
    this.div = document.createElement("div");
    this.div.className = "skudd " + klass;
    this.x = 0;
    this.y = 0;
    this.v = 0;
    this.rot = 0;
    this.alive = false;
  }
  
  fire(x,y,rot) {
    this.alive = true;
    this.x = x+5;
    this.y = y+5;
    this.rot = rot;
    this.div.style.transform = 'rotate(' + rot + 'deg)';
  }
  
  move(delta) {
    if (this.alive) {
      this.y += delta * Math.sin(Math.PI * this.rot / 180);
      this.x += delta * Math.cos(Math.PI * this.rot / 180);
      this.div.style.left = this.x + "px";
      this.div.style.top = this.y + "px";
      if (this.x < 0 || this.x > 500 || this.y < 0 || this.y > 500) {
        this.alive = false;
      }
    }
  }
  
}