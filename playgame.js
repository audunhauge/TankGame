function playTheGame(stage, tanks) {
  window.setInterval(animate, 30);
  const keys = [];

  document.onkeyup = function (e) {
    //console.log(e.code);                                                                                                                               
    keys[e.code] = 0;
  }

  document.onkeydown = function (e) {
    keys[e.code] = 1;
  }
  
  let t1 = tanks[0];

  function animate(e) {
    if (keys.ArrowLeft) {
      t1.turn(-t1.turnrate);
    }
    if (keys.ArrowRight) {
      t1.turn(t1.turnrate);
    }
    if (keys.ArrowUp) {
      t1.v = Math.min(t1.speed, t1.v + t1.a);
    }
    if (keys.ArrowDown) {
      t1.v = Math.max(-t1.speed * 0.3, t1.v - t1.a);
    }
    t1.move(t1.v);
    t1.v *= 0.98;

  }

}