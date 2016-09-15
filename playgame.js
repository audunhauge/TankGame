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
  
  let keysT1 = "ArrowLeft,ArrowRight,ArrowUp,ArrowDown".split(",");
  let keysT2 = "KeyA,KeyD,KeyW,KeyS".split(",");

  function animate(e) {
    moveTank(t1,keysT1);
    moveTank(t2,keysT2);
  }

  function moveTank(tank, [left,right,up,down]) {
    // styring av tanks 1
    if (keys[left]) {
      tank.turn(-tank.turnrate);
    }
    if (keys[right]) {
      tank.turn(tank.turnrate);
    }
    if (keys[up]) {
      tank.v = Math.min(tank.speed, tank.v + tank.a);
    }
    if (keys[down]) {
      tank.v = Math.max(-tank.speed * 0.3, tank.v - tank.a);
    }

    // oppdater posisjon og fart for tanks
    tank.move(tank.v);
    tank.v *= 0.98;   // rullemotstand

  }

}