function playTheGame(stage, tanks) {

  // en veldig enkel måte å animere ting på
  // vi gjør det med et fast intervall på 30ms
  window.setInterval(animate, 30);
  const keys = [];

  document.onkeyup = function (e) {                                                                                                           
    keys[e.code] = 0;
  };

  document.onkeydown = function (e) {
    keys[e.code] = 1;
  };
  
  // Merk denne måten å gi verdi til to variable.
  // Alternativet er:
  //   let t1 = tanks[0];
  //   let t2 = tanks[1];
  let [t1,t2] = tanks;
  let keysT1 = [ keys.ArrowLeft, keys.ArrowRight, keys.ArrowUp, keys.ArrowDown];
  let keysT2 = [ keys.KeyA, keys.KeyD, keys.KeyW, keys.KeyS];

  function animate(e) {
    moveTank(t1,keysT1);
    moveTank(t1,keysT1);
  }

  function moveTanks() {
    // styring av tanks 1
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

    // styring av tanks 2
    if (keys.KeyA) {
      t2.turn(-t2.turnrate);
    }
    if (keys.KeyD) {
      t2.turn(t2.turnrate);
    }
    if (keys.KeyW) {
      t2.v = Math.min(t2.speed, t2.v + t2.a);
    }
    if (keys.KeyS) {
      t2.v = Math.max(-t2.speed * 0.3, t2.v - t2.a);
    }

    // oppdater posisjon og fart for tanks
    t1.move(t1.v);
    t1.v *= 0.98;   // rullemotstand

    t2.move(t2.v);
    t2.v *= 0.98;
  }

}